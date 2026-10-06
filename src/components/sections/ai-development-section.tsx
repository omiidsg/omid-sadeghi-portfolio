"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";

const steps = [
  {
    title: "Understand",
    body: "Clarify the requirement, constraints and what “done” looks like before writing code.",
  },
  {
    title: "Plan",
    body: "Break the work into implementable pieces and choose the simplest path that still meets the need.",
  },
  {
    title: "Build",
    body: "Use AI tools to accelerate research, scaffolding and first-pass implementation.",
  },
  {
    title: "Review",
    body: "Read the generated output carefully — structure, edge cases, naming and maintainability.",
  },
  {
    title: "Debug",
    body: "Reproduce failures, inspect behavior and fix issues instead of re-prompting blindly.",
  },
  {
    title: "Validate",
    body: "Check against designs, business requirements and real usage paths before handoff.",
  },
  {
    title: "Ship",
    body: "Deliver, then support maintenance and follow-up fixes when the product is live.",
  },
];

const tools = ["Cursor", "Claude", "ChatGPT"];

export function AiDevelopmentSection() {
  return (
    <section id="ai-development" className="relative isolate overflow-hidden py-28 sm:py-36">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute left-[-14rem] top-20 h-[30rem] w-[30rem] rounded-full bg-accent-purple/14 blur-3xl" />
        <div className="absolute bottom-[-12rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-primary-blue/10 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-primary-blue">
              How I Work With AI
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,10vw,5.6rem)] font-black uppercase leading-[0.9] tracking-[-0.065em] text-text-white">
              AI-Assisted Development Workflow
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-text-muted">
              I use AI to accelerate research, implementation and debugging — not as a replacement
              for understanding the code. Final delivery still goes through manual review,
              debugging and validation against requirements.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-text-white"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl transition hover:border-primary-blue/35"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-primary-blue">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-black tracking-[-0.04em] text-text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-text-muted sm:text-base">{step.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
