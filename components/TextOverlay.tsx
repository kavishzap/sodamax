"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function TextOverlay() {
  const { scrollYProgress } = useScroll();

  // Hero text (appears at ~5% scroll, fade out at 25%)
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.25, 0.35],
    [0, 1, 1, 0]
  );
  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.25],
    [0.95, 1, 1]
  );
  const heroY = useTransform(
    scrollYProgress,
    [0, 0.05, 0.25],
    [20, 0, 0],
    { clamp: true }
  );

  // Splash text (appears at ~35% scroll, peaks at 50%, fade out at 70%)
  const splashOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.35, 0.65, 0.72],
    [0, 1, 1, 0]
  );
  const splashScale = useTransform(
    scrollYProgress,
    [0.3, 0.35, 0.65],
    [0.9, 1, 1]
  );
  const splashY = useTransform(
    scrollYProgress,
    [0.3, 0.35, 0.65],
    [30, 0, 0],
    { clamp: true }
  );

  // Reverse text (appears at ~75% scroll)
  const reverseOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.75, 0.9, 1],
    [0, 1, 1, 0]
  );
  const reverseScale = useTransform(
    scrollYProgress,
    [0.7, 0.75, 0.9],
    [0.95, 1, 1]
  );
  const reverseY = useTransform(
    scrollYProgress,
    [0.7, 0.75, 0.9],
    [20, 0, 0],
    { clamp: true }
  );

  // CTA text (appears at ~95% scroll)
  const ctaOpacity = useTransform(
    scrollYProgress,
    [0.92, 0.95, 1],
    [0, 1, 1]
  );
  const ctaScale = useTransform(
    scrollYProgress,
    [0.92, 0.95],
    [0.9, 1]
  );

  return (
    <div className="relative">
      {/* Hero Text - Sparkle. Refined. Perfect. */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none w-full px-4"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
        }}
      >
        <h1 className="font-garamond text-5xl md:text-7xl font-bold text-cream leading-tight">
          Sparkle.
          <br />
          Refined.
          <br />
          Perfect.
        </h1>
      </motion.div>

      {/* Splash Text - The Spark Moment. */}
      <motion.div
        className="fixed top-1/3 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none w-full px-4"
        style={{
          opacity: splashOpacity,
          scale: splashScale,
          y: splashY,
        }}
      >
        <h2 className="font-garamond text-4xl md:text-6xl font-medium bg-gradient-text bg-clip-text text-transparent">
          The Spark Moment.
        </h2>
      </motion.div>

      {/* Reverse Text - Back to Perfection. */}
      <motion.div
        className="fixed top-2/3 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none w-full px-4"
        style={{
          opacity: reverseOpacity,
          scale: reverseScale,
          y: reverseY,
        }}
      >
        <h2 className="font-garamond text-4xl md:text-6xl font-medium text-amber-light">
          Back to Perfection.
        </h2>
      </motion.div>

      {/* CTA Text - Bring the Spark Home. */}
      <motion.div
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-10 pointer-events-auto"
        style={{
          opacity: ctaOpacity,
          scale: ctaScale,
        }}
      >
        <button
          className="px-8 py-4 bg-gradient-amber text-bg-deep font-garamond text-xl font-bold rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          aria-label="Bring the Spark Home"
        >
          Bring the Spark Home
        </button>
      </motion.div>
    </div>
  );
}
