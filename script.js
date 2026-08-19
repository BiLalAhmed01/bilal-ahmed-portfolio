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
const nav            = document.getElementById('nav');
const navLinks       = document.querySelectorAll('.nav-link');
const sections       = document.querySelectorAll('section[id]');
const hamburger      = document.getElementById('hamburger');
const mobileMenu     = document.getElementById('mobileMenu');
const mobLinks       = document.querySelectorAll('.mob-link');
const scrollProgress = document.getElementById('scrollProgress');

let lastScrollY = window.scrollY;
let scrollTicking = false;

function handleScroll() {
  const y = window.scrollY;

  nav.classList.toggle('scrolled', y > 60);
  // Only recede once actually past the nav (avoids flicker right at top);
  // direction alone decides whether it recedes further or restores.
  if (y > nav.offsetHeight) {
    nav.classList.toggle('nav--receded', y > lastScrollY);
  } else {
    nav.classList.remove('nav--receded');
  }
  lastScrollY = y;

  if (scrollProgress) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(y / max, 1) : 0;
    scrollProgress.style.transform = `scaleX(${pct})`;
  }

  updateActiveLink();
  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(handleScroll);
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
handleScroll();

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

// Everything outside the menu (nav links, sections, footer) must be inert
// while the menu is open — otherwise it's still reachable by screen-reader
// navigation even though the Tab-key trap covers physical keyboard users.
// The hamburger button itself is left reachable so it can still close the menu.
// The certificate modal manages its own inert state independently (it may
// be open — e.g. opened, then the mobile menu somehow triggered — or
// simply closed already) and is skipped entirely here rather than having
// this function blindly remove its `inert` on restore.
function setOutsideInert(isInert) {
  const certModal = document.getElementById('certModal');
  Array.from(document.body.children).forEach(el => {
    if (el === mobileMenu || el === nav || el === certModal) return;
    if (isInert) el.setAttribute('inert', '');
    else el.removeAttribute('inert');
  });
  [document.getElementById('navLinks'), document.querySelector('.nav-cta')].forEach(el => {
    if (!el) return;
    if (isInert) el.setAttribute('inert', '');
    else el.removeAttribute('inert');
  });
}

function openMobileMenu() {
  lastFocusedBeforeMenu = document.activeElement;
  mobileMenu.classList.add('open');
  mobileMenu.removeAttribute('inert');
  setOutsideInert(true);
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
  setOutsideInert(false);
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
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .word-pull');

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
document.querySelectorAll('.hero .reveal-up, .hero .reveal-right, .hero .word-pull').forEach((el, i) => {
  setTimeout(() => el.classList.add('visible'), i * 150);
});

/* ──────────────────────────────────────────
   AMBIENT ORBS — SUBTLE MOUSE PARALLAX
────────────────────────────────────────── */
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');
const orb3 = document.querySelector('.orb-3');
const heroFlowDiagram = document.querySelector('.flow-diagram');

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
    // Hero visual: same rAF loop, capped well under the 6px ceiling.
    if (heroFlowDiagram) heroFlowDiagram.style.transform = `translate(${mouseX * 0.15}px, ${mouseY * 0.15}px)`;
    requestAnimationFrame(moveOrbs);
  }
  moveOrbs();
}

