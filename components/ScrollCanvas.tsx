"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface ScrollCanvasProps {
  onLoadComplete?: () => void;
}

export function ScrollCanvas({ onLoadComplete }: ScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { scrollProgress, inViewport } = useScrollProgress();

  // Preload all frames
  useEffect(() => {
    const loadFrames = async () => {
      setIsLoading(true);
      try {
        const totalFrames = 180;
        const frames: HTMLImageElement[] = [];

        await new Promise<void>((resolve, reject) => {
          const first = new Image();
          first.src = `/frames/frame_0001.webp`;
          first.onload = () => resolve();
          first.onerror = reject;
          frames.push(first);
        });

        for (let i = 1; i < totalFrames; i++) {
          const img = new Image();
          const frameNum = String(i + 1).padStart(4, "0");
          img.src = `/frames/frame_${frameNum}.webp`;
          img.onload = () => {
            setProgress((prev) => Math.min(prev + 1 / totalFrames, 0.99));
          };
          frames.push(img);
        }

        framesRef.current = frames;
        setProgress(1);
        setIsLoading(false);
        onLoadComplete?.();
      } catch (error) {
        console.error("Failed to load frames:", error);
        setIsLoading(false);
      }
    };

    loadFrames();
  }, [onLoadComplete]);

  // Render canvas frame based on scroll progress
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || framesRef.current.length === 0 || isLoading) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate frame index from scroll progress
    const totalFrames = framesRef.current.length;
    let frameIndex = Math.floor(scrollProgress * totalFrames);
    frameIndex = Math.min(frameIndex, totalFrames - 1);

    // Mobile: skip every other frame for performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      frameIndex = Math.floor(frameIndex / 2) * 2;
    }

    const currentFrame = framesRef.current[frameIndex];

    const render = () => {
      if (!currentFrame.complete) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // Draw to canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.max(
        canvas.width / currentFrame.width,
        canvas.height / currentFrame.height
      );
      const x = (canvas.width - currentFrame.width * scale) / 2;
      const y = (canvas.height - currentFrame.height * scale) / 2;

      ctx.drawImage(
        currentFrame,
        x,
        y,
        currentFrame.width * scale,
        currentFrame.height * scale
      );
    };

    if (inViewport) {
      render();
    }
  }, [scrollProgress, inViewport, isLoading]);

  // Set canvas to viewport size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative w-full h-screen sticky top-0 bg-bg-deep overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-bg-deep/95 backdrop-blur-sm">
          <div className="text-center">
            <div className="mb-4 w-12 h-12 border-2 border-amber-custom border-t-amber-light rounded-full animate-spin mx-auto"></div>
            <p className="text-cream text-sm font-light">
              {Math.round(progress * 100)}%
            </p>
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
