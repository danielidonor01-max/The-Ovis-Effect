/**
 * The Ovis Effect - Global Script
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('global-header');
  
  if (header) {
    // Scroll effect for header
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Initial check on load in case page is loaded not at top
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    }
  }
});
