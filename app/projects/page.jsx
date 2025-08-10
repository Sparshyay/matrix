import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

// Import the client component with no SSR
import ProjectsClient from "@/components/projects-client";

export const metadata = { title: "Projects — Matrix" };

export default async function ProjectsPage() {
  // Fetch initial projects data on the server
  const initialProjects = await fetchQuery(api.projects.list) || [];
  
  return <ProjectsClient initialProjects={initialProjects} />;
}
