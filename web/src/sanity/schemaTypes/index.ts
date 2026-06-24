import type { SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { pageHero } from "./pageHero";
import { menuCategory } from "./menuCategory";
import { menuItem } from "./menuItem";
import { gallery } from "./gallery";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  pageHero,
  menuCategory,
  menuItem,
  gallery,
];
