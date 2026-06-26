import type { StructureResolver } from "sanity/structure";
import {
  CogIcon,
  HomeIcon,
  DocumentIcon,
  TagIcon,
  BasketIcon,
  ImagesIcon,
  UserIcon,
  BillIcon,
} from "@sanity/icons";

// A tidy, sectioned Studio: Site Settings · Page Heroes · Food Menu · Galleries.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage")
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("homepage")
            .title("Homepage"),
        ),

      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),

      S.divider(),

      S.listItem()
        .title("Page Heroes")
        .icon(DocumentIcon)
        .child(
          S.documentTypeList("pageHero")
            .title("Page Heroes")
            .filter('_type == "pageHero" && page != "home"'),
        ),

      S.listItem()
        .title("Founder / Leadership")
        .icon(UserIcon)
        .child(
          S.document()
            .schemaType("founder")
            .documentId("founder")
            .title("Founder / Leadership"),
        ),

      S.listItem()
        .title("Spa — Pricing CTA")
        .icon(BillIcon)
        .child(
          S.document()
            .schemaType("spaPricing")
            .documentId("spaPricing")
            .title("Spa — Pricing CTA"),
        ),

      S.divider(),

      S.listItem()
        .title("Food Menu — Categories")
        .icon(TagIcon)
        .child(
          S.documentTypeList("menuCategory")
            .title("Categories")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .title("Food Menu — Items")
        .icon(BasketIcon)
        .child(
          S.documentTypeList("menuItem")
            .title("Items")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),

      S.divider(),

      S.listItem()
        .title("Galleries & Images")
        .icon(ImagesIcon)
        .child(
          S.list()
            .title("Galleries & Images")
            .items([
              galleryItem(S, "Spa — Therapy categories (4, in order)", "gallery-spa-therapies"),
              galleryItem(S, "Spa — Gallery", "gallery-spa-gallery"),
              galleryItem(S, "Safe Haven — Gallery (up to 10)", "gallery-safe-haven-gallery"),
              galleryItem(S, "Finance — Hero customer avatars (up to 5)", "gallery-finance-avatars"),
            ]),
        ),
    ]);

// A named, always-present gallery editor (auto-creates the doc on first open).
function galleryItem(
  S: Parameters<StructureResolver>[0],
  title: string,
  id: string,
) {
  return S.listItem()
    .title(title)
    .icon(ImagesIcon)
    .child(S.document().schemaType("gallery").documentId(id).title(title));
}
