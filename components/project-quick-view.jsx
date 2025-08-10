"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { StorageImage } from "@/components/storage-image";

export default function ProjectQuickView({ project, trigger }) {
  // Ensure project.images is an array and filter out any falsy values
  const images = Array.isArray(project?.images) 
    ? project.images.filter(Boolean) 
    : [];

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-7xl sm:max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>
        <Carousel className="w-full">
          <CarouselContent>
            {images.length > 0 ? (
              images.map((imageId) => (
                <CarouselItem key={imageId}>
                  <div className="relative aspect-[16/9] w-full">
                    <StorageImage 
                      storageId={imageId}
                      alt={`${project.title} - Image ${images.indexOf(imageId) + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      priority={images.indexOf(imageId) === 0} // Only prioritize first image
                    />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem>
                <div className="relative aspect-[16/9] w-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No images available</span>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
        <div className="sr-only" id="dialog-desc">Gallery preview for {project.title}</div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {project.leader && (
            <span className="inline-flex items-center">
              <span className="font-medium">Lead:</span> {project.leader}
            </span>
          )}
          {project.category && (
            <span className="hidden sm:inline">•</span>
          )}
          {project.category && (
            <span>{project.category}</span>
          )}
        </div>
        {Array.isArray(project.tech) && project.tech.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tech.map((tech, index) => (
              <span 
                key={`${tech}-${index}`}
                className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


