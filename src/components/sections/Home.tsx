"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/data/portfolio";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { heroStagger, heroItem, ease } from "@/lib/motion";

export function HomeSection() {
  const typedSubtitle = useTypingEffect(site.subtitle);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-home-gradient bg-[length:200%_200%] px-5 pt-20 text-center text-text-light animate-gradient-shift"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-1/2 -top-1/2 h-[200%] w-[200%] opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 2px, transparent 2px)",
          backgroundSize: "100px 100px",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="relative z-10"
        initial="hidden"
        animate="visible"
        variants={heroStagger}
      >
        <motion.div variants={heroItem}>
          <motion.div
            className="mx-auto mb-8 h-[200px] w-[200px] overflow-hidden rounded-full border-4 border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.4)] md:h-[250px] md:w-[250px]"
            animate={{ y: [0, -14, 0] }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 20px 60px rgba(0, 212, 255, 0.25)",
              borderColor: "rgba(0, 212, 255, 0.4)",
            }}
          >
            <Image
              src={site.profileImage}
              alt="Profile Photo"
              width={250}
              height={250}
              className="h-full w-full object-cover transition-transform duration-700 ease-smooth hover:scale-105"
              priority
            />
          </motion.div>
        </motion.div>

        <motion.h1
          className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl"
          variants={heroItem}
        >
          {site.name}
        </motion.h1>

        <motion.p
          className="mx-auto max-w-3xl text-base leading-relaxed text-white/90 md:text-lg lg:text-xl"
          variants={heroItem}
        >
          {typedSubtitle}
          <motion.span
            className="inline-block text-primary"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: ease.inOut }}
          >
            |
          </motion.span>
        </motion.p>
      </motion.div>
    </section>
  );
}
