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
// Replaces placeholder boxes with real images once file paths above are populated.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-img-key]').forEach(el => {
    const key = el.getAttribute('data-img-key');
    if (SAFE_HAVEN_IMAGES[key]) {
      el.style.backgroundImage = `url('${SAFE_HAVEN_IMAGES[key]}')`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
    }
  });
});
