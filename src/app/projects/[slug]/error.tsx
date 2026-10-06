"use client";

import Link from "next/link";
import { useEffect } from "react";

type ProjectErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProjectCaseError({ error, reset }: ProjectErrorProps) {
  useEffect(() => {
    console.error("Project case study render error:", error);
  }, [error]);

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center px-5 pt-28">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center backdrop-blur-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary-blue">
          Case Study
        </p>
        <h1 className="mt-4 font-display text-3xl font-black tracking-[-0.05em] text-text-white sm:text-4xl">
          This project page could not be loaded
        </h1>
        <p className="mt-4 text-base leading-7 text-text-muted">
          Please try again or return to Selected Work.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-primary-blue px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-background"
          >
            Try Again
          </button>
          <Link
            href="/projects"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-text-white"
          >
            Back To Work
          </Link>
        </div>
      </div>
    </main>
  );
}
