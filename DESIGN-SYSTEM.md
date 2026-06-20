# The Ovis Effect — Design System

Warm‑premium, **theme‑based** design language for the hub and all four brand pages.
Light is the default; dark is opt‑in and persisted. This document is the source of
truth for the redesign. Components reference **semantic tokens** — never raw hex.

> Status: **Milestone 1 (Foundation)** complete — tokens, theming, shell, and hub.
> Brand pages (GFA, Spa, Finance, Safe Haven) and Contact migrate in later milestones.

---

## 1. Principles

1. **Warm premium, evolved.** Keep the orange / deep‑sea brand soul; tighten spacing,
   type, and components. Calm and confident, not loud.
2. **Content first.** No preloader, ambient blobs, audio, or cursor FX. Motion is
   limited to cheap, meaningful micro‑interactions.
3. **Token‑driven theming.** One semantic layer drives both light and dark. Pages
   never hardcode surface/text colors — that's what makes dark mode "just work."
4. **Accessible by default.** AA contrast, visible focus rings, `prefers-reduced-motion`
   respected, 44px+ touch targets.

---

## 2. Token architecture (`src/styles/global.css`)

Three layers, in cascade order:

```
1) PRIMITIVES      raw brand constants — never themed
2) SEMANTIC        surface/text/border roles — LIGHT defaults in :root
3) DARK OVERRIDES  :root[data-theme="dark"] re-points the semantic roles
```

### Primitives (theme‑agnostic)
| Token | Value | Use |
|---|---|---|
| `--color-mirage` | `#16232A` | deep brand ink |
| `--color-blaze-orange` | `#FF5B04` | signature accent |
| `--color-deep-sea` | `#125C54` | secondary brand |
| `--color-wild-sand` | `#F5F6F6` | warm off‑white |
| `--orange-soft` | `rgba(255,91,4,.08)` | hover/wash |
| `--orange-ring` | `rgba(255,91,4,.45)` | focus glow |

### Semantic roles (light default → dark override)
| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg-primary` | `#F5F6F6` | `#0F171C` | page background |
| `--bg-secondary` | `#FFFFFF` | `#16232A` | cards, header, footer, stats |
| `--surface-raised` | `#FFFFFF` | `#1C2C34` | elevated panels |
| `--surface-sunken` | `#EFF1F1` | `#0B1216` | inputs, insets, placeholders |
| `--text-primary` | `#16232A` | `#EEF1F2` | body / headings |
| `--text-muted` | `#6B7B85` | `#9BAAB2` | secondary text |
| `--border-color` | `rgba(22,35,42,.08)` | `rgba(245,246,246,.12)` | hairlines |
| `--border-strong` | `rgba(22,35,42,.16)` | `rgba(245,246,246,.22)` | stronger dividers |
| `--color-accent` | `#FF5B04` | `#FF6A1A` | CTA / accent |
| `--color-on-accent` | `#16232A` | `#16232A` | text **on** orange (AA) |
| `--shadow-sm/md/lg` | light tints | deep blacks | elevation scale |
| `--selection-bg/fg` | mirage/sand | orange/ink | text selection |
| `--scrollbar-thumb[-hover]` | mirage tints | sand tints | custom scrollbar |

> **On‑accent rule:** orange buttons use **dark** text (`--color-on-accent` = mirage),
> not white. White on `#FF5B04` fails AA for small text (~3:1); mirage passes (~5:1).

Brand alias tokens (`--color-hub-*`, `--color-gfa-*`, `--color-spa-*`, `--color-sh-*`,
`--color-fin-*`) still exist and point at the semantic roles, so they flip with the
theme automatically. The ~6k lines of existing page CSS keep working unchanged.

---

## 3. Type, spacing, radius, motion

- **Fonts:** `Syne` (display/headings), `Inter` (body), `Cormorant Garamond` &
  `Fraunces` (brand serifs). Loaded once in `BaseLayout.astro`.
- **Type scale:** `--text-xs … --text-7xl` (0.75rem → 4.5rem).
- **Spacing:** 8‑point grid `--space-05 … --space-16` + `--space-section` / `--space-macro`.
- **Radius:** `--radius-sm 4 · md 8 · lg 16 · xl 24 · 2xl 40 · full 9999`.
- **Transitions:** `--transition-fast 150ms · base 250ms · slow 400ms · premium 300ms`,
  plus `--transition-theme` for the light/dark cross‑fade.
- **Kept motion:** scroll‑progress bar, `[data-reveal]` scroll reveal, stat count‑up,
  unified button press (`:active` scale). All gated by `prefers-reduced-motion`.
- **Removed motion:** preloader/iris intro, ambient blobs, ambient audio, hero
  mouse‑spotlight.

---

## 4. Theming — how it works

- **Default:** light (no attribute on `<html>`). Dark = `<html data-theme="dark">`.
- **No flash:** an inline `<script is:inline>` in `<head>` applies the saved choice
  from `localStorage['ovis-theme']` **before paint**, and re‑applies on
  `astro:after-swap` (so view transitions don't lose it).
- **Toggle:** the `.theme-toggle` button (sun/moon) in the header. Logic in
  `src/scripts/main.js` flips `data-theme`, persists to `localStorage`, updates the
  `theme-color` meta, and sets `aria-pressed`.
- **System preference:** light is the deliberate default; we do **not** auto‑switch to
  the OS dark setting. Only an explicit toggle persists. (Change in `main.js` +
  the head script if you later want to honor `prefers-color-scheme`.)
- `color-scheme` is set per theme so native form controls/scrollbars match.

---

## 5. Component conventions

- **Buttons / CTAs:** pill geometry (`--radius-full`), one house press animation.
  Primary = orange with `--color-on-accent` text; one primary CTA per screen.
- **Cards:** `--bg-secondary` surface, `--border-color` hairline, `--shadow-sm`
  at rest → `--shadow-lg` on hover.
- **Header:** transparent → solid `--bg-secondary` on scroll; auto‑hide on scroll‑down.
- **Icons:** inline SVG (Lucide geometry), `currentColor`, consistent stroke width.
  No emoji as icons.

---

## 6. Building a page (dark‑mode audit checklist)

When migrating a brand page, replace any hardcoded colors so it themes correctly:

- `#FFFFFF` / `#fff` surfaces → `--bg-secondary` or `--surface-raised`
- light placeholder greys (`#E3E6E8`, `--color-wild-sand` as a surface) → `--surface-sunken`
- dark text hexes / `#000` → `--text-primary` or `--color-on-accent`
- raw shadows `rgba(22,35,42,…)` → `--shadow-sm/md/lg`
- borders → `--border-color` / `--border-strong`
- Verify **both** themes at 375 / 768 / 1024 / 1440, with reduced‑motion on.
- Keep brand white‑on‑dark‑hero nav text as‑is (it sits over imagery), but ensure the
  **scrolled** nav state uses `--text-primary`.

---

## 7. Milestones

| # | Scope | Status |
|---|---|---|
| M1 | Foundation: tokens, theming, FX strip, shell + hub | ✅ done |
| M2 | Good Food Avenue | ☐ |
| M3 | Urovi Spa | ☐ |
| M4 | Financial Advisory | ☐ |
| M5 | Safe Haven | ☐ |
| M6 | Contact + final a11y/responsive/both‑theme pass | ☐ |
