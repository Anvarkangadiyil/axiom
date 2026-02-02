import { Id } from "../../../../convex/_generated/dataModel";
import { UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useProject, useRenameProject } from "../hooks/use-projects";
import { useState } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { CloudCheckIcon, LoaderIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Navbar = ({ projectId }: { projectId: Id<"projects"> }) => {
  const project = useProject(projectId);

  const renameProject = useRenameProject();

  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState(project?.name);

  const handleStartRename = () => {
    if (!project) return;
    setName(project.name);
    setIsRenaming(true);
  };

  const handleSubmit = () => {
    setIsRenaming(false);

    const trimedName = name?.trim();

    if (!trimedName || trimedName === project?.name) return;

    renameProject({ id: projectId, name: trimedName });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsRenaming(false);
    }
  };

  return (
    <div
      className="flex justify-between items-center
    gap-x-2 p-2 bg-sidebar border-b 
    "
    >
      <div className="flex items-center gap-x-2">
        <Breadcrumb>
          <BreadcrumbList className="g-0!">
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="flex items-center gap-1.5 group/logo"
              >
                <Button variant={"ghost"} className="w-fit! p-1.5! h-7!">
                  <Link href={`/`}>
                    <Image src="/logo.svg" alt="logo" width={20} height={20} />
                  </Link>
                  <span className={cn("text-sm font-medium", font.className)}>
                    {" "}
                    Axiom
                  </span>
                </Button>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="ml-0! mr-1!" />
            <BreadcrumbItem>
              {isRenaming ? (
                <input
                  autoFocus
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  onFocus={(e) => {
                    e.currentTarget.select();
                  }}
                  onBlur={handleSubmit}
                  onKeyDown={handleKeyDown}
                  className="text-sm bg-transparent text-foreground outline-none focus:ring-1 focus:ring-ring font-medium max-w-40 truncate"
                />
              ) : (
                <BreadcrumbPage
                  onClick={handleStartRename}
                  className="text-sm cursor-pointer hover:text-primary font-medium max-w-40
            truncate
             "
                >
                  {project?.name ?? "Loading..."}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {project?.importStatus === "importing" ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <LoaderIcon className="size-4 text-muted-foreground animate-spin" />
            </TooltipTrigger>
            <TooltipContent>Importing...</TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <CloudCheckIcon className="size-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              Saved{" "}
              {project?.updatedAt
                ? formatDistanceToNow(project.updatedAt, {
                    addSuffix: true,
                  })
                : "Loading..."}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex items-center gap-2">
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
