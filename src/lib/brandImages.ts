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

/** A resolved image: CDN url + a CSS position derived from the Sanity hotspot. */
export interface BrandImage {
  url: string;
  /** background-position / object-position value from the editor's hotspot */
  pos: string;
}

/** Sanity hotspot ({x,y} 0–1) → CSS position string; falls back to centre. */
export function hotspotPos(img: any): string {
  const h = img?.hotspot;
  if (!h || typeof h.x !== 'number' || typeof h.y !== 'number') return 'center';
  return `${(h.x * 100).toFixed(1)}% ${(h.y * 100).toFixed(1)}%`;
}

export function buildBrandImages(
  brandData: any,
  options: { gallerySlots?: string[]; extra?: FieldMap[]; singles?: { field: string; slot: string }[] } = {}
): Record<string, BrandImage> {
  const map: Record<string, BrandImage> = {};
  const toImg = (img: any): BrandImage => ({
    url: urlFor(img).width(1600).quality(80).url(),
    pos: hotspotPos(img),
  });

  if (brandData?.heroImage?.asset) map.hero = toImg(brandData.heroImage);

  // Single named image fields (e.g. aboutPortrait -> "about_portrait")
  for (const { field, slot } of options.singles ?? []) {
    const img = brandData?.[field];
    if (img?.asset) map[slot] = toImg(img);
  }

  const slots = options.gallerySlots;
  (brandData?.gallery ?? []).forEach((img: any, i: number) => {
    if (!img?.asset) return;
    const key = slots && slots[i] ? slots[i] : `gallery_${i + 1}`;
    map[key] = toImg(img);
  });

  for (const { field, slots: fieldSlots } of options.extra ?? []) {
    (brandData?.[field] ?? []).forEach((img: any, i: number) => {
      if (!img?.asset || !fieldSlots?.[i]) return;
      map[fieldSlots[i]] = toImg(img);
    });
  }

  return map;
}
