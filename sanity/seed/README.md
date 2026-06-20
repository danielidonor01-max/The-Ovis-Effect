# Seed — Good Food Avenue menu

Loads the 36 starter menu items (the list currently hard-coded in the GFA page)
into Sanity as `menuItem` documents, so the order builder reads them from the CMS.

## One-time seed

1. **Create a write token** — [sanity.io/manage](https://sanity.io/manage) → project
   **gorjnjxy** → **API** → **Tokens** → *Add token* → permission **Editor**.
2. **Run the seed** from the project root:

   **PowerShell**
   ```powershell
   $env:SANITY_WRITE_TOKEN="<your-token>"; npm run seed:menu
   ```
   **bash**
   ```bash
   SANITY_WRITE_TOKEN=<your-token> npm run seed:menu
   ```

It's **idempotent** — each item has a deterministic `_id` (`gfa-menu-<slug>`), so
re-running updates the same documents instead of duplicating them.

## After seeding

- Open **`/studio`** → **Menu Item — Good Food Avenue** to:
  - add a **Price (₦)** → the order bar + WhatsApp message then show a live total automatically,
  - add a **Photo** → it becomes the card avatar and the detail-modal image,
  - toggle **Available** off to hide an item,
  - set **Sort order** to arrange items within a category.
- The page prefers Sanity items; if the dataset has none (or the fetch fails) it
  falls back to the built-in list, so the site never breaks.

> CORS: if Studio can't reach the dataset, add your dev/prod origin under
> sanity.io/manage → API → CORS origins.
