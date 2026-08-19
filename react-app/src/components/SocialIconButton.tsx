import { useRef, useState, type ElementType } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface SocialIconButtonProps {
  href: string;
  label: string;
  icon: ElementType<{ className?: string }>;
  /** h-9 w-9 (footer bottom bar) vs the larger h-10/h-11 used in Contact/Footer info column. */
  size?: "sm" | "md";
}

/**
 * Circular social link with a raised, bevelled "3D" surface (radial dome
 * gradient + inset/outer shadow) instead of a flat outlined circle, a
 * cursor-tracked perspective tilt (mouse position -> rotateX/rotateY via a
 * spring, restoring to flat on leave), and a specular highlight that
 * follows the cursor — the same "light source" idea as TextHoverEffect,
 * scaled down to icon size.
 */
export function SocialIconButton({ href, label, icon: Icon, size = "md" }: SocialIconButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 22 });

  const dimension = size === "sm" ? "h-9 w-9" : "h-10 w-10 md:h-11 md:w-11";

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x: px, y: py });
    rotateY.set((px - 50) / 4);
    rotateX.set(-(py - 50) / 4);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const external = href.startsWith("http");

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.94 }}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d", perspective: 400 }}
      className={`group relative flex ${dimension} shrink-0 items-center justify-center rounded-full border border-border bg-[radial-gradient(circle_at_35%_30%,color-mix(in_oklch,var(--secondary)_90%,white_4%)_0%,var(--secondary)_45%,var(--background)_100%)] text-muted-foreground shadow-[0_2px_6px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-2px_3px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:border-primary/50 hover:text-primary`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(244,225,133,0.45), transparent 55%)`,
        }}
      />
      <Icon
        className={`relative h-4 w-4 transition-transform duration-300 ${hovered ? "drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]" : "drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"}`}
      />
    </motion.a>
  );
}
