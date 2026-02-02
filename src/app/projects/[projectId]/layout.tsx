import { ProjectIdLayout } from "@/features/projects/components/project-id-layout";
import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;
  const projectIdParsed = projectId as Id<"projects">;

  return (
    <ProjectIdLayout projectId={projectIdParsed}>{children}</ProjectIdLayout>
  );
};

export default Layout;
