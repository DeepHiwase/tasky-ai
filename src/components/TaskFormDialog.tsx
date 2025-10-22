/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Task Form Dialog component for the app
 */

// Node Modules
import { useState, useEffect } from "react";
import { useLocation, useFetcher } from "react-router";
import { startOfToday } from "date-fns";
// Custom Modules
import { cn } from "@/lib/utils";
// Components
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import TaskForm from "@/components/TaskForm";
// Types
import type { PropsWithChildren } from "react";

const TaskFormDialog: React.FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const fetcher = useFetcher();

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className={cn("p-0", "border-0 !rounded-xl")}>
        <TaskForm
          defaultFormData={{
            content: "",
            due_date:
              location.pathname === "/app/today" ? startOfToday() : null,
            project: null,
          }}
          mode="create"
          onCancel={() => setOpen(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData), {
              action: "/app",
              method: "POST",
              encType: "application/json",
            });

            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
