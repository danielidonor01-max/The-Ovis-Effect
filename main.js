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

  // --- Theme Toggle Logic ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // 1. Check local storage
  const savedTheme = localStorage.getItem('ovis-theme');
  if (savedTheme) {
      htmlElement.setAttribute('data-theme', savedTheme);
  } else {
      // 2. Check system preference
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      if (prefersLight) {
          htmlElement.setAttribute('data-theme', 'light');
      }
  }

  if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
          const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          htmlElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('ovis-theme', newTheme);
      });
  }
});
