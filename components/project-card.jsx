"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProjectQuickView from "@/components/project-quick-view";
import { StorageImage } from "@/components/storage-image";
import Image from "next/image";

export function ProjectCard({ project, hrefBase = "/projects" }) {
  const firstImage = project?.cover || (Array.isArray(project?.images) ? project.images[0] : undefined);
  const fallback = "/projects/grid-1.svg";

  return (
    <div className="transition-transform duration-200 ease-out hover:-translate-y-1">
      <Link href={`${hrefBase}/${project._id}`}> 
        <Card className="glass-card hover:shadow-xl hover:shadow-white/5 transition-shadow">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg group">
            {firstImage ? (
              <StorageImage
                storageId={firstImage}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <Image
                src={fallback}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            )}
          </div>
          <CardHeader className="space-y-1">
            <CardTitle className="text-base">{project.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
            <div className="text-xs text-muted-foreground">
              <Badge variant="secondary">{project.category}</Badge>
            </div>
          </CardContent>
        </Card>
      </Link>
      <div className="mt-2">
        <ProjectQuickView
          project={project}
          trigger={<span className="text-sm text-muted-foreground hover:text-foreground underline cursor-pointer">Quick view</span>}
        />
      </div>
    </div>
  );
}


