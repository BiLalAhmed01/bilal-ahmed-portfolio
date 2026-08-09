/* ═══════════════════════════════════════════════════════════════════
   BILAL AHMED PORTFOLIO — script.js
   Handles: cursor, nav, mobile menu, scroll reveal, hover interactions
═══════════════════════════════════════════════════════════════════ */

'use strict';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ──────────────────────────────────────────
   CUSTOM CURSOR
────────────────────────────────────────── */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

if (window.matchMedia('(hover: hover)').matches && !prefersReducedMotion) {
  let ringX = 0, ringY = 0, dotX = 0, dotY = 0;

  document.addEventListener('mousemove', e => {
    dotX = e.clientX;
    dotY = e.clientY;
    cursorDot.style.left  = dotX + 'px';
    cursorDot.style.top   = dotY + 'px';
  });

  function animateRing() {
    ringX += (dotX - ringX) * 0.12;
    ringY += (dotY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity  = '0';
    cursorRing.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity  = '1';
    cursorRing.style.opacity = '1';
  });
}

/* ──────────────────────────────────────────
   NAV — SCROLL SURFACE + ACTIVE LINK
────────────────────────────────────────── */
const nav        = document.getElementById('nav');
const navLinks   = document.querySelectorAll('.nav-link');
const sections   = document.querySelectorAll('section[id]');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks   = document.querySelectorAll('.mob-link');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveLink();
}, { passive: true });

function updateActiveLink() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}
updateActiveLink();

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    if (mobileMenu.classList.contains('open')) closeMobileMenu();
  });
});

/* ──────────────────────────────────────────
   MOBILE MENU — FOCUS TRAP, ESCAPE, ARIA
────────────────────────────────────────── */
let lastFocusedBeforeMenu = null;

function getFocusableMenuItems() {
  return Array.from(mobileMenu.querySelectorAll('a[href]'));
}

function openMobileMenu() {
  lastFocusedBeforeMenu = document.activeElement;
  mobileMenu.classList.add('open');
  mobileMenu.removeAttribute('inert');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';

  const items = getFocusableMenuItems();
  if (items.length) items[0].focus();

  document.addEventListener('keydown', handleMenuKeydown);
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('inert', '');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';

  document.removeEventListener('keydown', handleMenuKeydown);

  if (lastFocusedBeforeMenu) lastFocusedBeforeMenu.focus();
}

function handleMenuKeydown(e) {
  if (e.key === 'Escape') {
    e.preventDefault();
    closeMobileMenu();
    return;
  }
  if (e.key === 'Tab') {
    const items = getFocusableMenuItems();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
});

mobLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

/* ──────────────────────────────────────────
   SCROLL REVEAL — INTERSECTION OBSERVER
────────────────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Trigger hero elements immediately
document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach((el, i) => {
  setTimeout(() => el.classList.add('visible'), i * 150);
});

/* ──────────────────────────────────────────
   AMBIENT ORBS — SUBTLE MOUSE PARALLAX
────────────────────────────────────────── */
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');
const orb3 = document.querySelector('.orb-3');

let mouseX = 0, mouseY = 0;

if (window.matchMedia('(hover: hover)').matches && !prefersReducedMotion) {
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 30;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
  }, { passive: true });

  function moveOrbs() {
    if (orb1) orb1.style.transform = `translate(${mouseX * 0.5}px, ${mouseY * 0.5}px)`;
    if (orb2) orb2.style.transform = `translate(${-mouseX * 0.3}px, ${-mouseY * 0.3}px)`;
    if (orb3) orb3.style.transform = `translate(${mouseX * 0.2}px, ${mouseY * 0.2}px)`;
    requestAnimationFrame(moveOrbs);
  }
  moveOrbs();
}

/* ──────────────────────────────────────────
   INIT — ENSURE NAV IS CORRECT ON LOAD
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateActiveLink();
});
