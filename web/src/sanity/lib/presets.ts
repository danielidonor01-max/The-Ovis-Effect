// Brand-safe preset lists shared by the Studio schemas and the front-end.
// Editors pick from these — no raw hex / arbitrary weights — so every hero
// stays on-brand and readable.

export const TITLE_COLORS: { title: string; value: string }[] = [
  { title: "Ink (default)", value: "#16232A" },
  { title: "White (on dark/imagery)", value: "#FFFFFF" },
  { title: "GFA Orange", value: "#FF5B04" },
  { title: "Spa Green", value: "#3E7C66" },
  { title: "Finance Teal", value: "#125C54" },
  { title: "Safe Haven Gold", value: "#9A7B3F" },
  { title: "Muted Grey", value: "#5E6B75" },
];

export const TITLE_WEIGHTS: { title: string; value: string }[] = [
  { title: "Light", value: "300" },
  { title: "Regular", value: "400" },
  { title: "Medium", value: "500" },
  { title: "Semibold", value: "600" },
  { title: "Bold", value: "700" },
];

export const DEFAULT_TITLE_COLOR = "#16232A";
export const DEFAULT_TITLE_WEIGHT = "600";
