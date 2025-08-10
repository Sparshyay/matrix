import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    leader: v.optional(v.string()),
    category: v.string(),
    description: v.string(),
    cover: v.optional(v.id("_storage")),
    images: v.array(v.id("_storage")),
    links: v.object({
      live: v.optional(v.string()),
      github: v.optional(v.string()),
    }),
    tech: v.array(v.string()),
    duration: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_created", ["createdAt"])
    .index("by_category", ["category"])
    .searchIndex("search_projects", {
      searchField: "title",
      filterFields: ["category"],
    }),
});
