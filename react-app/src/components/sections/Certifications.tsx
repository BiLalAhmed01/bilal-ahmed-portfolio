import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Cloud,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  MessageSquare,
  X,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CERTIFICATIONS, type Certification } from "@/data/certifications";

const CATEGORY_ICON: Record<string, typeof MessageSquare> = {
  "Claude Platform": MessageSquare,
  "Developer Tools": Code2,
  "AI Fluency": BrainCircuit,
  "Cloud Integration": Cloud,
};

const AUTO_ADVANCE_MS = 6500;

export function Certifications() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [preview, setPreview] = useState<Certification | null>(null);
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = CERTIFICATIONS.length;
  const cert = CERTIFICATIONS[index];
  const Icon = CATEGORY_ICON[cert.category] ?? GraduationCap;

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  useEffect(() => {
    if (paused || reducedMotion || preview) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % total), AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, reducedMotion, preview, total]);

  useEffect(() => {
    if (!preview) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreview(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [preview]);

  return (
    <section id="certifications" className="relative overflow-hidden py-24">
      <div className="section-glow section-glow--right" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
        <SectionHeader
          tag="07 / Certifications"
          title="Certifications"
          lead="Professional learning and certifications across AI, automation and emerging technologies."
        />

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <Reveal
          tilt
          className="grid overflow-hidden rounded-2xl border border-border bg-card/60 md:grid-cols-[2fr_3fr]"
        >
          {/* ── Text panel ── */}
          <div className="relative flex flex-col justify-between p-8 md:p-10">
            <div>
              <div className="mb-6 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px w-8 bg-border" />
                <span className="font-mono">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                    {cert.category}
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cert.description}</p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Verify Certificate
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setPreview(cert)}
                      className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary"
                    >
                      View PDF
                    </button>
                    <a
                      href={cert.pdf}
                      download={cert.downloadName}
                      aria-label={`Download ${cert.title} PDF`}
                      className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous certificate"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next certificate"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="ml-2 flex items-center gap-1.5">
                {CERTIFICATIONS.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to ${c.title}`}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      i === index ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Image panel — certificate covers are all the same 1584×1224
               aspect ratio, but this panel's own box doesn't match it, so
               object-cover was cropping the certificate edges. object-contain
               + a padded, brand-toned backdrop keeps the whole certificate
               visible instead. ── */}
          <div className="relative min-h-[280px] overflow-hidden bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklch,var(--secondary)_70%,var(--primary)_6%)_0%,var(--background)_75%)] md:min-h-[420px]">
            <AnimatePresence mode="sync">
              <motion.img
                key={cert.id}
                src={cert.cover}
                alt={`Certificate of completion for ${cert.title}`}
                initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.6 }, scale: { duration: AUTO_ADVANCE_MS / 1000, ease: "linear" } }}
                className="absolute inset-0 h-full w-full rounded-lg object-contain p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] md:p-10"
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* decorative frame corners */}
            <span className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-primary/60" />
            <span className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-primary/60" />
            <span className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-primary/60" />
            <span className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-primary/60" />
          </div>
        </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {preview ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setPreview(null)}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={preview.title}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <span className="font-semibold text-foreground">{preview.title}</span>
                <button
                  type="button"
                  onClick={() => setPreview(null)}
                  aria-label="Close certificate preview"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <iframe title="Certificate preview" src={preview.pdf} className="flex-1 bg-white" />
              <div className="flex items-center gap-3 border-t border-border px-5 py-4">
                <a
                  href={preview.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground hover:border-primary"
                >
                  Open PDF
                </a>
                <a
                  href={preview.pdf}
                  download={preview.downloadName}
                  className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
                >
                  Download PDF
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
