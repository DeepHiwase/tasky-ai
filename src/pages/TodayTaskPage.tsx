/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Today's Task Page for the app
 */

// Node Modules
import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
import { CheckCircle2 } from "lucide-react";
import { startOfToday } from "date-fns";
// Custom Modules
import { cn } from "@/lib/utils";
// Components
import Head from "@/components/Head";
import TopAppBar from "@/components/TopAppBar";
import { Page, PageHeader, PageTitle, PageList } from "@/components/Page";
import TaskCreateButton from "@/components/TaskCreateButton";
import TaskEmptyState from "@/components/TaskEmptyState";
import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import TaskCardSkeleton from "@/components/TaskCardSkeleton";
// Types
import type { Models } from "appwrite";

const TodayTaskPage = () => {
  const fetcher = useFetcher();
  const { tasks } = useLoaderData<{
    tasks: Models.RowList<Models.Row>;
  }>();
  // console.log(tasks);

  const [taskFormShow, setTaskFormShow] = useState(false);

  return (
    <>
      <Head title="Today - Tasky AI" />

      <TopAppBar
        title="Today"
        taskCount={tasks.total}
      />

      <Page>
        <PageHeader>
          <PageTitle>Today</PageTitle>

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

          {fetcher.state !== "idle" && <TaskCardSkeleton />}

          {!taskFormShow && (
            <TaskCreateButton onClick={() => setTaskFormShow(true)} />
          )}

          {!tasks.total && !taskFormShow && <TaskEmptyState type="today" />}

          {taskFormShow && (
            <TaskForm
              className="mt-1"
              mode="create"
              defaultFormData={{
                content: "",
                due_date: startOfToday(),
                project: null,
              }}
              onCancel={() => setTaskFormShow(false)}
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

export default TodayTaskPage;
