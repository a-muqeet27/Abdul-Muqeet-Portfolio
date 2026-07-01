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

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.8,
      syncTouch: true,
      syncTouchLerp: 0.1,
      anchors: {
        offset: NAV_OFFSET,
      },
    });

    setLenis(instance);

    return () => {
      instance.destroy();
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
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
