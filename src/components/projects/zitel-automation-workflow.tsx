const stages = [
  {
    title: "Operational Inputs",
    items: ["RF Tickets", "CRM Tasks", "Excel / CSV Data"],
  },
  {
    title: "Process Analysis",
    items: ["Manual workflows", "Repeatable rules", "Operational constraints"],
  },
  {
    title: "Python Automation Layer",
    items: ["Python", "Pandas", "Selenium", "scikit-learn", "GeoJSON"],
  },
] as const;

const branches = [
  {
    title: "RF Filtering",
    detail: "Coverage / rule-based ticket analysis",
  },
  {
    title: "CRM Automation",
    detail: "Browser-driven ticket closing",
  },
  {
    title: "RF Dispatcher",
    detail: "Zone-based ticket distribution",
  },
] as const;

const outputs = [
  {
    title: "Operational Outputs",
    items: ["Filtered tickets", "Automated CRM actions", "Assigned ticket batches", "Reports"],
  },
  {
    title: "Operational Teams",
    items: ["Daily RF workflows", "CRM operations", "Reduced manual effort"],
  },
] as const;

function StageCard({
  title,
  items,
  accent = "blue",
}: {
  title: string;
  items: readonly string[];
  accent?: "blue" | "purple";
}) {
  const border =
    accent === "purple" ? "border-accent-purple/25" : "border-primary-blue/25";
  const glow =
    accent === "purple" ? "bg-accent-purple/10" : "bg-primary-blue/10";

  return (
    <div className={`relative overflow-hidden rounded-[1.5rem] border ${border} bg-white/[0.04] p-5`}>
      <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-px ${glow}`} />
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-blue">
        {title}
      </p>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm leading-6 text-text-soft sm:text-[0.95rem]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlowArrow() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center py-2">
      <div className="h-8 w-px bg-gradient-to-b from-primary-blue/50 via-accent-purple/40 to-transparent sm:h-10" />
    </div>
  );
}

export function ZitelAutomationWorkflow() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:p-8">
      <p className="max-w-2xl text-sm leading-7 text-text-muted">
        High-volume manual operations translated into focused Python automation used directly by
        operational teams.
      </p>

      <div className="mt-8 space-y-1">
        <div className="grid gap-4 md:grid-cols-3">
          {stages.map((stage, index) => (
            <StageCard
              key={stage.title}
              title={stage.title}
              items={stage.items}
              accent={index === 2 ? "purple" : "blue"}
            />
          ))}
        </div>

        <FlowArrow />

        <div className="grid gap-4 md:grid-cols-3">
          {branches.map((branch) => (
            <div
              key={branch.title}
              className="rounded-[1.5rem] border border-white/10 bg-background/40 p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-accent-purple">
                {branch.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-text-soft">{branch.detail}</p>
            </div>
          ))}
        </div>

        <FlowArrow />

        <div className="grid gap-4 md:grid-cols-2">
          {outputs.map((stage) => (
            <StageCard key={stage.title} title={stage.title} items={stage.items} />
          ))}
        </div>
      </div>
    </div>
  );
}
