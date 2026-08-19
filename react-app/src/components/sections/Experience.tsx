import { Briefcase, Building2, Users } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Timeline, type TimelineEntry } from "@/components/Timeline";
import { EXPERIENCE } from "@/data/experience";

const TYPE_STYLES: Record<string, { icon: TimelineEntry["icon"]; accent: TimelineEntry["accent"] }> = {
  Remote: {
    icon: Briefcase,
    accent: {
      badge: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
      node: "border-emerald-500/40 bg-emerald-950 text-emerald-400",
      dot: "bg-emerald-400",
    },
  },
  Onsite: {
    icon: Building2,
    accent: {
      badge: "border-sky-500/30 bg-sky-500/15 text-sky-300",
      node: "border-sky-500/40 bg-sky-950 text-sky-400",
      dot: "bg-sky-400",
    },
  },
  Hybrid: {
    icon: Users,
    accent: {
      badge: "border-violet-500/30 bg-violet-500/15 text-violet-300",
      node: "border-violet-500/40 bg-violet-950 text-violet-400",
      dot: "bg-violet-400",
    },
  },
};

const entries: TimelineEntry[] = EXPERIENCE.map((exp) => ({
  id: exp.company,
  date: exp.date,
  title: exp.role,
  subtitle: exp.company,
  location: exp.location,
  badge: exp.type,
  icon: TYPE_STYLES[exp.type].icon,
  accent: TYPE_STYLES[exp.type].accent,
  bullets: exp.bullets,
  tags: exp.tags,
}));

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-24">
      <div className="section-glow section-glow--right" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
        <SectionHeader tag="02 / Experience" title="Where I've Worked" />
        <Timeline entries={entries} />
      </div>
    </section>
  );
}
