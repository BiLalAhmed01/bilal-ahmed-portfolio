import { useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { Mail, MapPin, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Reveal } from "@/components/Reveal";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

// Formspree endpoint for this site's contact form — https://formspree.io/f/<id>
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaewlknp";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot tripped — silently pretend success without actually submitting.
    if (honeypotRef.current?.value) {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal className="mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-primary">08 / Get In Touch</span>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <Reveal direction="left">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Let's build something <span className="accent-text">great together.</span>
              </h2>
            </Reveal>
            <Reveal direction="left" delay={0.06}>
              <p className="mt-4 max-w-md text-muted-foreground">
                Have a project, idea, or opportunity in mind? Let's discuss how I can help turn it into a modern
                digital solution.
              </p>
            </Reveal>

            <Reveal direction="left" delay={0.12} className="mt-8 space-y-1">
              {[
                {
                  label: "Email",
                  value: "ch.bilal.ahmed595@gmail.com",
                  href: "mailto:ch.bilal.ahmed595@gmail.com",
                  icon: Mail,
                },
                { label: "Location", value: "Islamabad, Pakistan", icon: MapPin },
                {
                  label: "Available For",
                  value: "AI & Automation · Web Development · Freelance Projects",
                  icon: Sparkles,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 border-b border-border py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <item.icon className="h-3.5 w-3.5 text-primary" strokeWidth={1.75} />
                    {item.label}
                  </span>
                  {item.href ? (
                    <a href={item.href} className="font-medium text-primary hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-medium text-foreground sm:text-right">{item.value}</span>
                  )}
                </div>
              ))}
            </Reveal>

            <Reveal direction="left" delay={0.18} className="mt-8 flex items-center gap-3">
              <a
                href="https://github.com/BiLalAhmed01"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary hover:shadow-[0_0_16px_rgba(172,139,86,0.25)]"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:ch.bilal.ahmed595@gmail.com"
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary hover:shadow-[0_0_16px_rgba(172,139,86,0.25)]"
              >
                <Mail className="h-4 w-4" />
              </a>
              <span className="ml-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_8px_rgba(172,139,86,0.6)]" />
                Usually replies within 24 hours
              </span>
            </Reveal>
          </div>

          <Reveal tilt className="relative">
            <div className="section-glow section-glow--right !top-0" />
            <form
              name="contact"
              onSubmit={handleSubmit}
              className="glass-card relative z-10 flex flex-col gap-5 overflow-hidden p-6 md:p-8"
            >
              <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-primary/50" />
              <span className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-primary/50" />
              <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-primary/50" />
              <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-primary/50" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/10 to-transparent" />
              <p className="hidden">
                <label>
                  Leave this field empty <input ref={honeypotRef} name="_gotcha" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cfName" className="text-xs font-medium text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="cfName"
                    name="name"
                    required
                    maxLength={120}
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange("name")}
                    className="rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-shadow focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cfEmail" className="text-xs font-medium text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="cfEmail"
                    name="email"
                    type="email"
                    required
                    maxLength={180}
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange("email")}
                    className="rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-shadow focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="cfSubject" className="text-xs font-medium text-muted-foreground">
                  Subject
                </label>
                <input
                  id="cfSubject"
                  name="subject"
                  required
                  maxLength={150}
                  placeholder="What can I help you with?"
                  value={form.subject}
                  onChange={handleChange("subject")}
                  className="rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-shadow focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="cfMessage" className="text-xs font-medium text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="cfMessage"
                  name="message"
                  required
                  rows={5}
                  maxLength={4000}
                  placeholder="Tell me a little about your project..."
                  value={form.message}
                  onChange={handleChange("message")}
                  className="resize-none rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-shadow focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
                />
              </div>

              <div
                className={`self-center ${status === "sending" ? "pointer-events-none opacity-70" : ""}`}
              >
                {/* The button's underlying <button> has no explicit type, so
                    inside this <form> it defaults to type="submit" and still
                    triggers the real onSubmit handler above. */}
                <LiquidMetalButton
                  label={status === "sending" ? "Sending…" : status === "sent" ? "Message sent" : "Send Message"}
                  width={168}
                />
              </div>

              {status === "sent" ? (
                <p role="status" className="text-center text-sm text-emerald-400">
                  Thanks — I'll get back to you soon.
                </p>
              ) : null}
              {status === "error" ? (
                <p role="alert" className="text-center text-sm text-red-400">
                  Something went wrong. Please email me directly instead.
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
