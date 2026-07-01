"use client";

import { Download } from "lucide-react";
import { motion } from "framer-motion";
import {
  AnimatedSection,
  SectionTitle,
  FadeIn,
} from "@/components/ui/AnimatedSection";
import { site } from "@/data/portfolio";
import { spring, ease } from "@/lib/motion";

export function DownloadSection() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = site.resumeFile;
    link.download = site.resumeDownloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatedSection id="download" className="section-padding">
      <div className="container-main text-center">
        <SectionTitle>Download Resume</SectionTitle>
        <FadeIn className="mx-auto mb-8 max-w-xl text-text-gray">
          Get a copy of my resume to learn more about my skills and experience.
        </FadeIn>
        <FadeIn delay={0.15}>
          <motion.button
            type="button"
            onClick={handleDownload}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient px-8 py-4 text-lg font-semibold text-white shadow-glow"
            whileHover={{
              scale: 1.06,
              boxShadow: "0 0 40px rgba(0, 212, 255, 0.45)",
            }}
            whileTap={{ scale: 0.96 }}
            transition={spring.snappy}
          >
            <motion.span
              className="absolute inset-0 bg-white/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, ease: ease.outExpo }}
            />
            <Download className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="relative">Download Resume</span>
          </motion.button>
        </FadeIn>
      </div>
    </AnimatedSection>
  );
}
