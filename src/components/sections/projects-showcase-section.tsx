"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import type { ProjectCaseStudy } from "@/data/projects";
import { getAdditionalProjects, getFeaturedProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectsShowcaseSectionProps = {
  isPage?: boolean;
};

type ProjectCardProps = {
  project: ProjectCaseStudy;
  index: number;
  /** First visible cards skip opacity-0 entrance so first paint is never blank */
  animateOnView?: boolean;
};

function ProjectCard({ project, index, animateOnView = true }: ProjectCardProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });

  function handlePointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setTilt({
      rotateX: (0.5 - y) * 10,
      rotateY: (x - 0.5) * 12,
      glowX: x * 100,
      glowY: y * 100,
    });
  }

  function resetTilt() {
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  }

  return (
    <motion.div
      initial={animateOnView ? { opacity: 0, y: 28 } : false}
      whileInView={animateOnView ? { opacity: 1, y: 0 } : undefined}
      animate={animateOnView ? undefined : { opacity: 1, y: 0 }}
      viewport={animateOnView ? { once: true, amount: 0.15 } : undefined}
      transition={{ duration: 0.55, delay: animateOnView ? index * 0.05 : 0, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
      style={{ perspective: "1200px" }}
    >
      <Link
        href={`/projects/${project.slug}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        className="group block h-full text-left outline-none"
      >
        <div
          className="premium-card relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition duration-300 group-hover:border-primary-blue/45 group-focus-visible:border-primary-blue/70 sm:min-h-[28rem] sm:p-8"
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(0)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(0,191,255,0.2), transparent 34%)`,
            }}
          />

          <div className="relative flex h-full flex-col" style={{ transform: "translateZ(40px)" }}>
            <div className="flex items-start justify-between gap-5">
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-primary-blue/30 bg-primary-blue/[0.08] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-blue">
                {project.status}
              </span>
            </div>

            <div className="mt-8 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-muted">
                {project.category}
              </p>
              <h3 className="mt-3 font-display text-[1.7rem] font-black leading-tight tracking-[-0.06em] text-text-white sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-4 line-clamp-3 text-sm leading-7 text-text-muted sm:text-base">
                {project.summary}
              </p>
              <p className="mt-4 line-clamp-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-blue">
                {project.role}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 pt-2">
              {project.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-background/40 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-primary-blue transition group-hover:text-text-white">
              View Project →
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectsShowcaseSection({ isPage = false }: ProjectsShowcaseSectionProps) {
  const featured = getFeaturedProjects();
  const additional = getAdditionalProjects();
  // On /projects all cards start in/near viewport; on home keep first row visible immediately.
  const immediateCount = isPage ? featured.length : 2;

  return (
    <section
      id="projects"
      className={cn(
        "relative isolate overflow-hidden py-28 sm:py-36",
        isPage && "min-h-screen pt-32 sm:pt-40",
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute left-[-12rem] top-24 h-96 w-96 rounded-full bg-primary-blue/10 blur-3xl" />
        <div className="absolute bottom-20 right-[-14rem] h-[30rem] w-[30rem] rounded-full bg-accent-purple/14 blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-primary-blue">
            Selected Work
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.65rem,12vw,6.8rem)] font-black uppercase leading-[0.9] tracking-[-0.065em] text-text-white sm:leading-[0.85] sm:tracking-[-0.08em]">
            Client Products & Tools
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-muted">
            Frontend delivery, client web products and operational automation — selected for real
            business need and measurable delivery.
          </p>
        </motion.div>

        <div className="mt-16 grid auto-rows-fr gap-6 md:grid-cols-2">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              animateOnView={index >= immediateCount}
            />
          ))}
        </div>

        {additional.length > 0 ? (
          <div className="mt-20">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-text-muted">
              Additional Work
            </p>
            <div
              className={cn(
                "mt-6 grid gap-4",
                additional.length === 1 ? "grid-cols-1" : "md:grid-cols-2",
              )}
            >
              {additional.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className={cn(
                    "rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 text-left transition hover:border-primary-blue/40",
                    additional.length === 1 && "md:flex md:items-center md:justify-between md:gap-8 md:p-7",
                  )}
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary-blue">
                      {project.category}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-black tracking-[-0.04em] text-text-white">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-text-muted">{project.summary}</p>
                  </div>
                  <span className="mt-4 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-primary-blue md:mt-0">
                    View Project
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
