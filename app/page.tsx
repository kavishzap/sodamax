"use client";

import { useState } from "react";
import { ScrollCanvas } from "@/components/ScrollCanvas";
import { TextOverlay } from "@/components/TextOverlay";

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  return (
    <main className="relative w-full bg-bg-deep">
      {/* Scroll canvas container - sticky */}
      <ScrollCanvas onLoadComplete={() => setIsReady(true)} />

      {/* Text overlays with Framer Motion */}
      {isReady && <TextOverlay />}

      {/* Scrollable content area - 500vh height */}
      <div className="relative h-[500vh] bg-bg-deep pointer-events-none">
        {/* Spacer to enable scrolling */}
      </div>

      {/* Footer - visible after scroll completes */}
      <div className="relative bg-bg-section py-16 px-4 text-center pointer-events-auto">
        <h2 className="font-garamond text-3xl text-cream mb-4">
          Sparkle Every Moment
        </h2>
        <p className="text-cream-muted max-w-2xl mx-auto">
          Premium carbonation. Perfectly crafted.
        </p>
      </div>
    </main>
  );
}

