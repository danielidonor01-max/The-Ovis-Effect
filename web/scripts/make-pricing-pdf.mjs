// Generates a simple sample price-list PDF (no dependencies) at
// public/urovi-spa-pricing.pdf. The CMS file overrides it when uploaded.
//   node scripts/make-pricing-pdf.mjs
import { writeFileSync, mkdirSync } from "fs";

const esc = (s) =>
  s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

// [type, text] — ASCII only (keeps byte offsets == string length).
const rows = [
  ["H1", "Urovi Spa - Price List"],
  ["SUB", "Wellbeing  -  Warri, Delta State"],
  ["GAP", ""],
  ["H2", "Facials"],
  ["LI", "Hydrating Facial  -  NGN 18,000"],
  ["LI", "Brightening Facial  -  NGN 22,000"],
  ["LI", "Deep-Cleanse Facial  -  NGN 20,000"],
  ["LI", "Anti-Aging Facial  -  NGN 28,000"],
  ["GAP", ""],
  ["H2", "Massage & Bodywork"],
  ["LI", "Swedish Massage (60 min)  -  NGN 20,000"],
  ["LI", "Deep-Tissue Massage (60 min)  -  NGN 25,000"],
  ["LI", "Aromatherapy Massage (60 min)  -  NGN 24,000"],
  ["LI", "Hot Stone Massage (75 min)  -  NGN 30,000"],
  ["GAP", ""],
  ["H2", "Scrubs & Wraps"],
  ["LI", "Full-Body Scrub  -  NGN 18,000"],
  ["LI", "Detox Wrap  -  NGN 22,000"],
  ["LI", "Sculpting Wrap  -  NGN 26,000"],
  ["GAP", ""],
  ["H2", "Wellness Rituals"],
  ["LI", "Steam & Sauna (per session)  -  NGN 8,000"],
  ["LI", "Manicure & Pedicure  -  NGN 15,000"],
  ["LI", "Full-Body Reset (2 hrs)  -  NGN 45,000"],
  ["LI", "Half-Day Retreat  -  NGN 80,000"],
  ["GAP", ""],
  ["FOOT", "Sample price list - confirm current prices with the spa."],
  ["FOOT", "Book on WhatsApp: +234 807 712 5775"],
];

const font = { H1: ["F1", 22], SUB: ["F2", 11], H2: ["F1", 14], LI: ["F2", 11], FOOT: ["F2", 9] };
const lead = { SUB: 18, H2: 30, LI: 17, FOOT: 15, GAP: 14 };
const color = {
  H1: "0.243 0.486 0.4",
  H2: "0.243 0.486 0.4",
  SUB: "0.37 0.42 0.46",
  LI: "0.13 0.18 0.21",
  FOOT: "0.5 0.55 0.58",
};

let content = "BT\n1 0 0 1 56 788 Tm\n";
let first = true;
for (const [type, t] of rows) {
  if (type === "GAP") {
    content += `0 -${lead.GAP} Td\n`;
    continue;
  }
  const [f, size] = font[type];
  content += `${color[type]} rg\n/${f} ${size} Tf\n`;
  if (!first) content += `0 -${lead[type]} Td\n`;
  content += `(${esc(t)}) Tj\n`;
  first = false;
}
content += "ET\n";

const objs = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
  `<< /Length ${content.length} >>\nstream\n${content}endstream`,
];

let pdf = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
const offsets = [];
objs.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xrefStart = pdf.length;
let xref = `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
for (const off of offsets) xref += `${String(off).padStart(10, "0")} 00000 n \n`;
pdf += xref + `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

mkdirSync("public", { recursive: true });
writeFileSync("public/urovi-spa-pricing.pdf", Buffer.from(pdf, "latin1"));
console.log("Wrote public/urovi-spa-pricing.pdf (" + pdf.length + " bytes)");
