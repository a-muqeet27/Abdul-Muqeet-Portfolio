"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  titleReveal,
  underlineReveal,
  underlineLineReveal,
  ease,
  duration,
} from "@/lib/motion";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
};

export function AnimatedSection({
  children,
  className,
  id,
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  );
}

export function StaggerContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px -8% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });

  return (
    <div ref={ref} className="relative mb-8 w-full text-center sm:mb-10">
      <motion.h2
        className="text-2xl font-bold text-text-light sm:text-3xl md:text-4xl"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={titleReveal}
      >
        {children}
      </motion.h2>

      <motion.div
        className="mt-4 flex items-center justify-center gap-2 sm:mt-5 sm:gap-3"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={underlineReveal}
        aria-hidden
      >
        <motion.span
          className="h-px w-10 origin-right rounded-full bg-gradient-to-r from-transparent via-primary/50 to-primary sm:w-14"
          custom={true}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={underlineLineReveal}
        />
        <span className="relative flex h-2 w-2 items-center justify-center sm:h-2.5 sm:w-2.5">
          <span className="absolute inset-0 rounded-full bg-primary/25 blur-[3px]" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-gradient shadow-[0_0_10px_rgba(0,212,255,0.45)] sm:h-2 sm:w-2" />
        </span>
        <motion.span
          className="h-px w-10 origin-left rounded-full bg-gradient-to-l from-transparent via-accent/50 to-accent sm:w-14"
          custom={false}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={underlineLineReveal}
        />
      </motion.div>
    </div>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });

  const offset = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
    none: {},
  }[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(8px)", ...offset }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0, filter: "blur(0px)" }
          : { opacity: 0, filter: "blur(6px)", ...offset }
      }
      transition={{ duration: duration.slow, delay, ease: ease.outExpo }}
    >
      {children}
    </motion.div>
  );
}

export function RevealOnScroll({
  children,
  className,
  from = "left",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  from?: "left" | "right";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: from === "left" ? -56 : 56,
        filter: "blur(8px)",
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, filter: "blur(0px)" }
          : {
              opacity: 0,
              x: from === "left" ? -32 : 32,
              filter: "blur(6px)",
            }
      }
      transition={{ duration: duration.slower, delay, ease: ease.outExpo }}
    >
      {children}
    </motion.div>
  );
}
