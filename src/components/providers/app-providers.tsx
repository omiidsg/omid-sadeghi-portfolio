"use client";

import type { ReactNode } from "react";

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { LoadingScreen } from "@/components/ui/loading-screen";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SmoothScrollProvider>
      <LoadingScreen />
      {children}
    </SmoothScrollProvider>
  );
}
