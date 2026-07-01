"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Images, Expand } from "lucide-react";
import {
  AnimatedSection,
  SectionTitle,
  StaggerContainer,
  StaggerItem,
  RevealOnScroll,
} from "@/components/ui/AnimatedSection";
import { Tag } from "@/components/ui/Tag";
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

  return (
    <RevealOnScroll from={slideFrom} delay={featured ? 0 : 0.05}>
      <motion.article
        className="group relative overflow-hidden rounded-[15px] border border-white/[0.08] bg-dark-card shadow-card"
        whileHover={{ y: -6 }}
        transition={spring.gentle}
      >
        <span
          aria-hidden
          className="absolute left-0 top-0 z-20 h-[2px] w-0 bg-gradient transition-all duration-700 ease-out group-hover:w-full"
        />
        <span
          aria-hidden
          className="absolute bottom-0 left-0 top-0 z-20 w-[3px] origin-top scale-y-0 bg-gradient transition-transform duration-500 ease-out group-hover:scale-y-100"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 z-0 h-56 w-56 rounded-full bg-primary/[0.04] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        />

        {featured && (
          <span className="absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-text-light backdrop-blur-sm">
            Featured
          </span>
        )}

        {project.badge && !featured && (
          <span className="absolute left-4 top-4 z-20 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-[#8df0ff] backdrop-blur-sm">
            {project.badge}
          </span>
        )}

        <div
          className={cn(
            "relative z-10 flex flex-col md:flex-row md:items-stretch",
            !imageLeft && !featured && "md:flex-row-reverse"
          )}
        >
          <div className="relative h-[160px] w-full shrink-0 overflow-hidden sm:h-[180px] md:h-auto md:w-[38%] md:min-h-[220px] md:max-h-[260px]">
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-[1.08]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-dark-card/30 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full"
            />
          </div>

          <div className="relative flex flex-1 flex-col justify-center border-t border-white/[0.06] p-4 md:border-t-0 md:border-l md:border-white/[0.06] md:p-5">
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-text-light transition-all duration-300 group-hover:tracking-wide md:text-xl">
                  {project.title}
                </h3>
                <span
                  aria-hidden
                  className="mt-2 block h-px w-0 bg-gradient transition-all duration-500 ease-out group-hover:w-16"
                />
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-text-light backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08]"
                title="View on GitHub"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
              </a>
            </div>

            <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-text-gray">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {project.tools.slice(0, 4).map((tool) => (
                  <Tag key={tool}>{tool}</Tag>
                ))}
                {project.tools.length > 4 && (
                  <span className="self-center text-xs text-text-gray">
                    +{project.tools.length - 4} more
                  </span>
                )}
              </div>
            </div>

            <motion.button
              type="button"
              onClick={() => onOpen(project)}
              className={cn(
                "mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300",
                hasGallery
                  ? "border-primary/40 bg-primary/15 text-[#8df0ff] hover:border-primary/60 hover:bg-primary/25 hover:shadow-glow"
                  : "border-white/15 bg-white/[0.06] text-text-light hover:border-white/30 hover:bg-white/10"
              )}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              {hasGallery ? (
                <Images className="h-4 w-4" />
              ) : (
                <Expand className="h-4 w-4" />
              )}
              {hasGallery ? "View Gallery" : "View Details"}
              {hasGallery && (
                <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold">
                  {project.gallery!.length}
                </span>
              )}
            </motion.button>
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

          <div className="mb-5">
            <ProjectCard
              project={featuredProject}
              index={0}
              featured
              onOpen={setSelectedProject}
            />
          </div>

          <StaggerContainer className="space-y-5">
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
