export const skillGroups = [
  {
    label: "Frontend",
    items: [
      "React.js",
      "TypeScript",
      "JavaScript ES6+",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Responsive UI",
      "Context API",
    ],
  },
  {
    label: "Backend / Full-Stack",
    items: [
      "Laravel",
      "PHP",
      "REST APIs",
      "SQL / Eloquent",
      "Node.js",
      "Express.js",
    ],
  },
  {
    label: "Automation",
    items: ["Python", "Pandas", "Selenium", "Excel / CSV", "Process Automation"],
  },
  {
    label: "AI-Assisted Development",
    items: ["Cursor", "Claude", "ChatGPT", "AI Debugging", "Rapid Prototyping"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Postman", "Vercel", "Railway"],
  },
] as const;

/** Flat list for 3D skills galaxy — hiring-relevant priority skills only */
export const galaxySkills = [
  "React",
  "TypeScript",
  "JavaScript",
  "CSS",
  "Tailwind",
  "Bootstrap",
  "Laravel",
  "PHP",
  "Python",
  "Pandas",
  "Selenium",
  "Git",
];
