"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Images,
  Expand,
  Sparkles,
} from "lucide-react";
import {
  AnimatedSection,
  SectionTitle,
  StaggerContainer,
  StaggerItem,
  RevealOnScroll,
} from "@/components/ui/AnimatedSection";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { featuredProject, projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

function ProjectCard({
  project,
  index,
  featured = false,
  onOpen,
}: {
  project: Project;
  index: number;
  featured?: boolean;
  onOpen: (project: Project) => void;
}) {
  const imageLeft = index % 2 === 0;
  const slideFrom = imageLeft ? "left" : "right";
  const hasGallery = (project.gallery?.length ?? 0) > 1;
  const visibleTools = project.tools.slice(0, featured ? 4 : 3);
  const extraTools = project.tools.length - visibleTools.length;

  return (
    <RevealOnScroll from={slideFrom} delay={featured ? 0 : 0.04}>
      <motion.article
        className={cn(
          "group relative overflow-hidden rounded-xl border bg-dark-card/80 shadow-card backdrop-blur-sm transition-colors duration-400",
          featured
            ? "border-primary/20"
            : "border-white/[0.08] hover:border-white/[0.14]"
        )}
        whileHover={{ y: -4 }}
        transition={spring.gentle}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div
          className={cn(
            "relative z-10 flex flex-col sm:flex-row sm:items-stretch",
            !imageLeft && !featured && "sm:flex-row-reverse"
          )}
        >
          <div className="relative w-full shrink-0 sm:w-[34%] lg:w-[32%]">
            <div className="relative h-[118px] overflow-hidden sm:h-full sm:min-h-[148px] sm:max-h-[168px]">
              <Image
                src={project.image}
                alt={project.title}
                width={480}
                height={300}
                className="h-full w-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark-card/80 via-transparent to-transparent sm:bg-gradient-to-r sm:from-dark-card/50" />

              {featured && !project.badge && (
                <span className="absolute left-2.5 top-2.5 z-10 flex items-center gap-1 rounded-md border border-primary/30 bg-primary/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#8df0ff] backdrop-blur-md">
                  <Sparkles className="h-2.5 w-2.5" />
                  Featured
                </span>
              )}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-3.5 lg:p-4">
            <div className="mb-1.5 flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                {project.badge && (
                  <span className="mb-1.5 inline-flex items-center rounded-md border border-accent/35 bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent sm:text-[11px]">
                    {project.badge}
                  </span>
                )}
                <h3 className="text-sm font-bold leading-snug text-text-light transition-colors duration-300 group-hover:text-primary sm:text-[15px] lg:text-base">
                  {project.title}
                </h3>
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 text-text-light transition-colors hover:border-primary/30 hover:bg-white/[0.07] hover:text-primary sm:px-3"
                title="View on GitHub"
              >
                <Github className="h-4 w-4" />
                <span className="hidden text-xs font-medium sm:inline">GitHub</span>
              </a>
            </div>

            <p className="mb-2.5 line-clamp-2 text-xs leading-relaxed text-text-gray sm:line-clamp-2 sm:text-[13px]">
              {project.description}
            </p>

            <div className="mb-3 flex flex-wrap gap-1">
              {visibleTools.map((tool) => (
                <span
                  key={tool}
                  className="rounded border border-white/[0.06] bg-white/[0.03] px-1.5 py-px text-[10px] font-medium text-text-gray transition-colors group-hover:border-primary/15 group-hover:text-[#8df0ff]"
                >
                  {tool}
                </span>
              ))}
              {extraTools > 0 && (
                <span className="self-center text-[10px] text-text-gray/60">
                  +{extraTools}
                </span>
              )}
            </div>

            <div className="mt-auto border-t border-white/[0.05] pt-2.5">
              <motion.button
                type="button"
                onClick={() => onOpen(project)}
                className={cn(
                  "inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-300 sm:w-auto",
                  hasGallery
                    ? "bg-gradient text-white shadow-[0_2px_14px_rgba(0,212,255,0.2)] hover:shadow-[0_4px_18px_rgba(0,212,255,0.3)]"
                    : "border border-primary/25 bg-primary/10 text-[#8df0ff] hover:bg-primary/18"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {hasGallery ? (
                  <Images className="h-3.5 w-3.5" />
                ) : (
                  <Expand className="h-3.5 w-3.5" />
                )}
                {hasGallery ? "Gallery" : "Details"}
                {hasGallery && (
                  <span className="rounded bg-white/20 px-1 py-px text-[9px] font-bold">
                    {project.gallery!.length}
                  </span>
                )}
                <ArrowUpRight className="h-3 w-3 opacity-60" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.article>
    </RevealOnScroll>
  );
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <AnimatedSection id="projects" className="section-padding">
        <div className="container-main">
          <SectionTitle>Projects</SectionTitle>

          <div className="mb-4">
            <ProjectCard
              project={featuredProject}
              index={0}
              featured
              onOpen={setSelectedProject}
            />
          </div>

          <StaggerContainer className="space-y-3.5 sm:space-y-4">
            {projects.map((project, i) => (
              <StaggerItem key={project.title}>
                <ProjectCard
                  project={project}
                  index={i + 1}
                  onOpen={setSelectedProject}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
