/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Task Card Skeleton component for the app
 */

// Custom Modules
import { cn } from "@/lib/utils";
// Components
import { Skeleton } from "@/components/ui/skeleton";

const TaskCardSkeleton = () => {
  return (
    <div
      className={cn(
        "pt-2 pb-3.5",
        "grid grid-cols-[max-content,1fr] gap-3 items-center",
        "border-b",
      )}
    >
      <Skeleton className={cn("w-5 h-5", "rounded-full")} />
      <Skeleton className={cn("h-3", "me-10")} />
    </div>
  );
};

export default TaskCardSkeleton;
