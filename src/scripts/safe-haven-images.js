/**
 * SAFE HAVEN — IMAGE CONFIGURATION
 *
 * When real photography is ready, add the file paths below.
 * The JS will automatically inject them into the placeholder boxes via [data-img-key] attributes.
 * Ensure all images are placed in /assets/images/safe-haven/
 */

const SAFE_HAVEN_IMAGES = {
  // --- HERO IMAGE ---
  hero: '../assets/images/safe-haven/hero.jpg',

  // --- GALLERY IMAGES ---
  gallery_1: '../assets/images/safe-haven/gallery-1.jpg',
  gallery_2: '../assets/images/safe-haven/gallery-2.jpg',
  gallery_3: '../assets/images/safe-haven/gallery-3.jpg',
  gallery_4: '../assets/images/safe-haven/gallery-4.jpg',
};

// --- AUTOMATIC IMAGE INJECTION ---
// Sanity-provided URLs (window.__BRAND_IMAGES__, emitted by the page) override
// the local fallbacks above, so editors can manage images from the CMS.
document.addEventListener('DOMContentLoaded', () => {
  // Sanity URLs (window.__BRAND_IMAGES__) override the local fallbacks; each
  // value is either a string path or { url, pos } where pos is the hotspot.
  const IMAGES = Object.assign({}, SAFE_HAVEN_IMAGES, window.__BRAND_IMAGES__ || {});
  document.querySelectorAll('[data-img-key]').forEach((el) => {
    const val = IMAGES[el.getAttribute('data-img-key')];
    if (!val) return;
    const url = typeof val === 'string' ? val : val.url;
    const pos = typeof val === 'string' ? 'center' : (val.pos || 'center');
    if (el.tagName === 'IMG') {
      el.src = url;
      el.style.objectFit = 'cover';
      el.style.objectPosition = pos;
    } else {
      el.style.backgroundImage = "url('" + url + "')";
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = pos;
      const icon = el.querySelector('svg');
      if (icon) icon.style.display = 'none';
    }
  });
});
