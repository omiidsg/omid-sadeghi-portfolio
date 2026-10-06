"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { Container } from "@/components/ui/container";
import { skillGroups } from "@/data/skills";

type AboutStat =
  | { kind: "count"; value: number; suffix: string; label: string }
  | { kind: "text"; value: string; label: string };

const stats: AboutStat[] = [
  { kind: "count", value: 4, suffix: "+", label: "Years Across Tech & Operations" },
  { kind: "count", value: 90, suffix: "%", label: "Peak Workflow Time Saved" },
  { kind: "text", value: "Live", label: "Production & Client Work" },
];

const paragraphs = [
  "I have direct, practical experience developing, maintaining, deploying and supporting web projects through project-based work and real client environments — including user-facing pages, dashboards, panels and service interfaces.",
  "At FANAP Telecom / Zitel, I managed varied operational structures and defined automation paths for different teams to reduce repetitive work and improve performance. That ops background still shapes how I approach software: find the bottleneck, ship something usable, support it after launch.",
  "I work extensively with Python tools for data processing, ticket workflows, reporting and monitoring — and with React, TypeScript and JavaScript for client web products. I use Cursor, Claude and ChatGPT to accelerate research, implementation and debugging, then manually review, understand and refine the final output before delivery.",
];

const reveal = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

type AnimatedCounterProps = {
  value: number;
  suffix: string;
};

function AnimatedCounter({ value, suffix }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200;
    const startTime = performance.now();

    const frame = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(value * eased));

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    const animation = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animation);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative isolate overflow-hidden py-28 sm:py-36">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute left-[-12rem] top-24 h-80 w-80 rounded-full bg-accent-purple/15 blur-3xl" />
        <div className="absolute bottom-10 right-[-10rem] h-96 w-96 rounded-full bg-primary-blue/10 blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ staggerChildren: 0.12 }}
          className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]"
        >
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.p
              variants={reveal}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs font-semibold uppercase tracking-[0.42em] text-primary-blue"
            >
              About Me
            </motion.p>

            <motion.h2
              variants={reveal}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-xl font-display text-[clamp(2.65rem,12vw,6.8rem)] font-black uppercase leading-[0.9] tracking-[-0.065em] text-text-white sm:leading-[0.85] sm:tracking-[-0.08em]"
            >
              Practical Web Work. Real Delivery.
            </motion.h2>

            <motion.div
              variants={reveal}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[var(--radius-md)] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
                >
                  <p className="font-display text-4xl font-black tracking-[-0.05em] text-text-white">
                    {stat.kind === "count" ? (
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2.25rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_30px_110px_rgba(0,191,255,0.08)] backdrop-blur-2xl sm:p-8"
          >
            <div className="rounded-[1.75rem] border border-white/10 bg-background/35 p-6 sm:p-8">
              <div className="space-y-6">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-8 text-text-muted sm:text-xl sm:leading-9">
                    {paragraph}
                  </p>
                ))}
                <p className="text-base leading-7 text-text-muted">
                  B.Sc. in Computer Engineering — Islamic Azad University, Shahr-e-Rey (2019 – Present).
                  Based in Tehran, Iran.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5 rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-primary-blue/[0.08] via-white/[0.035] to-accent-purple/[0.08] p-6 sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
                  Core Skills
                </p>
                <h3 className="mt-3 font-display text-3xl font-black tracking-[-0.05em] text-text-white sm:text-4xl">
                  Hiring-Relevant Stack
                </h3>
              </div>

              {skillGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
                    {group.label}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold text-text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
