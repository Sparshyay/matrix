"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProjectCard } from "@/components/project-card";
import { useState, useEffect } from "react";

export default function HomeProjectsClient({ initialProjects = [] }) {
  // Use initial data from server, then update from client
  const [projects, setProjects] = useState(initialProjects);
  const serverProjects = useQuery(api.projects.getRecent, { limit: 6 }) || [];
  
  // Update projects when server data changes
  useEffect(() => {
    if (serverProjects.length > 0) {
      setProjects(serverProjects);
    }
  }, [serverProjects]);
  
  if (!Array.isArray(projects) || projects.length === 0) {
    return null;
  }
  
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p._id} project={p} />
      ))}
    </div>
  );
}


