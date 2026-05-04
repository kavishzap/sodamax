"use client";

import { useEffect, useState, useRef, RefObject } from "react";

export function useSectionScroll(sectionRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect       = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const raw = (window.scrollY - sectionTop) / scrollable;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, [sectionRef]);

  return progress;
}
