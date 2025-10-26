/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Project action for the app
 */

// Node Modules
import { redirect } from "react-router";
// Custom Modules
import { tablesDB } from "@/lib/appwrite";
import { generateID, getUserId } from "@/lib/utils";
// Types
import type { ActionFunction } from "react-router";
import type { ProjectForm } from "@/types";
import type { Models } from "appwrite";

const APPWRITE_TABLEDB_ID = import.meta.env.VITE_APPWRITE_TABLEDB_ID;

const createProject = async (data: ProjectForm) => {
  let project: Models.Row | null = null;
  const aiTaskGen = data.ai_task_gen;
  const taskGenPrompt = data.task_gen_prompt;

  try {
    project = await tablesDB.createRow({
      databaseId: APPWRITE_TABLEDB_ID,
      tableId: "projects",
      rowId: generateID(),
      data: {
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
        userId: getUserId(),
      },
    });
  } catch (err) {
    console.error("Error creating project", err);
  }

  return redirect(`/app/projects/${project?.$id}`);
};

const projectAction: ActionFunction = async ({ request }) => {
  const method = request.method;
  const data = (await request.json()) as ProjectForm;

  if (method === "POST") {
    return await createProject(data);
  }
  return null;
};

export default projectAction;
