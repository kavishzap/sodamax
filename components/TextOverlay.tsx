"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const words = ["Sparkle.", "Refined.", "Perfect."];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.1,
    },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 48, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export function TextOverlay() {
  const { scrollYProgress } = useScroll();

  const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);

  const splashOpacity = useTransform(scrollYProgress, [0.3, 0.35, 0.65, 0.72], [0, 1, 1, 0]);
  const splashScale   = useTransform(scrollYProgress, [0.3, 0.35, 0.65], [0.9, 1, 1]);
  const splashY       = useTransform(scrollYProgress, [0.3, 0.35, 0.65], [30, 0, 0], { clamp: true });

  const reverseOpacity = useTransform(scrollYProgress, [0.7, 0.75, 0.9, 1], [0, 1, 1, 0]);
  const reverseScale   = useTransform(scrollYProgress, [0.7, 0.75, 0.9], [0.95, 1, 1]);
  const reverseY       = useTransform(scrollYProgress, [0.7, 0.75, 0.9], [20, 0, 0], { clamp: true });

  const ctaOpacity = useTransform(scrollYProgress, [0.92, 0.95, 1], [0, 1, 1]);
  const ctaScale   = useTransform(scrollYProgress, [0.92, 0.95], [0.9, 1]);

  return (
    <div className="relative">

      {/* Hero Text — word reveal + amber glow pulse */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none w-full px-4"
        style={{ opacity: heroOpacity }}
      >
        <motion.h1
          className="font-garamond text-5xl md:text-7xl font-bold text-cream leading-tight"
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            textShadow:
              "0 0 40px rgba(246,167,53,0.45), 0 0 80px rgba(201,120,24,0.25), 0 0 120px rgba(201,120,24,0.12)",
          }}
        >
          {words.map((word) => (
            <motion.span
              key={word}
              className="block"
              variants={wordVariant}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Pulsing glow behind the text */}
        <motion.div
          className="absolute inset-0 -z-10 pointer-events-none"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,120,24,0.18) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Splash Text */}
      <motion.div
        className="fixed top-1/3 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none w-full px-4"
        style={{ opacity: splashOpacity, scale: splashScale, y: splashY }}
      >
        <h2 className="font-garamond text-4xl md:text-6xl font-medium bg-gradient-text bg-clip-text text-transparent">
          The Spark Moment.
        </h2>
      </motion.div>

      {/* Reverse Text */}
      <motion.div
        className="fixed top-2/3 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none w-full px-4"
        style={{ opacity: reverseOpacity, scale: reverseScale, y: reverseY }}
      >
        <h2 className="font-garamond text-4xl md:text-6xl font-medium text-amber-light">
          Back to Perfection.
        </h2>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-10 pointer-events-auto"
        style={{ opacity: ctaOpacity, scale: ctaScale }}
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
