/**
 * The Ovis Effect - Global Script
 */

document.addEventListener('astro:page-load', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Detect both .global-header and .unified-nav (sub-brand pages use the latter)
  const header = document.getElementById('global-header');

  let lastScrollY = window.scrollY;
  const HIDE_THRESHOLD = 80; // px scrolled before auto-hide kicks in

  const handleScroll = () => {
    const nav = header; // works for both nav types since they share the same id
    if (!nav) return;

    const currentY = window.scrollY;

    // Scrolled state — white background
    if (currentY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Auto-hide: only trigger past the threshold to avoid flickering at top
    if (currentY > HIDE_THRESHOLD) {
      if (currentY > lastScrollY) {
        // Scrolling DOWN — hide
        nav.classList.add('nav-hidden');
      } else {
        // Scrolling UP — reveal
        nav.classList.remove('nav-hidden');
      }
    } else {
      nav.classList.remove('nav-hidden');
    }

    lastScrollY = currentY <= 0 ? 0 : currentY;
  };

  // --- Scroll progress indicator ---
  const progressBar = document.getElementById('scroll-progress');
  const updateScrollProgress = () => {
    if (!progressBar) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const ratio = max > 0 ? doc.scrollTop / max : 0;
    progressBar.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
  };

  // rAF-throttle: run nav + progress logic at most once per frame
  let navScrollTicking = false;
  window.addEventListener('scroll', () => {
    if (navScrollTicking) return;
    navScrollTicking = true;
    requestAnimationFrame(() => { handleScroll(); updateScrollProgress(); navScrollTicking = false; });
  }, { passive: true });
  handleScroll(); // Run once on load
  updateScrollProgress();

  // --- Magic Cursor Tracking ---
  const cursor = document.querySelector('.magic-cursor');

  document.addEventListener('mousemove', (e) => {
    if (!cursor) return;
    
    // Only show cursor if we are within the hero section
    const isWithinHero = e.target.closest('.hub-hero, .gfa-hero-viewport, .spa-hero-viewport, .fin-hero-viewport, .sh-hero-viewport');
    
    if (isWithinHero) {
      cursor.classList.add('active');
    } else {
      cursor.classList.remove('active');
    }

    // Move cursor with a tiny bit of smoothing via CSS transition
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    // Interaction scaling (only if within hero)
    if (isWithinHero) {
      const isHoverable = e.target.closest('h1, .gold-text, a, button');
      if (isHoverable) {
        cursor.classList.add('hovering');
      } else {
        cursor.classList.remove('hovering');
      }
    }
  });

  // --- Hero Mouse Interaction (Spotlight) ---
  const heroes = document.querySelectorAll('.hub-hero, .gfa-hero-viewport, .spa-hero-viewport, .fin-hero-viewport, .sh-hero-viewport');
  heroes.forEach(h => {
    h.addEventListener('mousemove', (e) => {
      const rect = h.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Update CSS variables for the spotlight effect
      h.style.setProperty('--mouse-x', `${x}%`);
      h.style.setProperty('--mouse-y', `${y}%`);
    });
  });

  // --- Global Hub Mobile Menu Logic ---
  const mobileMenuBtns = document.querySelectorAll('.mobile-menu-btn');
  mobileMenuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
    });
  });

  // --- Nav Modal Logic ---
  const menuToggles = document.querySelectorAll('.menu-toggle');
  const modalClose = document.querySelector('.modal-close');
  const navModal = document.getElementById('nav-modal');
  const modalBackdrop = document.querySelector('.nav-modal-backdrop');

  const openModal = () => {
    if (navModal) {
      navModal.classList.add('open');
      navModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  };

  const closeModal = () => {
    if (navModal) {
      navModal.classList.remove('open');
      navModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  menuToggles.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  // Close modal when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navModal && navModal.classList.contains('open')) {
      closeModal();
    }
  });

  // Close modal when a link inside is clicked (for fast anchor jumps)
  if (navModal) {
    const modalLinks = navModal.querySelectorAll('a');
    modalLinks.forEach(link => {
      link.addEventListener('click', closeModal);
    });
  }

  // ── Scroll-Reveal: IntersectionObserver ────────────────────────────────────
  // Watches every [data-reveal] element; adds .is-visible when 15% in viewport
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Unobserve after first reveal — animation only plays once
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    revealObserver.observe(el);
  });

  // ── Stats Count-Up Animation ───────────────────────────────────────────────
  // Animates numeric stat counters when they scroll into view

  /**
   * Eases a value from 0 to target over a given duration.
   * @param {HTMLElement} el - The element to update
   * @param {number} target - The final numeric value
   * @param {number} duration - Animation duration in ms
   * @param {string} suffix - Text appended after the number (e.g. "+")
   * @param {number} pad - Zero-pad to this many digits (e.g. 2 → "04")
   */
  function animateCount(el, target, duration, suffix = '', pad = 0) {
    const start = performance.now();

    const easeOutQuad = (t) => t * (2 - t);

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);
      const current = Math.round(eased * target);
      const display = pad > 0
        ? String(current).padStart(pad, '0') + suffix
        : current + suffix;
      el.textContent = display;
      
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Enforce final target state to avoid rounding issues
        el.textContent = (pad > 0 ? String(target).padStart(pad, '0') : target) + suffix;
      }
    };

    requestAnimationFrame(tick);
  }

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.querySelectorAll('.stat-number[data-count]').forEach((el) => {
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const pad    = parseInt(el.dataset.pad || '0', 10);
          // Reduced motion: snap straight to the final value, no counting
          if (prefersReducedMotion) {
            el.textContent = (pad > 0 ? String(target).padStart(pad, '0') : target) + suffix;
            return;
          }
          // Longer duration for smaller numbers to feel weighty
          const duration = target <= 10 ? 800 : target <= 100 ? 1200 : 1600;
          el.textContent = pad > 0 ? '0'.repeat(pad) : '0';
          animateCount(el, target, duration, suffix, pad);
        });

        // Text-only stats (e.g. "10k+") — just snap in, no counting needed
        entry.target.querySelectorAll('.stat-number[data-count-text]').forEach((el) => {
          el.textContent = el.dataset.countText;
        });

        statObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
  );

  const statsSections = document.querySelectorAll('.stats-bar, .fin-stats-bar');
  statsSections.forEach(sys => statObserver.observe(sys));

  // ── Text Scrub (Opacity on Scroll) ──────────────────────────────────────────
  const scrubTextElements = document.querySelectorAll('.text-scrub');
  if (scrubTextElements.length > 0) {
    // 1. Wrap words in spans
    scrubTextElements.forEach(el => {
      // Split text node, wrap in span
      const words = el.innerText.trim().split(/\s+/);
      el.innerHTML = words.map(word => `<span class="scrub-word" style="opacity: 0.2; transition: opacity 0.1s ease-out;">${word}</span>`).join(' ');
    });

    // 2. Track scroll progress
    const handleScrubScroll = () => {
      const windowHeight = window.innerHeight;
      
      scrubTextElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // The scrub effect should start when the element enters the bottom 20% of viewport
        // And finish when it reaches the middle of the viewport
        const startTrigger = windowHeight * 0.8; 
        const endTrigger = windowHeight * 0.4;
        
        let progress = (startTrigger - rect.top) / (startTrigger - endTrigger);
        progress = Math.max(0, Math.min(1, progress));

        const words = el.querySelectorAll('.scrub-word');
        words.forEach((word, index) => {
           // We want words to scrub sequentially based on progress
           const startAt = index / words.length;
           const endAt = (index + 1) / words.length;
           
           if (progress <= startAt) {
               word.style.opacity = 0.2;
           } else if (progress >= endAt) {
               word.style.opacity = 1;
           } else {
               const wordProgress = (progress - startAt) / (endAt - startAt);
               word.style.opacity = 0.2 + (0.8 * wordProgress);
           }
        });
      });
    };

    if (prefersReducedMotion) {
      // No scroll-scrub for reduced-motion users — show the text fully lit
      document.querySelectorAll('.scrub-word').forEach((w) => { w.style.opacity = '1'; });
    } else {
      // rAF-throttle the scrub so getBoundingClientRect reads happen once per frame
      let scrubTicking = false;
      window.addEventListener('scroll', () => {
        if (scrubTicking) return;
        scrubTicking = true;
        requestAnimationFrame(() => { handleScrubScroll(); scrubTicking = false; });
      }, { passive: true });
      handleScrubScroll(); // Initialize on load
    }
  }

});
