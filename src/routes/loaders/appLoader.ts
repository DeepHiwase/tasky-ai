/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Loader function for app
 */

// Node Modules
import { startOfToday, startOfTomorrow } from "date-fns";
import { redirect } from "react-router";
// Custom modules
import { tablesDB, Query } from "@/lib/appwrite";
import { getUserId } from "@/lib/utils";
// Types
import type { LoaderFunction } from "react-router";
import type { Models } from "appwrite";

export type AppLoaderData = {
  projects: Models.RowList<Models.Row>;
};

const APPWRITE_TABLEDB_ID = import.meta.env.VITE_APPWRITE_TABLEDB_ID;

const getProjects = async () => {
  try {
    return await tablesDB.listRows({
      databaseId: APPWRITE_TABLEDB_ID,
      tableId: "projects",
      queries: [
        Query.select(["$id", "name", "color_name", "color_hex", "$createdAt"]),
        Query.orderDesc("$createdAt"),
        Query.limit(100),
        Query.equal("userId", getUserId()),
      ],
    });
  } catch (err) {
    console.log("Error getting projects: ", err);
    throw new Error("Error getting projects");
  }
};

const appLoader: LoaderFunction = async () => {
  const userId = getUserId();

  if (!userId) return redirect("/login");

  const projects = await getProjects();

  return { projects };
};

export default appLoader;
