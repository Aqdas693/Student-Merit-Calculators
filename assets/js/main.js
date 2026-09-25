/**
 * Pakistani Student Calculator Tools - Shared JavaScript
 * Lightweight, vanilla JS utilities (No external dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Automatically update copyright year if placeholder exists
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. Seamless dual-environment link support (file:/// and http/https)
  // When running locally via file://, automatically rewrites any root-relative paths
  // to portable relative paths so local offline browsing never hits ERR_FILE_NOT_FOUND.
  if (window.location.protocol === 'file:') {
    const isSubdir = window.location.pathname.replace(/\\/g, '/').includes('/calculators/');
    const prefix = isSubdir ? '../../' : '';
    document.querySelectorAll('a[href^="/"]').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === '/') {
        link.setAttribute('href', prefix + 'index.html');
      } else if (href.startsWith('/calculators/')) {
        const parts = href.split('/').filter(Boolean);
        const calcFolder = parts[1] || '';
        link.setAttribute('href', (isSubdir ? '../' : 'calculators/') + calcFolder + '/index.html');
      } else if (href.startsWith('/')) {
        link.setAttribute('href', prefix + href.substring(1));
      }
    });
  }

  // 3. Mobile navigation toggle, full-screen overlay & body scroll lock
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    const lockBodyScroll = () => {
      document.documentElement.classList.add('nav-locked');
      document.body.classList.add('nav-locked');
    };

    const unlockBodyScroll = () => {
      document.documentElement.classList.remove('nav-locked');
      document.body.classList.remove('nav-locked');
    };

    const closeNav = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('nav-open');
      unlockBodyScroll();
    };

    const openNav = () => {
      navToggle.setAttribute('aria-expanded', 'true');
      siteNav.classList.add('nav-open');
      lockBodyScroll();
    };

    navToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && siteNav.classList.contains('nav-open')) {
        closeNav();
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', (event) => {
      if (siteNav.classList.contains('nav-open')) {
        const isClickInside = siteNav.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInside) {
          closeNav();
        }
      }
    });

    // Prevent background scrolling / bounce when touching outside the nav overlay
    document.addEventListener(
      'touchmove',
      (event) => {
        if (siteNav.classList.contains('nav-open')) {
          if (!siteNav.contains(event.target)) {
            event.preventDefault();
          }
        }
      },
      { passive: false }
    );

    // Handle clicks on nav links:
    // For hash links, close immediately.
    // For page navigation links, immediately release scroll lock so next page loads cleanly.
    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#')) {
          closeNav();
        } else {
          unlockBodyScroll();
          setTimeout(closeNav, 80);
        }
      });
    });

    // Close mobile nav if resized to desktop breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 820 && siteNav.classList.contains('nav-open')) {
        closeNav();
      }
    });

    // Reset scroll lock if user navigates back via browser bfcache
    window.addEventListener('pageshow', () => {
      unlockBodyScroll();
      if (siteNav.classList.contains('nav-open')) {
        closeNav();
      }
    });
  }

  // 3. Dismiss mobile virtual keyboard on scroll / touch drag
  // Automatically blurs focused numeric/text inputs when the user scrolls the page.
  let activeInput = null;
  let focusTimestamp = 0;
  let touchStartY = 0;
  let touchStartX = 0;

  const isDismissibleInput = (element) => {
    if (!element) return false;
    const tag = element.tagName;
    const type = (element.type || '').toLowerCase();
    const nonTextTypes = ['checkbox', 'radio', 'button', 'submit', 'reset', 'range', 'file', 'color', 'image'];
    return (tag === 'INPUT' && !nonTextTypes.includes(type)) || tag === 'TEXTAREA';
  };

  document.addEventListener('focusin', (event) => {
    if (isDismissibleInput(event.target)) {
      activeInput = event.target;
      focusTimestamp = Date.now();
    }
  });

  document.addEventListener('focusout', (event) => {
    if (activeInput === event.target) {
      activeInput = null;
    }
  });

  window.addEventListener(
    'touchstart',
    (event) => {
      if (event.touches && event.touches.length > 0) {
        touchStartY = event.touches[0].clientY;
        touchStartX = event.touches[0].clientX;
      }
    },
    { passive: true }
  );

  window.addEventListener(
    'touchmove',
    (event) => {
      if (!activeInput) return;
      if (event.touches && event.touches.length > 0) {
        const deltaY = Math.abs(event.touches[0].clientY - touchStartY);
        const deltaX = Math.abs(event.touches[0].clientX - touchStartX);
        // Only blur if movement exceeds threshold (prevents blurring on slight finger tap wiggle)
        if (deltaY > 10 || deltaX > 10) {
          activeInput.blur();
        }
      }
    },
    { passive: true }
  );

  window.addEventListener(
    'scroll',
    () => {
      if (!activeInput) return;
      // Allow 400ms grace period so automatic browser viewport scroll on input focus doesn't blur immediately
      if (Date.now() - focusTimestamp > 400) {
        activeInput.blur();
      }
    },
    { passive: true }
  );

  window.addEventListener(
    'wheel',
    (event) => {
      if (activeInput && Math.abs(event.deltaY) > 5) {
        activeInput.blur();
      }
    },
    { passive: true }
  );

  console.log('PakStudentTools base scripts initialized.');
});
