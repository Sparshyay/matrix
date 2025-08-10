"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { StorageImage } from "@/components/storage-image";

export default function Gallery({ images = [], title = "" }) {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState(null);

  const onThumbClick = useCallback((idx) => {
    setActiveIndex(idx);
    setOpen(true);
    // Wait next tick for dialog render, then scroll
    setTimeout(() => api?.scrollTo(idx), 0);
  }, [api]);

  return (
    <div className="w-full">
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        {safeImages.map((storageId, idx) => (
          <button
            type="button"
            key={`${storageId}-${idx}`}
            className="relative aspect-square overflow-hidden rounded-lg border focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={() => onThumbClick(idx)}
          >
            <StorageImage
              storageId={storageId}
              alt={`${title} image ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
            />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        {/* Invisible trigger to satisfy composition; open is controlled */}
        <DialogTrigger asChild>
          <span className="hidden" />
        </DialogTrigger>
        <DialogContent className="max-w-7xl sm:max-w-[90vw]">
          <DialogHeader>
            <DialogTitle className="sr-only">{title} gallery</DialogTitle>
          </DialogHeader>
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {safeImages.map((storageId, idx) => (
                <CarouselItem key={`${storageId}-${idx}`}>
                  <div className="relative aspect-[16/9]">
                    <StorageImage
                      storageId={storageId}
                      alt={`${title} image ${idx + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
}


