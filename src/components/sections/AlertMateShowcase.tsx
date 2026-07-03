"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExternalLink,
  Expand,
  Film,
  ImageIcon,
  LayoutGrid,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import type {
  ProjectShowcase,
  RoleFilter,
  ShowcaseScreenshot,
} from "@/data/alert-mate-showcase";
import { roleFilters } from "@/data/alert-mate-showcase";
import { ease, spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

type AlertMateShowcaseProps = {
  showcase: ProjectShowcase;
};

type LightboxItem = {
  src: string;
  caption: string;
  variant?: ShowcaseScreenshot["variant"];
};

function getYouTubeEmbed(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function FullscreenLightbox({
  item,
  onClose,
}: {
  item: LightboxItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isWide = item.variant === "wide";

  return (
    <motion.div
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-[rgba(5,5,10,0.94)] p-3 backdrop-blur-md sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-dark-card/90 text-text-light transition-colors hover:border-primary/40 hover:text-primary sm:right-5 sm:top-5"
      >
        <X className="h-4 w-4" />
      </button>

      <motion.div
        className={cn(
          "relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-dark-card shadow-2xl",
          isWide ? "max-w-5xl" : "max-w-md"
        )}
        initial={{ scale: 0.94, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 8 }}
        transition={{ duration: 0.35, ease: ease.outExpo }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex min-h-0 flex-1 items-center justify-center bg-[#0a0a12] p-3 sm:p-4">
          <Image
            src={item.src}
            alt={item.caption}
            width={isWide ? 1200 : 500}
            height={isWide ? 750 : 900}
            className="max-h-[calc(92vh-4rem)] w-auto max-w-full object-contain"
          />
        </div>
        <p className="shrink-0 border-t border-white/[0.06] px-4 py-2.5 text-center text-xs text-text-gray sm:text-sm">
          {item.caption}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function AlertMateShowcase({ showcase }: AlertMateShowcaseProps) {
  const [activeRole, setActiveRole] = useState<RoleFilter>("all");
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const [showDemoVideo, setShowDemoVideo] = useState(false);

  useEffect(() => {
    setLightbox(null);
  }, [activeRole]);

  useEffect(() => {
    if (!showDemoVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowDemoVideo(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showDemoVideo]);

  const filteredScreens = useMemo(() => {
    if (activeRole === "all") return showcase.screenshots;
    return showcase.screenshots.filter((s) => s.role === activeRole);
  }, [activeRole, showcase.screenshots]);

  const counts = useMemo(() => {
    const c: Record<RoleFilter, number> = {
      all: showcase.screenshots.length,
      driver: 0,
      passenger: 0,
      "vehicle-owner": 0,
      admin: 0,
      emergency: 0,
    };
    showcase.screenshots.forEach((s) => {
      c[s.role] += 1;
    });
    return c;
  }, [showcase.screenshots]);

  const embedUrl =
    showcase.demoVideo.embedUrl ??
    (showcase.demoVideo.type === "youtube"
      ? getYouTubeEmbed(showcase.demoVideo.url)
      : null);

  return (
    <div className="space-y-6 border-b border-white/[0.06] pb-6">
      {/* Poster — compact, click to expand */}
      <section>
        <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-light">
          <ImageIcon className="h-3.5 w-3.5 text-primary" />
          Project Poster
        </h3>
        <motion.button
          type="button"
          onClick={() =>
            setLightbox({
              src: showcase.poster.src,
              caption: showcase.poster.caption,
            })
          }
          className="group flex w-full items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left transition-all hover:border-primary/30 hover:bg-white/[0.04] sm:p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: ease.outExpo }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#0a0a12] sm:h-24 sm:w-16">
            <Image
              src={showcase.poster.src}
              alt={showcase.poster.caption}
              width={80}
              height={120}
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text-light group-hover:text-primary">
              View Project Poster
            </p>
            <p className="mt-0.5 line-clamp-2 text-xs text-text-gray">
              {showcase.poster.caption}
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-primary/80">
              <Expand className="h-3 w-3" />
              Tap for full screen
            </span>
          </div>
        </motion.button>
      </section>

      {/* App screenshots — small cards */}
      <section>
        <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-light">
          <LayoutGrid className="h-3.5 w-3.5 text-primary" />
          App Screenshots
        </h3>

        <div
          className="scroll-touch-x scrollbar-hide -mx-1 mb-4 flex flex-nowrap gap-2 overflow-x-auto pb-1"
          data-lenis-prevent
        >
          {roleFilters.map((filter) => {
            const isActive = activeRole === filter.id;
            const count = counts[filter.id];
            if (count === 0 && filter.id !== "all") return null;

            return (
              <motion.button
                key={filter.id}
                type="button"
                onClick={() => setActiveRole(filter.id)}
                className={cn(
                  "relative shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "border-transparent text-dark-bg"
                    : "border-white/10 bg-white/[0.03] text-text-gray hover:text-text-light"
                )}
                whileTap={{ scale: 0.96 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="alert-mate-role-pill"
                    className="absolute inset-0 rounded-full bg-gradient shadow-glow"
                    transition={spring.snappy}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">
                  {filter.label}
                  <span className="ml-1 opacity-70">({count})</span>
                </span>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-2 sm:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredScreens.map((screen, i) => (
              <motion.button
                key={`${screen.src}-${i}`}
                type="button"
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{
                  duration: 0.28,
                  delay: i * 0.02,
                  ease: ease.outExpo,
                }}
                onClick={() =>
                  setLightbox({
                    src: screen.src,
                    caption: screen.caption,
                    variant: screen.variant,
                  })
                }
                className="group flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] p-2 text-left transition-all hover:border-primary/25 hover:bg-white/[0.04] sm:p-2.5"
                whileTap={{ scale: 0.99 }}
              >
                <div
                  className={cn(
                    "relative shrink-0 overflow-hidden rounded-md border border-white/10 bg-[#0a0a12]",
                    screen.variant === "wide" ? "h-12 w-20" : "h-14 w-10"
                  )}
                >
                  <Image
                    src={screen.src}
                    alt={screen.caption}
                    width={screen.variant === "wide" ? 80 : 40}
                    height={screen.variant === "wide" ? 48 : 56}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-text-light group-hover:text-primary sm:text-[13px]">
                    {screen.caption}
                  </p>
                  <p className="mt-0.5 text-[10px] capitalize text-text-gray/70">
                    {screen.role.replace("-", " ")}
                  </p>
                </div>
                <Expand className="h-3.5 w-3.5 shrink-0 text-text-gray/40 transition-colors group-hover:text-primary" />
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredScreens.length === 0 && (
          <p className="py-6 text-center text-sm text-text-gray">
            No screenshots for this role yet.
          </p>
        )}
      </section>

      <AnimatePresence>
        {lightbox && (
          <FullscreenLightbox
            item={lightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>

      {/* Demo video */}
      <section>
        <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-light">
          <Film className="h-3.5 w-3.5 text-primary" />
          Demo Video
        </h3>

        <motion.button
          type="button"
          onClick={() => {
            if (embedUrl) setShowDemoVideo(true);
            else window.open(showcase.demoVideo.url, "_blank", "noopener,noreferrer");
          }}
          className="group flex w-full items-center gap-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-4 text-left transition-all hover:border-primary/30 hover:shadow-[0_8px_28px_rgba(0,212,255,0.12)]"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient shadow-glow transition-transform group-hover:scale-105">
            <Play className="h-5 w-5 fill-white text-white" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-text-light group-hover:text-primary">
              {showcase.demoVideo.label}
            </span>
            <span className="mt-0.5 block text-xs text-text-gray">
              Tap to play the Alert Mate demo
            </span>
          </span>
        </motion.button>
      </section>

      <AnimatePresence>
        {showDemoVideo && embedUrl && (
          <motion.div
            className="fixed inset-0 z-[1200] flex items-center justify-center bg-[rgba(5,5,10,0.94)] p-3 backdrop-blur-md sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDemoVideo(false)}
          >
            <button
              type="button"
              onClick={() => setShowDemoVideo(false)}
              aria-label="Close demo video"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-dark-card/90 text-text-light transition-colors hover:border-primary/40 hover:text-primary sm:right-5 sm:top-5"
            >
              <X className="h-4 w-4" />
            </button>

            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-dark-card shadow-2xl"
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 8 }}
              transition={{ duration: 0.35, ease: ease.outExpo }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={embedUrl}
                  title={showcase.demoVideo.label}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <a
                href={showcase.demoVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 border-t border-white/[0.06] px-4 py-2.5 text-xs text-text-gray transition-colors hover:text-primary"
              >
                Open in Google Drive
                <ExternalLink className="h-3 w-3" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features */}
      <section>
        <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-light">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Project Features
        </h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {showcase.features.map((feature, i) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35, ease: ease.outExpo }}
              className="flex items-start gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-xs leading-relaxed text-text-gray sm:text-sm"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {feature}
            </motion.li>
          ))}
        </ul>

        {showcase.dashboardRoles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4, ease: ease.outExpo }}
            className="mt-3 rounded-lg border border-accent/15 bg-accent/[0.04] px-4 py-3"
          >
            <p className="mb-2 text-xs font-semibold text-accent sm:text-sm">
              Role-based dashboards
            </p>
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {showcase.dashboardRoles.map((role) => (
                <li
                  key={role}
                  className="flex items-center gap-2 text-xs text-text-gray sm:text-sm"
                >
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {role}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </section>
    </div>
  );
}
