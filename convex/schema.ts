import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { de } from "date-fns/locale";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    ownerId: v.string(),
    importStatus: v.optional(
      v.union(
        v.literal("importing"),
        v.literal("combleted"),
        v.literal("failed")
      )
    ),
  }).index("by_owner",["ownerId"]),
});
