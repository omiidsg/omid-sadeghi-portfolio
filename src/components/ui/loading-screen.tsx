"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { siteConfig } from "@/config/site";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(false), 850);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 grid place-items-center bg-background"
        >
          <div className="absolute inset-0 premium-grid opacity-60" />
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-6 px-6"
          >
            <div className="relative h-24 w-24">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-primary-blue/20 border-t-primary-blue"
              />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary-blue/25 to-accent-purple/25 blur-md" />
              <div className="absolute inset-7 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-xl" />
            </div>
            <div className="text-center">
              <p className="font-display text-2xl font-black uppercase tracking-[-0.04em] text-text-white">
                {siteConfig.name}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.42em] text-primary-blue">
                Loading Experience
              </p>
              <div className="mx-auto mt-5 h-px w-56 overflow-hidden bg-white/10">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full bg-gradient-to-r from-transparent via-primary-blue to-transparent"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
