"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  titleReveal,
  underlineReveal,
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
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="relative mb-10 w-full text-center">
      <motion.h2
        className="text-3xl font-bold text-text-light md:text-4xl"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={titleReveal}
      >
        {children}
      </motion.h2>
      <motion.span
        className="absolute -bottom-2 left-1/2 block h-1 w-24 origin-center -translate-x-1/2 rounded-full bg-gradient"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={underlineReveal}
      />
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
