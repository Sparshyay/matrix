"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

function PixelScrollCanvas({ src, className = "" }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;
      setLoaded(true);
      renderPixel();
    };
  }, [src]);

  const renderPixel = () => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!container || !canvas || !img) return;

    const rect = container.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Calculate progress as image enters viewport (0: entering bottom, 1: centered in viewport)
    const viewProgress = Math.min(
      1,
      Math.max(0, (windowH - rect.top) / (windowH * 0.72))
    );

    // Pixel size smoothly transitions from 22px down to 1px (sharp)
    const maxPixel = 22;
    const pixelSize = Math.max(1, Math.round(maxPixel * Math.pow(1 - viewProgress, 1.8)));

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 400;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (pixelSize <= 1) {
      // Sharp image
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, 0, 0, width, height);
    } else {
      // Pixelated retro dissolve steps
      const scaledW = Math.max(1, Math.floor(width / pixelSize));
      const scaledH = Math.max(1, Math.floor(height / pixelSize));

      const offCanvas = document.createElement("canvas");
      offCanvas.width = scaledW;
      offCanvas.height = scaledH;
      const offCtx = offCanvas.getContext("2d");
      if (offCtx) {
        offCtx.imageSmoothingEnabled = false;
        offCtx.drawImage(img, 0, 0, scaledW, scaledH);

        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(offCanvas, 0, 0, scaledW, scaledH, 0, 0, width, height);
      }
    }
  };

  useEffect(() => {
    const onScroll = () => {
      requestAnimationFrame(renderPixel);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    renderPixel();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [loaded]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full object-cover block" />
    </div>
  );
}

export default function StudioAboutStage() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
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
      className="relative bg-[#f3f1ec] text-[#0c0b0b] py-12 sm:py-24 md:py-28 px-4 sm:px-6 md:px-8 border-b border-[#0c0b0b18] transition-colors duration-500 overflow-hidden"
    >
      {/* Top Header Telemetry */}
      <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#6b6560] border-b border-[#0c0b0b15] pb-3 sm:pb-4 mb-6 sm:mb-14 uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span>Fig. 01 · Studio</span>
        </div>
        <div>
          <span>Est. 2025</span>
        </div>
      </div>

      {/* =========================================================================
          1. DEDICATED MOBILE LAYOUT (< lg)
          Image moved ABOVE the text with pixel-to-sharp animation, text fades in smoothly,
          Based In & Tools placed BELOW the text!
          ========================================================================= */}
      <div className="block lg:hidden space-y-6">
        {/* Studio Tag */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#6b6560] uppercase tracking-wider">
          <span className="w-2 h-2 bg-[#d7193a] inline-block shrink-0" />
          <span className="font-semibold text-[#0c0b0b]">Studio</span>
        </div>

        {/* 1. Image Moved ABOVE Text with Pixel-to-Proper Image Scroll Animation */}
        <div className="flex flex-col items-center w-full">
          <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-lg overflow-hidden border border-[#0c0b0b15] shadow-md bg-[#e7e4dd]">
            <PixelScrollCanvas
              src="/images/studio-fig02.jpg"
              className="w-full h-full"
            />
            {/* Fig. 02 Monospace Tag inside bottom-left of photo */}
            <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[11px] font-mono text-white/95 z-10">
              Fig. 02
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#6b6560] mt-1.5 block">
            Fig. 02 · Studio Artifacts
          </span>
        </div>

        {/* 2. Main Statement with Smooth Scroll-Driven Fade-In Animation */}
        <div className="pt-2">
          <h2 className="text-[25px] sm:text-4xl font-extrabold tracking-[-0.045em] leading-[1.14] select-none">
            <span
              className="transition-all duration-700 block mb-1"
              style={{
                color: scrollProgress > 0.08 ? "#0c0b0b" : "rgba(12,11,11,0.22)",
                transform: `translateY(${Math.max(0, (1 - Math.min(1, scrollProgress * 4)) * 12)}px)`,
                opacity: Math.min(1, Math.max(0.2, scrollProgress * 3)),
              }}
            >
              Small by choice, involved at every step. One point of contact for your entire website, with the same care
            </span>
            <span
              className="transition-all duration-700 block mb-1"
              style={{
                color: scrollProgress > 0.28 ? "#4a4540" : "rgba(12,11,11,0.20)",
                transform: `translateY(${Math.max(0, (1 - Math.min(1, scrollProgress * 2.8)) * 10)}px)`,
                opacity: Math.min(1, Math.max(0.2, (scrollProgress - 0.1) * 3)),
              }}
            >
              and attention from the first
            </span>
            <span
              className="transition-all duration-700 block mb-1"
              style={{
                color: scrollProgress > 0.48 ? "#6b6560" : "rgba(12,11,11,0.18)",
                transform: `translateY(${Math.max(0, (1 - Math.min(1, scrollProgress * 2)) * 8)}px)`,
                opacity: Math.min(1, Math.max(0.2, (scrollProgress - 0.2) * 2.5)),
              }}
            >
              conversation to the
            </span>
            <span
              className="transition-all duration-700 inline"
              style={{
                color: scrollProgress > 0.62 ? "#b0142c" : "rgba(176,20,44,0.22)",
                opacity: Math.min(1, Math.max(0.2, (scrollProgress - 0.3) * 2.5)),
              }}
            >
              finishing touches at launch.
            </span>
          </h2>
        </div>

        {/* 3. Based In & Tools Placed BELOW the Text */}
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#0c0b0b15] text-xs font-mono">
          <div>
            <span className="text-[#6b6560] block mb-1">Based in</span>
            <p className="text-[#0c0b0b] font-semibold text-xs leading-snug">
              India &amp; Global, est. 2025
            </p>
          </div>
          <div>
            <span className="text-[#6b6560] block mb-1">Tools</span>
            <p className="text-[#0c0b0b] font-semibold text-xs leading-snug">
              Shaders, scripts, high conviction
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. DEDICATED DESKTOP LAYOUT (lg:grid)
          Preserved 100% for desktop fidelity without interference
          ========================================================================= */}
      <div className="hidden lg:grid grid-cols-12 gap-14 items-start">
        {/* Left Indicator Tag: ■ Studio */}
        <div className="col-span-1 flex items-center gap-2 text-xs font-mono text-[#6b6560] uppercase tracking-wider pt-2">
          <span className="w-2 h-2 bg-[#d7193a] inline-block shrink-0" />
          <span className="font-semibold text-[#0c0b0b]">Studio</span>
        </div>

        {/* Center: Main Statement with Progressive Scroll-Driven Illumination */}
        <div className="col-span-7 flex flex-col justify-center">
          <h2 className="text-5xl lg:text-[56px] xl:text-[62px] font-extrabold tracking-[-0.045em] leading-[1.08] select-none">
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

          {/* Bottom Telemetry Metadata Columns */}
          <div className="grid grid-cols-2 gap-8 pt-12 mt-12 border-t border-[#0c0b0b15] text-xs font-mono">
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

        {/* Right Side: Editorial Vintage Photograph Fig. 02 */}
        <div className="col-span-4 flex flex-col items-end">
          <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-lg overflow-hidden border border-[#0c0b0b15] shadow-md bg-[#e7e4dd] group">
            <Image
              src="/images/studio-fig02.jpg"
              alt="Analog Typewriter and Audio Cassette"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 340px"
              priority
            />
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
