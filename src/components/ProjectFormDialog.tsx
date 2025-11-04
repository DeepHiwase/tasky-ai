/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Project Form Dialog component for the app
 */

// Node Modules
import { useState } from "react";
import { useFetcher } from "react-router";
// Custom Modules
import { cn, truncateString } from "@/lib/utils";
// Components
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import ProjectForm from "@/components/ProjectForm";
// Hooks
import { toast } from "sonner";
// Types
import type { Project } from "@/types";

type ProjectFromDialogProps = {
  defaultFormData?: Project;
  children: React.ReactNode;
  method: "POST" | "PUT";
};

const ProjectFormDialog: React.FC<ProjectFromDialogProps> = ({
  defaultFormData,
  children,
  method,
}) => {
  const fetcher = useFetcher();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className={cn("p-0", "border-0 !rounded-xl")}>
        <ProjectForm
          mode={method === "POST" ? "create" : "edit"}
          defaultFormData={defaultFormData}
          onCancel={() => setOpen(false)}
          onSubmit={async (data) => {
            setOpen(false);

            const toastId = toast(
              `${method === "POST" ? "Creating" : "Updating"} project...`,
              {
                duration: Infinity,
              },
            );

            await fetcher.submit(JSON.stringify(data), {
              action: "/app/projects",
              method,
              encType: "application/json",
            });

            toast(`Project ${method === "POST" ? "created" : "updated"}.`, {
              description: `The project ${truncateString(data.name, 32)} ${data.ai_task_gen ? "and its tasks" : ""} have been successfully ${method === "POST" ? "created" : "updated"}.`,
              id: toastId,
              duration: 5000,
            });
            // toast.dismiss(toastId);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
