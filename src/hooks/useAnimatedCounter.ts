"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function useAnimatedCounter(
  target: number,
  duration = 1.8,
  decimals = 0
) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-12% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setValue(0);
      return;
    }

    let start: number | null = null;
    let frame: number;
    let cancelled = false;

    const step = (timestamp: number) => {
      if (cancelled) return;
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [isInView, target, duration]);

  const display =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return { ref, display };
}
