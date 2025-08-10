import ProjectsPageClient from "@/components/projects-page-client";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export const metadata = { title: "Projects — Matrix" };

export default async function ProjectsPage() {
  // Fetch projects data on the server
  const projects = await fetchQuery(api.projects.list) || [];
  
  return (
    <section className="container mx-auto max-w-6xl px-4 py-12">
      <ProjectsPageClient initialProjects={projects} />
    </section>
  );
}


