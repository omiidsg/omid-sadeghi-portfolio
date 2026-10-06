import { AboutSection } from "@/components/sections/about-section";
import { AiDevelopmentSection } from "@/components/sections/ai-development-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LazySkillsGalaxySection } from "@/components/sections/lazy-skills-galaxy-section";
import { ProjectsShowcaseSection } from "@/components/sections/projects-showcase-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsShowcaseSection />
      <AboutSection />
      <ExperienceSection />
      <LazySkillsGalaxySection />
      <AiDevelopmentSection />
      <ContactSection />
    </>
  );
}
