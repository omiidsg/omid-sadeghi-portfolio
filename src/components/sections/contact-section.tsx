"use client";

import { useSpring, motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const contactLinks = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
  { label: "LinkedIn", value: "LinkedIn Profile", href: siteConfig.linkedin },
  { label: "GitHub", value: "github.com/omiidsg", href: siteConfig.github },
  ...(siteConfig.resumeUrl
    ? [{ label: "Resume", value: "Download PDF", href: siteConfig.resumeUrl }]
    : []),
];

type ContactSectionProps = {
  isPage?: boolean;
};

type MagneticLinkProps = {
  label: string;
  value: string;
  href: string;
  index: number;
};

function MagneticLink({ label, value, href, index }: MagneticLinkProps) {
  const x = useSpring(0, { stiffness: 170, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 170, damping: 18, mass: 0.4 });

  function handlePointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  }

  function resetMagnet() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
      rel={href.startsWith("http") || href.endsWith(".pdf") ? "noreferrer" : undefined}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetMagnet}
      style={{ x, y }}
      className="premium-card group relative overflow-hidden rounded-[var(--radius-md)] border border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition duration-300 hover:border-primary-blue/50 hover:bg-primary-blue/[0.08]"
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition duration-700 group-hover:translate-x-full" />
      <span className="relative block text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
        {label}
      </span>
      <span className="relative mt-4 block font-display text-2xl font-black tracking-[-0.05em] text-text-white">
        {value}
      </span>
      <span className="relative mt-4 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-text-muted transition duration-300 group-hover:text-text-white">
        Connect
      </span>
    </motion.a>
  );
}

export function ContactSection({ isPage = false }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className={cn(
        "relative isolate overflow-hidden py-28 sm:py-36",
        isPage && "min-h-screen pt-32 sm:pt-40",
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-blue/10 blur-3xl" />
        <div className="absolute bottom-[-14rem] left-[-12rem] h-[32rem] w-[32rem] rounded-full bg-accent-purple/14 blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="premium-card relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_40px_150px_rgba(0,191,255,0.12)] backdrop-blur-2xl sm:p-10 lg:p-12"
        >
          <div className="premium-grid absolute inset-0 opacity-45" />
          <div className="absolute right-[-10rem] top-[-10rem] h-80 w-80 rounded-full bg-primary-blue/20 blur-3xl" />
          <div className="absolute bottom-[-12rem] left-[-8rem] h-96 w-96 rounded-full bg-accent-purple/16 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.42em] text-primary-blue">
                Contact
              </p>
              <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,12vw,7.6rem)] font-black uppercase leading-[0.9] tracking-[-0.065em] text-text-white sm:leading-[0.84] sm:tracking-[-0.08em]">
                Let&apos;s Talk About Your Next Web Project
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-text-muted sm:text-xl">
                Open to frontend client work, product UI delivery, maintenance support and practical
                automation tooling.
              </p>
            </div>

            <div className="grid gap-4">
              {contactLinks.map((link, index) => (
                <MagneticLink key={link.label} {...link} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
