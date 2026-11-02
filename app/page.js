import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import HomeClient from "@/components/home-client";

export default async function Home() {
  let initialProjects = [];
  try {
    initialProjects = (await fetchQuery(api.projects.getRecent, { limit: 6 })) || [];
  } catch {
    initialProjects = [];
  }

  return <HomeClient initialProjects={initialProjects} />;
}
