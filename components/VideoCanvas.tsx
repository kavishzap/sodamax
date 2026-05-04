"use client";

import { useEffect, useRef, useState, useCallback, RefObject } from "react";
import { useSectionScroll } from "@/hooks/useSectionScroll";

const BATCH_SIZE = 10;

interface VideoCanvasProps {
  framesPath: string;
  totalFrames: number;
  extension?: string;
  sectionRef: RefObject<HTMLElement | null>;
  onLoadComplete?: () => void;
}

export function VideoCanvas({
  framesPath,
  totalFrames,
  extension = "webp",
  sectionRef,
  onLoadComplete,
}: VideoCanvasProps) {
  const canvasRef          = useRef<HTMLCanvasElement>(null);
  const framesRef          = useRef<(HTMLImageElement | null)[]>(Array(totalFrames).fill(null));
  const rafRef             = useRef<number | null>(null);
  const lastFrameRef       = useRef<number>(-1);
  const loadedCountRef     = useRef(0);
  const onLoadCompleteRef  = useRef(onLoadComplete);

  const [isLoading, setIsLoading] = useState(true);
  const [loadPct, setLoadPct]     = useState(0);

  const scrollProgress = useSectionScroll(sectionRef);

  useEffect(() => { onLoadCompleteRef.current = onLoadComplete; }, [onLoadComplete]);

  // Batched frame preload
  useEffect(() => {
    let cancelled = false;
    loadedCountRef.current = 0;

    const loadBatch = (start: number) => {
      if (cancelled) return;
      const end = Math.min(start + BATCH_SIZE, totalFrames);

      for (let i = start; i < end; i++) {
        const img      = new Image();
        const frameNum = String(i + 1).padStart(4, "0");
        img.src        = `${framesPath}/frame_${frameNum}.${extension}`;

        const onDone = () => {
          if (cancelled) return;
          framesRef.current[i] = img;
          loadedCountRef.current++;
          setLoadPct(loadedCountRef.current / totalFrames);
          if (loadedCountRef.current === totalFrames) {
            setIsLoading(false);
            onLoadCompleteRef.current?.();
          }
        };

        img.onload  = onDone;
        img.onerror = onDone;
      }

      if (end < totalFrames) setTimeout(() => loadBatch(end), 50);
    };

    loadBatch(0);
    return () => { cancelled = true; };
  }, [framesPath, totalFrames, extension]);

  // Draw frame
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img    = framesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx   = canvas.getContext("2d");
    if (!ctx) return;

    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const x     = (canvas.width  - img.naturalWidth  * scale) / 2;
    const y     = (canvas.height - img.naturalHeight * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    lastFrameRef.current = index;
  }, []);

  // Render on scroll
  useEffect(() => {
    if (isLoading) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    let idx = Math.round(scrollProgress * (totalFrames - 1));
    if (isMobile) idx = Math.round(idx / 2) * 2;
    idx = Math.max(0, Math.min(idx, totalFrames - 1));

    if (idx === lastFrameRef.current) return;

    const tryDraw = () => {
      const img = framesRef.current[idx];
      if (img && img.complete && img.naturalWidth > 0) {
        drawFrame(idx);
      } else {
        if (lastFrameRef.current >= 0) drawFrame(lastFrameRef.current);
        rafRef.current = requestAnimationFrame(tryDraw);
      }
    };

    rafRef.current = requestAnimationFrame(tryDraw);
    return () => {
      if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    };
  }, [scrollProgress, isLoading, totalFrames, drawFrame]);

  // Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const update = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      if (lastFrameRef.current >= 0) drawFrame(lastFrameRef.current);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [drawFrame]);

  return (
    <div className="relative w-full h-screen sticky top-0 bg-[#050301] overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-[#050301]/95 backdrop-blur-sm">
          <div className="text-center">
            <div className="mb-4 w-12 h-12 border-2 border-[#C97818] border-t-[#F6A735] rounded-full animate-spin mx-auto" />
            <p className="text-[#FFF4DD] text-sm font-light font-inter">{Math.round(loadPct * 100)}%</p>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full" aria-label="Scroll animation canvas" />
    </div>
  );
}
