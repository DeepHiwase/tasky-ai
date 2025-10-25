/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Task Create Button component for the app
 */

// Node Modules
import { CirclePlus } from "lucide-react";
// Custom Modules
import { cn } from "@/lib/utils";
// Components
import { Button } from "@/components/ui/button";

type TaskCreateButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
>;

const TaskCreateButton: React.FC<TaskCreateButtonProps> = (props) => {
  return (
    <Button
      variant="link"
      className={cn("w-full", "mb-4", "px-0", "justify-start")}
      {...props}
    >
      <CirclePlus /> Add task
    </Button>
  );
};

export default TaskCreateButton;