/* ──────────────────────────────────────────
   CONTACT FORM — VALIDATION + NETLIFY FORMS SUBMIT
   Submits via fetch to Netlify's form-handling endpoint (same mechanism
   as a native HTML form POST to "/", just without the page redirect) so
   delivery/email routing is Netlify's job — no API keys, no backend.
────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const submitBtn = document.getElementById('cfSubmit');
  const submitLabel = submitBtn.querySelector('.form-submit-label');
  const statusEl = document.getElementById('cfStatus');
  const honeypot = contactForm.querySelector('input[name="bot-field"]');

  const fields = {
    name: { input: document.getElementById('cfName'), error: document.getElementById('cfNameError') },
    email: { input: document.getElementById('cfEmail'), error: document.getElementById('cfEmailError') },
    subject: { input: document.getElementById('cfSubject'), error: document.getElementById('cfSubjectError') },
    message: { input: document.getElementById('cfMessage'), error: document.getElementById('cfMessageError') },
  };

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validators = {
    name: (v) => (v.trim().length ? '' : 'Please enter your name.'),
    email: (v) => {
      const value = v.trim();
      if (!value) return 'Please enter your email address.';
      return EMAIL_PATTERN.test(value) ? '' : 'Please enter a valid email address.';
    },
    subject: (v) => (v.trim().length ? '' : 'Please enter a subject.'),
    message: (v) => (v.trim().length ? '' : 'Please tell me a little about your project.'),
  };

  let isSubmitting = false;

  function setFieldError(key, message) {
    const { input, error } = fields[key];
    input.classList.toggle('is-invalid', !!message);
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    error.textContent = message;
    error.classList.toggle('is-visible', !!message);
  }

  function validateField(key) {
    const message = validators[key](fields[key].input.value);
    setFieldError(key, message);
    return !message;
  }

  Object.keys(fields).forEach((key) => {
    fields[key].input.addEventListener('blur', () => validateField(key));
  });

  function validateAll() {
    let allValid = true;
    let firstInvalid = null;
    Object.keys(fields).forEach((key) => {
      const valid = validateField(key);
      if (!valid && !firstInvalid) firstInvalid = fields[key].input;
      allValid = allValid && valid;
    });
    if (firstInvalid) firstInvalid.focus();
    return allValid;
  }

  function showSuccessStatus(message) {
    statusEl.textContent = message;
    statusEl.hidden = false;
    statusEl.className = 'form-status is-success';
  }

  function showErrorStatus() {
    statusEl.textContent = '';
    const link = document.createElement('a');
    link.href = 'mailto:ch.bilal.ahmed595@gmail.com';
    link.textContent = 'ch.bilal.ahmed595@gmail.com';
    statusEl.append('Something went wrong while sending your message. Please try again or email me directly at ', link, '.');
    statusEl.hidden = false;
    statusEl.className = 'form-status is-error';
  }

  function clearStatus() {
    statusEl.textContent = '';
    statusEl.hidden = true;
    statusEl.className = 'form-status';
  }

  function triggerShake() {
    contactForm.classList.remove('is-shaking');
    // Force reflow so the animation restarts if it's already mid-shake.
    void contactForm.offsetWidth;
    contactForm.classList.add('is-shaking');
    contactForm.addEventListener(
      'animationend',
      () => contactForm.classList.remove('is-shaking'),
      { once: true }
    );
  }

  function setSubmitState(state) {
    contactForm.classList.remove('is-success', 'is-error');
    submitBtn.classList.remove('is-loading', 'is-success');
    switch (state) {
      case 'loading':
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
        submitLabel.textContent = 'Sending';
        break;
      case 'success':
        // Stays disabled until the revert timeout below — the form was just
        // reset, so an immediate re-click would submit an empty form.
        submitBtn.disabled = true;
        submitBtn.classList.add('is-success');
        submitLabel.textContent = 'Message Sent';
        contactForm.classList.add('is-success');
        break;
      case 'error':
        submitBtn.disabled = false;
        submitLabel.textContent = 'Try Again →';
        contactForm.classList.add('is-error');
        triggerShake();
        break;
      default:
        submitBtn.disabled = false;
        submitLabel.textContent = 'Send Message';
    }
  }

  function encodeFormData(form) {
    return Array.from(new FormData(form))
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Honeypot: a filled hidden field means a bot filled every input on the
    // page. Reject silently — no error shown, no request sent.
    if (honeypot && honeypot.value) return;

    if (!validateAll()) {
      triggerShake();
      return;
    }

    isSubmitting = true;
    setSubmitState('loading');
    clearStatus();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData(contactForm),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Form submission failed');
        setSubmitState('success');
        showSuccessStatus("Thanks for reaching out. I'll get back to you as soon as possible.");
        contactForm.reset();
        setTimeout(() => setSubmitState('default'), 5000);
      })
      .catch(() => {
        setSubmitState('error');
        showErrorStatus();
      })
      .finally(() => {
        isSubmitting = false;
      });
  });
}

/* ──────────────────────────────────────────
   INIT — ENSURE NAV IS CORRECT ON LOAD
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateActiveLink();
});
