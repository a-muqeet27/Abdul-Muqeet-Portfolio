"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  X,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { AlertMateShowcase } from "@/components/sections/AlertMateShowcase";
import { Tag } from "@/components/ui/Tag";
import { spring, ease } from "@/lib/motion";
import { useLenis } from "@/components/layout/SmoothScroll";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { lenis } = useLenis();
  const hasShowcase = Boolean(project?.showcase);

  const gallery = project?.gallery?.length
    ? project.gallery
    : project
      ? [{ src: project.image, caption: project.title }]
      : [];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [project?.title]);

  useEffect(() => {
    if (!project) return;

    lenis?.stop();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!hasShowcase && gallery.length > 1) {
        if (e.key === "ArrowRight")
          setActiveIndex((i) => (i + 1) % gallery.length);
        if (e.key === "ArrowLeft")
          setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose, lenis, gallery.length, hasShowcase]);

  const activeImage = gallery[activeIndex];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[1100] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            type="button"
            aria-label="Close project details"
            className="absolute inset-0 bg-[rgba(5,5,10,0.85)] backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className={`relative z-10 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-dark-card shadow-[0_24px_80px_rgba(0,0,0,0.6)] sm:max-h-[92vh] sm:rounded-2xl ${
              hasShowcase ? "max-w-5xl" : "max-w-4xl"
            }`}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: ease.outExpo }}
            data-lenis-prevent
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-dark-bg/80 text-text-light transition-colors hover:border-primary/40 hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="overflow-y-auto">
              {!hasShowcase && (
                <div className="relative bg-dark-bg">
                  <div className="relative aspect-video w-full overflow-hidden md:aspect-[16/9] md:max-h-[360px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImage?.src}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: ease.outExpo }}
                      >
                        <Image
                          src={activeImage?.src ?? project.image}
                          alt={activeImage?.caption ?? project.title}
                          width={900}
                          height={500}
                          className="h-full w-full object-contain bg-[#0a0a12] p-2"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {gallery.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveIndex(
                              (i) => (i - 1 + gallery.length) % gallery.length
                            )
                          }
                          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-dark-card/90 text-text-light transition-colors hover:border-primary/40 hover:text-primary"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveIndex((i) => (i + 1) % gallery.length)
                          }
                          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-dark-card/90 text-text-light transition-colors hover:border-primary/40 hover:text-primary"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {activeImage?.caption && (
                    <p className="border-t border-white/[0.06] px-4 py-2 text-center text-xs text-text-gray">
                      {activeImage.caption}
                    </p>
                  )}

                  {gallery.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto border-t border-white/[0.06] px-4 py-3">
                      {gallery.map((item, i) => (
                        <button
                          key={item.src}
                          type="button"
                          onClick={() => setActiveIndex(i)}
                          className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 ${
                            i === activeIndex
                              ? "border-primary/60 ring-2 ring-primary/20"
                              : "border-white/10 opacity-70 hover:opacity-100"
                          }`}
                          aria-label={`View image ${i + 1}`}
                        >
                          <Image
                            src={item.src}
                            alt={item.caption ?? `Image ${i + 1}`}
                            width={80}
                            height={56}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="p-4 sm:p-5 md:p-6">
                <div className="mb-4 flex flex-col gap-3 pr-8 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    {project.badge && (
                      <span className="mb-2 inline-block rounded-full border border-accent/35 bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                        {project.badge}
                      </span>
                    )}
                    <h2
                      id="project-modal-title"
                      className="text-lg font-bold text-text-light sm:text-xl md:text-2xl"
                    >
                      {project.title}
                    </h2>
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient px-4 py-2 text-sm font-medium text-white shadow-glow transition-transform hover:scale-105 sm:w-auto"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                  </a>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-text-gray md:text-base">
                  {project.description}
                </p>

                {project.showcase && (
                  <AlertMateShowcase showcase={project.showcase} />
                )}

                {!project.showcase &&
                  project.highlights &&
                  project.highlights.length > 0 && (
                    <div className="mb-5">
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-light">
                        Key Highlights
                      </h3>
                      <ul className="space-y-1.5">
                        {project.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-text-gray"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-light">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <Tag key={tool}>{tool}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
