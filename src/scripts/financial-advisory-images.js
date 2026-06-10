/**
 * FINANCIAL ADVISORY — IMAGE CONFIGURATION
 */

const FIN_IMAGES = {
    // --- HERO IMAGE ---
    hero: "../assets/images/finance/hero-finance.jpg"
};

document.addEventListener('astro:page-load', () => {
  // Sanity URLs (window.__BRAND_IMAGES__) override the local fallbacks; each
  // value is either a string path or { url, pos } where pos is the hotspot.
  const IMAGES = Object.assign({}, FIN_IMAGES, window.__BRAND_IMAGES__ || {});
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
