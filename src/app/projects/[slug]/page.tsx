import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ZitelAutomationWorkflow } from "@/components/projects/zitel-automation-workflow";
import { Container } from "@/components/ui/container";
import {
  getProjectBySlug,
  getPublicProjects,
  type ProjectCaseStudy,
  type ProjectScreenshot,
} from "@/data/projects";

type ProjectCasePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/** Only prebuilt public slugs are valid; drafts/unlisted must 404. */
export const dynamicParams = false;

function sectionLabel(index: number, title: string) {
  return `${String(index).padStart(2, "0")} — ${title}`;
}

function hasRealScreenshots(project: ProjectCaseStudy) {
  return Boolean(
    project.visualType !== "process" &&
      project.screenshots &&
      project.screenshots.length > 0,
  );
}

function hasProcessVisual(project: ProjectCaseStudy) {
  return Boolean(project.visualType === "process" && project.processVisual);
}

function hasDisplayMetrics(project: ProjectCaseStudy) {
  return Array.isArray(project.metrics) && project.metrics.length > 0;
}

function hasDisplayTechnologies(project: ProjectCaseStudy) {
  return Array.isArray(project.technologies) && project.technologies.length > 0;
}

function hasTechnicalModules(project: ProjectCaseStudy) {
  return Boolean(project.technicalModules && project.technicalModules.length > 0);
}

function getPrimaryScreenshot(shots: ProjectScreenshot[]) {
  const primary = shots.find((shot) => shot.emphasis === "primary");
  if (primary) return primary;
  const desktop = shots.find((shot) => shot.variant !== "mobile");
  return desktop ?? shots[0];
}

