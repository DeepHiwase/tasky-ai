/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Loader function for the completed tasks
 */

// Node Modules
import { tablesDB, Query } from "@/lib/appwrite";
// import { startOfToday } from "date-fns";
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
        Query.equal("completed", true), //get only completed task
        Query.orderDesc("$updatedAt"), // Order by last updated
        Query.equal("userId", getUserId()), //get only task for current userId
      ],
    });
  } catch (err) {
    console.error(err);
    throw new Error("Error getting completed tasks");
  }
};

const completedTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();

  return { tasks };
};

export default completedTaskLoader;
