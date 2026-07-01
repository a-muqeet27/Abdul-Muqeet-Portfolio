"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";

type LenisContextValue = {
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext);
}

const NAV_OFFSET = -80;

function createLenisInstance() {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    return null;
  }

  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  if (isTouch) {
    return new Lenis({
      autoRaf: true,
      autoResize: true,
      lerp: 0.11,
      smoothWheel: false,
      syncTouch: true,
      syncTouchLerp: 0.12,
      touchMultiplier: 1.2,
      anchors: { offset: NAV_OFFSET },
    });
  }

  return new Lenis({
    autoRaf: true,
    autoResize: true,
    lerp: 0.08,
    smoothWheel: true,
    wheelMultiplier: 0.85,
    syncTouch: true,
    syncTouchLerp: 0.1,
    touchMultiplier: 1,
    anchors: { offset: NAV_OFFSET },
  });
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = createLenisInstance();
    setLenis(instance);

    return () => {
      instance?.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>
  );
}

export function scrollToSection(
  lenis: Lenis | null,
  href: string,
  offset = NAV_OFFSET
) {
  const el = document.querySelector(href);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el as HTMLElement, {
      offset,
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
