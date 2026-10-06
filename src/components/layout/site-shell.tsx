import type { ReactNode } from "react";

import { BackgroundSystem } from "@/components/layout/background-system";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CustomCursor } from "@/components/ui/custom-cursor";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <BackgroundSystem />
      <CustomCursor />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
