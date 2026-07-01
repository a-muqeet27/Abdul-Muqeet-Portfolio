"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { spring, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TechCardProps = {
  name: string;
  image: string;
  category: string;
  index?: number;
  isNew?: boolean;
};

const categoryLabels: Record<string, string> = {
  mobile: "Mobile",
  languages: "Languages",
  "ai-ml": "AI / ML",
  backend: "Backend",
  database: "Database",
  tools: "Tools",
};

const categoryAccent: Record<string, { ring: string; glow: string; label: string }> = {
  mobile: {
    ring: "group-hover:border-primary/40",
    glow: "group-hover:shadow-[0_0_24px_rgba(0,212,255,0.2)]",
    label: "text-primary/70",
  },
  languages: {
    ring: "group-hover:border-[#6b9fff]/40",
    glow: "group-hover:shadow-[0_0_24px_rgba(107,159,255,0.2)]",
    label: "text-[#6b9fff]/70",
  },
  "ai-ml": {
    ring: "group-hover:border-[#b388ff]/40",
    glow: "group-hover:shadow-[0_0_24px_rgba(179,136,255,0.2)]",
    label: "text-[#b388ff]/70",
  },
  backend: {
    ring: "group-hover:border-[#ff9f43]/40",
    glow: "group-hover:shadow-[0_0_24px_rgba(255,159,67,0.2)]",
    label: "text-[#ff9f43]/70",
  },
  database: {
    ring: "group-hover:border-accent/40",
    glow: "group-hover:shadow-[0_0_24px_rgba(0,255,136,0.15)]",
    label: "text-accent/70",
  },
  tools: {
    ring: "group-hover:border-[#ffd166]/40",
    glow: "group-hover:shadow-[0_0_24px_rgba(255,209,102,0.15)]",
    label: "text-[#ffd166]/70",
  },
};

export function TechCard({ name, image, category, index = 0, isNew }: TechCardProps) {
  const accent = categoryAccent[category] ?? categoryAccent.tools;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.92, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.88, filter: "blur(4px)" }}
      transition={{ duration: 0.4, delay: index * 0.035, ease: ease.outExpo }}
      className="group relative"
    >
      <motion.div
        className={cn(
          "relative flex flex-col items-center gap-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-2 py-4 backdrop-blur-sm transition-all duration-500 sm:gap-3 sm:py-5",
          accent.ring,
          accent.glow,
          "hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.04]"
        )}
        whileTap={{ scale: 0.97 }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16">
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border border-white/[0.08] bg-white/[0.03]"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              borderStyle: "dashed",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-1 rounded-full border border-white/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <motion.div
            className="relative z-10 flex h-10 w-10 items-center justify-center sm:h-11 sm:w-11"
            whileHover={{ scale: 1.1, rotate: -4 }}
            transition={spring.snappy}
          >
            <Image
              src={image}
              alt={name}
              title={name}
              width={48}
              height={48}
              className="h-9 w-9 object-contain opacity-85 transition-all duration-500 group-hover:opacity-100 group-hover:drop-shadow-[0_4px_20px_rgba(0,212,255,0.25)] sm:h-10 sm:w-10"
            />
          </motion.div>

          {isNew && (
            <motion.span
              className="absolute -right-0.5 -top-0.5 z-20 rounded-full bg-gradient px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-glow"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              New
            </motion.span>
          )}
        </div>

        <div className="text-center">
          <p className="text-xs font-semibold text-text-light/90 transition-colors duration-300 group-hover:text-text-light sm:text-[13px]">
            {name}
          </p>
          <p
            className={cn(
              "mt-0.5 text-[9px] font-medium uppercase tracking-wider transition-colors duration-300 sm:text-[10px]",
              accent.label
            )}
          >
            {categoryLabels[category] ?? category}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

type Category = { id: string; label: string };

export function TechFilterBar({
  categories,
  active,
  onChange,
  counts,
}: {
  categories: readonly Category[];
  active: string;
  onChange: (id: string) => void;
  counts: Record<string, number>;
}) {
  return (
    <div className="relative mb-6 sm:mb-8">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-6 bg-gradient-to-r from-dark-bg to-transparent lg:hidden" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-dark-bg to-transparent lg:hidden" />
      <div
        className="scroll-touch-x scrollbar-hide -mx-4 flex flex-nowrap gap-2 px-4 pb-2 pr-6 lg:mx-0 lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0 lg:pr-0"
        data-lenis-prevent
      >
        {categories.map((cat) => {
          const count = counts[cat.id] ?? 0;
          if (count === 0 && cat.id !== "all") return null;
          const isActive = active === cat.id;

          return (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => onChange(cat.id)}
              className={cn(
                "relative shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm",
                isActive
                  ? "border-transparent text-dark-bg"
                  : "border-white/[0.08] bg-white/[0.03] text-text-gray hover:border-white/15 hover:text-text-light"
              )}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={spring.snappy}
            >
              {isActive && (
                <motion.span
                  layoutId="tech-filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient shadow-glow"
                  transition={spring.snappy}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {cat.label}
                <motion.span
                  key={`${cat.id}-${count}-${isActive}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                    isActive
                      ? "bg-dark-bg/20 text-dark-bg"
                      : "bg-white/5 text-text-gray"
                  )}
                >
                  {count}
                </motion.span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
