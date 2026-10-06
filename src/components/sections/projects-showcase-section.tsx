"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  onOpen: (project: ProjectCaseStudy) => void;
  /** First visible cards skip opacity-0 entrance so first paint is never blank */
  animateOnView?: boolean;
};

function ProjectCard({ project, index, onOpen, animateOnView = true }: ProjectCardProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
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
    <motion.button
      type="button"
      initial={animateOnView ? { opacity: 0, y: 28 } : false}
      whileInView={animateOnView ? { opacity: 1, y: 0 } : undefined}
      animate={animateOnView ? undefined : { opacity: 1, y: 0 }}
      viewport={animateOnView ? { once: true, amount: 0.15 } : undefined}
      transition={{ duration: 0.55, delay: animateOnView ? index * 0.05 : 0, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpen(project)}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      className="group h-full text-left outline-none"
      style={{ perspective: "1200px" }}
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
        </div>
      </div>
    </motion.button>
  );
}

export function ProjectsShowcaseSection({ isPage = false }: ProjectsShowcaseSectionProps) {
  const featured = getFeaturedProjects();
  const additional = getAdditionalProjects();
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  // On /projects all cards start in/near viewport; on home keep first row visible immediately.
  const immediateCount = isPage ? featured.length : 2;

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
              onOpen={setSelectedProject}
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
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => setSelectedProject(project)}
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
                  {additional.length === 1 ? (
                    <span className="mt-4 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-primary-blue md:mt-0">
                      View
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </Container>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-5 backdrop-blur-2xl"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2.25rem] border border-white/10 bg-background-elevated/95 p-6 shadow-[0_40px_140px_rgba(0,191,255,0.2)] backdrop-blur-2xl sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative">
                <div className="flex items-start justify-between gap-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.42em] text-primary-blue">
                    Project Detail
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-text-white transition hover:border-primary-blue/50 hover:text-primary-blue"
                  >
                    Close
                  </button>
                </div>

                <h3 className="mt-6 font-display text-4xl font-black tracking-[-0.06em] text-text-white sm:text-5xl">
                  {selectedProject.title}
                </h3>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-text-muted">
                  {selectedProject.role}
                </p>
                <p className="mt-5 text-lg leading-8 text-text-muted">{selectedProject.summary}</p>

                {selectedProject.metrics.length > 0 ? (
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {selectedProject.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-[var(--radius-md)] border border-white/10 bg-white/[0.045] p-4"
                      >
                        <p className="font-display text-2xl font-black tracking-[-0.05em] text-text-white">
                          {metric.value}
                        </p>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {selectedProject.technologies.length > 0 ? (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-primary-blue/25 bg-primary-blue/[0.08] px-4 py-3 text-sm font-semibold text-text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/projects/${selectedProject.slug}`}
                    className="rounded-full bg-primary-blue px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.18em] text-background shadow-[0_0_34px_rgba(0,191,255,0.28)] transition hover:-translate-y-1"
                  >
                    Read Case Study
                  </Link>
                  {selectedProject.liveUrl ? (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-primary-blue/40 bg-primary-blue/[0.08] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.18em] text-primary-blue transition hover:-translate-y-1 hover:bg-primary-blue hover:text-background"
                    >
                      Visit Live Site
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-text-white transition hover:border-primary-blue/50 hover:text-primary-blue"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
