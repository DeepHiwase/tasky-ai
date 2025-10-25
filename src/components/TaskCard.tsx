/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Task Card component for the app
 */

// Node Modules
import { Check, CalendarDays, Hash, Inbox, Edit, Trash2 } from "lucide-react";
// Custom Modules
import { cn, formatCustomDate, getTaskDueDateColorClass } from "@/lib/utils";
// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
// Types
import type { Models } from "appwrite";

type TaskCardProps = {
  id: string;
  content: string;
  completed: boolean;
  dueDate: Date;
  project: Models.Row | null;
};

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  content,
  completed,
  dueDate,
  project,
}) => {
  return (
    <div
      className={cn(
        "group/card relative",
        "grid grid-cols-[max-content,minmax(0,1fr)] gap-3",
        "border-b",
      )}
    >
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "group/button",
          "w-5 h-5",
          "mt-2",
          "rounded-full",
          completed && "bg-border",
        )}
        role="checkbox"
        aria-checked={completed}
        aria-label={`Mark task as ${completed ? "incomplete" : "complete"}`}
        aria-describedby="task-content"
      >
        <Check
          strokeWidth={4}
          className={cn(
            "!w-3 !h-3",
            "text-muted-foreground transition-opacity",
            "group-hover/button:opacity-100",
            completed ? "opacity-100" : "opacity-0",
          )}
        />
      </Button>

      <Card className={cn("py-2", "space-y-1.5", "rounded-none border-none")}>
        <CardContent className="p-0">
          <p
            id="task-content"
            className={cn(
              "text-sm",
              "max-md:me-16",
              completed && "text-muted-foreground line-through",
            )}
          >
            {content}
          </p>
        </CardContent>

        <CardFooter className={cn("p-0", "flex gap-4")}>
          {dueDate && (
            <div
              className={cn(
                "flex items-center gap-1",
                "text-xs text-muted-foreground",
                getTaskDueDateColorClass(dueDate, completed),
              )}
            >
              <CalendarDays size={14} />

              {formatCustomDate(dueDate)}
            </div>
          )}

          <div
            className={cn(
              "ms-auto",
              "grid grid-cols-[minmax(0,180px),max-content] items-center gap-1",
              "text-xs text-muted-foreground",
            )}
          >
            <div className="truncate text-right">
              {project?.name || "Inbox"}
            </div>

            {project ? (
              <Hash size={14} />
            ) : (
              <Inbox
                size={14}
                className="text-muted-foreground"
              />
            )}
          </div>
        </CardFooter>
      </Card>

      <div
        className={cn(
          "absolute top-1.5 right-0",
          "ps-1",
          "flex items-center gap-1",
          "bg-background shadow-[-10px_0_5px_hsl(var(--background))] opacity-0",
          "group-hover/card:opacity-100 focus-within:opacity-100",
          "max-md:opacity-100",
        )}
      >
        {!completed && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("w-6 h-6", "text-muted-foreground")}
                aria-label="Edit"
              >
                <Edit />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Edit task</TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn("w-6 h-6", "text-muted-foreground")}
              aria-label="Delete Task"
            >
              <Trash2 />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Delete task</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default TaskCard;
