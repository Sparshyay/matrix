"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef } from "react";
import ShimmerButton from "@/components/magic/ShimmerButton";

export function Hero() {
  const ref = useRef(null);
  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }

  return (
    <section ref={ref} onMouseMove={onMove} className="relative overflow-hidden min-h-[460px] sm:min-h-[540px]">
      {/* Background gradient removed as requested */}
      <div className="relative container mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <h1 className="font-brand tracking-tight text-6xl sm:text-7xl opacity-0 translate-y-5 [animation:fadeInUp_.6s_ease-out_forwards]">
            Matrix
          </h1>
          <div className="text-muted-foreground text-base sm:text-lg max-w-3xl opacity-0 translate-y-5 [animation:fadeInUp_.7s_.1s_ease-out_forwards] space-y-2">
            <p>At Matrix, we craft digital experiences that blend creativity, technology, and precision.</p>
            <p>From sleek websites and high-performing applications to immersive brand experiences, every project in our portfolio is a reflection of our commitment to excellence. We believe in the power of design to tell stories, the strength of code to solve problems, and the synergy of teamwork to make big ideas possible.</p>
          </div>
          <div className="flex items-center justify-center gap-3 opacity-0 translate-y-5 [animation:fadeInUp_.8s_.2s_ease-out_forwards]">
            <ShimmerButton asChild>
              <Link href="/projects">View Projects</Link>
            </ShimmerButton>
            <ShimmerButton variant="outline" asChild>
              <Link href="#contact">Contact</Link>
            </ShimmerButton>
          </div>
        </div>
      </div>
    </section>
  );
}


