"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ProjectsContext = createContext({ projects: [], addProject: () => {} });

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .substring(0, 50);
}

export function ProjectsProvider({ children }) {
  const [userProjects, setUserProjects] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load projects from localStorage on mount
  useEffect(() => {
    try {
      const readProjects = () => {
        try {
          const raw = localStorage.getItem("matrix.userProjects");
          if (raw) {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
          }
        } catch (error) {
          console.error("Error reading projects from localStorage:", error);
        }
        return [];
      };

      const projects = readProjects();
      console.log("Loaded projects from localStorage:", projects.length);
      setUserProjects(projects);
      setHasLoaded(true);
    } catch (error) {
      console.error("Error in initial load:", error);
      setHasLoaded(true);
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    if (hasLoaded) {
      try {
        const dataToSave = JSON.stringify(userProjects);
        
        // Check if data is too large (localStorage limit is ~5-10MB)
        if (dataToSave.length > 4 * 1024 * 1024) { // 4MB limit
          console.warn("Project data too large for localStorage, keeping only latest 3 projects");
          const limitedProjects = userProjects.slice(0, 3);
          localStorage.setItem("matrix.userProjects", JSON.stringify(limitedProjects));
        } else {
          localStorage.setItem("matrix.userProjects", dataToSave);
        }
        
        console.log("Saved projects to localStorage:", userProjects.length);
      } catch (error) {
        console.error("Error saving projects to localStorage:", error);
        
        // If quota exceeded, try to save only essential data
        if (error.name === 'QuotaExceededError') {
          try {
            const essentialProjects = userProjects.slice(0, 2).map(project => ({
              id: project.id,
              title: project.title,
              category: project.category,
              description: project.description,
              cover: project.cover,
              images: project.images.slice(0, 1), // Keep only first image
              links: project.links,
              leader: project.leader
            }));
            localStorage.setItem("matrix.userProjects", JSON.stringify(essentialProjects));
            console.log("Saved essential project data due to quota limit");
          } catch (fallbackError) {
            console.error("Failed to save even essential data:", fallbackError);
          }
        }
      }
    }
  }, [userProjects, hasLoaded]);

  const addProject = useCallback(
    (projectInput) => {
      const baseId = slugify(projectInput.title || `project-${Date.now()}`);
      const existingIds = new Set(userProjects.map((p) => String(p.id)));
      let id = baseId;
      let counter = 1;
      
      while (!id || existingIds.has(String(id))) {
        id = `${baseId}-${counter}`;
        counter++;
      }
      
      const project = { 
        ...projectInput, 
        id,
        images: Array.isArray(projectInput.images) ? projectInput.images.filter(Boolean) : [],
        cover: projectInput.cover || projectInput.images?.[0] || "",
        links: projectInput.links || {}
      };
      
      console.log("Adding new project:", { 
        id, 
        title: project.title, 
        imagesCount: project.images.length,
        existingIds: Array.from(existingIds)
      });
      
      setUserProjects((prev) => {
        const newProjects = [project, ...prev];
        console.log("Updated projects list:", newProjects.map(p => ({ id: p.id, title: p.title })));
        return newProjects;
      });
      
      return id;
    },
    [userProjects]
  );

  const value = useMemo(() => ({ projects: userProjects, addProject }), [userProjects, addProject]);

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

export function useProjects() {
  return useContext(ProjectsContext);
}


