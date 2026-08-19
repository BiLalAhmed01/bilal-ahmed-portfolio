import { Reveal } from "@/components/Reveal";

export function SectionHeader({
  tag,
  title,
  lead,
}: {
  tag: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal className="relative z-10 mb-16 max-w-2xl">
      <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.08em] text-primary">
        {tag}
      </span>
      <h2 className="font-[var(--font-sans)] text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {lead ? <p className="mt-3 text-muted-foreground">{lead}</p> : null}
    </Reveal>
  );
}