function ScreenshotFrame({
  shot,
  large = false,
}: {
  shot: ProjectScreenshot;
  large?: boolean;
}) {
  const isMobile = shot.variant === "mobile";
  const label = shot.caption ?? shot.alt;

  return (
    <a
      href={shot.src}
      target="_blank"
      rel="noreferrer"
      className={`group block overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/30 transition hover:border-primary-blue/40 ${
        isMobile ? "mx-auto w-full max-w-[280px] md:mx-0" : ""
      }`}
    >
      <div
        className={`flex items-center justify-center p-3 sm:p-4 ${
          isMobile ? "bg-gradient-to-b from-white/5 to-transparent" : ""
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shot.src}
          alt={shot.alt}
          className={`h-auto w-full object-contain ${
            large ? "max-h-[36rem] sm:max-h-[40rem]" : "max-h-[28rem]"
          } ${
            isMobile
              ? "rounded-[1.5rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
              : "rounded-lg border border-white/10"
          }`}
        />
      </div>
      <p className="border-t border-white/5 px-4 py-3 text-xs leading-5 text-text-muted transition group-hover:text-text-white/80">
        {label}
      </p>
    </a>
  );
}

export function generateStaticParams() {
  return getPublicProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectCasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectCasePage({ params }: ProjectCasePageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const showScreenshots = hasRealScreenshots(project);
  const showProcess = hasProcessVisual(project);
  const shots = showScreenshots ? project.screenshots! : [];
  const primaryShot = showScreenshots ? getPrimaryScreenshot(shots) : null;
  const galleryShots = primaryShot
    ? shots.filter((shot) => shot.src !== primaryShot.src)
    : [];

  const heroMeta = [
    { label: "Role", value: project.role },
    { label: "Status", value: project.status },
    { label: "Client", value: project.client },
  ].filter((item) => Boolean(item.value));

  const overviewItems = [
    { label: "Engagement", value: project.engagementType },
    { label: "Year", value: project.year },
    { label: "Category", value: project.category },
  ].filter((item) => Boolean(item.value));

  let caseSection = 1;
  const roleNumber =
    project.responsibilities && project.responsibilities.length > 0 ? caseSection++ : null;
  const decisionsNumber = project.decisions && project.decisions.length > 0 ? caseSection++ : null;
  const technicalNumber =
    hasTechnicalModules(project) ||
    hasDisplayTechnologies(project) ||
    (project.constraints && project.constraints.length > 0)
      ? caseSection++
      : null;
  const outcomeNumber = project.outcomes && project.outcomes.length > 0 ? caseSection++ : null;
  const impactNumber =
    project.subprojects &&
    project.subprojects.length > 0 &&
    project.subprojects.some((item) => item.metrics && item.metrics.length > 0)
      ? caseSection++
      : null;

  return (
    <main className="relative isolate min-h-screen overflow-hidden pt-24 sm:pt-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute left-[-12rem] top-24 h-96 w-96 rounded-full bg-primary-blue/12 blur-3xl" />
        <div className="absolute bottom-20 right-[-14rem] h-[30rem] w-[30rem] rounded-full bg-accent-purple/14 blur-3xl" />
      </div>

      <Container>
        <Link
          href="/projects"
          className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-text-muted transition hover:border-primary-blue/50 hover:text-primary-blue"
        >
          Back To Work
        </Link>

        {/* 1. PROJECT HERO — compact identity + CTAs */}
        <section className="mt-6 overflow-hidden rounded-[2.75rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_40px_150px_rgba(0,191,255,0.12)] backdrop-blur-2xl sm:mt-8 sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-primary-blue">
            Project
          </p>
          <h1 className="mt-4 max-w-5xl font-display text-[clamp(2.35rem,7vw,5.4rem)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-text-white">
            {project.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-text-muted sm:text-lg sm:leading-8">
            {project.summary}
          </p>

          {heroMeta.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {heroMeta.map((item) => (
                <div
                  key={item.label}
                  className="rounded-full border border-white/10 bg-background/30 px-4 py-2"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                    {item.label}
                  </span>
                  <span className="ml-2 text-sm font-semibold text-text-white">{item.value}</span>
                </div>
              ))}
            </div>
          ) : null}

          {hasDisplayTechnologies(project) ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-primary-blue/25 bg-primary-blue/[0.08] px-3 py-2 text-xs font-semibold text-text-white sm:text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-7 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-primary-blue px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-background shadow-[0_0_34px_rgba(0,191,255,0.28)] transition hover:-translate-y-1"
              >
                Visit Live Site
              </a>
            ) : null}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-text-white transition hover:border-primary-blue/50 hover:text-primary-blue"
              >
                View GitHub
              </a>
            ) : null}
            <a
              href="#case-study"
              className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-text-muted transition hover:border-primary-blue/50 hover:text-primary-blue"
            >
              Full Case Study
            </a>
          </div>
        </section>

        {/* 2–3. PRIMARY VISUAL + GALLERY (or Zitel process visual) */}
        {primaryShot ? (
          <section className="mt-6 space-y-5 sm:mt-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
                Product Visual
              </p>
              <div className="mt-4">
                <ScreenshotFrame shot={primaryShot} large />
              </div>
            </div>

            {galleryShots.length > 0 ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-text-muted">
                  Project Gallery
                </p>
                <div
                  className={`mt-4 grid gap-5 ${
                    galleryShots.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"
                  }`}
                >
                  {galleryShots.map((shot) => (
                    <ScreenshotFrame key={shot.src} shot={shot} />
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        {showProcess ? (
          <section className="mt-6 space-y-6 sm:mt-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
                {project.processVisual?.title ?? "Automation Workflow"}
              </p>
              <div className="mt-4">
                {project.processVisual?.type === "zitel-automation-suite" ? (
                  <ZitelAutomationWorkflow />
                ) : null}
              </div>
            </div>

            {hasTechnicalModules(project) ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-text-muted">
                  Technical Modules
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {project.technicalModules!.map((module) => (
                    <article
                      key={module.name}
                      className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5"
                    >
                      <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-blue">
                        {module.name}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-text-soft">
                        {module.items.join(" · ")}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            {project.subprojects && project.subprojects.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-3">
                {project.subprojects.map((module, index) => (
                  <article
                    key={`module-${module.title}`}
                    className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-blue">
                      Module {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-black tracking-[-0.04em] text-text-white">
                      {module.title}
                    </h3>
                    {module.stack && module.stack.length > 0 ? (
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                        {module.stack.join(" · ")}
                      </p>
                    ) : null}
                    {module.impact ? (
                      <p className="mt-3 text-sm leading-7 text-text-soft">{module.impact}</p>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        {/* 5. SHORT PROJECT OVERVIEW */}
        <section className="mt-8 space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
            Project Overview
          </p>

          {hasDisplayMetrics(project) ? (
            <div className="grid gap-4 md:grid-cols-3">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[var(--radius-md)] border border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
                >
                  <p className="font-display text-3xl font-black tracking-[-0.06em] text-text-white sm:text-4xl">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          {overviewItems.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-3">
              {overviewItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-text-white">{item.value}</p>
                </div>
              ))}
            </div>
          ) : null}

          {project.businessNeed || project.deliveredOutput ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {project.businessNeed ? (
                <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-blue">
                    What It Is / Problem
                  </p>
                  <p className="mt-3 text-sm leading-7 text-text-muted sm:text-base sm:leading-8">
                    {project.businessNeed}
                  </p>
                </article>
              ) : null}
              {project.deliveredOutput ? (
                <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-blue">
                    What I Delivered
                  </p>
                  <p className="mt-3 text-sm leading-7 text-text-muted sm:text-base sm:leading-8">
                    {project.deliveredOutput}
                  </p>
                </article>
              ) : null}
            </div>
          ) : null}
        </section>

        {/* 6. FULL CASE STUDY */}
        <section id="case-study" className="mt-10 scroll-mt-28 space-y-5 pb-28">
          <div className="border-b border-white/10 pb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-primary-blue">
              Full Case Study
            </p>
            <h2 className="mt-3 font-display text-3xl font-black tracking-[-0.05em] text-text-white sm:text-4xl">
              Detailed Delivery Notes
            </h2>
          </div>

          {roleNumber !== null ? (
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
                {sectionLabel(roleNumber, "My Role")}
              </p>
              <ul className="mt-5 space-y-3">
                {project.responsibilities!.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-8 text-text-muted">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-blue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ) : null}

          {decisionsNumber !== null ? (
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
                {sectionLabel(decisionsNumber, "Key Decisions")}
              </p>
              <ul className="mt-5 space-y-3">
                {project.decisions!.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-8 text-text-muted">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-purple" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ) : null}

          {technicalNumber !== null && !showProcess ? (
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
                {sectionLabel(technicalNumber, "Technical Implementation")}
              </p>
              {hasTechnicalModules(project) ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {project.technicalModules!.map((module) => (
                    <div
                      key={module.name}
                      className="rounded-[1.5rem] border border-white/10 bg-background/30 p-5"
                    >
                      <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-blue">
                        {module.name}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-text-soft">
                        {module.items.join(" · ")}
                      </p>
                    </div>
                  ))}
                </div>
              ) : hasDisplayTechnologies(project) ? (
                <p className="mt-5 text-base leading-8 text-text-muted">
                  Built with {project.technologies.join(", ")}.
                </p>
              ) : null}
              {project.constraints && project.constraints.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {project.constraints.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-8 text-text-muted">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ) : null}

          {technicalNumber !== null && showProcess && project.constraints && project.constraints.length > 0 ? (
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
                {sectionLabel(technicalNumber, "Constraints")}
              </p>
              <ul className="mt-5 space-y-3">
                {project.constraints.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-8 text-text-muted">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-blue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ) : null}

          {outcomeNumber !== null ? (
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
                {sectionLabel(outcomeNumber, "Outcome")}
              </p>
              <ul className="mt-5 space-y-3">
                {project.outcomes!.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-8 text-text-muted">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-blue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ) : null}

          {impactNumber !== null ? (
            <article className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
                {sectionLabel(impactNumber, project.impactSectionLabel ?? "Suite Components")}
              </p>
              <div className="grid gap-4 lg:grid-cols-3">
                {project.subprojects!.map((subproject) => (
                  <div
                    key={subproject.title}
                    className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5"
                  >
                    <h3 className="font-display text-xl font-black tracking-[-0.04em] text-text-white">
                      {subproject.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-text-muted">{subproject.summary}</p>
                    {subproject.metrics && subproject.metrics.length > 0 ? (
                      <div className="mt-4 space-y-2">
                        {subproject.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="flex items-baseline justify-between gap-3 border-t border-white/10 pt-2 text-sm"
                          >
                            <span className="text-text-muted">{metric.label}</span>
                            <span className="font-semibold text-text-white">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>
          ) : null}
        </section>
      </Container>
    </main>
  );
}
