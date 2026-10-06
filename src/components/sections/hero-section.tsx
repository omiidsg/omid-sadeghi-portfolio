"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { Container } from "@/components/ui/container";
import { profileSummary, siteConfig } from "@/config/site";

const particles = [
  { left: "8%", top: "22%", size: "4px", delay: 0.1, duration: 5.8 },
  { left: "18%", top: "68%", size: "3px", delay: 0.5, duration: 6.5 },
  { left: "29%", top: "38%", size: "5px", delay: 0.2, duration: 7.2 },
  { left: "42%", top: "18%", size: "3px", delay: 0.9, duration: 5.5 },
  { left: "52%", top: "76%", size: "4px", delay: 0.3, duration: 6.8 },
  { left: "66%", top: "34%", size: "6px", delay: 0.7, duration: 7.6 },
  { left: "78%", top: "62%", size: "3px", delay: 0.4, duration: 6.1 },
  { left: "88%", top: "26%", size: "4px", delay: 1.1, duration: 7 },
  { left: "92%", top: "82%", size: "5px", delay: 0.6, duration: 6.6 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 22, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 22, mass: 0.5 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-10deg", "10deg"]);
  const orbX = useTransform(smoothX, [-0.5, 0.5], ["-28px", "28px"]);
  const orbY = useTransform(smoothY, [-0.5, 0.5], ["-22px", "22px"]);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <motion.div
          style={{ x: orbX, y: orbY }}
          className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-blue/10 blur-3xl"
        />
        <motion.div
          style={{ rotateX, rotateY }}
          className="hero-perspective absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="hero-orbit absolute inset-0 rounded-[4rem] border border-primary-blue/25 bg-primary-blue/[0.025] shadow-[0_0_120px_rgba(0,191,255,0.18)]" />
          <div className="hero-orbit-reverse absolute inset-10 rounded-full border border-accent-purple/30 bg-accent-purple/[0.03]" />
          <div className="absolute inset-24 rounded-[2rem] border border-white/10 bg-white/[0.035] backdrop-blur-md" />
        </motion.div>

        {particles.map((particle) => (
          <motion.span
            key={`${particle.left}-${particle.top}`}
            className="absolute hidden rounded-full bg-primary-blue shadow-[0_0_18px_rgba(0,191,255,0.9)] sm:block"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{ y: [-16, 18, -16], opacity: [0.2, 1, 0.2], scale: [1, 1.6, 1] }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <Container className="relative z-10">
        <div className="grid min-h-[calc(100vh-6rem)] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12, delayChildren: 0.15 }}
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 inline-flex rounded-full border border-primary-blue/25 bg-primary-blue/[0.07] px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-primary-blue shadow-[0_0_32px_rgba(0,191,255,0.12)] sm:text-xs sm:tracking-[0.42em]"
            >
              OMID SADEGHI
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.45rem,13vw,10.5rem)] font-black uppercase leading-[0.9] tracking-[-0.06em] text-text-white sm:text-[clamp(3.15rem,17vw,10.5rem)] sm:leading-[0.78] sm:tracking-[-0.09em]"
            >
              <span className="block">Frontend</span>
              <span className="hero-gradient-text block">Developer</span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-text-muted sm:mt-8 sm:text-sm sm:tracking-[0.22em]"
            >
              <span>React</span>
              <span className="text-primary-blue/80">·</span>
              <span>TypeScript</span>
              <span className="text-primary-blue/80">·</span>
              <span>JavaScript</span>
              <span className="text-primary-blue/80">·</span>
              <span>Web Products</span>
              <span className="text-primary-blue/80">·</span>
              <span>Automation</span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-2xl text-base leading-7 text-text-muted sm:mt-8 sm:text-xl sm:leading-8"
            >
              {profileSummary}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <Link
                href="/projects"
                className="group relative overflow-hidden rounded-full bg-primary-blue px-8 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-background shadow-[0_0_40px_rgba(0,191,255,0.35)] transition duration-300 hover:-translate-y-1 sm:min-w-44"
              >
                <span className="relative z-10">View Selected Work</span>
                <span className="absolute inset-0 -translate-x-full bg-white/40 transition duration-500 group-hover:translate-x-full" />
              </Link>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-accent-purple/60 hover:bg-accent-purple/15 sm:min-w-44"
              >
                GitHub
              </a>
              {siteConfig.resumeUrl ? (
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-primary-blue/35 bg-primary-blue/[0.08] px-8 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-primary-blue backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-primary-blue hover:text-background sm:min-w-44"
                >
                  Download Resume
                </a>
              ) : null}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotateX, rotateY }}
            className="hero-perspective hidden min-h-[34rem] items-center justify-center lg:flex"
          >
            <div className="relative h-[30rem] w-[30rem] preserve-3d">
              <div className="absolute inset-0 rotate-45 rounded-[4rem] border border-primary-blue/25 bg-gradient-to-br from-primary-blue/15 via-white/[0.035] to-accent-purple/15 shadow-premium backdrop-blur-xl" />
              <div className="absolute inset-10 -rotate-12 rounded-[3rem] border border-white/10 bg-background-elevated/45 shadow-[0_30px_100px_rgba(123,97,255,0.22)]" />
              <div className="absolute inset-24 rounded-full border border-primary-blue/30 bg-primary-blue/10 blur-sm" />
              <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text-white shadow-[0_0_80px_rgba(255,255,255,0.55)]" />
            </div>
          </motion.div>
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-text-muted sm:flex"
      >
        <span>Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute left-0 top-0 h-5 w-px bg-primary-blue"
            animate={{ y: [0, 48] }}
            transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
