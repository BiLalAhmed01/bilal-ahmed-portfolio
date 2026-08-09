/**
 * Projects / Selected Work — data-driven render.
 * Reads PROJECTS from data/projects.js (Phase 3 architecture) and builds the
 * category filter bar and a uniform project grid entirely from that data.
 * No project title/description/link is hardcoded here. Every card shares
 * the exact same tile structure — no featured/large/small variants
 * (Phase 4 brand-positioning + visual redesign).
 */
import { PROJECTS, PROJECT_CATEGORIES } from "./data/projects.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const filterbarEl = document.getElementById("swFilterbar");
const gridEl = document.getElementById("swGrid");
const emptyEl = document.getElementById("swEmpty");

if (filterbarEl && gridEl) {
  const svg = {
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>`,
    external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>`,
  };

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /** Arrow for an internal route, external-link glyph for anything that opens a new tab. */
  function ctaIcon(link) {
    return link.external ? svg.external : svg.arrow;
  }

  /**
   * Primary — and only — destination for a project, in priority order.
   * Label reflects exactly what the link resolves to; never a fake CTA.
   */
  function primaryLink(project) {
    if (project.caseStudy) return { href: project.caseStudy, label: "View Project", external: false };
    if (project.liveUrl) return { href: project.liveUrl, label: "View Live Project", external: true };
    if (project.githubUrl) return { href: project.githubUrl, label: "View on GitHub", external: true };
    return null;
  }

  function techLine(project) {
    return Array.isArray(project.technologies) && project.technologies.length
      ? project.technologies.join(" · ")
      : "";
  }

  /** Category is always shown; year/country only when the data actually has it — never invented. */
  function metaLine(project) {
    const extra = [project.yearLabel || project.year, project.country].filter(Boolean).join(" — ");
    return extra ? `${project.category} — ${extra}` : project.category;
  }

  function imageBlock(project, { eager = false } = {}) {
    const alt = escapeHtml(`${project.title} — website preview`);
    if (!project.image) {
      return `<div class="sw-thumb sw-thumb--missing"><span>PROJECT VISUAL NEEDED</span></div>`;
    }
    return `
      <div class="sw-thumb">
        <img
          src="${escapeHtml(project.image)}"
          alt="${alt}"
          width="1200" height="750"
          loading="${eager ? "eager" : "lazy"}"
          decoding="async"
          ${eager ? 'fetchpriority="high"' : ""}
          onerror="this.closest('.sw-thumb').classList.add('sw-thumb--missing'); this.remove();"
        />
      </div>`;
  }

  // ── Uniform grid ──────────────────────────────────────────────
  function cardHtml(project, index) {
    const link = primaryLink(project);
    const tech = techLine(project);
    const meta = metaLine(project);
    const number = String(index + 1).padStart(2, "0");
    const cardInner = `
        <div class="sw-thumb-wrap">
          ${imageBlock(project, { eager: index < 3 })}
          ${
            link
              ? `<span class="sw-thumb-view"><span class="sw-thumb-view-label">${escapeHtml(link.label)} <span class="sw-cta-arrow">${ctaIcon(link)}</span></span></span>`
              : ""
          }
        </div>
        <div class="sw-card-body">
          <div class="sw-card-meta-row">
            <span class="sw-card-num" aria-hidden="true">${number}</span>
            <span class="sw-card-cat">${escapeHtml(meta)}</span>
          </div>
          <h3 class="sw-card-title">${escapeHtml(project.title)}</h3>
          <p class="sw-card-desc">${escapeHtml(project.shortDescription || project.description || "")}</p>
          ${tech ? `<span class="sw-card-tech">${escapeHtml(tech)}</span>` : ""}
          ${link ? `<span class="sw-card-cta">${escapeHtml(link.label)} <span class="sw-cta-arrow">${ctaIcon(link)}</span></span>` : ""}
        </div>`;

    return `
      <article class="sw-card sw-reveal" style="--d:${Math.min(index, 8) * 60}ms" data-category="${escapeHtml(project.categories.join(","))}" data-slug="${escapeHtml(project.slug)}">
        ${
          link
            ? `<a class="sw-card-link" href="${escapeHtml(link.href)}" ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ""} aria-label="${escapeHtml(link.label)} — ${escapeHtml(project.title)}">${cardInner}</a>`
            : `<div class="sw-card-link">${cardInner}</div>`
        }
      </article>`;
  }

  function renderGrid(category) {
    const list = PROJECTS
      .filter((p) => category === "All" || p.categories.includes(category))
      .sort((a, b) => a.priority - b.priority);

    if (!list.length) {
      gridEl.innerHTML = "";
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;
    gridEl.innerHTML = list.map((p, i) => cardHtml(p, i)).join("");
    observeReveal(gridEl.querySelectorAll(".sw-reveal"));
  }

  // ── Filter bar ────────────────────────────────────────────────
  function categoryCounts() {
    const counts = new Map();
    counts.set("All", PROJECTS.length);
    PROJECT_CATEGORIES.filter((c) => c !== "All").forEach((cat) => {
      counts.set(cat, PROJECTS.filter((p) => p.categories.includes(cat)).length);
    });
    return counts;
  }

  function renderFilterbar() {
    const counts = categoryCounts();
    const categories = PROJECT_CATEGORIES.filter((c) => c === "All" || counts.get(c) > 0);

    filterbarEl.innerHTML = categories
      .map(
        (cat, i) => `
        ${i > 0 ? '<span class="sw-filter-divider" aria-hidden="true">/</span>' : ""}
        <button type="button" class="sw-filter${i === 0 ? " is-active" : ""}" aria-pressed="${i === 0 ? "true" : "false"}" data-category="${escapeHtml(cat)}">
          ${escapeHtml(cat)} <span class="sw-filter-count">${counts.get(cat)}</span>
        </button>`
      )
      .join("");

    filterbarEl.querySelectorAll(".sw-filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("is-active")) return;
        filterbarEl.querySelectorAll(".sw-filter").forEach((b) => {
          b.classList.remove("is-active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");

        const category = btn.dataset.category;
        if (prefersReducedMotion) {
          renderGrid(category);
          return;
        }
        gridEl.classList.add("is-transitioning");
        window.setTimeout(() => {
          renderGrid(category);
          gridEl.classList.remove("is-transitioning");
        }, 180);
      });
    });
  }

  // ── Reveal-on-scroll (scoped to this section; independent of script.js) ──
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

  // ── Init ──────────────────────────────────────────────────────
  // Note: the static intro (.sw-intro / .sw-filterbar) already exists at
  // parse time and is handled by script.js's global reveal observer.
  renderFilterbar();
  renderGrid("All");
}
