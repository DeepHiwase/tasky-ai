import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Utility functions for the app
 */

// Node Modules
import {
  formatRelative,
  isSameYear,
  format,
  isBefore,
  isToday,
  isTomorrow,
  startOfToday,
} from "date-fns";

// Capitalizes the first letter of a string.
export function toTitleString(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Format a date string to a custom format
 * (e.g. "Today", "Tomorrow", "Yesterday", "dd MM", "dd MMM yyyy")
 */
export function formatCustomDate(date: string | number | Date) {
  const today = new Date();

  const relativeDay = toTitleString(
    formatRelative(date, today).split(" at ")[0],
  );

  const relativeDays = [
    "Today",
    "Tomorrow",
    "Yesterday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Thursday",
    "Friday",
  ];

  if (relativeDays.includes(relativeDay)) {
    return relativeDay;
  }

  if (isSameYear(date, today)) {
    return format(date, "dd MMM");
  } else {
    return format(date, "dd MM yyyy");
  }
}

// Returns a color class based on the due date of a task
export function getTaskDueDateColorClass(
  dueDate: Date | null,
  completed?: boolean,
): string | undefined {
  if (dueDate === null || completed === undefined) return;

  if (isBefore(dueDate, startOfToday()) && !completed) {
    return "text-red-500";
  }

  if (isToday(dueDate)) {
    return "text-emerald-500";
  }

  if (isTomorrow(dueDate) && !completed) {
    return "text-amber-500";
  }
}
