"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { spring, ease, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useLenis, scrollToSection } from "@/components/layout/SmoothScroll";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

const menuVariants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: {
    opacity: 1,
    backdropFilter: "blur(20px)",
    transition: { duration: 0.4, ease: ease.outExpo },
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: { duration: 0.3, ease: ease.inOut },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.05 + i * 0.06,
      duration: duration.slow,
      ease: ease.outExpo,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 12,
    filter: "blur(4px)",
    transition: { delay: i * 0.03, duration: 0.2 },
  }),
};

export function Navbar() {
  const { lenis } = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = (currentY: number) => {
      setScrolled(currentY > 20);
    };

    if (lenis) {
      const onLenisScroll = (instance: typeof lenis) => {
        handleScroll(instance.scroll);
      };
      lenis.on("scroll", onLenisScroll);
      return () => lenis.off("scroll", onLenisScroll);
    }

    const onScroll = () => handleScroll(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    scrollToSection(lenis, href);
  };

  return (
    <motion.nav
      className={cn(
        "glass-nav fixed top-0 z-[1000] w-full py-4",
        scrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
      )}
    >
      <div className="container-main flex items-center justify-between">
        <motion.a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="gradient-text text-2xl font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={spring.snappy}
        >
          AM
        </motion.a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={cn(
                    "group relative font-medium text-text-light transition-colors duration-300 hover:text-primary",
                    isActive && "text-primary"
                  )}
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-gradient"
                    initial={false}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.45, ease: ease.outExpo }}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <motion.button
          type="button"
          className="flex flex-col gap-1.5 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          whileTap={{ scale: 0.9 }}
          transition={spring.snappy}
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.25 }}
              >
                <X className="h-6 w-6 text-text-light" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.25 }}
              >
                <Menu className="h-6 w-6 text-text-light" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 top-[65px] z-[999] overflow-y-auto bg-[rgba(10,10,15,0.97)] lg:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            data-lenis-prevent
          >
            <ul className="flex flex-col items-center gap-6 py-10">
              {navLinks.map((link, i) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <motion.li
                    key={link.href}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={menuItemVariants}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={cn(
                        "text-lg font-medium transition-colors duration-300 hover:text-primary",
                        isActive ? "text-primary" : "text-text-light"
                      )}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
