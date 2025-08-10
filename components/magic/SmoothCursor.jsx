"use client";

import { useEffect, useRef } from "react";

export default function SmoothCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = 0, y = 0;
    let rx = 0, ry = 0;

    const onMove = (e) => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const tick = () => {
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    const raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] mix-blend-difference">
      <div ref={ringRef} className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-white/30 blur-[0.2px]" />
      <div ref={dotRef} className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-white" />
    </div>
  );
}


