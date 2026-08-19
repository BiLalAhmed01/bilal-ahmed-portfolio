import { motion, useMotionValue, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

type Direction = "up" | "left" | "right";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  left: { x: -24, y: 0 },
  right: { x: 24, y: 0 },
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  tilt = false,
  distance,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  /** Overrides the default 24px travel distance for a more pronounced reveal. */
  distance?: number;
  /** Scroll-scrubbed 3D tilt-in, adapted from Aceternity's ContainerScroll
   *  technique — the element rotates/scales in continuously as it scrolls through the
   *  bottom third of the viewport, rather than firing once on entry.
   *  Reserved for a section's one primary visual anchor (a card, panel, or
   *  carousel) — applying it to every Reveal instance (badges, list rows)
   *  would read as gimmicky rather than premium. */
  tilt?: boolean;
}) {
  if (tilt) return <TiltReveal className={className}>{children}</TiltReveal>;

  const base = offsets[direction];
  const offset =
    distance === undefined
      ? base
      : { x: Math.sign(base.x) * distance, y: Math.sign(base.y || (direction === "up" ? 1 : 0)) * distance };
  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

// Drives the transforms off a plain window "scroll" listener + useMotionValue
// rather than framer-motion's own useScroll(), which is deliberate: it
// removes any dependency on that hook's automatic scroll-container
// detection, so this can't silently break if that detection logic ever
// misfires for a particular layout.
function TiltReveal({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const progress = useMotionValue(reducedMotion ? 1 : 0);

  useEffect(() => {
    if (reducedMotion) return;
    let rafId = 0;

    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh; // progress 0: element's top just entering from the bottom
      const end = vh * 0.2; // progress 1: element's top has reached 20% down the viewport
      const raw = (start - rect.top) / (start - end);
      progress.set(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion, progress]);

  const rotateX = useTransform(progress, [0, 1], [26, 0]);
  const scale = useTransform(progress, [0, 1], [0.82, 1]);
  const y = useTransform(progress, [0, 1], [120, 0]);
  const opacity = useTransform(progress, [0, 0.6], [0, 1]);

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div ref={ref} className={className} style={{ rotateX, scale, y, opacity, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}
