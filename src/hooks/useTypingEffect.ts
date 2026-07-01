"use client";

import { useEffect, useRef, useState } from "react";

export function useTypingEffect(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const hasTypedRef = useRef(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const homeSection = document.getElementById("home");
    if (!homeSection) return;
    sectionRef.current = homeSection;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTypedRef.current) {
          hasTypedRef.current = true;
          setIsTyping(true);
          setDisplayed("");
        } else if (!entry.isIntersecting) {
          hasTypedRef.current = false;
          setDisplayed("");
          setIsTyping(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(homeSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isTyping, text, speed]);

  return displayed;
}
