/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description App action for the app
 */

// Custom Modules
import { tablesDB } from "@/lib/appwrite";
import { generateID, getUserId } from "@/lib/utils";
// Types
import type { ActionFunction } from "react-router";
import type { Task } from "@/types";

const APPWRITE_TABLEDB_ID = import.meta.env.VITE_APPWRITE_TABLEDB_ID;

const createTask = async (data: Task) => {
  try {
    return await tablesDB.createRow({
      databaseId: APPWRITE_TABLEDB_ID,
      tableId: "tasks",
      rowId: generateID(),
      data: { ...data, userId: getUserId() },
    });
  } catch (err) {
    console.error(err);
  }
};

const appAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as Task;

  if (request.method === "POST") {
    return await createTask(data);
  }
};

export default appAction;
