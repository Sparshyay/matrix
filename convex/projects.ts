import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";

export const create = mutation({
  args: {
    title: v.string(),
    leader: v.optional(v.string()),
    category: v.string(),
    description: v.string(),
    cover: v.optional(v.id("_storage")),
    images: v.optional(v.array(v.id("_storage"))),
    links: v.object({
      live: v.optional(v.string()),
      github: v.optional(v.string()),
    }),
    tech: v.array(v.string()),
    duration: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    // Ensure cover and images are Id<_storage> types
    const coverId = args.cover ? (args.cover as Id<"_storage">) : undefined;
    const imageIds = (args.images || []).map((id) => id as Id<"_storage">);
    const projectId = await ctx.db.insert("projects", {
      ...args,
      cover: coverId,
      images: imageIds,
      createdAt: now,
      updatedAt: now,
    });
    return projectId;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_created")
      .order("desc")
      .collect();
    return projects;
  },
});

export const get = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    return project;
  },
});

export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
    return projects.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const getCategories = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    const categories = [...new Set(projects.map(p => p.category))];
    return categories.sort();
  },
});

export const update = mutation({
  args: {
    id: v.id("projects"),
    title: v.optional(v.string()),
    leader: v.optional(v.string()),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    cover: v.optional(v.id("_storage")),
    images: v.optional(v.array(v.id("_storage"))),
    links: v.optional(v.object({
      live: v.optional(v.string()),
      github: v.optional(v.string()),
    })),
    tech: v.optional(v.array(v.string())),
    duration: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const search = query({
  args: {
    search: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let projects;
    
    if (args.category && args.search) {
      // Both category and search
      projects = await ctx.db
        .query("projects")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .collect();
      
      // Filter by search term
      projects = projects.filter(project => 
        project.title.toLowerCase().includes(args.search!.toLowerCase())
      );
    } else if (args.category) {
      // Only category filter
      projects = await ctx.db
        .query("projects")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .collect();
    } else if (args.search) {
      // Only search filter
      projects = await ctx.db
        .query("projects")
        .collect();
      
      // Filter by search term
      projects = projects.filter(project => 
        project.title.toLowerCase().includes(args.search!.toLowerCase())
      );
    } else {
      // No filters
      projects = await ctx.db
        .query("projects")
        .collect();
    }
    
    return projects.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const getRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 6;
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_created")
      .order("desc")
      .take(limit);
    return projects;
  },
});
