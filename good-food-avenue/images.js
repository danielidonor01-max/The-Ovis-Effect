/**
 * GOOD FOOD AVENUE — IMAGE CONFIGURATION
 * 
 * To swap any image: change the file path in the dictionary below.
 * Ensure you maintain the quotation marks. No need to touch the HTML!
 */

const GFA_IMAGES = {
  // --- HERO IMAGE ---
  hero:          "../assets/images/food/hero.jpg",

  // --- GRILLS SECTION ---
  asun:          "../assets/images/food/asun.jpg",
  turkey_wings:  "../assets/images/food/turkey-wings.jpg",
  chicken:       "../assets/images/food/chicken.jpg",

  // --- SOUPS & SWALLOWS ---
  egusi_soup:    "../assets/images/food/egusi-soup.jpg",
  
  // --- RICE DISHES ---
  rice_dishes:   "../assets/images/food/rice-dishes.jpg",

  // --- DRINKS ---
  fruit_drink_1: "../assets/images/food/drinks/drink-1.jpg",
  fruit_drink_2: "../assets/images/food/drinks/drink-2.jpg",
};

// --- AUTOMATIC IMAGE INJECTION LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const heroEl = document.querySelector('.gfa-hero');
    if(heroEl && GFA_IMAGES.hero) {
        heroEl.style.backgroundImage = `linear-gradient(180deg, rgba(13,26,13,0.8) 0%, rgba(13,26,13,1) 100%), url('${GFA_IMAGES.hero}')`;
    }

    document.querySelectorAll('[data-img-key]').forEach(el => {
        const key = el.getAttribute('data-img-key');
        if(GFA_IMAGES[key]) {
            el.src = GFA_IMAGES[key];
        } else {
            // Keep a nice fallback background if image path is broken/missing
            el.style.backgroundColor = '#152015';
            el.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; 
        }
    });
});
