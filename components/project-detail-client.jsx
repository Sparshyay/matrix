"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Gallery from "@/components/gallery";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { StorageImage } from "@/components/storage-image";

export default function ProjectDetailClient({ id }) {
  const project = useQuery(api.projects.get, { id });
  
  if (project === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading project...</div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">Project not found.</div>
        <div className="text-sm text-muted-foreground">
          <a href="/projects" className="underline">Back to Projects</a>
        </div>
      </div>
    );
  }

  const safeImages = Array.isArray(project.images) ? project.images.filter(Boolean) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center gap-2">
        <h1 className="text-3xl font-semibold font-brand">{project.title}</h1>
        <div className="flex items-center justify-center gap-2 flex-wrap text-sm text-muted-foreground">
          {project.leader && <span>Lead: {project.leader}</span>}
          {project.category && <span>• {project.category}</span>}
        </div>
        {Array.isArray(project.tech) && project.tech.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {project.tech.map((t, i) => (
              <Badge key={`${t}-${i}`} variant="secondary">{t}</Badge>
            ))}
          </div>
        )}
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
        {project.cover ? (
          <StorageImage
            storageId={project.cover}
            alt={project.title}
            className="h-full w-full object-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1000px"
          />
        ) : safeImages[0] ? (
          <StorageImage
            storageId={safeImages[0]}
            alt={project.title}
            className="h-full w-full object-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1000px"
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image available</span>
          </div>
        )}
      </div>

      {safeImages.length > 0 && (
        <div className="mt-6">
          <Gallery images={safeImages} title={project.title} />
        </div>
      )}

      {(project.links?.live || project.links?.github) && (
        <div className="mt-2 flex gap-4 text-sm">
          {project.links?.live && <a className="underline" href={project.links.live} target="_blank">Live</a>}
          {project.links?.github && <a className="underline" href={project.links.github} target="_blank">GitHub</a>}
        </div>
      )}
    </div>
  );
}
