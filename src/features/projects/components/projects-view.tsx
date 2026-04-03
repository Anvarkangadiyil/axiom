"use client";

import { Poppins } from "next/font/google";
import { SparkleIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { useEffect, useState } from "react";

import ProjectsList from "./projects-list";
import { useCreateProject } from "../hooks/use-projects";

import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ProjectsCommandDialog from "./projects-command-dialog";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ProjectView = () => {
  const createProject = useCreateProject();
  const [commandDialogOpen, setCommandDialogOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) {
        if (event.key === "k") {
          setCommandDialogOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <ProjectsCommandDialog
        open={commandDialogOpen}
        onOpenChange={setCommandDialogOpen}
      />
      <div className="min-h-screen bg-sidebar flex flex-col items-center justify-center p-6 md:p-6">
        <div className="w-full max-w-sm mx-auto flex-col gap-4 items-center">
          <div className="flex justify-between gap-4 w-full items-center mb-2">
            <div className="flex items-center gap-2 w-full group/logo">
              <img
                src="/logo.svg"
                alt="axiom"
                className="size-8 md:size-[46px}"
              />
              <h1
                className={cn(
                  "text-3xl md:text-4xl font-bold text-white",
                  font.className,
                )}
              >
                Axiom
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={"outline"}
                onClick={() => {
                  const name = uniqueNamesGenerator({
                    dictionaries: [adjectives, animals, colors],
                    separator: "-",
                    length: 3,
                  });
                  createProject({
                    name: name,
                  });
                }}
                className="h-full  items-start justify-start p-4 bg-background border flex flex-col rounded-none"
              >
                <div className="flex items-center justify-between w-full">
                  <SparkleIcon className="size-4" />
                  <Kbd className="bg-accent border">
                    <span>⌘j</span>
                  </Kbd>
                </div>
                <div className="test-sm">
                  <span>New</span>
                </div>
              </Button>
              <Button
                variant={"outline"}
                onClick={() => {}}
                className="h-full  items-start justify-start p-4 bg-background border flex flex-col rounded-none"
              >
                <div className="flex items-center justify-between w-full">
                  <SparkleIcon className="size-4" />
                  <FaGithub className="size-4" />
                  <Kbd className="bg-accent border">
                    <span>⌘I</span>
                  </Kbd>
                </div>
                <div className="test-sm">
                  <span>Import</span>
                </div>
              </Button>
            </div>
            <ProjectsList onViewAll={() => setCommandDialogOpen(true)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectView;
