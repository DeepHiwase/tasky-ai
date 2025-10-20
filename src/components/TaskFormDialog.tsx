/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Task Form Dialog component for the app
 */

// Custom Modules
import { cn } from "@/lib/utils";
// Components
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import TaskForm from "@/components/TaskForm";
// Types
import type { PropsWithChildren } from "react";

const TaskFormDialog: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className={cn("p-0", "border-0 !rounded-xl")}>
        <TaskForm />
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
