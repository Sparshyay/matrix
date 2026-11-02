"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function StudioAboutStage() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Calculate progress of this section through the viewport (0 to 1)
      const start = windowH * 0.85;
      const end = -rect.height * 0.2;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="relative bg-[#f3f1ec] text-[#0c0b0b] py-20 sm:py-28 px-4 md:px-8 border-b border-[#0c0b0b18] transition-colors duration-500 overflow-hidden"
    >
      {/* Top Header Telemetry */}
      <div className="flex items-center justify-between text-xs font-mono text-[#6b6560] border-b border-[#0c0b0b15] pb-4 mb-14 uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span>Fig. 01 · Web design and development</span>
        </div>
        <div>
          <span>Established in 2025</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Indicator Tag: ■ Studio */}
        <div className="lg:col-span-1 flex items-center gap-2 text-xs font-mono text-[#6b6560] uppercase tracking-wider pt-2">
          <span className="w-2 h-2 bg-[#d7193a] inline-block shrink-0" />
          <span className="font-semibold text-[#0c0b0b]">Studio</span>
        </div>

        {/* Center: Main Statement with Progressive Scroll-Driven Illumination matching Image 2 */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[62px] font-extrabold tracking-[-0.045em] leading-[1.08] select-none">
            <span
              className="transition-colors duration-500 block mb-1.5"
              style={{
                color: scrollProgress > 0.12 ? "#0c0b0b" : "#8a847e",
              }}
            >
              Small by choice, involved at every step. One point of contact for your entire website, with the same care
            </span>
            <span
              className="transition-colors duration-500 block mb-1.5"
              style={{
                color: scrollProgress > 0.35 ? "#6b6560" : "#a8a29b",
              }}
            >
              and attention from the first
            </span>
            <span
              className="transition-colors duration-500 block mb-1.5"
              style={{
                color: scrollProgress > 0.55 ? "#8a847e" : "#c4beb6",
              }}
            >
              conversation to the
            </span>
            <span
              className="transition-colors duration-500 inline"
              style={{
                color: scrollProgress > 0.70 ? "#b0142c" : "#df8b97",
              }}
            >
              finishing touches at launch.
            </span>
          </h2>

          {/* Bottom Telemetry Metadata Columns matching Image 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 mt-12 border-t border-[#0c0b0b15] text-xs font-mono">
            <div>
              <span className="text-[#6b6560] block mb-1">Based in</span>
              <p className="text-[#0c0b0b] font-semibold text-sm">
                India &amp; Global, established in 2025
              </p>
            </div>
            <div>
              <span className="text-[#6b6560] block mb-1">Tools</span>
              <p className="text-[#0c0b0b] font-semibold text-sm">
                Shaders, scripts, high-conviction craft
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Vintage Photograph Fig. 02 matching Image 2 */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
          <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-lg overflow-hidden border border-[#0c0b0b15] shadow-md bg-[#e7e4dd] group">
            <Image
              src="/images/studio-fig02.jpg"
              alt="Analog Typewriter and Audio Cassette"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 340px"
              priority
            />
            {/* Fig. 02 Monospace Tag inside bottom-left of photo matching Image 2 */}
            <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded text-[11px] font-mono text-white/90">
              Fig. 02
            </div>
          </div>
          <span className="font-mono text-[11px] text-[#6b6560] mt-2 block">
            Fig. 02 · Studio Artifacts
          </span>
        </div>
      </div>
    </section>
  );
}
