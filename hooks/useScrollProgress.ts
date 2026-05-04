"use client";

import { useEffect, useState, useRef } from "react";

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [inViewport, setInViewport] = useState(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0-1) based on total scrollable height
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = documentHeight - windowHeight;
      const scrolled = window.scrollY;

      const progress = scrollableHeight > 0 ? scrolled / scrollableHeight : 0;
      setScrollProgress(Math.min(progress, 1));

      // Check if canvas is in viewport
      const canvasElement = document.querySelector("canvas");
      if (canvasElement) {
        const rect = canvasElement.getBoundingClientRect();
        setInViewport(rect.top < windowHeight && rect.bottom > 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return { scrollProgress, inViewport };
}
