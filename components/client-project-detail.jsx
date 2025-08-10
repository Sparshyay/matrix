"use client";

import { useEffect, useMemo, useState } from "react";

export default function ClientProjectDetail({ id }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount only (avoids SSR/client mismatch)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("matrix.userProjects");
      const list = raw ? JSON.parse(raw) : [];
      const found = Array.isArray(list) ? list.find((p) => String(p.id) === String(id)) : null;
      
      console.log("Project detail loading:", { 
        requestedId: id, 
        found: found ? found.title : null, 
        foundId: found ? found.id : null,
        listLength: list.length,
        allProjects: list.map(p => ({ id: p.id, title: p.title }))
      });
      
      setProject(found || null);
      setLoading(false);
    } catch (error) {
      console.error("Error loading project:", error);
      setProject(null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
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
          ID: {id} | 
          <a href="/projects" className="underline ml-2">Back to Projects</a>
        </div>
      </div>
    );
  }

  const Gallery = require("@/components/gallery").default;
  const safeImages = Array.isArray(project.images) ? project.images.filter(Boolean) : [];
  
  console.log("Project detail rendering:", { 
    project: project?.title, 
    cover: project?.cover, 
    imagesCount: safeImages.length,
    images: safeImages.slice(0, 2) // Show first 2 for debugging
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center gap-2">
        <h1 className="text-3xl font-semibold font-brand">{project.title}</h1>
        <div className="flex items-center justify-center gap-2 flex-wrap text-sm text-muted-foreground">
          {project.leader && <span>Lead: {project.leader}</span>}
          {project.category && <span>• {project.category}</span>}
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
        <img src={project.cover || safeImages[0]} alt={project.title} className="h-full w-full object-cover" />
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


