/**
 * UROVI SPA — IMAGE CONFIGURATION
 *
 * When real photography is ready, add the file paths below.
 * The JS will automatically inject them into the placeholder boxes via [data-img-key] attributes.
 */

const UROVI_IMAGES = {
  // --- HERO IMAGE ---
  hero:          "../assets/images/spa/hero.jpg",

  // --- OVERLAPPING DUO ---
  duo_back:      "../assets/images/spa/duo-back.jpg",
  duo_front:     "../assets/images/spa/duo-front.jpg",

  // --- SERVICE CARDS ---
  service_1:     "../assets/images/spa/service-1.jpg",
  service_2:     "../assets/images/spa/service-2.jpg",
  service_3:     "../assets/images/spa/service-3.jpg",
  service_4:     "../assets/images/spa/service-4.jpg",

  // --- GALLERY STRIP ---
  gallery_1:     "../assets/images/spa/gallery-1.jpg",
  gallery_2:     "../assets/images/spa/gallery-2.jpg",
  gallery_3:     "../assets/images/spa/gallery-3.jpg",
  gallery_4:     "../assets/images/spa/gallery-4.jpg",
  gallery_5:     "../assets/images/spa/gallery-5.jpg",
  gallery_6:     "../assets/images/spa/gallery-6.jpg",
};

// --- AUTOMATIC IMAGE INJECTION ---
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-img-key]').forEach(el => {
        const key = el.getAttribute('data-img-key');
        if(UROVI_IMAGES[key]) {
            // If it's an IMG tag
            if (el.tagName === 'IMG') {
                el.src = UROVI_IMAGES[key];
            } else {
                // If it's a div, use background-image
                el.style.backgroundImage = `url('${UROVI_IMAGES[key]}')`;
                el.style.backgroundSize = 'cover';
                el.style.backgroundPosition = 'center';
            }
        }
    });
});
