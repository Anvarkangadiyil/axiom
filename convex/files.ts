import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { verifyAuth } from "./auth";
import { Doc, Id } from "./_generated/dataModel";

export const getFiles = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const project = await ctx.db.get("projects", args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project?.ownerId !== identity?.subject) {
      throw new Error("Unauthorized");
    }

    return await ctx.db
      .query("files")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
});

export const getFile = query({
  args: {
    id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const file = await ctx.db.get("files", args.id);

    if (!file) {
      throw new Error("File not found");
    }

    const project = await ctx.db.get("projects", file.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project?.ownerId !== identity?.subject) {
      throw new Error("Unauthorized");
    }

    return file;
  },
});

export const getFileUrl = query({
  args: {
    id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const file = await ctx.db.get("files", args.id);

    if (!file) {
      throw new Error("File not found");
    }

    const project = await ctx.db.get("projects", file.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project?.ownerId !== identity?.subject) {
      throw new Error("Unauthorized");
    }

    if (!file.storageId) {
      return null;
    }

    return await ctx.storage.getUrl(file.storageId);
  },
});

export const getFolderContents = query({
  args: {
    projectId: v.id("projects"),
    parentId: v.optional(v.id("files")),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const project = await ctx.db.get("projects", args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project?.ownerId !== identity?.subject) {
      throw new Error("Unauthorized");
    }

    const files = await ctx.db
      .query("files")
      .withIndex("by_project_parent", (q) =>
        q.eq("projectId", args.projectId).eq("parentId", args.parentId),
      )
      .collect();

    //Sort: folder first,then files, alphabetically within each group

    return files.sort((a, b) => {
      if (a.type === "folder" && b.type !== "folder") return -1;

      if (a.type !== "folder" && b.type === "folder") return 1;

      return a.name.localeCompare(b.name);
    });
  },
});

/**
 *TODO: Need to find optimized solution for this 
* Builds the full path to a file by traversing up the parent chain.

* Input: A file ID (e.g., the ID of "button.tsx")
* Output: Array of ancestors from root to file: [{ _id, name: "src" }, {
_id, name: "components" }, { _id, name: "button.tsx" }]

* Used for: Breadcrumbs navigation (src > components > button.tsx)

**/
export const getFilePath = query({
  args: {
    id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const file = await ctx.db.get("files", args.id);

    if (!file) {
      throw new Error("Project not found");
    }

    const project = await ctx.db.get("projects", file.projectId);

    if (project?.ownerId !== identity?.subject) {
      throw new Error("Unauthorized");
    }

    const path: { _id: string; name: string }[] = [];
    let currentId: Id<"files"> = args.id;

    while (currentId) {
      const file = (await ctx.db.get("files", currentId)) as
        | Doc<"files">
        | undefined;
      if (!file) break;

      path.unshift({ name: file.name, _id: file._id });
      currentId = file.parentId!;
    }

    return path;
  },
});

export const createFile = mutation({
  args: {
    projectId: v.id("projects"),
    parentId: v.optional(v.id("files")),
    name: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const project = await ctx.db.get("projects", args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project?.ownerId !== identity?.subject) {
      throw new Error("Unauthorized");
    }

    //Check if file with same name already exists in this parent folder

    const files = await ctx.db
      .query("files")
      .withIndex("by_project_parent", (q) =>
        q.eq("projectId", args.projectId).eq("parentId", args.parentId),
      )
      .collect();

    const existing = files.find(
      (file) => file.name === args.name && file.type === "file",
    );

    if (existing) {
      throw new Error("File with same name already exists in this folder");
    }
    //Sort: folder first,then files, alphabetically within each group
    const now = Date.now();

    await ctx.db.insert("files", {
      projectId: args.projectId,
      parentId: args.parentId,
      name: args.name,
      type: "file",
      content: args.content,
      updatedAt: now,
    });
    await ctx.db.patch("projects", args.projectId, { updatedAt: now });
  },
});

