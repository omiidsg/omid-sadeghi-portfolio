import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getPublicProjects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getPublicProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: project.featured ? 0.8 : 0.5,
  }));

  return [...staticRoutes, ...projectRoutes];
}
