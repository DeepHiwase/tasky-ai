/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Loader function for the today's tasks
 */

// Node Modules
import { tablesDB, Query } from "@/lib/appwrite";
import { startOfToday, startOfTomorrow } from "date-fns";
// Custom Modules
import { getUserId } from "@/lib/utils";
// Types
import type { LoaderFunction } from "react-router";

const APPWRITE_TABLEDB_ID = import.meta.env.VITE_APPWRITE_TABLEDB_ID;

const getTasks = async () => {
  try {
    return await tablesDB.listRows({
      databaseId: APPWRITE_TABLEDB_ID,
      tableId: "tasks",
      queries: [
        Query.equal("completed", false), //get only incomplete task
        Query.equal("userId", getUserId()), //get only task for current userId
        Query.and([
          Query.greaterThanEqual("due_date", startOfToday().toISOString()),
          Query.lessThan("due_date", startOfTomorrow().toISOString()),
        ]), // get task due today
      ],
    });
  } catch (err) {
    console.error(err);
    throw new Error("Error getting inbox tasks");
  }
};

const todayTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();

  return { tasks };
};

export default todayTaskLoader;
