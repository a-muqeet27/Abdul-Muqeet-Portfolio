"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/AnimatedSection";

export function Footer() {
  return (
    <FadeIn>
      <footer className="border-t border-white/10 bg-dark-bg py-6 text-center text-text-gray">
        <div className="container-main">
          <motion.p
            whileHover={{ color: "#a0a0b0" }}
            transition={{ duration: 0.3 }}
          >
            &copy; 2026 Portfolio. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </FadeIn>
  );
}
