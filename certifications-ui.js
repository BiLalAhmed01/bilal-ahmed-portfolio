/**
 * Certifications — data-driven render + preview modal.
 * Reads CERTIFICATIONS from data/certifications.js and builds the card
 * grid entirely from that data — no certificate title/issuer/link is
 * hardcoded here. Independent of script.js and projects-ui.js, the same
 * way those two are independent of each other (each dynamically-injected
 * section owns its own reveal observer and, here, its own modal).
 */
import { CERTIFICATIONS } from "./data/certifications.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const gridEl = document.getElementById("certGrid");
const modalEl = document.getElementById("certModal");

if (gridEl && modalEl) {
  const frameEl = document.getElementById("certModalFrame");
  const titleEl = document.getElementById("certModalTitle");
  const closeBtn = document.getElementById("certModalClose");
  const openLink = document.getElementById("certModalOpen");
  const downloadLink = document.getElementById("certModalDownload");

  let lastFocused = null;

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const downloadIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" /></svg>`;

  function cardHtml(cert, index) {
    const alt = escapeHtml(`Certificate of completion for ${cert.title}`);
    return `
      <article class="cert-card glass-card reveal-up" style="--d:${Math.min(index, 6) * 60}ms">
        <div class="cert-cover-wrap">
          <img class="cert-cover" src="${escapeHtml(cert.cover)}" alt="${alt}" width="1584" height="1224" loading="lazy" decoding="async" />
          <span class="cert-badge">${escapeHtml(cert.type === "Certificate of Completion" ? "Certification" : cert.type || "Certification")}</span>
        </div>
        <div class="cert-body">
          <span class="cert-category">${escapeHtml(cert.category)}</span>
          <h3 class="cert-title">${escapeHtml(cert.title)}</h3>
          <p class="cert-meta">${escapeHtml(cert.issuer)}</p>
          <div class="cert-actions">
            <button type="button" class="cert-view-btn" data-cert-view="${escapeHtml(cert.id)}">View Certificate</button>
            <a class="cert-download-btn" href="${escapeHtml(cert.pdf)}" download="${escapeHtml(cert.downloadName)}">
              Download PDF ${downloadIcon}
            </a>
          </div>
        </div>
      </article>`;
  }

  function observeReveal(elements) {
    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    elements.forEach((el) => observer.observe(el));
  }

  function getFocusableModalItems() {
    return Array.from(modalEl.querySelectorAll("a[href], button")).filter((el) => el.offsetParent !== null);
  }

  function handleModalKeydown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key === "Tab") {
      const items = getFocusableModalItems();
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

  function openModal(cert, trigger) {
    lastFocused = trigger || document.activeElement;
    titleEl.textContent = cert.title;
    frameEl.src = cert.pdf;
    openLink.href = cert.pdf;
    downloadLink.href = cert.pdf;
    downloadLink.setAttribute("download", cert.downloadName);

    modalEl.removeAttribute("inert");
    modalEl.classList.add("open");
    document.body.style.overflow = "hidden";

    closeBtn.focus();
    document.addEventListener("keydown", handleModalKeydown);
  }

  function closeModal() {
    modalEl.classList.remove("open");
    modalEl.setAttribute("inert", "");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleModalKeydown);

    // Stop any rendering the embedded PDF viewer might still be doing.
    frameEl.src = "about:blank";

    if (lastFocused) lastFocused.focus();
  }

  function renderGrid() {
    gridEl.innerHTML = CERTIFICATIONS.map((c, i) => cardHtml(c, i)).join("");
    observeReveal(gridEl.querySelectorAll(".reveal-up"));

    gridEl.querySelectorAll("[data-cert-view]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cert = CERTIFICATIONS.find((c) => c.id === btn.dataset.certView);
        if (cert) openModal(cert, btn);
      });
    });
  }

  closeBtn.addEventListener("click", closeModal);
  modalEl.querySelectorAll("[data-cert-close]").forEach((el) => el.addEventListener("click", closeModal));

  renderGrid();
}
