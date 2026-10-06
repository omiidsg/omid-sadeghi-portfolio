import Link from "next/link";

import { Container } from "@/components/ui/container";
import { navigationItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const socials = [
  { label: "Email", href: `mailto:${siteConfig.email}` },
  { label: "GitHub", href: siteConfig.github },
  { label: "LinkedIn", href: siteConfig.linkedin },
  ...(siteConfig.resumeUrl ? [{ label: "Resume", href: siteConfig.resumeUrl }] : []),
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 py-10 sm:py-12">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="noise-overlay absolute inset-0 opacity-20" />
        <div className="absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-primary-blue/10 blur-3xl" />
      </div>

      <Container>
        <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:gap-8 sm:p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-primary-blue/25 bg-primary-blue/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary-blue">
              <span className="h-2 w-2 rounded-full bg-primary-blue shadow-[0_0_18px_rgba(0,191,255,0.95)]" />
              Available For Frontend Work
            </div>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-black uppercase leading-[0.92] tracking-[-0.07em] text-text-white sm:mt-5 sm:text-4xl sm:leading-[0.9] md:text-6xl">
              Build Clean Interfaces. Ship Reliable Work.
            </h2>
          </div>

          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full bg-primary-blue px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-background shadow-[0_0_38px_rgba(0,191,255,0.32)] transition duration-300 hover:-translate-y-1"
          >
            <span className="relative z-10">Start A Conversation</span>
            <span className="absolute inset-0 -translate-x-full bg-white/40 transition duration-500 group-hover:translate-x-full" />
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between md:gap-6">
          <p className="font-display text-lg font-black uppercase tracking-[-0.04em] text-text-white">
            <span className="text-primary-blue">O</span>mid Sadeghi
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 md:gap-3">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted transition hover:text-primary-blue md:rounded-full md:border md:border-white/10 md:bg-white/[0.035] md:px-4 md:py-2"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") || social.href.endsWith(".pdf") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http") || social.href.endsWith(".pdf")
                    ? "noreferrer"
                    : undefined
                }
                className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted transition hover:text-primary-blue"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
