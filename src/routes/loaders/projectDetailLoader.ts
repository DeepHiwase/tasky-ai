/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Loader function for project detail
 */

// Node Modules
import { Query, tablesDB } from "@/lib/appwrite";
// Custom Modules
import { getUserId } from "@/lib/utils";
// Types
import type { LoaderFunction } from "react-router";

const APPWRITE_TABLEDB_ID = import.meta.env.VITE_APPWRITE_TABLEDB_ID;

const getProject = async (projectId: string) => {
  try {
    const project = await tablesDB.getRow({
      databaseId: APPWRITE_TABLEDB_ID,
      tableId: "projects",
      rowId: projectId,
    });

    if (project.userId !== getUserId()) {
      throw new Error("Unauthorized");
    }

    const tasks = await tablesDB.listRows({
      databaseId: APPWRITE_TABLEDB_ID,
      tableId: "tasks",
      queries: [Query.equal("project", projectId)],
    });

    return { ...project, tasks: tasks.rows };
  } catch (err) {
    console.log("Error getting project: ", err);

    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error("Error getting project");
  }
};

const projectDetailLoader: LoaderFunction = async ({ params }) => {
  const { projectId } = params as { projectId: string };

  const project = await getProject(projectId);

  return { project };
};

export default projectDetailLoader;
