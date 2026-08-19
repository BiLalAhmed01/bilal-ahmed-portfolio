import { GraduationCap } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Timeline, type TimelineEntry } from "@/components/Timeline";

const goldAccent: TimelineEntry["accent"] = {
  badge: "border-primary/30 bg-primary/15 text-primary",
  node: "border-primary/40 bg-black text-primary",
  dot: "bg-primary",
};

const entries: TimelineEntry[] = [
  {
    id: "uet-taxila",
    date: "2021 — 2025",
    title: "BS Computer Engineering",
    subtitle: "UET Taxila",
    badge: "Degree",
    icon: GraduationCap,
    accent: goldAccent,
    image: "/assets/uet-taxila.webp",
  },
  {
    id: "scienta-vision",
    date: "2019 — 2021",
    title: "FSc Pre-Engineering",
    subtitle: "Scienta Vision, Islamabad",
    badge: "Pre-Engineering",
    icon: GraduationCap,
    accent: goldAccent,
    image: "/assets/scienta-vision.webp",
  },
  {
    id: "sls-montessori",
    date: "2017 — 2019",
    title: "Matriculation in Science",
    subtitle: "SLS Montessori, Islamabad",
    badge: "Matriculation",
    icon: GraduationCap,
    accent: goldAccent,
    image: "/assets/sls-montessori.webp",
  },
];

export function Education() {
  return (
    <section id="education" className="relative overflow-hidden py-24">
      <div className="section-glow section-glow--bottom-left" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
        <SectionHeader tag="03 / Education" title="Academic Background" />
        <Timeline entries={entries} />
      </div>
    </section>
  );
}
