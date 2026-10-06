"use client";

import dynamic from "next/dynamic";

function GalaxyFallback() {
  return (
    <section id="skills" className="relative isolate overflow-hidden py-28 sm:py-36">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-blue/10 blur-3xl" />
      </div>
      <div className="mx-auto w-full max-w-[var(--container)] px-5 sm:px-6 lg:px-8">
        <div className="grid h-[34rem] place-items-center rounded-[2.5rem] border border-white/10 bg-white/[0.035] shadow-[0_36px_130px_rgba(0,191,255,0.12)] backdrop-blur-2xl sm:h-[42rem]">
          <div className="h-24 w-24 rounded-full border border-primary-blue/30 border-t-primary-blue shadow-[0_0_50px_rgba(0,191,255,0.28)]" />
        </div>
      </div>
    </section>
  );
}

export const LazySkillsGalaxySection = dynamic(
  () =>
    import("@/components/sections/skills-galaxy-section").then(
      (module) => module.SkillsGalaxySection,
    ),
  {
    ssr: false,
    loading: GalaxyFallback,
  },
);
