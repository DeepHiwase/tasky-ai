/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Loader function for the inbox tasks
 */

// Node Modules
import { tablesDB, Query } from "@/lib/appwrite";
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
        // Query.isNull("project"), //get only task without a project // not working properly
        Query.or([Query.isNull("project"), Query.equal("project", "")]),
      ],
    });
  } catch (err) {
    console.error(err);
    throw new Error("Error getting inbox tasks");
  }
};

const inboxTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();

  return { tasks };
};

export default inboxTaskLoader;
