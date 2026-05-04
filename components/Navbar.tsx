"use client";

import { useState, useEffect } from "react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Gradient veil so logo is always readable over bright canvas */}
      <div className="fixed top-0 left-0 right-0 h-28 z-40 pointer-events-none bg-gradient-to-b from-[rgba(5,3,1,0.6)] to-transparent" />

      <nav
        className="fixed top-4 left-6 right-6 md:top-6 md:left-10 md:right-10 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-transparent"
      >
        {/* Wordmark */}
        <span
          className="font-garamond font-bold tracking-[0.25em] text-[#FFF4DD] select-none"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", letterSpacing: "0.28em" }}
        >
          SODAMAX
        </span>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          className="flex flex-col justify-center items-end gap-[5px] w-10 h-10 cursor-pointer"
        >
          <span
            className={`block h-[1.5px] bg-[#F6A735] rounded-full transition-all duration-300 origin-right ${
              menuOpen ? "w-7 rotate-[-45deg] translate-y-[3px]" : "w-7"
            }`}
          />
          <span
            className={`block h-[1.5px] bg-[#F6A735] rounded-full transition-all duration-300 ${
              menuOpen ? "w-0 opacity-0" : "w-5"
            }`}
          />
          <span
            className={`block h-[1.5px] bg-[#F6A735] rounded-full transition-all duration-300 origin-right ${
              menuOpen ? "w-7 rotate-[45deg] -translate-y-[3px]" : "w-7"
            }`}
          />
        </button>
      </nav>

      {/* Fullscreen menu overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-[rgba(5,3,1,0.97)] backdrop-blur-xl transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {["SodaMax Machine", "Monin Bottle"].map((item, i) => (
          <button
            key={item}
            onClick={() => setMenuOpen(false)}
            className="font-garamond text-5xl text-[#FFF4DD] hover:text-[#F6A735] transition-colors duration-300 tracking-widest"
            style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
          >
            {item}
          </button>
        ))}
        <div className="mt-6 w-16 h-[1px] bg-[#C97818] opacity-50" />
        <p className="font-inter text-sm text-[#B8946A] tracking-[0.3em] uppercase">
          Sparkle Every Moment
        </p>
      </div>
    </>
  );
}
