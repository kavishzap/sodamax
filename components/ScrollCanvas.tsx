"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const TOTAL_FRAMES = 180;
const BATCH_SIZE = 10;

interface ScrollCanvasProps {
  onLoadComplete?: () => void;
}

export function ScrollCanvas({ onLoadComplete }: ScrollCanvasProps) {
  const canvasRef        = useRef<HTMLCanvasElement>(null);
  const framesRef        = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const rafRef           = useRef<number | null>(null);
  const lastFrameRef     = useRef<number>(-1);
  const loadedCountRef   = useRef(0);
  const onLoadCompleteRef = useRef(onLoadComplete);

  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress]   = useState(0);

  const { scrollProgress } = useScrollProgress();

  // Keep callback ref stable
  useEffect(() => { onLoadCompleteRef.current = onLoadComplete; }, [onLoadComplete]);

  // Load frames in batches to avoid memory spike
  useEffect(() => {
    let cancelled = false;

    const loadBatch = (startIndex: number) => {
      if (cancelled) return;
      const end = Math.min(startIndex + BATCH_SIZE, TOTAL_FRAMES);

      for (let i = startIndex; i < end; i++) {
        const img = new Image();
        const frameNum = String(i + 1).padStart(4, "0");
        img.src = `/frames/frame_${frameNum}.webp`;

        img.onload = () => {
          if (cancelled) return;
          framesRef.current[i] = img;
          loadedCountRef.current += 1;
          const pct = loadedCountRef.current / TOTAL_FRAMES;
          setProgress(pct);

          if (loadedCountRef.current === TOTAL_FRAMES) {
            setIsLoading(false);
            onLoadCompleteRef.current?.();
          }
        };

        img.onerror = () => {
          if (cancelled) return;
          loadedCountRef.current += 1;
          const pct = loadedCountRef.current / TOTAL_FRAMES;
          setProgress(pct);
          if (loadedCountRef.current === TOTAL_FRAMES) {
            setIsLoading(false);
            onLoadCompleteRef.current?.();
          }
        };
      }

      // Schedule next batch after a short yield so the browser can breathe
      if (end < TOTAL_FRAMES) {
        setTimeout(() => loadBatch(end), 50);
      }
    };

    loadBatch(0);
    return () => { cancelled = true; };
  }, []);

  // Draw a specific frame onto the canvas
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img    = framesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const x     = (canvas.width  - img.naturalWidth  * scale) / 2;
    const y     = (canvas.height - img.naturalHeight * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    lastFrameRef.current = index;
  }, []);

  // Render on scroll change
  useEffect(() => {
    if (isLoading) return;

    // Cancel any pending RAF
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const isMobile    = window.innerWidth < 768;
    let frameIndex    = Math.round(scrollProgress * (TOTAL_FRAMES - 1));
    if (isMobile) frameIndex = Math.round(frameIndex / 2) * 2;
    frameIndex = Math.max(0, Math.min(frameIndex, TOTAL_FRAMES - 1));

    // Skip redraw if same frame
    if (frameIndex === lastFrameRef.current) return;

    // If the image is ready draw immediately, otherwise wait
    const tryDraw = () => {
      const img = framesRef.current[frameIndex];
      if (img && img.complete && img.naturalWidth > 0) {
        drawFrame(frameIndex);
      } else {
        // Draw closest loaded frame while waiting
        drawFrame(lastFrameRef.current >= 0 ? lastFrameRef.current : 0);
        rafRef.current = requestAnimationFrame(tryDraw);
      }
    };

    rafRef.current = requestAnimationFrame(tryDraw);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [scrollProgress, isLoading, drawFrame]);

  // Resize canvas to viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      // Redraw current frame after resize
      if (lastFrameRef.current >= 0) drawFrame(lastFrameRef.current);
    };

    updateSize();
    window.addEventListener("resize", updateSize, { passive: true });
    return () => window.removeEventListener("resize", updateSize);
  }, [drawFrame]);

  return (
    <div className="relative w-full h-screen sticky top-0 bg-bg-deep overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-bg-deep/95 backdrop-blur-sm">
          <div className="text-center">
            <div className="mb-4 w-12 h-12 border-2 border-amber-custom border-t-amber-light rounded-full animate-spin mx-auto" />
            <p className="text-cream text-sm font-light">{Math.round(progress * 100)}%</p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        aria-label="SodaMax scroll animation canvas"
      />
    </div>
  );
}
