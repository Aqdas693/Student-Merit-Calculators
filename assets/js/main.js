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

  // 2. Mobile navigation toggle & keyboard accessibility
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    const closeNav = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('nav-open');
    };

    const openNav = () => {
      navToggle.setAttribute('aria-expanded', 'true');
      siteNav.classList.add('nav-open');
    };

    navToggle.addEventListener('click', () => {
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

    // Close when navigating via a link inside the menu
    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (siteNav.classList.contains('nav-open')) {
          closeNav();
        }
      });
    });

    // Close mobile nav if resized to desktop breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && siteNav.classList.contains('nav-open')) {
        closeNav();
      }
    });
  }

  console.log('PakStudentTools base scripts initialized.');
});
