"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { spring } from "@/lib/motion";
import { useLenis } from "@/components/layout/SmoothScroll";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[1001] h-[3px] w-full origin-left bg-gradient shadow-[0_0_12px_rgba(0,212,255,0.5)]"
      style={{ scaleX }}
    />
  );
}

export function BackToTop() {
  const { lenis } = useLenis();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = (scrollY: number) => {
      setVisible(scrollY > 400);
    };

    if (lenis) {
      const onLenisScroll = (instance: NonNullable<typeof lenis>) => {
        updateVisibility(instance.scroll);
      };
      lenis.on("scroll", onLenisScroll);
      return () => lenis.off("scroll", onLenisScroll);
    }

    const onScroll = () => updateVisibility(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-[999] flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-dark-card/90 text-primary shadow-glow backdrop-blur-md"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 20,
        scale: visible ? 1 : 0.8,
        pointerEvents: visible ? "auto" : "none",
      }}
      whileHover={{
        scale: 1.12,
        backgroundColor: "#00d4ff",
        color: "#0a0a0f",
        boxShadow: "0 0 30px rgba(0, 212, 255, 0.5)",
      }}
      whileTap={{ scale: 0.92 }}
      transition={spring.snappy}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="m18 15-6-6-6 6" />
      </motion.svg>
    </motion.button>
  );
}
