import { urlFor } from '../sanity/image';

/**
 * Builds a { dataImgKey: url } map from a brand document's Sanity images,
 * to be emitted as `window.__BRAND_IMAGES__` and injected client-side by the
 * page's images.js (which overlays these over the local placeholder paths).
 *
 * - `heroImage`  -> key "hero"
 * - `gallery[]`  -> keys "gallery_1", "gallery_2", … (or `gallerySlots` if given)
 */
interface FieldMap {
  /** brand document field holding an array of galleryImage */
  field: string;
  /** data-img-key for each array index, in order */
  slots: string[];
}

export function buildBrandImages(
  brandData: any,
  options: { gallerySlots?: string[]; extra?: FieldMap[] } = {}
): Record<string, string> {
  const map: Record<string, string> = {};
  const toUrl = (img: any) => urlFor(img).width(1600).quality(80).url();

  if (brandData?.heroImage?.asset) {
    map.hero = urlFor(brandData.heroImage).width(1600).quality(80).url();
  }

  const slots = options.gallerySlots;
  (brandData?.gallery ?? []).forEach((img: any, i: number) => {
    if (!img?.asset) return;
    const key = slots && slots[i] ? slots[i] : `gallery_${i + 1}`;
    map[key] = toUrl(img);
  });

  for (const { field, slots: fieldSlots } of options.extra ?? []) {
    (brandData?.[field] ?? []).forEach((img: any, i: number) => {
      if (!img?.asset || !fieldSlots?.[i]) return;
      map[fieldSlots[i]] = toUrl(img);
    });
  }

  return map;
}
