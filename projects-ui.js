/**
 * Projects / Selected Work — data-driven render.
 * Reads PROJECTS from data/projects.js (Phase 3 architecture) and builds the
 * featured project, category filter bar, and asymmetric grid entirely from
 * that data. No project title/description/link is hardcoded here.
 */
import { PROJECTS, PROJECT_CATEGORIES } from "./data/projects.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const filterbarEl = document.getElementById("swFilterbar");
const featuredEl = document.getElementById("swFeatured");
const gridEl = document.getElementById("swGrid");
const emptyEl = document.getElementById("swEmpty");

if (filterbarEl && featuredEl && gridEl) {
  const svg = {
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>`,
    external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>`,
    github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  };

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /** Arrow for an internal route, external-link glyph for anything that opens a new tab. */
  function ctaIcon(link) {
    return link.external ? svg.external : svg.arrow;
  }

  /** Primary destination for a project, in priority order. */
  function primaryLink(project) {
    if (project.caseStudy) return { href: project.caseStudy, label: "View Case Study", external: false };
    if (project.liveUrl) return { href: project.liveUrl, label: "Visit Live Site", external: true };
    if (project.githubUrl) return { href: project.githubUrl, label: "View on GitHub", external: true };
    return null;
  }

  function techLine(project) {
    return Array.isArray(project.technologies) && project.technologies.length
      ? project.technologies.join(" · ")
      : "";
  }

  /** Year/location only — category is always shown separately. Never invents a missing value. */
  function subMeta(project) {
    return [project.yearLabel || project.year, project.country].filter(Boolean).join(" — ");
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
          width="1200" height="620"
          loading="${eager ? "eager" : "lazy"}"
          decoding="async"
          ${eager ? 'fetchpriority="high"' : ""}
          onerror="this.closest('.sw-thumb').classList.add('sw-thumb--missing'); this.remove();"
        />
      </div>`;
  }

  // ── Featured project ──────────────────────────────────────────
  function renderFeatured() {
    const featured = PROJECTS.filter((p) => p.featured).sort((a, b) => a.priority - b.priority)[0];
    if (!featured) {
      featuredEl.innerHTML = "";
      return null;
    }
    const link = primaryLink(featured);
    const tech = techLine(featured);
    const meta = subMeta(featured);

    featuredEl.innerHTML = `
      <article class="sw-featured reveal-up" style="--d:340ms" data-slug="${escapeHtml(featured.slug)}">
        <div class="sw-featured-visual">
          ${
            link
              ? `<a href="${escapeHtml(link.href)}" class="sw-featured-visual-link" ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ""} aria-label="${link.label} — ${escapeHtml(featured.title)}">${imageBlock(featured, { eager: true })}</a>`
              : imageBlock(featured, { eager: true })
          }
        </div>
        <div class="sw-featured-info">
          <span class="sw-index" aria-hidden="true">01</span>
          <span class="sw-eyebrow">Featured — ${escapeHtml(featured.category)}</span>
          <h3 class="sw-featured-title">${escapeHtml(featured.title)}</h3>
          <p class="sw-featured-desc">${escapeHtml(featured.shortDescription || featured.description || "")}</p>
          <div class="sw-featured-foot">
            ${tech ? `<span class="sw-tech">${escapeHtml(tech)}</span>` : ""}
            ${meta ? `<span class="sw-meta">${escapeHtml(meta)}</span>` : ""}
          </div>
          <div class="sw-links">
            ${
              link
                ? `<a class="sw-cta" href="${escapeHtml(link.href)}" ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>${escapeHtml(link.label)} <span class="sw-cta-arrow">${ctaIcon(link)}</span></a>`
                : ""
            }
            ${
              featured.githubUrl && !(link && link.href === featured.githubUrl)
                ? `<a class="sw-icon-link" href="${escapeHtml(featured.githubUrl)}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHtml(featured.title)} on GitHub">${svg.github}</a>`
                : ""
            }
          </div>
        </div>
      </article>`;

    return featured.slug;
  }

  // ── Grid ───────────────────────────────────────────────────────
  const SIZE_CYCLE = ["lg", "sm", "sm", "lg", "full"];

  function cardHtml(project, index) {
    const size = SIZE_CYCLE[index % SIZE_CYCLE.length];
    const link = primaryLink(project);
    const tech = techLine(project);
    const meta = subMeta(project);

    return `
      <article class="sw-card sw-card--${size} sw-reveal" style="--d:${Math.min(index, 6) * 60}ms" data-category="${escapeHtml(project.categories.join(","))}" data-slug="${escapeHtml(project.slug)}">
        ${
          link
            ? `<a class="sw-card-visual-link" href="${escapeHtml(link.href)}" ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ""} aria-label="${link.label} — ${escapeHtml(project.title)}">${imageBlock(project)}</a>`
            : imageBlock(project)
        }
        <div class="sw-card-body">
          <span class="sw-card-cat">${escapeHtml(project.category)}${meta ? ` <span class="sw-card-meta">— ${escapeHtml(meta)}</span>` : ""}</span>
          <h3 class="sw-card-title">${escapeHtml(project.title)}</h3>
          <p class="sw-card-desc">${escapeHtml(project.shortDescription || project.description || "")}</p>
          ${tech ? `<span class="sw-card-tech">${escapeHtml(tech)}</span>` : ""}
          <div class="sw-links">
            ${
              link
                ? `<a class="sw-card-cta" href="${escapeHtml(link.href)}" ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>View Project <span class="sw-cta-arrow">${ctaIcon(link)}</span></a>`
                : ""
            }
            ${
              project.githubUrl && !(link && link.href === project.githubUrl)
                ? `<a class="sw-icon-link" href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHtml(project.title)} on GitHub">${svg.github}</a>`
                : ""
            }
          </div>
        </div>
      </article>`;
  }

  function renderGrid(category, featuredSlug) {
    const list = PROJECTS
      .filter((p) => p.slug !== featuredSlug)
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

  function renderFilterbar(featuredSlug) {
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
          renderGrid(category, featuredSlug);
          return;
        }
        gridEl.classList.add("is-transitioning");
        window.setTimeout(() => {
          renderGrid(category, featuredSlug);
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
  // Only the elements this module injects need their own observer here.
  const featuredSlug = renderFeatured();
  renderFilterbar(featuredSlug);
  renderGrid("All", featuredSlug);
  observeReveal(document.querySelectorAll(".sw-featured"));
}
