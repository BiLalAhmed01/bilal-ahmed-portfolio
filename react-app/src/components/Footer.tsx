import { Mail, MapPin, ArrowUp, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { TextHoverEffect } from "@/components/TextHoverEffect";
import { SocialIconButton } from "@/components/SocialIconButton";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
];

const MORE_LINKS = [
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://github.com/BiLalAhmed01", label: "GitHub", icon: GithubIcon },
  { href: "https://www.instagram.com/devxbilal/", label: "Instagram", icon: InstagramIcon },
  { href: "mailto:ch.bilal.ahmed595@gmail.com", label: "Email", icon: Mail },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        {label}
        <ArrowUpRight className="h-3 w-3 -translate-x-0.5 translate-y-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
      </a>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border pt-20">
      <div className="section-glow section-glow--bottom-left" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">
          <div>
            <a href="#home" className="inline-flex items-center gap-2 font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5 text-sm text-primary">
                BA
              </span>
              <span className="text-foreground">Bilal Ahmed</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              AI Engineer &amp; Web Developer building AI agents, automation workflows, and full-stack /
              WordPress websites for businesses.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_8px_rgba(172,139,86,0.6)]" />
              Available for opportunities
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-foreground">Navigate</h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((l) => (
                <FooterLink key={l.href} {...l} />
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-foreground">More</h3>
            <ul className="mt-4 space-y-3">
              {MORE_LINKS.map((l) => (
                <FooterLink key={l.href} {...l} />
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-foreground">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="mailto:ch.bilal.ahmed595@gmail.com"
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-3.5 w-3.5 flex-none text-primary" />
                  ch.bilal.ahmed595@gmail.com
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 flex-none text-primary" />
                Islamabad, Pakistan
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <SocialIconButton key={s.label} href={s.href} label={s.label} icon={s.icon} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-14 hidden h-32 w-full sm:block md:h-40">
        <TextHoverEffect text="BILAL AHMED" />
      </div>

      <div className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left md:px-8">
          <span className="text-xs text-muted-foreground">© 2026 Bilal Ahmed. All rights reserved.</span>
          <a
            href="#home"
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
