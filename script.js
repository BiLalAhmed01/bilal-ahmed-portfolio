/* ═══════════════════════════════════════════════════════════════════
   BILAL AHMED PORTFOLIO — script.js
   Handles: cursor, nav, typewriter, scroll reveal, counters, form
═══════════════════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────
   CUSTOM CURSOR
────────────────────────────────────────── */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

if (window.matchMedia('(hover: hover)').matches) {
  let ringX = 0, ringY = 0, dotX = 0, dotY = 0;
  let raf;

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
    raf = requestAnimationFrame(animateRing);
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
   NAV — SCROLL GLASS + ACTIVE LINK
────────────────────────────────────────── */
const nav        = document.getElementById('nav');
const navLinks   = document.querySelectorAll('.nav-link');
const sections   = document.querySelectorAll('section[id]');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks   = document.querySelectorAll('.mob-link');

// Scroll-glassed nav
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveLink();
}, { passive: true });

// Active nav link based on scroll position
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
    target.scrollIntoView({ behavior: 'smooth' });
    // Close mobile menu if open
    if (mobileMenu.classList.contains('open')) closeMobileMenu();
  });
});

// Hamburger toggle
function openMobileMenu() {
  mobileMenu.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
});

mobLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

/* ──────────────────────────────────────────
   TYPEWRITER — HERO ROLES
────────────────────────────────────────── */
const roles = [
  'Web Developer',
  'AI Automation Specialist',
  'Full Stack Developer',
  'AI Engineer',
  'Workflow Automation Expert',
  'AI Agent Developer'
];

const typeEl = document.getElementById('typewriter');
let roleIndex = 0, charIndex = 0, deleting = false, typeTimeout;

function type() {
  const current = roles[roleIndex];
  const speed = deleting ? 40 : 90;

  if (!deleting) {
    typeEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      typeTimeout = setTimeout(type, 2000);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  typeTimeout = setTimeout(type, speed);
}

// Start after hero reveal
setTimeout(type, 800);

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
document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
  setTimeout(() => el.classList.add('visible'), i * 150);
});

/* ──────────────────────────────────────────
   COUNTER ANIMATION — ABOUT STATS
────────────────────────────────────────── */
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;

  const firstStat = statNumbers[0];
  const rect = firstStat.getBoundingClientRect();
  if (rect.top > window.innerHeight) return;

  countersAnimated = true;
  statNumbers.forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + (target >= 10 ? '+' : '+');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

window.addEventListener('scroll', animateCounters, { passive: true });

/* ──────────────────────────────────────────
   CONTACT FORM — SUBMIT HANDLER
────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const span = btn.querySelector('span');
  const original = span.textContent;

  // Simulate sending
  btn.disabled = true;
  btn.style.opacity = '0.7';
  span.textContent = 'Sending...';

  setTimeout(() => {
    span.textContent = '✓ Message Sent!';
    btn.style.background = '#22c55e';
    btn.style.boxShadow = '0 0 30px rgba(34,197,94,0.3)';
    contactForm.reset();

    setTimeout(() => {
      span.textContent = original;
      btn.disabled = false;
      btn.style.opacity = '';
      btn.style.background = '';
      btn.style.boxShadow = '';
    }, 3000);
  }, 1200);
});

/* ──────────────────────────────────────────
   SKILL PILLS — STAGGER ON REVEAL
────────────────────────────────────────── */
const skillGroups = document.querySelectorAll('.skills-group');

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const pills = entry.target.querySelectorAll('.pill');
    pills.forEach((pill, i) => {
      pill.style.opacity = '0';
      pill.style.transform = 'translateY(12px)';
      pill.style.transition = `opacity 0.4s ease ${i * 50}ms, transform 0.4s ease ${i * 50}ms`;
      requestAnimationFrame(() => {
        setTimeout(() => {
          pill.style.opacity = '';
          pill.style.transform = '';
        }, 10);
      });
    });
    skillObserver.unobserve(entry.target);
  });
}, { threshold: 0.2 });

skillGroups.forEach(g => skillObserver.observe(g));

/* ──────────────────────────────────────────
   AMBIENT ORBS — SUBTLE MOUSE PARALLAX
────────────────────────────────────────── */
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');
const orb3 = document.querySelector('.orb-3');

let mouseX = 0, mouseY = 0;
let orbRaf;

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 30;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
  }, { passive: true });

  function moveOrbs() {
    if (orb1) orb1.style.transform = `translate(${mouseX * 0.5}px, ${mouseY * 0.5}px)`;
    if (orb2) orb2.style.transform = `translate(${-mouseX * 0.3}px, ${-mouseY * 0.3}px)`;
    if (orb3) orb3.style.transform = `translate(${mouseX * 0.2}px, ${mouseY * 0.2}px)`;
    orbRaf = requestAnimationFrame(moveOrbs);
  }
  moveOrbs();
}

/* ──────────────────────────────────────────
   PROJECT CARDS — TILT EFFECT (desktop)
────────────────────────────────────────── */
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-6px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      setTimeout(() => card.style.transition = '', 500);
    });
  });
}

/* ──────────────────────────────────────────
   SECTION ACTIVE GLOW — AMBIENT SHIFT
────────────────────────────────────────── */
const orbs = document.querySelectorAll('.orb');
let lastSection = '';

const sectionGlowObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.id !== lastSection) {
      lastSection = entry.target.id;
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionGlowObserver.observe(s));

/* ──────────────────────────────────────────
   INPUT LABEL FLOAT ANIMATION
────────────────────────────────────────── */
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    input.parentElement.classList.remove('focused');
  });
});

/* ──────────────────────────────────────────
   INIT — ENSURE NAV IS CORRECT ON LOAD
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateActiveLink();
  animateCounters();
});
