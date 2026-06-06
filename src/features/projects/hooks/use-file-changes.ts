import { useMutation, useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

export const usePendingChanges = (projectId: Id<"projects"> | null) => {
  return useQuery(
    api.files.getPendingChanges,
    projectId ? { projectId } : "skip"
  );
};

export const useAcceptChange = () => {
  return useMutation(api.files.acceptChange);
};

export const useRejectChange = () => {
  return useMutation(api.files.rejectChange);
};

export const useAcceptAllChanges = () => {
  return useMutation(api.files.acceptAllChanges);
};

export const useRejectAllChanges = () => {
  return useMutation(api.files.rejectAllChanges);
};
