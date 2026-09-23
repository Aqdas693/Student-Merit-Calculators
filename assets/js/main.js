/**
 * Pakistani Student Calculator Tools - Shared JavaScript
 * Lightweight, vanilla JS utilities (No external dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Automatically update copyright year if placeholder exists
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Mobile navigation toggle (if present)
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      siteNav.classList.toggle('nav-open');
    });
  }

  console.log('PakStudentTools base scripts initialized.');
});
