import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { SiteShell } from "@/components/layout/site-shell";
import { AppProviders } from "@/components/providers/app-providers";
import { siteConfig } from "@/config/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-portfolio-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-portfolio-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  keywords: [
    "Omid Sadeghi",
    "Frontend Developer",
    "React",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "Client Projects",
    "Automation",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <AppProviders>
          <SiteShell>{children}</SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
