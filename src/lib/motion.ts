import type { Transition, Variants } from "framer-motion";

/** Premium easing curves */
export const ease = {
  smooth: [0.22, 1, 0.36, 1] as const,
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  out: [0.33, 1, 0.68, 1] as const,
};

export const spring = {
  smooth: { type: "spring", stiffness: 90, damping: 20, mass: 0.8 } as const,
  gentle: { type: "spring", stiffness: 60, damping: 18, mass: 1 } as const,
  snappy: { type: "spring", stiffness: 380, damping: 32, mass: 0.6 } as const,
  bouncy: { type: "spring", stiffness: 120, damping: 14, mass: 0.9 } as const,
};

export const duration = {
  fast: 0.25,
  normal: 0.5,
  slow: 0.75,
  slower: 1,
};

export const transition = {
  enter: {
    duration: duration.slow,
    ease: ease.outExpo,
  } satisfies Transition,
  exit: {
    duration: duration.normal,
    ease: ease.inOut,
  } satisfies Transition,
  spring: spring.smooth,
};

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: transition.enter,
  },
};

export const fadeUpExit: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(6px)",
    transition: transition.exit,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: transition.enter,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: duration.slow,
      ease: ease.outExpo,
    },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -48, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: transition.enter,
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 48, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: transition.enter,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: transition.enter,
  },
};

export const titleReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: ease.outExpo },
  },
};

export const underlineReveal: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: ease.outExpo, delay: 0.2 },
  },
};

export const accordionContent: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.4, ease: ease.inOut },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.45, ease: ease.outExpo },
      opacity: { duration: 0.35, delay: 0.08, ease: ease.out },
    },
  },
};

export const listItemStagger: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: ease.outExpo,
    },
  }),
};

export const pageEnter: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: ease.outExpo },
  },
};

export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: ease.outExpo },
  },
};
