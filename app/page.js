import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

// Import the client component with no SSR
import HomeClient from "@/components/home-client";

export default async function Home() {
  // Fetch initial data on the server
  const initialProjects = await fetchQuery(api.projects.getRecent, { limit: 6 }) || [];
  
  return <HomeClient initialProjects={initialProjects} />;
}
