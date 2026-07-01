"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import {
  AnimatedSection,
  SectionTitle,
  StaggerContainer,
  StaggerItem,
  RevealOnScroll,
} from "@/components/ui/AnimatedSection";
import { Tag } from "@/components/ui/Tag";
import { featuredProject, projects } from "@/data/portfolio";
import { spring, ease } from "@/lib/motion";

type ProjectData = {
  title: string;
  image: string;
  github: string;
  description: string;
  tools: string[];
};

function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: ProjectData;
  index: number;
  featured?: boolean;
}) {
  const imageLeft = index % 2 === 0;
  const slideFrom = imageLeft ? "left" : "right";

  return (
    <RevealOnScroll from={slideFrom} delay={featured ? 0 : 0.05}>
      <motion.div
        className="card-base group overflow-hidden"
        whileHover={{
          y: -4,
          boxShadow: "0 20px 50px rgba(0, 212, 255, 0.15)",
          borderColor: "rgba(0, 212, 255, 0.25)",
        }}
        transition={spring.gentle}
      >
        <div
          className={`flex flex-col md:min-h-[400px] md:flex-row ${
            !imageLeft && !featured ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="relative h-[220px] w-full shrink-0 overflow-hidden md:h-auto md:w-1/2">
            <motion.div
              className="h-full w-full"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.7, ease: ease.outExpo }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark-card/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-smooth group-hover:opacity-100" />
          </div>

          <div className="flex flex-1 flex-col justify-center p-5 md:p-8">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
              <motion.h3
                className="text-xl font-semibold text-text-light md:text-2xl"
                initial={false}
                whileHover={{ x: 4, color: "#00d4ff" }}
                transition={{ duration: 0.3, ease: ease.outExpo }}
              >
                {project.title}
              </motion.h3>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-text-light"
                title="View on GitHub"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(0, 212, 255, 0.5)",
                  backgroundColor: "rgba(0, 212, 255, 0.1)",
                  color: "#00d4ff",
                }}
                whileTap={{ scale: 0.97 }}
                transition={spring.snappy}
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </motion.a>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-text-gray transition-colors duration-300 group-hover:text-text-dark md:text-base">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.04, duration: 0.35, ease: ease.outExpo }}
                >
                  <Tag>{tool}</Tag>
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </RevealOnScroll>
  );
}

export function ProjectsSection() {
  return (
    <AnimatedSection id="projects" className="section-padding">
      <div className="container-main">
        <SectionTitle>Projects</SectionTitle>

        <div className="mb-8">
          <ProjectCard project={featuredProject} index={0} featured />
        </div>

        <StaggerContainer className="space-y-8">
          {projects.map((project, i) => (
            <StaggerItem key={project.title}>
              <ProjectCard project={project} index={i + 1} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
