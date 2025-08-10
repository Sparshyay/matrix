"use client";

import ProjectsPageClient from "./projects-page-client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ProjectsClient({ initialProjects = [] }) {
  // Use the initial data from the server and keep it updated with live queries
  const projects = useQuery(api.projects.list) || initialProjects;
  
  return (
    <section className="container mx-auto max-w-6xl px-4 py-12">
      <ProjectsPageClient initialProjects={projects} />
    </section>
  );
}
