export type ExperienceItem = {
  company: string;
  position: string;
  duration: string;
  engagementType?: string;
  achievements: string[];
  signals?: string[];
};

export const experiences: ExperienceItem[] = [
  {
    company: "Studio 6×4",
    position: "Frontend Developer",
    duration: "Mar 2025 – Present",
    engagementType: "Project-based / Part-time",
    achievements: [
      "Developed, maintained and supported multiple web projects with different client requirements.",
      "Built user-facing pages, dashboards, panels and landing experiences using React, JavaScript, TypeScript and CSS.",
      "Worked with development teams to implement new features and improve existing functionality.",
      "Handled multiple projects and tasks in parallel with emphasis on fast delivery.",
      "Supported projects after launch and handled ongoing maintenance and debugging.",
      "Used Cursor, Claude and ChatGPT to accelerate research, implementation and debugging — then manually reviewed and refined the final output.",
      "Maintained implementation quality against provided designs and business requirements.",
    ],
    signals: ["Speed", "Multitasking", "Client Work", "Maintenance", "Support", "Delivery Quality"],
  },
  {
    company: "Zitel / FANAP Telecom",
    position: "Operations Team Lead",
    duration: "Oct 2022 – Jun 2026",
    achievements: [
      "Managed daily operational structures and coordinated internal technical teams and subcontractors.",
      "Monitored workflows, tickets and operational execution across teams.",
      "Identified repetitive workflows and created automation paths for different teams.",
      "Built Python-based internal tools for data storage, processing, reporting and repetitive task elimination.",
      "Worked extensively with Pandas, Selenium and Excel/CSV data for operational tooling.",
      "Developed tools for ticket filtering, dispatching and CRM task automation.",
      "Reduced manual effort in several workflows by approximately 70–90%.",
      "Participated in monitoring, troubleshooting, process analysis and operational optimization.",
    ],
    signals: [
      "Automation",
      "Python",
      "Data",
      "Monitoring",
      "Internal Tools",
      "Performance Improvement",
    ],
  },
  {
    company: "iSun Lotus Mobile Services Co.",
    position: "Technical Support & Monitoring Specialist",
    duration: "Oct 2021 – May 2022",
    achievements: [
      "Monitored systems and services and reported technical incidents.",
      "Managed technical tickets and escalations.",
      "Followed technical issues through resolution.",
      "Cooperated with technical teams to improve service stability.",
    ],
  },
  {
    company: "Behpardaz Jahan",
    position: "Customer Service Specialist",
    duration: "Apr 2021 – Sep 2021",
    achievements: [
      "Handled customer requests and issue follow-up.",
      "Coordinated with internal teams for resolution.",
      "Participated in organizational support operations.",
      "Helped improve response quality and customer experience.",
    ],
  },
];
