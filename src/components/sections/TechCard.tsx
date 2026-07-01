"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TechCardProps = {
  name: string;
  image: string;
  category: string;
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

export function TechCard({ name, image, category, isNew }: TechCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88, filter: "blur(6px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.88, filter: "blur(4px)" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col items-center gap-3"
    >
      <motion.div
        className="relative flex h-[72px] w-[72px] items-center justify-center sm:h-[88px] sm:w-[88px]"
        whileHover={{ y: -6 }}
        transition={spring.gentle}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border border-white/[0.06] transition-all duration-500 group-hover:border-white/15"
        />
        <span
          aria-hidden
          className="absolute inset-[-3px] animate-spin-slow rounded-full border border-dashed border-primary/0 transition-all duration-700 group-hover:border-primary/20"
        />

        <span
          aria-hidden
          className="absolute inset-2 rounded-full bg-white/[0.03] backdrop-blur-sm transition-all duration-500 group-hover:bg-white/[0.06] group-hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
        />

        <motion.div
          className="relative z-10 flex h-11 w-11 items-center justify-center sm:h-14 sm:w-14"
          whileHover={{ scale: 1.12, rotate: 4 }}
          transition={spring.snappy}
        >
          <Image
            src={image}
            alt={name}
            title={name}
            width={56}
            height={56}
            className="h-10 w-10 object-contain opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:drop-shadow-[0_4px_16px_rgba(255,255,255,0.15)] sm:h-12 sm:w-12"
          />
        </motion.div>

        {isNew && (
          <span className="absolute -right-1 -top-1 z-20 rounded-full bg-gradient px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-glow">
            New
          </span>
        )}
      </motion.div>

      <div className="text-center">
        <p className="text-xs font-medium text-text-gray transition-colors duration-300 group-hover:text-text-light sm:text-sm">
          {name}
        </p>
        <p className="mt-0.5 text-[10px] uppercase tracking-widest text-white/0 transition-all duration-300 group-hover:text-white/30">
          {categoryLabels[category] ?? category}
        </p>
      </div>
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
    <div className="relative -mx-4 mb-8 sm:mx-0 sm:mb-10">
      <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
      {categories.map((cat) => {
        const count = counts[cat.id] ?? 0;
        if (count === 0 && cat.id !== "all") return null;
        const isActive = active === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            className={cn(
              "relative shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm",
              isActive ? "text-dark-bg" : "text-text-gray hover:text-text-light"
            )}
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
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                  isActive
                    ? "bg-dark-bg/20 text-dark-bg"
                    : "bg-white/5 text-text-gray"
                )}
              >
                {count}
              </span>
            </span>
          </button>
        );
      })}
      </div>
    </div>
  );
}
