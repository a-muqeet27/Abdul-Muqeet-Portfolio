"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { spring, ease, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useLenis, scrollToSection } from "@/components/layout/SmoothScroll";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

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

function MobileMenu({
  open,
  onClose,
  onNavigate,
  activeSection,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
  activeSection: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-[1098] bg-[rgba(5,5,10,0.75)] backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.nav
            className="fixed inset-y-0 right-0 z-[1099] flex w-[min(100%,320px)] flex-col border-l border-white/10 bg-[rgba(10,10,15,0.98)] shadow-[-8px_0_40px_rgba(0,0,0,0.5)] lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: ease.outExpo }}
            data-lenis-prevent
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <span className="gradient-text text-lg font-bold">Menu</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-text-light transition-colors hover:border-primary/40 hover:text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
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
                        onNavigate(link.href);
                      }}
                      className={cn(
                        "block rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-300",
                        isActive
                          ? "border border-primary/30 bg-primary/10 text-primary"
                          : "text-text-light hover:bg-white/[0.05] hover:text-primary"
                      )}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

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
    if (!menuOpen) return;

    lenis?.stop();
    document.body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [menuOpen, lenis]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    scrollToSection(lenis, href);
  };

  return (
    <>
      <nav
        className={cn(
          "glass-nav fixed top-0 z-[1000] w-full py-3 sm:py-4",
          scrolled
            ? "shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
        )}
      >
        <div className="container-main flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="gradient-text text-xl font-bold sm:text-2xl"
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

          <button
            type="button"
            className="relative z-[1001] flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-white/10 text-text-light transition-colors hover:border-primary/40 hover:text-primary lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavClick}
        activeSection={activeSection}
      />
    </>
  );
}
