/**
 * UROVI SPA — IMAGE CONFIGURATION
 * 
 * To swap any image: change the file path in the dictionary below.
 */

const UROVI_IMAGES = {
  // --- HERO IMAGE ---
  hero:          "../assets/images/spa/hero-spa.jpg",

  // --- GALLERY IMAGES ---
  gallery_1:     "../assets/images/spa/gallery-1.jpg",
  gallery_2:     "../assets/images/spa/gallery-2.jpg",
  gallery_3:     "../assets/images/spa/gallery-3.jpg",
};

// --- AUTOMATIC IMAGE INJECTION LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const heroEl = document.querySelector('.spa-hero');
    if(heroEl && UROVI_IMAGES.hero) {
        // Soft warm overlay for the spa hero
        heroEl.style.backgroundImage = `linear-gradient(180deg, rgba(61, 35, 20, 0.4) 0%, rgba(61, 35, 20, 0.6) 100%), url('${UROVI_IMAGES.hero}')`;
    }

    document.querySelectorAll('[data-img-key]').forEach(el => {
        const key = el.getAttribute('data-img-key');
        if(UROVI_IMAGES[key]) {
            el.src = UROVI_IMAGES[key];
        } else {
            // Keep a nice fallback background if image path is broken/missing
            el.style.backgroundColor = '#F0EAE0';
            el.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; 
        }
    });
});
