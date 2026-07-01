"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import {
  AnimatedSection,
  SectionTitle,
  StaggerContainer,
  StaggerItem,
  FadeIn,
} from "@/components/ui/AnimatedSection";
import { socialLinks } from "@/data/portfolio";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  whatsapp: WhatsAppIcon,
} as const;

const socialStyles = {
  github: {
    iconBg: "from-[#2d2d3a] to-[#161622]",
    iconColor: "text-white",
    glow: "group-hover:shadow-[0_12px_40px_rgba(255,255,255,0.12)]",
    border: "group-hover:border-white/25",
    accent: "group-hover:text-white",
  },
  linkedin: {
    iconBg: "from-[#0077b5] to-[#004e7a]",
    iconColor: "text-white",
    glow: "group-hover:shadow-[0_12px_40px_rgba(0,119,181,0.35)]",
    border: "group-hover:border-[#0077b5]/50",
    accent: "group-hover:text-[#5eb8f0]",
  },
  mail: {
    iconBg: "from-primary to-[#0066ff]",
    iconColor: "text-white",
    glow: "group-hover:shadow-[0_12px_40px_rgba(0,212,255,0.35)]",
    border: "group-hover:border-primary/50",
    accent: "group-hover:text-primary",
  },
  whatsapp: {
    iconBg: "from-[#25D366] to-[#128C7E]",
    iconColor: "text-white",
    glow: "group-hover:shadow-[0_12px_40px_rgba(37,211,102,0.35)]",
    border: "group-hover:border-[#25D366]/50",
    accent: "group-hover:text-[#5ee89a]",
  },
} as const;

export function ConnectSection() {
  return (
    <AnimatedSection id="connect" className="section-padding bg-dark-bg">
      <div className="container-main text-center">
        <SectionTitle>Let&apos;s Connect</SectionTitle>
        <FadeIn className="mx-auto mb-8 max-w-xl px-2 text-sm text-text-gray sm:mb-10 sm:text-base">
          Feel free to reach out! I&apos;m always open to discuss new projects,
          ideas, or opportunities.
        </FadeIn>

        <StaggerContainer className="mx-auto grid max-w-lg grid-cols-2 gap-3 sm:max-w-2xl sm:gap-4 md:flex md:max-w-none md:flex-wrap md:items-stretch md:justify-center md:gap-5">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            const style = socialStyles[link.icon];

            return (
              <StaggerItem key={link.label} className="md:flex-1 md:max-w-[220px]">
                <motion.a
                  href={link.href}
                  target={link.icon === "mail" ? undefined : "_blank"}
                  rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
                  title={link.label}
                  className={cn(
                    "group relative flex h-full min-h-[132px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-4 text-text-light backdrop-blur-sm transition-all duration-300 sm:min-h-[148px] sm:gap-3.5 sm:p-5",
                    style.glow,
                    style.border
                  )}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={spring.gentle}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div
                    className={cn(
                      "relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg sm:h-14 sm:w-14",
                      style.iconBg
                    )}
                  >
                    <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", style.iconColor)} />
                  </div>

                  <div className="relative text-center">
                    <p
                      className={cn(
                        "text-sm font-semibold transition-colors duration-300 sm:text-base",
                        style.accent
                      )}
                    >
                      {link.label}
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-wider text-text-gray/70 sm:text-[11px]">
                      {link.icon === "mail" ? "Send a message" : "Tap to open"}
                    </p>
                  </div>

                  <ArrowUpRight className="absolute right-3 top-3 h-3.5 w-3.5 text-white/20 transition-all duration-300 group-hover:text-white/60 sm:right-3.5 sm:top-3.5" />
                </motion.a>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
