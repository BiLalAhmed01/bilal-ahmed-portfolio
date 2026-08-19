import { useState, type FormEvent, type ChangeEvent } from "react";
import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Reveal } from "@/components/Reveal";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...form }),
      });
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

            <Reveal direction="left" delay={0.12} className="mt-8 space-y-4">
              {[
                { label: "Email", value: "ch.bilal.ahmed595@gmail.com", href: "mailto:ch.bilal.ahmed595@gmail.com" },
                { label: "Location", value: "Islamabad, Pakistan" },
                { label: "Available For", value: "AI & Automation · Web Development · Freelance Projects" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5 border-b border-border pb-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-muted-foreground">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} className="font-medium text-primary hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-medium text-foreground">{item.value}</span>
                  )}
                </div>
              ))}
            </Reveal>

            <Reveal direction="left" delay={0.18} className="mt-6 flex gap-3">
              <a
                href="https://github.com/BiLalAhmed01"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:ch.bilal.ahmed595@gmail.com"
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Mail className="h-4 w-4" />
              </a>
            </Reveal>
          </div>

          <Reveal tilt className="relative">
            <div className="section-glow section-glow--right !top-0" />
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="glass-card relative z-10 flex flex-col gap-5 p-6 md:p-8"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Leave this field empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
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
                    className="rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
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
                    className="rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
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
                  className="rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
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
                  className="resize-none rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
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
