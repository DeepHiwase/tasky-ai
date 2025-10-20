/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Task Form component for the app
 */

// Node Modules
import {
  CalendarIcon,
  ChevronDown,
  Hash,
  Inbox,
  SendHorizonal,
  X,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
// Custom Modules
import { cn, formatCustomDate, getTaskDueDateColorClass } from "@/lib/utils";
// Components
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
// Types
import type { ClassValue } from "clsx";
import type { TaskForm } from "@/types";
import type React from "react";

type TaskFormProps = {
  defaultFormData?: TaskForm;
  className?: ClassValue;
  mode: "create" | "edit";
  onCancel?: () => void;
  onSubmit?: (formData: TaskForm) => void;
};

const DEFAULT_FORM_DATA: TaskForm = {
  content: "",
  due_date: null,
  project: null,
};

const TaskForm: React.FC<TaskFormProps> = ({
  defaultFormData = DEFAULT_FORM_DATA,
  className,
  mode,
  onCancel,
  onSubmit,
}) => {
  const [taskContent, setTaskContent] = useState(defaultFormData.content);
  const [dueDate, setDueDate] = useState(defaultFormData.due_date);
  const [projectId, setProjectId] = useState(defaultFormData.project);
  const [projectName, setProjectName] = useState("");
  const [projectColorHex, setProjectColorHex] = useState("");
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: taskContent,
      due_date: dueDate,
      project: projectName,
    }));
  }, [taskContent, dueDate, projectName]);

  const handleSubmit = useCallback(() => {
    if (!taskContent) return;

    if (onSubmit) onSubmit(formData);

    setTaskContent("");
  }, [taskContent, onSubmit, formData]);

  return (
    <Card className="focus-within:border-foreground/30">
      <CardContent className="p-2">
        <Textarea
          className={cn("mb-2", "p-1", "!border-0 !ring-0")}
          placeholder="After finishing the project, Take a tour"
          autoFocus
          value={taskContent}
          onInput={(e) => setTaskContent(e.currentTarget.value)}
        />

        <div className={cn("max-w-max", "ring-1 ring-border rounded-md")}>
          <Popover
            open={dueDateOpen}
            onOpenChange={setDueDateOpen}
          >
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn(getTaskDueDateColorClass(dueDate, false))}
              >
                <CalendarIcon />{" "}
                {dueDate ? formatCustomDate(dueDate) : "Due date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className={cn("w-auto", "p-0")}>
              <Calendar
                mode="single"
                disabled={{ before: new Date() }}
                autoFocus
                className="!text-sidebar-foreground"
                onSelect={(selected) => {
                  setDueDate(selected || null);
                  setDueDateOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>

          {dueDate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("-ms-2", "px-2")}
                  aria-label="Remove due date"
                  onClick={() => setDueDate(null)}
                >
                  <X />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Remove due date</TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardContent>

      <Separator />

      <CardFooter
        className={cn(
          "p-2",
          "!grid grid-cols-[minmax(0,1fr),max-content] gap-2",
        )}
      >
        <Popover
          open={projectOpen}
          onOpenChange={setProjectOpen}
          modal
        >
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={false}
              className="max-w-max"
            >
              <Inbox /> Inbox <ChevronDown />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className={cn("w-[240px]", "p-0")}
            align="start"
          >
            <Command>
              <CommandInput placeholder="Search project..." />

              <CommandList>
                <ScrollArea>
                  <CommandEmpty>No project found.</CommandEmpty>

                  <CommandGroup>
                    <CommandItem>
                      <Hash /> Project 1
                    </CommandItem>
                    <CommandItem>
                      <Hash /> Project 2
                    </CommandItem>
                    <CommandItem>
                      <Hash /> Project 3
                    </CommandItem>
                    <CommandItem>
                      <Hash /> Project 4
                    </CommandItem>
                    <CommandItem>
                      <Hash /> Project 5
                    </CommandItem>
                    <CommandItem>
                      <Hash /> Project 6
                    </CommandItem>
                    <CommandItem>
                      <Hash /> Project 7
                    </CommandItem>
                    <CommandItem>
                      <Hash /> Project 8
                    </CommandItem>
                    <CommandItem>
                      <Hash /> Project 9
                    </CommandItem>
                    <CommandItem>
                      <Hash /> Project 10
                    </CommandItem>
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            <span className="max-md:hidden">Cancel</span>

            <X className="md:hidden" />
          </Button>

          <Button
            disabled={!taskContent}
            onClick={handleSubmit}
          >
            <span className="max-md:hidden">
              {mode === "create" ? "Add task" : "Save"}
            </span>

            <SendHorizonal className="md:hidden" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskForm;
