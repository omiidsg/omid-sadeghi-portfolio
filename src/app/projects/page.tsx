import type { Metadata } from "next";

import { ProjectsShowcaseSection } from "@/components/sections/projects-showcase-section";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected client web products, frontend platforms and operational automation work by Omid Sadeghi.",
};

export default function ProjectsPage() {
  return <ProjectsShowcaseSection isPage />;
}
