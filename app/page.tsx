"use client";

import { useState } from "react";
import { ScrollCanvas } from "@/components/ScrollCanvas";
import { TextOverlay } from "@/components/TextOverlay";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  return (
    <main className="relative w-full bg-bg-deep">
      <Navbar />

      {/* Scroll canvas container - sticky */}
      <ScrollCanvas onLoadComplete={() => setIsReady(true)} />

      {/* Text overlays with Framer Motion */}
      {isReady && <TextOverlay />}

      {/* Scrollable content area - 500vh height */}
      <div className="relative h-[500vh] bg-bg-deep pointer-events-none" />
    </main>
  );
}

