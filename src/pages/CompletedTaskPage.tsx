/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Completed Task Page for the app
 */

// Node Modules
import { useLoaderData } from "react-router";
import { CheckCircle2 } from "lucide-react";
// Custom Modules
import { cn } from "@/lib/utils";
// Components
import Head from "@/components/Head";
import TopAppBar from "@/components/TopAppBar";
import { Page, PageHeader, PageTitle, PageList } from "@/components/Page";
import TaskEmptyState from "@/components/TaskEmptyState";
import TaskCard from "@/components/TaskCard";
// Types
import type { Models } from "appwrite";

const CompletedTaskPage = () => {
  const { tasks } = useLoaderData<{
    tasks: Models.RowList<Models.Row>;
  }>();

  return (
    <>
      <Head title="Completed - Tasky AI" />

      <TopAppBar title="Completed" />

      <Page>
        <PageHeader>
          <PageTitle>Completed</PageTitle>

          {tasks.total > 0 && (
            <div
              className={cn(
                "flex items-center gap-1.5",
                "text-sm",
                "text-muted-foreground",
              )}
            >
              <CheckCircle2 size={16} /> {tasks.total} tasks
            </div>
          )}
        </PageHeader>

        <PageList>
          {/* @ts-expect-error ignore as APPwrite SDK don't provide sol for this */}
          {tasks.rows.map(({ $id, content, completed, due_date, project }) => (
            <TaskCard
              key={$id}
              id={$id}
              content={content}
              completed={completed}
              dueDate={due_date}
              project={project}
            />
          ))}

          {!tasks.total && <TaskEmptyState type="completed" />}
        </PageList>
      </Page>
    </>
  );
};

export default CompletedTaskPage;