export const createFolder = mutation({
  args: {
    projectId: v.id("projects"),
    parentId: v.optional(v.id("files")),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const project = await ctx.db.get("projects", args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project?.ownerId !== identity?.subject) {
      throw new Error("Unauthorized");
    }

    //Check if folder with same name already exists in this parent folder

    const files = await ctx.db
      .query("files")
      .withIndex("by_project_parent", (q) =>
        q.eq("projectId", args.projectId).eq("parentId", args.parentId),
      )
      .collect();

    const existing = files.find(
      (file) => file.name === args.name && file.type === "folder",
    );

    if (existing) {
      throw new Error("File with same name already exists in this folder");
    }
    //Sort: folder first,then files, alphabetically within each group
    const now = Date.now();

    await ctx.db.insert("files", {
      projectId: args.projectId,
      parentId: args.parentId,
      name: args.name,
      type: "folder",
      updatedAt: now,
    });

    await ctx.db.patch("projects", args.projectId, { updatedAt: now });
  },
});

export const renameFile = mutation({
  args: {
    id: v.id("files"),
    newName: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const file = await ctx.db.get("files", args.id);

    if (!file) {
      throw new Error("File not found");
    }

    const project = await ctx.db.get("projects", file.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerId !== identity?.subject) {
      throw new Error("Unauthorized");
    }

    // Check if a file with the new name already exists in the same parent folder

    const siblings = await ctx.db
      .query("files")
      .withIndex("by_project_parent", (q) =>
        q.eq("projectId", file.projectId).eq("parentId", file.parentId),
      )
      .collect();

    const existing = siblings.find(
      (sibling) =>
        sibling.name === args.newName &&
        sibling._id !== args.id &&
        sibling.type === file.type,
    );

    if (existing) {
      throw new Error(
        `A ${file.type} with same name already exists in this folder`,
      );
    }

    const now = Date.now();

    await ctx.db.patch("files", args.id, {
      name: args.newName,
      updatedAt: now,
    });

    await ctx.db.patch("projects", file.projectId, {
      updatedAt: now,
    });
  },
});

export const deleteFile = mutation({
  args: {
    id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const file = await ctx.db.get("files", args.id);

    if (!file) {
      throw new Error("File not found");
    }

    const project = await ctx.db.get("projects", file.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerId !== identity?.subject) {
      throw new Error("Unauthorized");
    }

    // Recurseively delete all children of the file
    const deleteRecursively = async (fileId: typeof args.id) => {
      const item = await ctx.db.get("files", fileId);
      if (!item) {
        return;
      }

      if (item.type === "folder") {
        const children = await ctx.db
          .query("files")
          .withIndex("by_project_parent", (q) =>
            q.eq("projectId", item.projectId).eq("parentId", fileId),
          )
          .collect();

        for (const child of children) {
          await deleteRecursively(child._id);
        }
      }

      //Delete Storage file if it exists
      if (item.storageId) {
        await ctx.storage.delete(item.storageId);
      }

      //Delete file record
      await ctx.db.delete("files", fileId);
    };

    await deleteRecursively(args.id);

    await ctx.db.patch("projects", file.projectId, {
      updatedAt: Date.now(),
    });
  },
});

export const updateFile = mutation({
  args: {
    id: v.id("files"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const file = await ctx.db.get("files", args.id);

    if (!file) {
      throw new Error("File not found");
    }

    const project = await ctx.db.get("projects", file.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerId !== identity?.subject) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.id, {
      content: args.content,
      updatedAt: Date.now(),
    });
  },
});

// ── Diff Review: Accept/Reject mutations ──

export const getPendingChanges = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const project = await ctx.db.get("projects", args.projectId);
    if (!project) throw new Error("Project not found");
    if (project.ownerId !== identity?.subject) throw new Error("Unauthorized");

    return await ctx.db
      .query("fileChanges")
      .withIndex("by_project_status", (q) =>
        q.eq("projectId", args.projectId).eq("status", "pending")
      )
      .collect();
  },
});

