"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

import { navigationItems } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-40 border-b border-border-subtle bg-background/72 shadow-[0_14px_60px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
    >
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[-1px] left-0 h-px origin-left bg-gradient-to-r from-primary-blue via-accent-purple to-primary-blue shadow-[0_0_18px_rgba(0,191,255,0.75)]"
        style={{ scaleX: progress }}
      />
      <nav className="mx-auto flex h-20 w-full max-w-[var(--container)] items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="group font-display text-lg font-black uppercase tracking-[-0.04em] text-text-white"
        >
          <span className="text-primary-blue">O</span>
          MID SADEGHI
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-border-subtle bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:flex">
          {navigationItems.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-text-muted transition duration-300 hover:bg-white/[0.05] hover:text-text-white",
                  isActive(item.href) &&
                    "bg-white/[0.08] text-text-white shadow-[0_0_24px_rgba(0,191,255,0.12)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="hidden rounded-full border border-primary-blue/40 px-4 py-2 text-sm font-semibold text-primary-blue shadow-[0_0_24px_rgba(0,191,255,0.16)] transition duration-300 hover:-translate-y-0.5 hover:border-primary-blue hover:bg-primary-blue hover:text-background sm:inline-flex"
        >
          Contact
        </Link>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-text-white shadow-[0_0_24px_rgba(0,191,255,0.12)] md:hidden"
        >
          <span className="relative h-3.5 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-px w-5 bg-current transition duration-300",
                isOpen && "top-1.5 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-px w-5 bg-current transition duration-300",
                isOpen && "bottom-2 -rotate-45",
              )}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(10px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-5 mb-5 overflow-hidden rounded-[1.75rem] border border-white/10 bg-background-elevated/92 p-2 shadow-[0_28px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:hidden"
          >
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.28, delay: index * 0.04 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-[1.25rem] px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-text-muted transition hover:bg-white/[0.06] hover:text-text-white",
                    isActive(item.href) && "bg-primary-blue/[0.1] text-primary-blue",
                  )}
                >
                  {item.label}
                  <span className="text-primary-blue">0{index + 1}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
