import { Suspense } from "react";
import ProjectDetailClient from "@/components/project-detail-client";

export default async function ProjectDetail({ params }) {
  const { id } = await params;
  
  return (
    <section className="container mx-auto max-w-5xl px-4 py-12">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-muted-foreground">Loading project...</div>
        </div>
      }>
        <ProjectDetailClient id={id} />
      </Suspense>
    </section>
  );
}


