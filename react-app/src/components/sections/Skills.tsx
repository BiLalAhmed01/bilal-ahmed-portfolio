import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { OrbitingSkills } from "@/components/OrbitingSkills";

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24">
      <div className="section-glow section-glow--left" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
        <SectionHeader
          tag="06 / Skills"
          title="Technical Skills"
          lead="Technologies and tools I use to build modern digital products, web applications and intelligent solutions."
        />

        <Reveal tilt>
          <OrbitingSkills />
        </Reveal>
      </div>
    </section>
  );
}
