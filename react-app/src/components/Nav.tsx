import { useState } from "react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { LogoMark } from "@/components/LogoMark";

const goToContact = () => {
  window.location.hash = "contact";
};

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6 md:px-8">
          <a href="#home" className="flex items-center gap-2 font-bold">
            <LogoMark className="h-8 w-8 rounded-md" />
            <span className="hidden text-sm text-foreground sm:inline">Bilal Ahmed</span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:inline-block">
            <LiquidMetalButton label="Let's Talk" width={128} onClick={goToContact} />
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`block h-[1.5px] w-5 bg-foreground transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
            />
            <span className={`block h-[1.5px] w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-[1.5px] w-5 bg-foreground transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background/98 backdrop-blur-lg transition-opacity lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="text-2xl font-medium text-foreground"
          >
            {l.label}
          </a>
        ))}
        <LiquidMetalButton
          label="Let's Talk"
          width={140}
          onClick={() => {
            setOpen(false);
            goToContact();
          }}
        />
      </div>
    </>
  );
}
