"use client";

import { useRef, useState } from "react";
import { VideoCanvas }     from "@/components/VideoCanvas";
import { VideoTransition } from "@/components/VideoTransition";
import { TextOverlay }     from "@/components/TextOverlay";
import { Navbar }          from "@/components/Navbar";

export default function Home() {
  const sodamaxRef = useRef<HTMLElement>(null);
  const moninRef   = useRef<HTMLElement>(null);

  const [sodamaxReady, setSodamaxReady] = useState(false);

  return (
    <main className="relative w-full bg-[#050301]">
      <Navbar />

      {/* ── SodaMax video section ─────────────────────── */}
      <section ref={sodamaxRef} className="relative h-[350vh]">
        <VideoCanvas
          framesPath="/frames"
          totalFrames={240}
          extension="webp"
          sectionRef={sodamaxRef}
          onLoadComplete={() => setSodamaxReady(true)}
        />
        {sodamaxReady && <TextOverlay sectionRef={sodamaxRef} />}
      </section>

      {/* ── Cinematic transition ──────────────────────── */}
      <VideoTransition />

      {/* ── Monin video section ───────────────────────── */}
      <section ref={moninRef} className="relative h-[350vh]">
        <VideoCanvas
          framesPath="/frames-monin"
          totalFrames={240}
          extension="jpg"
          sectionRef={moninRef}
        />
      </section>
    </main>
  );
}
