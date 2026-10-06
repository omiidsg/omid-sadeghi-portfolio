export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
  /** Optional caption shown under the visual */
  caption?: string;
  /** Hint for presentation framing on the case-study page */
  variant?: "desktop" | "mobile";
  /** Primary visual spans full width when present */
  emphasis?: "primary" | "supporting";
};

export type ProcessVisualType = "zitel-automation-suite";

export type ProjectTechnicalModule = {
  name: string;
  items: string[];
};

export type ProjectSubproject = {
  title: string;
  summary: string;
  stack?: string[];
  impact?: string;
  metrics?: ProjectMetric[];
};

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  category: string;
  role: string;
  client?: string;
  engagementType?: string;
  status: string;
  year?: string;
  featured: boolean;
  /**
   * When false, project is kept in source data but excluded from public listings and routes.
   * Use for incomplete entries that must not invent content.
   */
  listed?: boolean;
  summary: string;
  businessNeed: string;
  deliveredOutput: string;
  technologies: string[];
  responsibilities?: string[];
  decisions?: string[];
  constraints?: string[];
  outcomes?: string[];
  metrics: ProjectMetric[];
  liveUrl?: string;
  githubUrl?: string;
  screenshots?: ProjectScreenshot[];
  /** Prefer screenshots or an editorial process diagram */
  visualType?: "screenshots" | "process";
  processVisual?: {
    type: ProcessVisualType;
    title?: string;
  };
  /** Optional module-oriented technical breakdown */
  technicalModules?: ProjectTechnicalModule[];
  /** Optional label for detailed impact section (defaults to Suite Components) */
  impactSectionLabel?: string;
  /** Optional nested subprojects / suite modules */
  subprojects?: ProjectSubproject[];
  /** Fields still needing user-provided details — never rendered in UI */
  todos?: string[];
};

