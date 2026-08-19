import { useRef } from "react";
import { BrainCircuit, Workflow, Code2, Layers, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

// Distinct, saturated per-card colors (mirroring the reference's
// purple/green/red/blue treatment) rather than the site's usual uniform
// gold accent — that color-coded variety is the whole point of this card
// style, so flattening it to monochrome gold would lose the design.
const SERVICES = [
  {
    index: "001",
    title: "AI Solutions",
    desc: "Build intelligent AI agents, LLM integrations and AI-powered features that solve real problems.",
    icon: BrainCircuit,
    gradient: "from-violet-700 via-violet-900 to-black",
  },
  {
    index: "002",
    title: "Automation",
    desc: "Build automated workflows and intelligent systems that eliminate repetitive work.",
    icon: Workflow,
    gradient: "from-emerald-700 via-emerald-950 to-black",
  },
  {
    index: "003",
    title: "WebApp Solutions",
    desc: "Build modern, responsive and scalable web applications and websites.",
    icon: Code2,
    gradient: "from-sky-700 via-sky-950 to-black",
  },
  {
    index: "004",
    title: "SaaS Products",
    desc: "Build the SaaS platforms and business applications companies run on, end to end.",
    icon: Layers,
    gradient: "from-amber-700 via-amber-950 to-black",
  },
];

export function Services() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step, behavior: "smooth" });
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
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal
                  key={s.title}
                  delay={i * 0.08}
                  className="w-[260px] flex-none snap-start sm:w-[300px]"
                >
                  <div
                    className={`flex h-[420px] flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br ${s.gradient} p-7 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7)]`}
                  >
                    <div>
                      <span className="font-mono text-xs text-white/50">( {s.index} )</span>
                      <Icon className="mt-6 h-9 w-9 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-wide text-white">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <button
            type="button"
            onClick={scrollNext}
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