export const acceptChange = mutation({
  args: {
    changeId: v.id("fileChanges"),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const change = await ctx.db.get(args.changeId);
    if (!change) throw new Error("Change not found");

    const project = await ctx.db.get("projects", change.projectId);
    if (!project) throw new Error("Project not found");
    if (project.ownerId !== identity?.subject) throw new Error("Unauthorized");

    const now = Date.now();

    if (change.operation === "update" && change.fileId) {
      await ctx.db.patch(change.fileId, {
        content: change.newContent ?? "",
        updatedAt: now,
      });
    } else if (change.operation === "create") {
      await ctx.db.insert("files", {
        projectId: change.projectId,
        parentId: change.parentId,
        name: change.fileName,
        type: "file",
        content: change.newContent ?? "",
        updatedAt: now,
      });
    } else if (change.operation === "delete" && change.fileId) {
      // Recursively delete file/folder
      const deleteRecursive = async (fileId: typeof change.fileId) => {
        if (!fileId) return;
        const item = await ctx.db.get(fileId);
        if (!item) return;

        if (item.type === "folder") {
          const children = await ctx.db
            .query("files")
            .withIndex("by_project_parent", (q) =>
              q.eq("projectId", item.projectId).eq("parentId", fileId)
            )
            .collect();
          for (const child of children) {
            await deleteRecursive(child._id);
          }
        }

        if (item.storageId) {
          await ctx.storage.delete(item.storageId);
        }
        await ctx.db.delete(fileId);
      };

      await deleteRecursive(change.fileId);
    } else if (change.operation === "rename" && change.fileId && change.newName) {
      await ctx.db.patch(change.fileId, {
        name: change.newName,
        updatedAt: now,
      });
    }

    // Mark change as accepted
    await ctx.db.patch(args.changeId, { status: "accepted" as const });

    // Update project timestamp
    await ctx.db.patch(change.projectId, { updatedAt: now });
  },
});

export const rejectChange = mutation({
  args: {
    changeId: v.id("fileChanges"),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const change = await ctx.db.get(args.changeId);
    if (!change) throw new Error("Change not found");

    const project = await ctx.db.get("projects", change.projectId);
    if (!project) throw new Error("Project not found");
    if (project.ownerId !== identity?.subject) throw new Error("Unauthorized");

    await ctx.db.patch(args.changeId, { status: "rejected" as const });
  },
});

export const acceptAllChanges = mutation({
  args: {
    changesetId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const changes = await ctx.db
      .query("fileChanges")
      .withIndex("by_changeset", (q) => q.eq("changesetId", args.changesetId))
      .collect();

    if (changes.length === 0) throw new Error("No changes found");

    const project = await ctx.db.get("projects", changes[0].projectId);
    if (!project) throw new Error("Project not found");
    if (project.ownerId !== identity?.subject) throw new Error("Unauthorized");

    const now = Date.now();

    for (const change of changes) {
      if (change.status !== "pending") continue;

      if (change.operation === "update" && change.fileId) {
        await ctx.db.patch(change.fileId, {
          content: change.newContent ?? "",
          updatedAt: now,
        });
      } else if (change.operation === "create") {
        await ctx.db.insert("files", {
          projectId: change.projectId,
          parentId: change.parentId,
          name: change.fileName,
          type: "file",
          content: change.newContent ?? "",
          updatedAt: now,
        });
      } else if (change.operation === "delete" && change.fileId) {
        const deleteRecursive = async (fileId: typeof change.fileId) => {
          if (!fileId) return;
          const item = await ctx.db.get(fileId);
          if (!item) return;
          if (item.type === "folder") {
            const children = await ctx.db
              .query("files")
              .withIndex("by_project_parent", (q) =>
                q.eq("projectId", item.projectId).eq("parentId", fileId)
              )
              .collect();
            for (const child of children) {
              await deleteRecursive(child._id);
            }
          }
          if (item.storageId) {
            await ctx.storage.delete(item.storageId);
          }
          await ctx.db.delete(fileId);
        };
        await deleteRecursive(change.fileId);
      } else if (change.operation === "rename" && change.fileId && change.newName) {
        await ctx.db.patch(change.fileId, {
          name: change.newName,
          updatedAt: now,
        });
      }

      await ctx.db.patch(change._id, { status: "accepted" as const });
    }

    await ctx.db.patch(changes[0].projectId, { updatedAt: now });
  },
});

export const rejectAllChanges = mutation({
  args: {
    changesetId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx);

    const changes = await ctx.db
      .query("fileChanges")
      .withIndex("by_changeset", (q) => q.eq("changesetId", args.changesetId))
      .collect();

    if (changes.length === 0) throw new Error("No changes found");

    const project = await ctx.db.get("projects", changes[0].projectId);
    if (!project) throw new Error("Project not found");
    if (project.ownerId !== identity?.subject) throw new Error("Unauthorized");

    for (const change of changes) {
      if (change.status !== "pending") continue;
      await ctx.db.patch(change._id, { status: "rejected" as const });
    }
  },
});
