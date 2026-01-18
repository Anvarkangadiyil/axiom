"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const x = () => {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create);
         
  return (
    <div>
      <Button
        onClick={() => {
          createProject({
            name: "New Project",
          });
        }}
      >
        Add
      </Button>
      {projects?.map((p) => {
        return (
          <div key={p._id}>
            <p>{p.name}</p>
            <p>{p.ownerId}</p>
          </div>
        );
      })}
    </div>
  );
};

export default x;
