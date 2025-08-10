"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function PixelImage({ src, alt = "", className, pixelSize = 12 }) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      imgRef.current = img;
      setReady(true);
      drawPixelated();
    };
  }, [src]);

  useEffect(() => {
    const ro = new ResizeObserver(() => drawPixelated());
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  function drawPixelated() {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    const container = containerRef.current;
    if (!canvas || !img || !container) return;
    const ctx = canvas.getContext("2d");
    const width = container.clientWidth;
    const height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const scaleX = Math.max(1, Math.floor(width / pixelSize));
    const scaleY = Math.max(1, Math.floor(height / pixelSize));
    const w = Math.max(1, Math.floor(width / scaleX));
    const h = Math.max(1, Math.floor(height / scaleY));

    const tmp = document.createElement("canvas");
    tmp.width = w;
    tmp.height = h;
    const tctx = tmp.getContext("2d");
    tctx.imageSmoothingEnabled = false;
    tctx.drawImage(img, 0, 0, w, h);

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(tmp, 0, 0, w, h, 0, 0, width, height);
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Normal image */}
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      {/* Pixelated overlay (revealed on hover) */}
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300",
          ready && "group-hover:opacity-100"
        )}
      />
    </div>
  );
}


