import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Reveal } from "@/components/Reveal";
import { PROJECTS, PROJECT_CATEGORIES, type Project } from "@/data/projects";

function primaryLink(p: Project) {
  if (p.liveUrl) return { href: p.liveUrl, label: "View Live Project", kind: "live" as const };
  if (p.githubUrl) return { href: p.githubUrl, label: "View on GitHub", kind: "github" as const };
  return null;
}

function LinkIcon({ kind, className }: { kind: "live" | "github"; className?: string }) {
  return kind === "github" ? <GithubIcon className={className} /> : <ExternalLink className={className} />;
}

// Restrained, brand-consistent overlay per category instead of the source
// component's per-card rainbow gradients — keeps every card inside the
// site's gold/dark palette rather than clashing with it.
const CATEGORY_OVERLAY: Record<string, string> = {
  "AI & Automation": "from-cyan-500/10 via-transparent to-primary/15",
  Web: "from-primary/15 via-transparent to-amber-300/10",
};

function calculateCardStyle(index: number, activeIndex: number, isMobile: boolean) {
  const diff = index - activeIndex;

  if (isMobile) {
    return {
      zIndex: 50 - Math.abs(diff),
      transform: diff === 0 ? "translateY(0) scale(1)" : `translateY(${diff * 16}px) scale(${1 - Math.abs(diff) * 0.08})`,
      opacity: Math.max(0, 1 - Math.abs(diff) * 0.35),
      pointerEvents: Math.abs(diff) > 1 ? ("none" as const) : ("auto" as const),
    };
  }

  return {
    zIndex: 50 - Math.abs(diff),
    transform: diff === 0 ? "translateX(0) scale(1)" : `translateX(${diff * 58}%) scale(${1 - Math.abs(diff) * 0.16})`,
    opacity: Math.max(0, 1 - Math.abs(diff) * 0.32),
    filter: diff === 0 ? "blur(0px)" : "blur(2px)",
    pointerEvents: Math.abs(diff) > 2 ? ("none" as const) : ("auto" as const),
  };
}

function GalleryCard({
  project,
  index,
  activeIndex,
  isMobile,
  isHovering,
  mouse,
  reducedMotion,
  onSelect,
}: {
  project: Project;
  index: number;
  activeIndex: number;
  isMobile: boolean;
  isHovering: boolean;
  mouse: { x: number; y: number };
  reducedMotion: boolean;
  onSelect: (i: number) => void;
}) {
  const isActive = index === activeIndex;
  const link = primaryLink(project);
  const tilt =
    isActive && isHovering && !reducedMotion
      ? `perspective(1000px) rotateY(${mouse.x * 6}deg) rotateX(${-mouse.y * 6}deg)`
      : "none";

  return (
    <motion.div
      className="absolute w-full max-w-lg cursor-pointer rounded-2xl"
      style={{ ...calculateCardStyle(index, activeIndex, isMobile), transition: "all 0.5s cubic-bezier(0.19,1,0.22,1)" }}
      whileHover={{ scale: isActive ? 1.015 : 1 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(index)}
    >
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-border bg-[linear-gradient(180deg,rgba(172,139,86,0.05)_0%,transparent_40%),var(--card)] shadow-[0_1px_2px_rgba(0,0,0,0.25),0_28px_56px_-24px_rgba(0,0,0,0.7)]"
        style={{ transform: tilt, transition: "transform 0.2s ease-out" }}
      >
        <div className="flex items-center gap-1.5 border-b border-primary/10 bg-black/40 px-4 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/35" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/35" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/35" />
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} — website preview`}
            loading={isActive ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${CATEGORY_OVERLAY[project.category] ?? "from-primary/10 via-transparent to-primary/15"} mix-blend-overlay`}
          />
          <span className="absolute right-4 top-4 rounded-full border border-primary/20 bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        <div className="relative p-6 md:p-7">
          <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.shortDescription}</p>

          {project.technologies.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span key={t} className="rounded-md bg-secondary/50 px-2.5 py-1 text-[11px] text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          {isActive ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-5 flex items-center justify-between border-t border-border pt-5"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
              </span>
              {link ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  {link.label}
                  <LinkIcon kind={link.kind} className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </motion.div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [category, setCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const galleryRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Cap tilt updates to one per animation frame instead of once per native
  // mousemove event — high-poll-rate mice/trackpads can fire that event
  // far faster than 60Hz, which was forcing a React re-render (and a
  // recompute of every card's tilt transform) far more often than the
  // screen could even show, causing visible jank while dragging the mouse
  // across the gallery.
  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    map.set("All", PROJECTS.length);
    PROJECT_CATEGORIES.filter((c) => c !== "All").forEach((c) =>
      map.set(c, PROJECTS.filter((p) => p.categories.includes(c)).length)
    );
    return map;
  }, []);

  const list = useMemo(
    () =>
      PROJECTS.filter((p) => category === "All" || p.categories.includes(category)).sort(
        (a, b) => a.priority - b.priority
      ),
    [category]
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [category]);

  const next = () => setActiveIndex((p) => (p + 1) % list.length);
  const prev = () => setActiveIndex((p) => (p - 1 + list.length) % list.length);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      const rect = galleryRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMouse({ x: (clientX - rect.left) / rect.width - 0.5, y: (clientY - rect.top) / rect.height - 0.5 });
    });
  }, []);

  return (
    <section id="projects" className="relative overflow-hidden py-24">
      <div className="section-glow section-glow--left" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal className="mb-10 max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-primary">04 / Selected Work</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Selected <span className="accent-text">Work</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            A selection of websites, digital products, AI-powered applications and intelligent solutions I've
            built.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mb-10 flex flex-wrap items-center gap-3">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all ${
                category === cat
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_rgba(172,139,86,0.5)]"
                  : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:text-[#cdad69]"
              }`}
            >
              {cat}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                  category === cat ? "bg-black/15 text-primary-foreground/80" : "bg-black/30 text-muted-foreground"
                }`}
              >
                {counts.get(cat)}
              </span>
            </button>
          ))}
        </Reveal>

        <Reveal tilt>
        <div
          ref={galleryRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative flex h-[560px] w-full items-center justify-center md:h-[620px]"
        >
          {list.map((project, index) => (
            <GalleryCard
              key={project.id}
              project={project}
              index={index}
              activeIndex={activeIndex}
              isMobile={isMobile}
              isHovering={isHovering}
              mouse={mouse}
              reducedMotion={reducedMotion}
              onSelect={setActiveIndex}
            />
          ))}
        </div>
        </Reveal>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous project"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <div className="flex items-center gap-2">
            {list.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to ${p.title}`}
                className={`h-2 rounded-full transition-all duration-200 ${
                  i === activeIndex ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/50"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next project"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
