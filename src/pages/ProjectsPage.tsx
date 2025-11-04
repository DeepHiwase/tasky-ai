/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Projects Page for the app
 */

// Node Modules
import { useCallback, useRef, useState } from "react";
import { useLoaderData, useFetcher } from "react-router";
import { Plus } from "lucide-react";
// Custom Modules
import { cn } from "@/lib/utils";
// Components
import Head from "@/components/Head";
import { Button } from "@/components/ui/button";
import TopAppBar from "@/components/TopAppBar";
import ProjectFormDialog from "@/components/ProjectFormDialog";
import { Page, PageHeader, PageTitle, PageList } from "@/components/Page";
import ProjectCard from "@/components/ProjectCard";
// Types
import type { Models } from "appwrite";

type DataType = {
  projects: Models.RowList<Models.Row>;
};

const ProjectsPage = () => {
  const loaderData = useLoaderData() as DataType;

  const { projects } = loaderData;

  console.log(projects);

  return (
    <>
      <Head title="My Projects - Tasky AI" />

      <TopAppBar title="My Projects" />

      <Page>
        <PageHeader>
          <div className="flex items-center gap-2">
            <PageTitle>My Projects</PageTitle>

            <ProjectFormDialog method="POST">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8"
                aria-label="Create a project"
              >
                <Plus />
              </Button>
            </ProjectFormDialog>
          </div>
        </PageHeader>

        <PageList>
          <div className={cn("h-8", "flex items-center", "border-b")}>
            <div className="text-sm">{projects?.total} projects</div>
          </div>

          <div className="">
            {projects?.rows?.map((project) => (
              <ProjectCard
                key={project.$id}
                project={project}
              />
            ))}
          </div>
        </PageList>
      </Page>
    </>
  );
};

export default ProjectsPage;
