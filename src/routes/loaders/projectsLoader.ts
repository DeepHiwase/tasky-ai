/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Loader function for projects
 */

// Node Modules
import { tablesDB, Query } from "@/lib/appwrite";
// Custom Modules
import { getUserId } from "@/lib/utils";
// Types
import type { LoaderFunction } from "react-router";

const APPWRITE_TABLEDB_ID = import.meta.env.VITE_APPWRITE_TABLEDB_ID;

const getProjects = async (query: string) => {
  try {
    return await tablesDB.listRows({
      databaseId: APPWRITE_TABLEDB_ID,
      tableId: "projects",
      queries: [
        Query.contains("name", query),
        Query.select(["$id", "name", "color_name", "color_hex", "$createdAt"]),
        Query.equal("userId", getUserId()),
        Query.orderDesc("$createdAt"),
      ],
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error getting projects");
  }
};

const projectsLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  const projects = await getProjects(query);

  return { projects };
};

export default projectsLoader;
