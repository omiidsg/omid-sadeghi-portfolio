"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Container } from "@/components/ui/container";
import { experiences } from "@/data/experience";

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(lineRef.current, { scaleY: 1 });
        gsap.set(cardRefs.current, { autoAlpha: 1, x: 0, y: 0, rotateX: 0, filter: "blur(0px)" });
        return;
      }

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 68%",
            end: "bottom 72%",
            scrub: true,
          },
        },
      );

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            autoAlpha: 0,
            x: index % 2 === 0 ? -50 : 50,
            y: 28,
            rotateX: 4,
            filter: "blur(8px)",
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative isolate overflow-hidden py-28 sm:py-36">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary-blue/10 blur-3xl" />
        <div className="absolute bottom-0 left-[-14rem] h-96 w-96 rounded-full bg-accent-purple/12 blur-3xl" />
      </div>

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-primary-blue">
            Experience
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.65rem,12vw,6.8rem)] font-black uppercase leading-[0.9] tracking-[-0.065em] text-text-white sm:leading-[0.85] sm:tracking-[-0.08em]">
            Career Timeline
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-muted">
            From technical support and operations leadership to frontend delivery on client web
            products.
          </p>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
            <div
              ref={lineRef}
              className="h-full w-px origin-top bg-gradient-to-b from-primary-blue via-accent-purple to-primary-blue shadow-[0_0_28px_rgba(0,191,255,0.7)]"
            />
          </div>

          <div className="space-y-10 md:space-y-16">
            {experiences.map((experience, index) => (
              <div
                key={`${experience.position}-${experience.duration}`}
                className="relative grid gap-6 pl-12 md:grid-cols-2 md:gap-14 md:pl-0"
              >
                <div
                  className={["relative", index % 2 === 0 ? "md:pr-0" : "md:col-start-2"].join(" ")}
                >
                  <span
                    className={[
                      "absolute -left-[2.55rem] top-8 z-10 h-5 w-5 rounded-full border bg-background",
                      index % 2 === 0
                        ? "border-primary-blue shadow-[0_0_26px_rgba(0,191,255,0.85)] md:left-auto md:right-[-2.45rem]"
                        : "border-accent-purple shadow-[0_0_26px_rgba(123,97,255,0.85)] md:left-[-2.45rem]",
                    ].join(" ")}
                  />

                  <div
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-primary-blue/35 hover:bg-white/[0.065] sm:p-8"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/[0.12] via-transparent to-accent-purple/[0.12] opacity-0 transition duration-500 group-hover:opacity-100" />

                    <div className="relative">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-blue">
                            {experience.duration}
                          </p>
                          <h3 className="mt-4 font-display text-3xl font-black tracking-[-0.05em] text-text-white sm:text-4xl">
                            {experience.position}
                          </h3>
                          <p className="mt-3 text-base font-semibold text-text-muted">
                            {experience.company}
                          </p>
                          {experience.engagementType ? (
                            <p className="mt-2 text-sm text-text-muted">{experience.engagementType}</p>
                          ) : null}
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <ul className="mt-7 space-y-4">
                        {experience.achievements.map((achievement) => (
                          <li
                            key={achievement}
                            className="flex gap-3 text-sm leading-7 text-text-muted sm:text-base"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-blue shadow-[0_0_14px_rgba(0,191,255,0.9)]" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      {experience.signals ? (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {experience.signals.map((signal) => (
                            <span
                              key={signal}
                              className="rounded-full border border-primary-blue/25 bg-primary-blue/[0.08] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-primary-blue"
                            >
                              {signal}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div
                  className={
                    index % 2 === 0
                      ? "hidden md:block"
                      : "hidden md:col-start-1 md:row-start-1 md:block"
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
