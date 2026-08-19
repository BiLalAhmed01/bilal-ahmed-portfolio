import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 font-bold text-primary">
            [BA]
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">Bilal Ahmed</span>
            <span className="text-xs text-muted-foreground">AI Engineer · Automation &amp; Web Solutions</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/BiLalAhmed01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/devxbilal/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href="mailto:ch.bilal.ahmed595@gmail.com"
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>

        <span className="text-xs text-muted-foreground">© 2026 Bilal Ahmed</span>

        <a
          href="#home"
          aria-label="Back to top"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ArrowUp className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
