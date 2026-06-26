import type { SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { homepage } from "./homepage";
import { pageHero } from "./pageHero";
import { founder } from "./founder";
import { spaPricing } from "./spaPricing";
import { menuCategory } from "./menuCategory";
import { menuItem } from "./menuItem";
import { gallery } from "./gallery";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  homepage,
  pageHero,
  founder,
  spaPricing,
  menuCategory,
  menuItem,
  gallery,
];
