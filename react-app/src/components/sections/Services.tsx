import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { BrainCircuit, Workflow, Code2, Layers, ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

// Distinct, saturated per-card colors (mirroring the reference's
// purple/green/red/blue treatment) rather than the site's usual uniform
// gold accent — that color-coded variety is the whole point of this card
// style, so flattening it to monochrome gold would lose the design. Each
// card also carries its own glow/shine tint so the hover effects read as
// "this card's color", not one generic gold sheen repeated four times.
const SERVICES = [
  {
    index: "001",
    title: "AI Solutions",
    desc: "Build intelligent AI agents, LLM integrations and AI-powered features that solve real problems.",
    icon: BrainCircuit,
    gradient: "from-violet-700 via-violet-900 to-black",
    glow: "168,85,247",
  },
  {
    index: "002",
    title: "Automation",
    desc: "Build automated workflows and intelligent systems that eliminate repetitive work.",
    icon: Workflow,
    gradient: "from-emerald-700 via-emerald-950 to-black",
    glow: "16,185,129",
  },
  {
    index: "003",
    title: "WebApp Solutions",
    desc: "Build modern, responsive and scalable web applications and websites.",
    icon: Code2,
    gradient: "from-sky-700 via-sky-950 to-black",
    glow: "56,189,248",
  },
  {
    index: "004",
    title: "SaaS Products",
    desc: "Build the SaaS platforms and business applications companies run on, end to end.",
    icon: Layers,
    gradient: "from-amber-700 via-amber-950 to-black",
    glow: "251,191,36",
  },
];

function ServiceCard({ service, delay }: { service: (typeof SERVICES)[number]; delay: number }) {
  const Icon = service.icon;
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 260, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 260, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x: px, y: py });
    rotateY.set((px - 50) / 10);
    rotateX.set(-(py - 50) / 10);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <Reveal delay={delay} className="w-[260px] flex-none snap-start sm:w-[300px]">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -6 }}
        style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d", perspective: 800 }}
        className={`group relative flex h-[420px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${service.gradient} p-7 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7)] transition-shadow duration-300`}
      >
        {/* cursor-tracked spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(${service.glow},0.35), transparent 60%)`,
          }}
        />
        {/* diagonal shine sweep */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        {/* glowing border ring on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px rgba(${service.glow},0.5), 0 0 32px -8px rgba(${service.glow},0.5)` }}
        />

        <div className="relative" style={{ transform: "translateZ(30px)" }}>
          <span className="font-mono text-xs text-white/50">( {service.index} )</span>
          <motion.div
            animate={hovered ? { scale: 1.12, rotate: -6 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm"
          >
            <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
          </motion.div>
        </div>
        <div className="relative" style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-lg font-bold uppercase tracking-wide text-white">{service.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{service.desc}</p>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function Services() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    if (dir === 1) {
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step, behavior: "smooth" });
    } else {
      const atStart = track.scrollLeft <= 4;
      track.scrollTo({ left: atStart ? track.scrollWidth : track.scrollLeft - step, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="relative overflow-hidden py-24">
      <div className="section-glow section-glow--right" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
        <SectionHeader tag="05 / Services" title="AI, automation and web solutions that scale." />

        <Reveal tilt className="relative">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.title} service={s} delay={i * 0.08} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous service"
            className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-transform hover:scale-105 hover:bg-black/70 sm:flex"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next service"
            className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-transform hover:scale-105 hover:bg-black/70 sm:flex"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
