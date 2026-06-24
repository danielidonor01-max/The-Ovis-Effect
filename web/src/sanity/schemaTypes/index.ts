import type { SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { pageHero } from "./pageHero";
import { founder } from "./founder";
import { menuCategory } from "./menuCategory";
import { menuItem } from "./menuItem";
import { gallery } from "./gallery";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  pageHero,
  founder,
  menuCategory,
  menuItem,
  gallery,
];
