export const colors = {
  background: "#050816",
  primaryBlue: "#00BFFF",
  accentPurple: "#7B61FF",
  textWhite: "#FFFFFF",
  textMuted: "#A7B0D8",
} as const;

export const typography = {
  fontFamily: {
    sans: "var(--font-portfolio-sans), Inter, ui-sans-serif, system-ui, sans-serif",
    display: "var(--font-portfolio-display), Space Grotesk, Inter, ui-sans-serif, system-ui, sans-serif",
  },
  scale: {
    eyebrow: "0.75rem",
    body: "1rem",
    lead: "1.125rem",
    h1: "clamp(3rem, 8vw, 7rem)",
    h2: "clamp(2.25rem, 5vw, 4.5rem)",
  },
  tracking: {
    tight: "-0.04em",
    wide: "0.42em",
  },
} as const;
