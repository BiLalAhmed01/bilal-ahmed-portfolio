import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  location?: string;
  badge: string;
  /** Tailwind classes for the badge pill and the spine node/dot — kept
   *  together per entry so each color pairing (bg/text/border/shadow) stays
   *  consistent, the way the reference component color-codes by category. */
  accent: { badge: string; node: string; dot: string };
  icon: LucideIcon;
  image: string;
  bullets?: string[];
  tags?: string[];
}

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative">
      {/* Central spine */}
      <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block" />
      <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:hidden" />

      <div className="flex flex-col gap-14">
        {entries.map((entry, i) => {
          const Icon = entry.icon;
          const isRight = i % 2 === 0;

          return (
            <div key={entry.id} className="relative">
              {/* Spine node */}
              <div
                className={`absolute left-6 top-6 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border ${entry.accent.node} md:left-1/2`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </div>

              <Reveal
                direction="up"
                distance={72}
                delay={Math.min(i, 4) * 0.08}
                className={`ml-14 md:ml-0 md:w-[calc(50%-2.5rem)] ${isRight ? "md:ml-auto" : "md:mr-auto"}`}
              >
                <div className="glass-card overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={entry.image}
                      alt={`${entry.title} — ${entry.subtitle}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span
                      className={`absolute right-3 top-3 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm ${entry.accent.badge}`}
                    >
                      {entry.badge}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                        {entry.date}
                      </span>
                      <span className={`h-2 w-2 flex-none rounded-full ${entry.accent.dot}`} />
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-foreground">{entry.title}</h3>
                    <p className="mt-0.5 text-sm text-primary">{entry.subtitle}</p>
                    {entry.location ? (
                      <p className="mt-0.5 text-xs text-muted-foreground">{entry.location}</p>
                    ) : null}

                    {entry.bullets?.length ? (
                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        {entry.bullets.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="mt-2 h-1 w-1 flex-none rounded-full bg-primary" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {entry.tags?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                        {entry.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-secondary/50 px-2.5 py-1 text-[11px] text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </div>
  );
}
