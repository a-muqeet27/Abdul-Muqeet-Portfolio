"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  AnimatedSection,
  SectionTitle,
  StaggerContainer,
  StaggerItem,
  FadeIn,
} from "@/components/ui/AnimatedSection";
import { Tag } from "@/components/ui/Tag";
import { experience } from "@/data/portfolio";
import { spring, ease, listItemStagger } from "@/lib/motion";

function ExperienceCard({
  item,
}: {
  item: (typeof experience.items)[0];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="card-base group border-l-4 border-l-primary p-4 sm:p-5 md:p-6"
      whileHover={{
        y: -2,
        boxShadow: "0 12px 45px rgba(0, 212, 255, 0.18)",
        borderLeftColor: "rgba(0, 245, 255, 0.8)",
      }}
      transition={spring.gentle}
      layout
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <motion.div
          whileHover={{ scale: 1.08, rotate: 2 }}
          transition={spring.snappy}
        >
          <Image
            src={item.logo}
            alt={`${item.company} Logo`}
            width={64}
            height={64}
            className="h-12 w-12 shrink-0 rounded-lg object-contain sm:h-14 sm:w-14 md:h-16 md:w-16"
          />
        </motion.div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-text-light sm:text-lg md:text-xl">
            {item.role}
          </h3>
          <p className="text-sm text-primary sm:text-base">{item.company}</p>
          <p className="text-xs text-text-gray sm:text-sm">{item.date}</p>
        </div>
        <motion.button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary"
          aria-label="Toggle details"
          aria-expanded={expanded}
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(0, 212, 255, 0.2)",
          }}
          whileTap={{ scale: 0.92 }}
          transition={spring.snappy}
        >
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.45, ease: ease.outExpo }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.5, ease: ease.outExpo },
                opacity: { duration: 0.35, delay: 0.1, ease: ease.out },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.4, ease: ease.inOut },
                opacity: { duration: 0.2 },
              },
            }}
            className="overflow-hidden"
          >
            <ul className="mt-4 list-disc space-y-2 pl-5 text-text-gray">
              {item.bullets.map((bullet, i) => (
                <motion.li
                  key={bullet}
                  custom={i}
                  variants={listItemStagger}
                  initial="hidden"
                  animate="visible"
                >
                  {bullet}
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: ease.outExpo }}
            >
              {item.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.35 }}
                >
                  <Tag>{tag}</Tag>
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ExperienceSection() {
  return (
    <AnimatedSection id="experience" className="section-padding bg-dark-bg">
      <div className="container-main">
        <SectionTitle>Experience</SectionTitle>
        <FadeIn className="mb-6 px-1 text-center text-sm text-text-gray sm:mb-8 sm:text-base">
          {experience.intro}
        </FadeIn>
        <StaggerContainer className="space-y-6">
          {experience.items.map((item) => (
            <StaggerItem key={item.company}>
              <ExperienceCard item={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
