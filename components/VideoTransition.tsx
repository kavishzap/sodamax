"use client";

import { useEffect, useRef, useState } from "react";

export function VideoTransition() {
  const ref      = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "in" | "hold" | "out">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("in");
          setTimeout(() => setPhase("hold"), 400);
          setTimeout(() => setPhase("out"), 900);
          setTimeout(() => setPhase("idle"), 1400);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const overlayOpacity =
    phase === "in"   ? 1 :
    phase === "hold" ? 1 :
    phase === "out"  ? 0 : 0;

  return (
    <div
      ref={ref}
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ height: "60vh", background: "#050301" }}
    >
      {/* Flash overlay */}
      <div
        className="absolute inset-0 bg-[#050301] z-20 pointer-events-none"
        style={{
          opacity: overlayOpacity,
          transition:
            phase === "in"
              ? "opacity 0.4s ease-in"
              : phase === "out"
              ? "opacity 0.5s ease-out"
              : "none",
        }}
      />

      {/* Ambient glow rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(201,120,24,0.08) 0%, transparent 70%)",
            animation: "pulse-ring 4s ease-in-out infinite",
          }}
        />
      </div>

      {/* Center text reveal */}
      <div className="relative z-10 text-center px-8">
        <div
          className="overflow-hidden"
          style={{
            opacity: phase === "out" || phase === "idle" ? 1 : 0,
            transform: phase === "out" || phase === "idle" ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s",
          }}
        >
          <p className="font-inter text-[10px] tracking-[0.5em] text-[#C97818] uppercase mb-5">
            Next up
          </p>
          <h2
            className="font-garamond font-bold text-[clamp(3rem,7vw,5rem)] text-[#FFF4DD] leading-tight"
            style={{
              textShadow:
                "0 0 60px rgba(246,167,53,0.3), 0 0 120px rgba(201,120,24,0.15)",
            }}
          >
            Monin Syrups.
          </h2>
          <p className="font-inter text-sm text-[#B8946A] mt-4 tracking-widest">
            Craft your perfect flavour
          </p>

          {/* Animated amber line */}
          <div
            className="mx-auto mt-8 h-[1px] bg-gradient-to-r from-transparent via-[#F6A735] to-transparent"
            style={{
              width: phase === "out" || phase === "idle" ? "160px" : "0px",
              opacity: phase === "out" || phase === "idle" ? 1 : 0,
              transition: "width 0.8s ease-out 0.3s, opacity 0.8s ease-out 0.3s",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
