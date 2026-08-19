import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Large outlined text whose gold gradient fill is revealed in a soft radial
 * spotlight that follows the cursor — outline is always visible so the text
 * reads fine with no JS/hover at all; the gradient is the "premium" flourish
 * on top. Recreated from the well-known cursor-mask SVG technique (radial
 * gradient inside an SVG <mask>), restyled to this site's gold/dark tokens
 * rather than the common blue/white version.
 */
export function TextHoverEffect({ text }: { text: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  const updateMask = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setMaskPosition({
      cx: `${((clientX - rect.left) / rect.width) * 100}%`,
      cy: `${((clientY - rect.top) / rect.height) * 100}%`,
    });
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const svg = svgRef.current;
    if (!svg) return;

    const onMove = (e: MouseEvent) => updateMask(e.clientX, e.clientY);
    svg.addEventListener("mousemove", onMove);
    return () => svg.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 900 160"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="select-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`fill-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ac8b56" />
          <stop offset="30%" stopColor="#cdad69" />
          <stop offset="50%" stopColor="#f4e185" />
          <stop offset="70%" stopColor="#cdad69" />
          <stop offset="100%" stopColor="#ac8b56" />
        </linearGradient>

        <motion.radialGradient
          id={`spotlight-${uid}`}
          gradientUnits="userSpaceOnUse"
          r="22%"
          animate={maskPosition}
          transition={{ duration: 0, ease: "linear" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id={`mask-${uid}`}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#spotlight-${uid})`} />
        </mask>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="1"
        className="fill-transparent stroke-primary/25 font-extrabold"
        style={{ fontSize: "clamp(48px, 8vw, 112px)" }}
      >
        {text}
      </text>

      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="1"
        className="fill-transparent stroke-primary font-extrabold"
        style={{ fontSize: "clamp(48px, 8vw, 112px)" }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={`url(#fill-${uid})`}
        mask={`url(#mask-${uid})`}
        className={`font-extrabold transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
        style={{ fontSize: "clamp(48px, 8vw, 112px)" }}
      >
        {text}
      </text>
    </svg>
  );
}
