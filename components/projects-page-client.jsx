"use client";

import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCallback, useEffect, useState } from "react";

export default function ProjectsPageClient({ initialProjects = [] }) {
  // Use initial data from server, then update from client
  const [projects, setProjects] = useState(initialProjects);
  const serverProjects = useQuery(api.projects.list) || [];
  
  // Update projects when server data changes
  useEffect(() => {
    if (serverProjects.length > 0) {
      setProjects(serverProjects);
    }
  }, [serverProjects]);

  const createProject = useMutation(api.projects.create);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    leader: "",
    category: "",
    description: "",
    tech: "",
    linksLive: "",
    linksGithub: "",
    coverFile: null,
    galleryFiles: [],
  });

  // Move uploadFile hook to top level
  const uploadFile = useCallback(async (file) => {
    const uploadUrl = await generateUploadUrl();
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!result.ok) throw new Error(`Upload failed: ${result.statusText}`);
    const { storageId } = await result.json();
    return storageId;
  }, [generateUploadUrl]);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleFile(e) {
    const { name, files } = e.target;
    if (name === "coverFile") {
      const file = files?.[0];
      setForm((f) => ({ ...f, coverFile: file || null }));
    } else if (name === "galleryFiles") {
      const fileArray = Array.from(files || []);
      setForm((f) => ({ ...f, galleryFiles: fileArray }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("Please enter a project title");
      return;
    }
    if (!form.coverFile && form.galleryFiles.length === 0) {
      alert("Please add at least one image (cover or gallery)");
      return;
    }
    setIsSubmitting(true);
    
    // Process tech stack - split by comma and trim each item
    const techStack = form.tech
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0);

    // Upload all images in parallel for speed
    const allFiles = [...(form.galleryFiles || []), ...(form.coverFile ? [form.coverFile] : [])];
    
    Promise.all(allFiles.map((f) => uploadFile(f)))
      .then((uploadedFiles) => {
        const galleryData = uploadedFiles.slice(0, form.galleryFiles?.length || 0);
        const coverData = form.coverFile ? uploadedFiles[uploadedFiles.length - 1] : null;
        
        // Optimize image payload - only include what's needed
        const payload = {
          title: form.title.trim(),
          leader: form.leader.trim(),
          category: form.category.trim() || "Custom",
          description: form.description.trim(),
          cover: coverData,
          images: galleryData,
          links: { 
            live: form.linksLive.trim() || undefined, 
            github: form.linksGithub.trim() || undefined 
          },
          tech: techStack, // Use processed tech stack
          duration: "",
        };
        return createProject(payload);
      })
      .then((projectId) => {
        alert(`Project "${form.title}" added successfully!`);
        setOpen(false);
        setIsSubmitting(false);
        setForm({ 
          title: "", 
          leader: "", 
          category: "", 
          description: "", 
          tech: "",
          linksLive: "", 
          linksGithub: "", 
          coverFile: null, 
          galleryFiles: [] 
        });
      })
      .catch((error) => {
        console.error("Error processing or saving project:", error);
        if (error.message?.includes("too large")) {
          alert("One or more images are too large. Please try with smaller images or fewer images.");
        } else {
          alert("Error saving project. Please try again.");
        }
        setIsSubmitting(false);
      });
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Project</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Add new project</DialogTitle>
            </DialogHeader>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="leader">Team Leader</Label>
                <Input id="leader" name="leader" value={form.leader} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={form.category} onChange={handleChange} placeholder="e.g. Web App" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="coverFile">Cover Image</Label>
                <Input id="coverFile" name="coverFile" type="file" accept="image/*" onChange={handleFile} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={form.description} 
                  onChange={handleChange} 
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tech">Tech Stack</Label>
                <Input 
                  id="tech" 
                  name="tech" 
                  value={form.tech} 
                  onChange={handleChange} 
                  placeholder="e.g. React, Node.js, MongoDB"
                />
                <p className="text-xs text-muted-foreground">
                  Separate technologies with commas (e.g., React, Node.js, MongoDB)
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="galleryFiles">Gallery Images (max 3 images, 2MB each)</Label>
                <Input 
                  id="galleryFiles" 
                  name="galleryFiles" 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handleFile}
                  max="3"
                />
                <p className="text-xs text-muted-foreground">
                  Large images will be automatically compressed. For best performance, use images under 2MB each.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="linksLive">Live URL</Label>
                  <Input id="linksLive" name="linksLive" value={form.linksLive} onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="linksGithub">GitHub URL</Label>
                  <Input id="linksGithub" name="linksGithub" value={form.linksGithub} onChange={handleChange} />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
      </div>
    </>
  );
}


