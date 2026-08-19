import { Bot, Code2, Workflow } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const FOCUS_AREAS = [
  { label: "AI Systems", icon: Bot },
  { label: "Automation", icon: Workflow },
  { label: "Frontend", icon: Code2 },
];

interface Stat {
  value: string;
  label: string;
  sub?: string;
}

const STATS: Stat[] = [
  { value: "2+", label: "Years Experience", sub: "Since 2023" },
  { value: "17+", label: "Projects Completed" },
  { value: "6", label: "Clients" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div className="section-glow section-glow--left" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal className="mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-primary">01 / About</span>
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <Reveal direction="left">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Building intelligent products with <span className="accent-text">AI, automation</span> &amp;{" "}
                <span className="accent-text">code</span>.
              </h2>
            </Reveal>
            <Reveal direction="left" delay={0.07}>
              <p className="mt-6 text-muted-foreground">
                I'm an <strong className="text-foreground">AI Engineer</strong> focused on building AI solutions,
                intelligent workflows, and AI-powered applications that reduce repetitive work and improve
                efficiency. Alongside AI and automation, I build{" "}
                <strong className="text-foreground">responsive web applications and SaaS products</strong> —
                high-performance digital experiences and business-focused solutions.
              </p>
            </Reveal>
            <Reveal direction="left" delay={0.14}>
              <p className="mt-4 text-muted-foreground">
                My experience spans AI integrations, automation workflows, modern frontend development,
                WordPress, APIs, Python, and software development. I enjoy turning ideas and complex requirements
                into practical, scalable and user-friendly solutions.
              </p>
            </Reveal>
            <Reveal direction="left" delay={0.18}>
              <p className="mt-4 text-sm text-muted-foreground">
                I'm Bilal Ahmed, an AI Engineer &amp; Web Developer based in Islamabad, Pakistan. Since 2023 I've
                completed 17+ projects for 6 clients, and I'm open for opportunities worldwide, including fully
                remote roles.
              </p>
            </Reveal>

            <Reveal direction="left" delay={0.21} className="mt-6 flex flex-wrap gap-2.5">
              {FOCUS_AREAS.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/50"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={1.75} />
                  {label}
                </span>
              ))}
            </Reveal>

            <Reveal direction="left" delay={0.25} className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 flex-none animate-pulse rounded-full bg-primary shadow-[0_0_8px_rgba(172,139,86,0.6)]" />
              Open for remote opportunities worldwide
            </Reveal>

            <Reveal
              direction="left"
              delay={0.28}
              className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-8"
            >
              {STATS.map((s) => (
                <div key={s.label} className="min-w-0">
                  <span className="accent-text block text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                    {s.label}
                    {s.sub ? <span className="block text-[10px] text-muted-foreground/70">{s.sub}</span> : null}
                  </span>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal tilt>
            <div className="glass-card relative overflow-hidden p-8">
              {/* decorative frame corners — echoes the framed image panels elsewhere on the site */}
              <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-primary/50" />
              <span className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-primary/50" />
              <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-primary/50" />
              <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-primary/50" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/10 to-transparent" />

              <div className="relative flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_8px_rgba(172,139,86,0.6)]" />
                Available for opportunities
              </div>

              <div className="relative mt-6 flex items-center gap-4">
                <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full border border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5 text-lg font-bold text-primary">
                  BA
                </div>
                <div>
                  <span className="block text-2xl font-bold">Bilal Ahmed</span>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-primary">AI Engineer</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span className="text-muted-foreground">Automation &amp; Web Solutions</span>
                  </div>
                </div>
              </div>

              <div className="relative my-6 h-px bg-border" />

              <dl className="relative space-y-4 text-sm">
                {[
                  ["Based in", "Islamabad, Pakistan"],
                  ["Focus", "AI · Automation · Web"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-medium text-foreground">{value}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a
                      href="mailto:ch.bilal.ahmed595@gmail.com"
                      className="font-medium text-primary hover:underline"
                    >
                      ch.bilal.ahmed595@gmail.com
                    </a>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd className="font-medium text-foreground">+92 334 7066654</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
