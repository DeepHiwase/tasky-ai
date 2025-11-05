/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Project Detail Page for the app
 */

// Node Modules
import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
import { MoreHorizontal } from "lucide-react";
// Custom Modules
import { cn } from "@/lib/utils";
// Components
import Head from "@/components/Head";
import TopAppBar from "@/components/TopAppBar";
import { Button } from "@/components/ui/button";
import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import TaskCardSkeleton from "@/components/TaskCardSkeleton";
import ProjectActionMenu from "@/components/ProjectActionMenu";
import TaskCreateButton from "@/components/TaskCreateButton";
import TaskEmptyState from "@/components/TaskEmptyState";
import { Page, PageHeader, PageTitle, PageList } from "@/components/Page";
// Types
import type { Models } from "appwrite";

const ProjectDetailPage = () => {
  const fetcher = useFetcher();
  const { project } = useLoaderData<{
    project: Models.Row & { tasks: Models.Row[] };
  }>();
  console.log(project);

  // Get task that are not completed
  const projectTasks = project.tasks.filter(
    // @ts-expect-error ignore as APPwrite SDK don't provide sol for this
    (i: Models.Row) => !i.completed,
  ) as Models.Row[];

  // Sort task by due date
  projectTasks.sort((a, b) => {
    // @ts-expect-error ignore as APPwrite SDK don't provide sol for this
    return a.due_date < b.due_date ? -1 : 1;
  });

  const [taskFormShow, setTaskFormShow] = useState<boolean>(false);

  return (
    <>
      {/* @ts-expect-error ignore as APPwrite SDK don't provide sol for this */}
      <Head title={project.name + " - Tasky AI"} />

      {/* @ts-expect-error ignore as APPwrite SDK don't provide sol for this */}
      <TopAppBar title={project.name} />

      <Page>
        <PageHeader>
          <div className="flex items-center gap-2">
            {/* @ts-expect-error ignore as APPwrite SDK don't provide sol for this */}
            <PageTitle>{project.name}</PageTitle>

            <ProjectActionMenu
              defaultFormData={{
                id: project.$id,
                // @ts-expect-error ignore as APPwrite SDK don't provide sol for this
                name: project.name,
                // @ts-expect-error ignore as APPwrite SDK don't provide sol for this
                color_name: project.color_name,
                // @ts-expect-error ignore as APPwrite SDK don't provide sol for this
                color_hex: project.color_hex,
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className={cn("w-8 h-8", "shrink-0")}
                aria-label="More actions"
              >
                <MoreHorizontal />
              </Button>
            </ProjectActionMenu>
          </div>
        </PageHeader>

        <PageList>
          {/* @ts-expect-error ignore as APPwrite SDK don't provide sol for this */}
          {projectTasks.map(({ $id, content, completed, due_date }) => (
            <TaskCard
              key={$id}
              id={$id}
              content={content}
              completed={completed}
              dueDate={due_date}
              project={project}
            />
          ))}

          {fetcher.state !== "idle" && <TaskCardSkeleton />}

          {!taskFormShow && (
            <TaskCreateButton onClick={() => setTaskFormShow(true)} />
          )}

          {!projectTasks.length && !taskFormShow && (
            <TaskEmptyState type="project" />
          )}

          {taskFormShow && (
            <TaskForm
              className="mt-1"
              mode="create"
              onCancel={() => setTaskFormShow(false)}
              defaultFormData={{
                content: "",
                due_date: null,
                project: project.$id,
              }}
              onSubmit={(formData) => {
                fetcher.submit(JSON.stringify(formData), {
                  action: "/app",
                  method: "POST",
                  encType: "application/json",
                });
              }}
            />
          )}
        </PageList>
      </Page>
    </>
  );
};

export default ProjectDetailPage;
