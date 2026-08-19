import { Code2 } from "lucide-react";

interface OrbitIcon {
  name: string;
  logo: string;
}

const INNER_RING: OrbitIcon[] = [
  { name: "React", logo: "/icons/react.svg" },
  { name: "Next.js", logo: "/icons/nextdotjs.svg" },
  { name: "Tailwind", logo: "/icons/tailwindcss.svg" },
];

const MIDDLE_RING: OrbitIcon[] = [
  { name: "JavaScript", logo: "/icons/javascript.svg" },
  { name: "Python", logo: "/icons/python.svg" },
  { name: "Node.js", logo: "/icons/nodedotjs.svg" },
  { name: "n8n", logo: "/icons/n8n.svg" },
  { name: "Git", logo: "/icons/git.svg" },
];

const OUTER_RING: OrbitIcon[] = [
  { name: "WordPress", logo: "/icons/wordpress.svg" },
  { name: "TensorFlow", logo: "/icons/tensorflow.svg" },
  { name: "Figma", logo: "/icons/figma.svg" },
  { name: "GitHub", logo: "/icons/github.svg" },
];

// Ring size is a percentage of the container (via Tailwind classes), and
// icon position is computed in percentages too — so the whole thing scales
// responsively with zero JS/resize-listener involved.
//
// Positioning (translate to center) and rotation (the orbit spin) are kept
// on separate nested elements — a CSS animation on `transform` replaces the
// whole property per-frame, so a static `translate(-50%,-50%)` and an
// animated `rotate()` can't live on the same element's `transform`.
function OrbitRing({
  sizeClass,
  duration,
  reverse,
  icons,
  iconSize,
}: {
  sizeClass: string;
  duration: number;
  reverse?: boolean;
  icons: OrbitIcon[];
  iconSize: number;
}) {
  const n = icons.length;
  return (
    <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeClass}`}>
      <div
        className="orbit-ring absolute inset-0 rounded-full border border-primary/20"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {icons.map((icon, i) => {
          const angle = (360 / n) * i - 90;
          const rad = (angle * Math.PI) / 180;
          const left = 50 + 50 * Math.cos(rad);
          const top = 50 + 50 * Math.sin(rad);
          return (
            <div
              key={icon.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%`, width: iconSize, height: iconSize }}
            >
              <div
                className="orbit-icon flex h-full w-full items-center justify-center rounded-full border border-primary/25 bg-card shadow-[0_0_20px_-4px_rgba(172,139,86,0.45)]"
                style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "normal" : "reverse" }}
                title={icon.name}
              >
                <img
                  src={icon.logo}
                  alt={icon.name}
                  width={iconSize * 0.55}
                  height={iconSize * 0.55}
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function OrbitingSkills() {
  return (
    <div className="relative mx-auto flex aspect-square w-[320px] items-center justify-center sm:w-[440px] md:w-[520px]">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(172,139,86,0.16)_0%,transparent_70%)] blur-2xl" />

      <OrbitRing sizeClass="w-[34%] h-[34%]" duration={18} icons={INNER_RING} iconSize={38} />
      <OrbitRing sizeClass="w-[62%] h-[62%]" duration={30} reverse icons={MIDDLE_RING} iconSize={42} />
      <OrbitRing sizeClass="w-[92%] h-[92%]" duration={44} icons={OUTER_RING} iconSize={44} />

      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-[linear-gradient(180deg,rgba(172,139,86,0.18)_0%,rgba(0,0,0,0.4)_100%)] shadow-[0_0_36px_-6px_rgba(172,139,86,0.6)]">
        <Code2 className="h-7 w-7 text-primary" strokeWidth={1.5} />
      </div>
    </div>
  );
}
