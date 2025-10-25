/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Top App Bar component for the app
 */

// Node Modules
import { useState, useEffect } from "react";
// Custom Modules
import { cn } from "@/lib/utils";
// Components
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Kbd from "@/components/Kbd";

type TopAppBarProps = {
  title: string;
  taskCount?: number;
};

const TopAppBar: React.FC<TopAppBarProps> = ({ title, taskCount }) => {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const listener = () => setShowTitle(window.scrollY > 70);

    listener();
    window.addEventListener("scroll", listener);

    return () => window.removeEventListener("scroll", listener);
  }, []);

  return (
    <div
      className={cn(
        "h-14",
        "sticky top-0 z-40",
        "px-4",
        "grid grid-cols-[40px,minmax(0,1fr),40px] items-center",
        "bg-background",
        showTitle && "border-b",
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger />
        </TooltipTrigger>

        <TooltipContent className="flex items-center justify-between">
          <p>Tooltip sidebar</p>

          <Kbd KbdList={["Ctrl", "B"]} />
        </TooltipContent>
      </Tooltip>

      <div
        className={cn(
          "max-w-[480px]",
          "mx-auto",
          "text-center transition-[transform,opacity]",
          showTitle ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        )}
      >
        <h1 className={cn("font-semibold truncate")}>{title}</h1>

        {Boolean(taskCount) && (
          <div className={cn("text-xs text-muted-foreground")}>
            {taskCount} tasks
          </div>
        )}
      </div>
    </div>
  );
};

export default TopAppBar;
