import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ZitelAutomationWorkflow } from "@/components/projects/zitel-automation-workflow";
import { Container } from "@/components/ui/container";
import { getProjectBySlug, getPublicProjects, type ProjectCaseStudy } from "@/data/projects";

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

  const overviewItems = [
    { label: "Role", value: project.role },
    { label: "Client", value: project.client },
    { label: "Engagement", value: project.engagementType },
    { label: "Status", value: project.status },
    { label: "Year", value: project.year },
    { label: "Category", value: project.category },
  ].filter((item) => Boolean(item.value));

  let sectionIndex = 1;

  const overviewNumber = sectionIndex++;
  const businessNumber = project.businessNeed ? sectionIndex++ : null;
  const deliveredNumber = project.deliveredOutput ? sectionIndex++ : null;
  const roleNumber =
    project.responsibilities && project.responsibilities.length > 0 ? sectionIndex++ : null;
  const decisionsNumber = project.decisions && project.decisions.length > 0 ? sectionIndex++ : null;
  const technicalNumber =
    hasTechnicalModules(project) ||
    hasDisplayTechnologies(project) ||
    (project.constraints && project.constraints.length > 0)
      ? sectionIndex++
      : null;
  const outcomeNumber = project.outcomes && project.outcomes.length > 0 ? sectionIndex++ : null;
  const impactNumber =
    project.subprojects &&
    project.subprojects.length > 0 &&
    project.subprojects.some((item) => item.metrics && item.metrics.length > 0)
      ? sectionIndex++
      : null;
  const processNumber = hasProcessVisual(project) ? sectionIndex++ : null;
  const visualNumber = hasRealScreenshots(project) ? sectionIndex++ : null;

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

        <section className="mt-6 overflow-hidden rounded-[2.75rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_40px_150px_rgba(0,191,255,0.12)] backdrop-blur-2xl sm:mt-8 sm:p-10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-primary-blue">
            {sectionLabel(overviewNumber, "Overview")}
          </p>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.6rem,8vw,6.4rem)] font-black uppercase leading-[0.88] tracking-[-0.08em] text-text-white">
            {project.title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-text-muted sm:text-xl">
            {project.summary}
          </p>

          {overviewItems.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {overviewItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.25rem] border border-white/10 bg-background/30 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-text-white sm:text-base">{item.value}</p>
                </div>
              ))}
            </div>
          ) : null}

          {hasDisplayTechnologies(project) ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-primary-blue/25 bg-primary-blue/[0.08] px-4 py-3 text-sm font-semibold text-text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
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
          </div>
        </section>

        {hasDisplayMetrics(project) ? (
          <section className="grid gap-5 py-8 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[var(--radius-md)] border border-white/10 bg-white/[0.045] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
              >
                <p className="font-display text-4xl font-black tracking-[-0.06em] text-text-white">
                  {metric.value}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
                  {metric.label}
                </p>
              </div>
            ))}
          </section>
        ) : (
          <div className="py-5" />
        )}

        {businessNumber !== null || deliveredNumber !== null ? (
          <section className="grid gap-5 pb-8 lg:grid-cols-2">
            {businessNumber !== null ? (
              <article className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
                  {sectionLabel(businessNumber, "Business Need")}
                </p>
                <p className="mt-5 text-base leading-8 text-text-muted">{project.businessNeed}</p>
              </article>
            ) : null}
            {deliveredNumber !== null ? (
              <article className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
                  {sectionLabel(deliveredNumber, "What I Delivered")}
                </p>
                <p className="mt-5 text-base leading-8 text-text-muted">{project.deliveredOutput}</p>
              </article>
            ) : null}
          </section>
        ) : null}

        {roleNumber !== null ? (
          <section className="mb-5 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
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
          </section>
        ) : null}

        {decisionsNumber !== null ? (
          <section className="mb-5 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
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
          </section>
        ) : null}

        {technicalNumber !== null ? (
          <section className="mb-5 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
              {sectionLabel(technicalNumber, "Technical Implementation")}
            </p>
            {hasTechnicalModules(project) ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {project.technicalModules!.map((module) => (
                  <article
                    key={module.name}
                    className="rounded-[1.5rem] border border-white/10 bg-background/30 p-5"
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
          </section>
        ) : null}

        {outcomeNumber !== null ? (
          <section className="mb-5 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
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
          </section>
        ) : null}

        {impactNumber !== null ? (
          <section className="mb-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
              {sectionLabel(impactNumber, project.impactSectionLabel ?? "Suite Components")}
            </p>
            <div className="grid gap-4 lg:grid-cols-3">
              {project.subprojects!.map((subproject) => (
                <article
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
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {processNumber !== null ? (
          <section className={`space-y-6 ${visualNumber === null ? "mb-28" : "mb-8"}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
              {sectionLabel(processNumber, project.processVisual?.title ?? "Automation Workflow")}
            </p>
            {project.processVisual?.type === "zitel-automation-suite" ? (
              <ZitelAutomationWorkflow />
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

        {visualNumber !== null ? (
          <section className="mb-28 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
              {sectionLabel(visualNumber, "Visual Evidence")}
            </p>
            {(() => {
              const shots = project.screenshots!;
              const hasPrimary = shots.some((shot) => shot.emphasis === "primary");
              const primaryShots = hasPrimary
                ? shots.filter((shot) => shot.emphasis === "primary")
                : [];
              const supportingShots = hasPrimary
                ? shots.filter((shot) => shot.emphasis !== "primary")
                : shots;

              const renderShot = (
                shot: (typeof shots)[number],
                options?: { large?: boolean },
              ) => {
                const isMobile = shot.variant === "mobile";
                const label = shot.caption ?? shot.alt;
                return (
                  <a
                    key={shot.src}
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
                          options?.large ? "max-h-[34rem]" : "max-h-[28rem]"
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
              };

              return (
                <div className="mt-6 space-y-6">
                  {primaryShots.map((shot) => renderShot(shot, { large: true }))}
                  <div
                    className={`grid gap-6 ${
                      supportingShots.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"
                    }`}
                  >
                    {supportingShots.map((shot) => renderShot(shot))}
                  </div>
                </div>
              );
            })()}
          </section>
        ) : (
          <div className="mb-28" />
        )}
      </Container>
    </main>
  );
}
