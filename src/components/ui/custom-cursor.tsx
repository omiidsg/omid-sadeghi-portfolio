"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SUPPORT_QUERY = "(pointer: fine) and (hover: hover)";
const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, [data-cursor-interactive]";
const ROOT_CLASS = "custom-cursor-active";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const x = useSpring(cursorX, { stiffness: 520, damping: 38, mass: 0.35 });
  const y = useSpring(cursorY, { stiffness: 520, damping: 38, mass: 0.35 });

  const [isSupported, setIsSupported] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(SUPPORT_QUERY);

    const setRootActive = (active: boolean) => {
      document.documentElement.classList.toggle(ROOT_CLASS, active);
    };

    const syncSupport = () => {
      const supported = mediaQuery.matches;
      setIsSupported(supported);

      if (!supported) {
        setIsVisible(false);
        setIsInteractive(false);
        setRootActive(false);
      }
    };

    syncSupport();
    mediaQuery.addEventListener("change", syncSupport);

    const handleMouseMove = (event: MouseEvent) => {
      if (!mediaQuery.matches) return;

      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setIsVisible(true);
      setRootActive(true);
      setIsInteractive(Boolean((event.target as Element | null)?.closest(INTERACTIVE_SELECTOR)));
    };

    const deactivate = () => {
      setIsVisible(false);
      setIsInteractive(false);
      setRootActive(false);
    };

    const handleMouseLeave = () => {
      deactivate();
    };

    const handleBlur = () => {
      deactivate();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        deactivate();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      setRootActive(false);
      mediaQuery.removeEventListener("change", syncSupport);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [cursorX, cursorY]);

  if (!isSupported) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x, y }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isInteractive ? 1.28 : 1,
      }}
      transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,opacity] duration-150"
          style={{
            width: isInteractive ? 28 : 16,
            height: isInteractive ? 28 : 16,
            opacity: isInteractive ? 0.22 : 0.12,
            background:
              "radial-gradient(circle, rgba(0,191,255,0.55) 0%, rgba(139,92,246,0.18) 55%, transparent 72%)",
          }}
        />

        <span
          className="absolute left-1/2 top-1/2 h-px -translate-x-1/2 -translate-y-1/2 bg-primary-blue/95 shadow-[0_0_6px_rgba(0,191,255,0.9)] transition-[width] duration-150"
          style={{ width: isInteractive ? 22 : 16 }}
        />
        <span
          className="absolute left-1/2 top-1/2 w-px -translate-x-1/2 -translate-y-1/2 bg-primary-blue/95 shadow-[0_0_6px_rgba(0,191,255,0.9)] transition-[height] duration-150"
          style={{ height: isInteractive ? 22 : 16 }}
        />

        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text-white shadow-[0_0_8px_rgba(0,191,255,0.95)] ring-1 ring-primary-blue/70" />
      </div>
    </motion.div>
  );
}
