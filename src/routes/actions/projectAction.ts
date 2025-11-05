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
import { generateProjectTasks } from "@/api/googleAi";
// Types
import type { ActionFunction } from "react-router";
import type { Project, ProjectForm } from "@/types";
import type { Models } from "appwrite";

type aiGenTask = {
  content: string;
  due_date: Date | null;
};

const APPWRITE_TABLEDB_ID = import.meta.env.VITE_APPWRITE_TABLEDB_ID;

const createProject = async (data: ProjectForm) => {
  let project: Models.Row | null = null;
  const aiTaskGen = data.ai_task_gen;
  const taskGenPrompt = data.task_gen_prompt;

  let aiGeneratedTasks: aiGenTask[] = [];

  try {
    project = await tablesDB.createRow({
      databaseId: APPWRITE_TABLEDB_ID,
      tableId: "projects",
      rowId: generateID(),
      data: {
        // @ts-expect-error ignore as APPwrite SDK don't provide sol for this
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
        userId: getUserId(),
      },
    });
  } catch (err) {
    console.error("Error creating project", err);
  }

  // Generate tasks using AI if AI task generation is enabled
  if (aiTaskGen) {
    try {
      aiGeneratedTasks = JSON.parse(
        (await generateProjectTasks(taskGenPrompt)) || "",
      );
    } catch (err) {
      console.log("Error generating tasks: ", err);
    }
  }

  // Create project tasks if AI task generation is enabled and tasks are generated
  if (aiGeneratedTasks.length) {
    const promises = aiGeneratedTasks.map((task) => {
      return tablesDB.createRow({
        databaseId: APPWRITE_TABLEDB_ID,
        tableId: "tasks",
        rowId: generateID(),
        data: {
          ...task,
          project: project?.$id,
          userId: getUserId(),
        },
      });
    });

    try {
      await Promise.all(promises);
    } catch (err) {
      console.log("Error creating project tasks: ", err);
    }
  }

  return redirect(`/app/projects/${project?.$id}`);
};

const updateProject = async (data: Project) => {
  const rowId = data.id;

  if (!rowId) throw new Error("No project found with this id");

  try {
    await tablesDB.updateRow({
      databaseId: APPWRITE_TABLEDB_ID,
      tableId: "projects",
      rowId,
      data: {
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
      },
    });
  } catch (err) {
    console.log("Error deleting project: ", err);
  }
};

const deleteProject = async (data: Project) => {
  const rowId = data.id;

  if (!rowId) throw new Error("No project found with this id");

  try {
    await tablesDB.deleteRow({
      databaseId: APPWRITE_TABLEDB_ID,
      tableId: "projects",
      rowId,
    });
  } catch (err) {
    console.log("Error deleting project: ", err);
  }
};

const projectAction: ActionFunction = async ({ request }) => {
  const method = request.method;
  const data = (await request.json()) as ProjectForm;

  if (method === "POST") {
    return await createProject(data);
  }

  if (method === "PUT") {
    return await updateProject(data);
  }

  if (method === "DELETE") {
    return await deleteProject(data);
  }

  throw new Error("Invalid method");
};

export default projectAction;
