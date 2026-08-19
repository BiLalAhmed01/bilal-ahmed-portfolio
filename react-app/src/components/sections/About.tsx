import { Reveal } from "@/components/Reveal";

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
            <Reveal direction="left" delay={0.21} className="mt-6 flex flex-wrap gap-2">
              {["AI Systems", "Automation", "Frontend"].map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs font-medium text-foreground"
                >
                  {p}
                </span>
              ))}
            </Reveal>
          </div>

          <Reveal tilt>
            <div className="glass-card p-8">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_8px_rgba(172,139,86,0.6)]" />
                Available for opportunities
              </div>

              <div className="mt-6">
                <span className="block text-2xl font-bold">Bilal Ahmed</span>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-primary">AI Engineer</span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span className="text-muted-foreground">Automation &amp; Web Solutions</span>
                </div>
              </div>

              <div className="my-6 h-px bg-border" />

              <dl className="space-y-4 text-sm">
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