export const projects: ProjectCaseStudy[] = [
  {
    slug: "hmyn-service-platform",
    title: "Hamyan Service Platform",
    category: "Web Application",
    role: "Frontend Developer",
    client: "Hamyan",
    engagementType: "Client / team-based frontend development",
    status: "Production",
    featured: true,
    listed: true,
    summary:
      "Frontend development for Hamyan, a Persian platform for managing family and group funds. I contributed to multiple user-facing areas across the public website and authenticated product experience, working with a development team to implement features, improve existing functionality, and maintain a responsive RTL interface.",
    businessNeed:
      "Hamyan provides a digital experience for managing family and group funds, replacing many manual processes around members, contributions, transactions, and fund administration with a structured web-based product.",
    deliveredOutput:
      "I contributed to the frontend implementation and ongoing development of multiple areas of the Hamyan product, including public-facing pages and authenticated user experiences. My work included implementing responsive interfaces, maintaining RTL behavior, integrating product requirements into reusable UI, and collaborating with other developers on new and existing functionality.",
    technologies: [
      "React.js",
      "JavaScript",
      "Bootstrap",
      "Context API",
      "CSS",
      "RTL",
    ],
    responsibilities: [
      "Implemented frontend features across landing, auth UI, profile, tickets, dashboard, blog, about, services and academy areas.",
      "Built and refined React components with responsive Bootstrap layouts and Persian RTL behavior.",
      "Used Context API for shared frontend state where applicable.",
      "Maintained, debugged and improved existing UI while collaborating with other developers on new requirements.",
    ],
    decisions: [
      "Preserve a consistent RTL interaction model across public and authenticated interfaces.",
      "Structure frontend functionality into reusable React components rather than duplicating page-level UI.",
      "Maintain consistency while adding new features to an existing product rather than rebuilding working flows.",
    ],
    constraints: [
      "Frontend contribution within a team — not sole ownership of the full product.",
      "Backend, payments, banking infrastructure and authentication server work were outside this role.",
    ],
    outcomes: [
      "Contributed to the continued development and maintenance of a production product with multiple public and authenticated frontend areas, helping deliver new functionality while preserving usability and visual consistency across the platform.",
    ],
    metrics: [
      { value: "Multi-area", label: "Frontend Contribution" },
      { value: "React", label: "Frontend Stack" },
      { value: "Team", label: "Collaborative Delivery" },
    ],
    liveUrl: "https://hamyanapp.com/",
    screenshots: [
      {
        src: "/projects/hmyn-service-platform/landing-desktop.png",
        alt: "Hamyan public website landing page for the family fund management platform",
        caption: "Public product website and service introduction",
        variant: "desktop",
        emphasis: "primary",
      },
      {
        src: "/projects/hmyn-service-platform/pwa-home-desktop.png",
        alt: "Hamyan authenticated user application home interface",
        caption: "Authenticated product experience and fund management entry point",
        variant: "desktop",
        emphasis: "supporting",
      },
      {
        src: "/projects/hmyn-service-platform/pwa-navigation-desktop.png",
        alt: "Hamyan user navigation drawer with account and financial service sections",
        caption: "Authenticated navigation covering profile, wallet, bank cards, support and account services",
        variant: "desktop",
        emphasis: "supporting",
      },
    ],
  },
  {
    slug: "memoriez",
    title: "Memoriez",
    category: "E-commerce / Retail + Wholesale",
    role: "Full-Stack Developer",
    client: "Memoriez",
    engagementType: "Independent / Solo Project",
    status: "Production / Live",
    year: "2026",
    featured: true,
    listed: true,
    summary:
      "End-to-end full-stack Persian e-commerce platform for computer memory and digital storage — retail shopping, B2B partner wholesale, admin operations, Iranian payment flows and production deployment at memoriez.ir.",
    businessNeed:
      "Memoriez needed a single commerce system that could sell storage hardware to retail customers while also supporting approved wholesale partners with separate pricing, carts and order review — plus admin control over catalog, inventory, warranties and payments.",
    deliveredOutput:
      "Designed and developed the product end to end as a Laravel 12 monolith: Blade/Tailwind/Alpine storefront, customer accounts, partner wholesale channel, Zarinpal and card-to-card payments, inventory, warranty/returns, SMS automations, PDF invoices, admin tooling and production delivery.",
    technologies: [
      "Laravel 12",
      "PHP 8.4",
      "Blade",
      "Tailwind CSS",
      "Alpine.js",
      "Vite",
      "Eloquent / SQL",
      "Zarinpal",
      "OTP Auth",
      "Database Queues",
    ],
    responsibilities: [
      "Designed and developed the product end to end, covering frontend implementation, backend application logic, data handling, and production delivery.",
      "Built retail catalog, cart, checkout, customer account and warranty flows.",
      "Implemented wholesale partner request, pricing, cart, checkout and admin review workflows.",
      "Integrated Zarinpal and card-to-card payments with admin receipt review, plus inventory and returns/RMA tooling.",
    ],
    decisions: [
      "Used a Laravel server-rendered monolith with Blade + Alpine instead of a separate SPA frontend.",
      "Organized domain logic in a service layer while keeping MVC routes/controllers thin.",
      "Separated retail and wholesale carts/pricing so wholesale amounts never leak to public surfaces.",
      "Required admin approval before card-to-card orders become paid.",
    ],
    constraints: [
      "Source repository remains private; public proof is the live production site.",
    ],
    outcomes: [
      "Shipped a dual-channel retail + wholesale commerce product to production at memoriez.ir.",
      "Maintained a production-ready codebase with documented automated test coverage (720 tests / 3147 assertions cited in project docs).",
    ],
    metrics: [
      { value: "Live", label: "Production Store" },
      { value: "Retail+B2B", label: "Dual Channel" },
      { value: "Full-Stack", label: "End-to-End Ownership" },
    ],
    liveUrl: "https://memoriez.ir",
    screenshots: [
      {
        src: "/projects/memoriez/home-desktop.png",
        alt: "Memoriez homepage hero with storage product highlights and search",
        caption: "Production storefront homepage",
        variant: "desktop",
        emphasis: "primary",
      },
      {
        src: "/projects/memoriez/catalog-desktop.png",
        alt: "Memoriez product catalog with category filters and product cards",
        caption: "Catalog browsing and filtering",
        variant: "desktop",
        emphasis: "supporting",
      },
      {
        src: "/projects/memoriez/mobile.png",
        alt: "Memoriez mobile homepage with cooperation banner and hero search",
        caption: "Responsive mobile storefront",
        variant: "mobile",
        emphasis: "supporting",
      },
    ],
  },
  {
    slug: "ilya-gold-gallery",
    title: "Ilya Gold Gallery",
    category: "Jewelry E-commerce",
    role: "Frontend / E-commerce Developer",
    client: "Ilya Gold Gallery",
    engagementType: "Client Project",
    status: "Production / Live",
    featured: true,
    listed: true,
    summary:
      "Persian gold and jewelry storefront delivered by extensively customizing an existing WordPress / WooCommerce foundation — storefront UX, commerce behavior, RTL adaptation and ongoing maintenance without a full commerce rebuild.",
    businessNeed:
      "A Persian jewelry/gold business needed an online storefront while preserving an existing content-management and commerce foundation. The work had to balance business-specific customization with maintainability, cost and delivery speed.",
    deliveredOutput:
      "Customized and extended the existing Digiland Pro / WooCommerce base with theme-level PHP, CSS and JavaScript work across product, category, cart and checkout experiences. Adapted frontend behavior for jewelry pricing UX and Persian RTL, preserved CMS workflows for the client, and delivered a custom Iliya Gold Invoice plugin for order PDF invoices — with continued post-launch maintenance.",
    technologies: [
      "WordPress",
      "WooCommerce",
      "PHP",
      "JavaScript / jQuery",
      "CSS",
      "Elementor",
      "Custom Theme / Plugin Code",
      "RTL",
    ],
    responsibilities: [
      "Customized and extended the existing commerce base instead of rebuilding the platform.",
      "Implemented storefront changes across product, category, cart and checkout experiences.",
      "Adapted frontend behavior to jewelry-business requirements, including pricing-related UX and Persian RTL.",
      "Maintained CMS usability and supported the project after implementation.",
    ],
    decisions: [
      "Preserve the existing CMS/WooCommerce foundation rather than rebuilding the commerce stack from zero — lower cost, faster delivery, retained content-management workflows and less unnecessary technical complexity.",
      "Extend storefront behavior with theme-level customization and a focused invoice plugin instead of replacing the commerce core.",
    ],
    constraints: [
      "Existing Mahdis Digiland Pro / WooCommerce foundation needed to remain intact.",
      "Budget and delivery speed favored reuse over a greenfield rebuild.",
    ],
    outcomes: [
      "Production storefront live at iliyagoldgallery.ir.",
      "Delivered a maintainable CMS-backed e-commerce solution the client can operate day to day.",
    ],
    metrics: [
      { value: "Live", label: "Production Store" },
      { value: "Reuse", label: "CMS Foundation Kept" },
      { value: "RTL", label: "Persian Storefront" },
    ],
    liveUrl: "https://iliyagoldgallery.ir",
    screenshots: [
      {
        src: "/projects/ilya-gold-gallery/home-desktop.png",
        alt: "Ilya Gold Gallery homepage with Persian jewelry storefront hero and product sections",
        caption: "Public storefront homepage",
        variant: "desktop",
        emphasis: "primary",
      },
      {
        src: "/projects/ilya-gold-gallery/shop-desktop.png",
        alt: "Ilya Gold Gallery shop page listing gold and jewelry products",
        caption: "Shop / catalog browsing",
        variant: "desktop",
        emphasis: "supporting",
      },
      {
        src: "/projects/ilya-gold-gallery/product-desktop.png",
        alt: "Ilya Gold Gallery product detail page with jewelry pricing and add-to-cart",
        caption: "Product detail experience",
        variant: "desktop",
        emphasis: "supporting",
      },
      {
        src: "/projects/ilya-gold-gallery/cart-desktop.png",
        alt: "Ilya Gold Gallery shopping cart page",
        caption: "Cart experience",
        variant: "desktop",
        emphasis: "supporting",
      },
      {
        src: "/projects/ilya-gold-gallery/mobile.png",
        alt: "Ilya Gold Gallery mobile storefront homepage",
        caption: "Mobile storefront",
        variant: "mobile",
        emphasis: "supporting",
      },
    ],
  },
  {
    slug: "zivand-ai-chat-interface",
    title: "Zivand AI Chat Interface",
    category: "Client Frontend",
    role: "Frontend Developer",
    client: "Zivand",
    engagementType: "Client Project",
    status: "Client Project",
    featured: true,
    summary:
      "Modern responsive Persian AI-chat interface with conversation history and an API-ready frontend structure — built for Zivand.",
    businessNeed:
      "Zivand needed a modern, responsive Persian AI-chat interface with conversation history and a frontend structure prepared for backend/API integration.",
    deliveredOutput:
      "Shipped a responsive React/TypeScript chat UI with Persian RTL support, conversation history sidebar/drawer, new/delete conversation flows, LocalStorage persistence (local mode) and an HTTP gateway adapter for remote API wiring.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "TanStack Query",
      "Axios",
      "LocalStorage",
      "React Router",
    ],
    responsibilities: [
      "Built the client-facing chat interface and conversation UX.",
      "Implemented Persian RTL layout and responsive desktop/mobile behavior.",
      "Added LocalStorage-backed conversation persistence for local mode.",
      "Prepared frontend structure for later backend/API integration (http data source).",
    ],
    decisions: [
      "Kept AI model ownership and backend inference out of scope — focused on a production-quality chat frontend.",
      "Used a pluggable data-source switch (local vs http) so the UI can run with fixtures or a remote API.",
      "Used LocalStorage for conversation history while keeping the architecture ready for API wiring.",
    ],
    constraints: [
      "No claim of owning or training the AI model — this repository is frontend-only.",
      "Remote API integration is prepared; assistant replies in local mode are fixture/demo data, not model inference.",
      "Project year not available from git history (empty commit history).",
    ],
    outcomes: [
      "Delivered a client-ready Persian chat interface for Zivand.",
      "Provided a maintainable React/TypeScript frontend foundation for future API connection.",
    ],
    metrics: [
      { value: "RTL", label: "Persian Chat UI" },
      { value: "TS", label: "TypeScript Frontend" },
      { value: "API-ready", label: "Integration Structure" },
    ],
    screenshots: [
      {
        src: "/projects/zivand-ai-chat-interface/chat-desktop.png",
        alt: "Zivand desktop chat empty state with conversation history sidebar",
        variant: "desktop",
      },
      {
        src: "/projects/zivand-ai-chat-interface/conversation-desktop.png",
        alt: "Zivand desktop active conversation with user and assistant messages",
        variant: "desktop",
      },
      {
        src: "/projects/zivand-ai-chat-interface/mobile.png",
        alt: "Zivand mobile conversation drawer with chat history and new-chat action",
        variant: "mobile",
      },
    ],
  },
  {
    slug: "daal-cafe",
    title: "Daal Cafe Digital Menu",
    category: "Digital Menu / CMS",
    role: "Full-Stack Developer",
    client: "Daal Cafe",
    engagementType: "Client Project",
    status: "Live",
    featured: true,
    summary:
      "Digital menu platform for a café with customer-facing menu, admin capabilities and QR-based access — live at daalcafe.ir.",
    businessNeed:
      "The café needed a modern digital menu customers could open via QR, with an admin path to manage categories, products, pricing and availability without constant developer involvement.",
    deliveredOutput:
      "Delivered a production Next.js menu experience with Persian RTL storefront, product detail modal, category filtering, search, info page and authenticated admin dashboard for categories, products, media, settings, users and QR generation. A separate PHP/MySQL cPanel variant also exists in the project tree for shared-hosting constraints.",
    technologies: [
      "Next.js",
      "React",
      "Prisma",
      "PostgreSQL",
      "NextAuth",
      "Tailwind CSS",
      "QR Code",
      "Vercel",
    ],
    responsibilities: [
      "Shipped the customer-facing digital menu experience.",
      "Implemented admin content and product management (categories, products, media, settings, users).",
      "Supported QR-based access for in-venue customers.",
      "Accounted for hosting constraints with an alternate PHP/MySQL deployment path.",
    ],
    decisions: [
      "Used a Next.js + Prisma + PostgreSQL stack for the primary application path.",
      "Used NextAuth credentials with JWT sessions for dashboard access.",
      "Prepared a PHP/MySQL cPanel-oriented variant where shared hosting was a business constraint.",
    ],
    constraints: [
      "Public menu is Persian-first RTL; English fields exist in the data model/CMS but there is no public locale switcher.",
      "Engagement year not available from git (no repository history in the local tree).",
    ],
    outcomes: [
      "Live menu available at daalcafe.ir.",
      "Café staff can manage menu content through the admin workflow.",
    ],
    metrics: [
      { value: "Live", label: "Production Menu" },
      { value: "QR", label: "Scan-to-Menu" },
      { value: "Admin", label: "Content Workflow" },
    ],
    liveUrl: "https://daalcafe.ir",
    screenshots: [
      {
        src: "/projects/daal-cafe/home-desktop.png",
        alt: "Daal Cafe digital menu homepage with categories and product cards",
        variant: "desktop",
      },
      {
        src: "/projects/daal-cafe/item-desktop.png",
        alt: "Daal Cafe product detail modal showing item image, description and price",
        variant: "desktop",
      },
      {
        src: "/projects/daal-cafe/mobile.png",
        alt: "Daal Cafe digital menu on a mobile viewport",
        variant: "mobile",
      },
    ],
  },
  {
    slug: "zitel-operations-automation-suite",
    title: "Zitel Operations Automation Suite",
    category: "Internal Automation",
    role: "Operations Team Lead · Automation Developer",
    client: "Zitel / FANAP Telecom",
    engagementType: "Employment · Internal tools",
    status: "Internal automation",
    year: "2022–2026",
    featured: true,
    listed: true,
    summary:
      "Python-based internal automation suite that reduced high-volume RF and CRM manual work at Zitel through ticket filtering, browser-driven CRM closing and zone-based ticket distribution.",
    businessNeed:
      "Operational teams were processing hundreds of tickets and repetitive CRM tasks manually every day. These workflows consumed significant time, depended heavily on repetitive human actions, and limited the team's ability to scale operational volume efficiently.",
    deliveredOutput:
      "I analyzed repetitive operational workflows and designed a set of Python-based internal tools for ticket filtering, CRM automation, and zone-based ticket distribution. The tools processed operational data, applied repeatable business rules, and produced outputs that could be used directly by operational teams — with rollout, support and iteration based on real team needs.",
    technologies: [
      "Python",
      "Pandas",
      "Selenium",
      "scikit-learn",
      "GeoJSON",
      "Excel / CSV",
      "Tkinter",
    ],
    responsibilities: [
      "Identified repetitive operational workflows and defined automation requirements.",
      "Designed practical automation flows and implemented them in Python.",
      "Handled data processing, browser automation, operational testing and rollout to users.",
      "Troubleshot, maintained and iterated the tools based on operational feedback.",
    ],
    decisions: [
      "Automate repeatable rules instead of increasing repetitive manual effort.",
      "Build lightweight operational tools that non-developer team members could use.",
      "Keep outputs compatible with existing CRM, Excel and operational workflows instead of forcing a complete system replacement.",
      "Split automation into focused tools for distinct workflows rather than building one oversized internal application.",
    ],
    technicalModules: [
      {
        name: "Suite Core",
        items: ["Python", "Pandas", "Excel / CSV Processing", "Process Automation"],
      },
      {
        name: "RF Filtering",
        items: ["scikit-learn", "GeoJSON", "Geographic / coverage filtering"],
      },
      {
        name: "CRM Automation",
        items: ["Selenium", "Tkinter", "Browser automation", "GUI / progress handling"],
      },
      {
        name: "RF Dispatcher",
        items: ["GeoJSON", "Zone-based assignment", "Tabular data processing"],
      },
    ],
    metrics: [
      { value: "3", label: "Automation Tools" },
      { value: "~70–90%", label: "Reported Effort Reduced" },
      { value: "Daily", label: "Operational Use" },
    ],
    impactSectionLabel: "Reported Operational Impact",
    visualType: "process",
    processVisual: {
      type: "zitel-automation-suite",
      title: "Automation Workflow",
    },
    subprojects: [
      {
        title: "RF Ticket Filtering & Coverage Analysis",
        summary:
          "Automated filtering and analysis of RF-related tickets that previously required significant manual review.",
        stack: ["Python", "Pandas", "scikit-learn", "GeoJSON"],
        impact: "~85–90% faster processing",
        metrics: [
          { value: "100–150", label: "Tickets / Batch" },
          { value: "~300–450", label: "Tickets / Day" },
          { value: "~85–90%", label: "Processing-time Reduction" },
          { value: "~8", label: "Operational Users" },
        ],
      },
      {
        title: "CRM Ticket Closing Automation",
        summary:
          "Browser-driven CRM automation with a practical desktop GUI for high-volume ticket closing.",
        stack: ["Python", "Selenium", "Tkinter", "Pandas"],
        impact: "5,000+ backlog cleared · ~70–80% less manual work",
        metrics: [
          { value: "~300–400", label: "Tickets / Day" },
          { value: "~1,000", label: "Peak / Day" },
          { value: "5,000+", label: "Backlog Cleared" },
          { value: "~70–80%", label: "Manual Workload Reduction" },
        ],
      },
      {
        title: "RF Ticket Auto Dispatcher",
        summary:
          "Zone-based ticket assignment and distribution using geographic and operational rules.",
        stack: ["Python", "Pandas", "GeoJSON"],
        impact: "~80–90% less allocation time",
        metrics: [
          { value: "~450–600", label: "Tickets / Day" },
          { value: "~80–90%", label: "Allocation-time Reduction" },
        ],
      },
    ],
  },
];

export function isPublicProject(project: ProjectCaseStudy) {
  return project.listed !== false;
}

export function getPublicProjects() {
  return projects.filter(isPublicProject);
}

export function getFeaturedProjects() {
  return getPublicProjects().filter((project) => project.featured);
}

export function getAdditionalProjects() {
  return getPublicProjects().filter((project) => !project.featured);
}

export function getProjectBySlug(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project || !isPublicProject(project)) return undefined;
  return project;
}
