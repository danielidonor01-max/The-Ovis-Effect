import type { StructureResolver } from "sanity/structure";
import {
  CogIcon,
  DocumentIcon,
  TagIcon,
  BasketIcon,
  ImagesIcon,
} from "@sanity/icons";

// A tidy, sectioned Studio: Site Settings · Page Heroes · Food Menu · Galleries.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
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
        .child(S.documentTypeList("pageHero").title("Page Heroes")),

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
        .child(S.documentTypeList("gallery").title("Galleries")),
    ]);
