/**
 * GOOD FOOD AVENUE — IMAGE CONFIGURATION
 *
 * When real photography is ready, add the file paths below.
 * The JS will automatically inject them into the placeholder boxes via [data-img-key] attributes.
 * Ensure all images are placed in /assets/images/food/
 */

const GFA_IMAGES = {
  // --- HERO IMAGE ---
  hero: '../assets/images/food/hero.jpg',

  // --- CATEGORY IMAGES (matches data-img-key on each .placeholder-box) ---
  main_meal:      '../assets/images/food/main-meal.jpg',
  soups_stews:    '../assets/images/food/soups-stews.jpg',
  proteins:       '../assets/images/food/proteins.jpg',
  snacks_drinks:  '../assets/images/food/snacks-drinks.jpg',
  side_dishes:    '../assets/images/food/side-dishes.jpg',
};

// --- AUTOMATIC IMAGE INJECTION ---
// Replaces placeholder boxes with real images once file paths above are populated.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-img-key]').forEach(el => {
    const key = el.getAttribute('data-img-key');
    if (GFA_IMAGES[key]) {
      el.style.backgroundImage = `url('${GFA_IMAGES[key]}')`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
    }
  });
});
