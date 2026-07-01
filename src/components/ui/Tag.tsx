"use client";

import { motion } from "framer-motion";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      className={cn("tag-pill", className)}
      whileHover={{
        scale: 1.08,
        boxShadow: "0 0 16px rgba(0, 212, 255, 0.3)",
      }}
      whileTap={{ scale: 0.96 }}
      transition={spring.snappy}
    >
      {children}
    </motion.span>
  );
}
