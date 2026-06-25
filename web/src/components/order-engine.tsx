"use client";

import { useEffect, useState } from "react";
import { Plus, Minus, ArrowRight, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { waLink } from "@/data/site";
import { urlForImage } from "@/sanity/lib/image";
import type { MenuCategoryDoc, SanityImage } from "@/sanity/lib/data";

const ACCENT = "#ff5b04";

const naira = (n: number) => `₦${Number(n).toLocaleString()}`;

type SetQty = (id: string, name: string, qty: number, price?: number) => void;

export function OrderEngine({
  menu,
  whatsapp,
}: {
  menu: MenuCategoryDoc[];
  whatsapp?: string;
}) {
  const cats = [
    { key: "all", label: "All" },
    ...menu.map((c) => ({ key: c.key, label: c.label })),
  ];

  const allItems = menu.flatMap((c) =>
    c.items.map((it) => ({ ...it, cat: c.key, catLabel: c.label })),
  );
  type Item = (typeof allItems)[number];

  const [active, setActive] = useState("all");
  const [cart, setCart] = useState<
    Record<string, { name: string; qty: number; price?: number }>
  >({});
  const [open, setOpen] = useState<Item | null>(null);

  const qtyOf = (id: string) => cart[id]?.qty ?? 0;
  const setQty: SetQty = (id, name, qty, price) =>
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = { name, qty, price };
      return next;
    });

  const total = Object.values(cart).reduce((s, v) => s + v.qty, 0);
  const estTotal = Object.values(cart).reduce(
    (s, v) => s + (v.price ? v.price * v.qty : 0),
    0,
  );
  const visible = allItems.filter((it) => active === "all" || it.cat === active);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const sendOrder = () => {
    const lines = Object.values(cart).map(
      (v) => `• ${v.qty}× ${v.name}${v.price ? ` (${naira(v.price)})` : ""}`,
    );
    const totalLine = estTotal ? `\n\nEstimated total: ${naira(estTotal)}` : "";
    const msg =
      "Hi Good Food Avenue! I'd like to place an order:\n\n" +
      lines.join("\n") +
      totalLine +
      "\n\nPlease confirm availability and total. Thank you!";
    window.open(waLink(msg, whatsapp), "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      {/* Category chips */}
      <div className="flex flex-wrap justify-center gap-2">
        {cats.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setActive(c.key)}
            className={cn(
              "rounded-full border px-4 py-2 font-heading text-sm font-medium transition-colors",
              active === c.key
                ? "border-brand bg-brand text-white"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Items — 2-column grid with avatars */}
      <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
        {visible.map((it) => {
          const q = qtyOf(it.id);
          return (
            <div
              key={it.id}
              role="button"
              tabIndex={0}
              onClick={() => setOpen(it)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpen(it);
                }
              }}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border bg-card p-3 text-left transition-colors",
                q > 0 ? "border-brand" : "border-border hover:border-foreground/20",
              )}
            >
              <Avatar image={it.image} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{it.name}</p>
                <p className="truncate text-xs text-muted-foreground">{it.description}</p>
                {it.price ? (
                  <p className="mt-0.5 text-xs font-semibold" style={{ color: ACCENT }}>
                    {naira(it.price)}
                  </p>
                ) : null}
              </div>
              <Control
                id={it.id}
                name={it.name}
                price={it.price}
                qty={q}
                setQty={setQty}
                stop
              />
            </div>
          );
        })}
      </div>

      {/* Sticky order bar */}
      {total > 0 && (
        <>
          <div className="fixed inset-x-3 bottom-4 z-[60] mx-auto flex max-w-[560px] items-center justify-between gap-3 rounded-full border border-border bg-card p-2 pl-5 shadow-[0_18px_50px_-12px_rgba(22,35,42,0.45)]">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="truncate text-sm font-bold tabular-nums">
                {total} item{total > 1 ? "s" : ""}
                {estTotal ? ` · ${naira(estTotal)}` : ""}
              </span>
              <button
                type="button"
                onClick={() => setCart({})}
                className="shrink-0 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
              >
                Clear
              </button>
            </div>
            <button
              type="button"
              onClick={sendOrder}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 font-heading text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] sm:px-5"
            >
              Send on WhatsApp <ArrowRight className="size-4" />
            </button>
          </div>
          <div className="h-20" aria-hidden />
        </>
      )}

      {/* Detail modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={open.name}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-sm"
          />
          <div className="relative z-10 max-h-[88dvh] w-full max-w-md overflow-x-hidden overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
            >
              <X className="size-4" />
            </button>
            {open.image?.asset?._ref ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={urlForImage(open.image).width(800).height(500).url()}
                alt={open.name}
                className="aspect-[16/10] w-full object-cover"
              />
            ) : (
              <div
                className="grid aspect-[16/10] place-items-center"
                style={{ background: `linear-gradient(135deg, ${ACCENT}33, transparent 65%)` }}
              >
                <ImageIcon className="size-10 text-muted-foreground/30" />
              </div>
            )}
            <div className="p-6">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: ACCENT }}
              >
                {open.catLabel}
              </span>
              <div className="mt-1.5 flex items-baseline justify-between gap-3">
                <h3 className="font-heading text-2xl font-semibold tracking-tight">
                  {open.name}
                </h3>
                {open.price ? (
                  <span className="font-heading text-lg font-semibold" style={{ color: ACCENT }}>
                    {naira(open.price)}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {open.description}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Add to your order</span>
                <Control
                  id={open.id}
                  name={open.name}
                  price={open.price}
                  qty={qtyOf(open.id)}
                  setQty={setQty}
                  big
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Avatar({ image }: { image?: SanityImage }) {
  if (image?.asset?._ref) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={urlForImage(image).width(112).height(112).url()}
        alt=""
        className="size-14 shrink-0 rounded-lg object-cover"
      />
    );
  }
  return (
    <span
      className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg"
      style={{ background: `linear-gradient(135deg, ${ACCENT}26, transparent)` }}
    >
      <ImageIcon className="size-5 text-muted-foreground/40" />
    </span>
  );
}

function Control({
  id,
  name,
  price,
  qty,
  setQty,
  stop,
  big,
}: {
  id: string;
  name: string;
  price?: number;
  qty: number;
  setQty: SetQty;
  stop?: boolean;
  big?: boolean;
}) {
  if (qty === 0) {
    return (
      <button
        type="button"
        aria-label={`Add ${name}`}
        onClick={(e) => {
          if (stop) e.stopPropagation();
          setQty(id, name, 1, price);
        }}
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand font-heading text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white",
          big ? "px-5 py-2.5" : "px-3.5 py-2",
        )}
      >
        Add <Plus className="size-4" />
      </button>
    );
  }
  return (
    <div
      onClick={(e) => {
        if (stop) e.stopPropagation();
      }}
      className={cn("flex shrink-0 items-center rounded-full bg-muted p-1", big ? "gap-3" : "gap-2")}
    >
      <button
        type="button"
        aria-label={`Remove one ${name}`}
        onClick={(e) => {
          if (stop) e.stopPropagation();
          setQty(id, name, qty - 1, price);
        }}
        className={cn("grid place-items-center rounded-full bg-card text-foreground", big ? "size-9" : "size-8")}
      >
        <Minus className="size-4" />
      </button>
      <span className={cn("text-center font-bold tabular-nums", big ? "w-6 text-base" : "w-5 text-sm")}>
        {qty}
      </span>
      <button
        type="button"
        aria-label={`Add one ${name}`}
        onClick={(e) => {
          if (stop) e.stopPropagation();
          setQty(id, name, qty + 1, price);
        }}
        className={cn("grid place-items-center rounded-full bg-brand text-white", big ? "size-9" : "size-8")}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
