/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Appwrite module for the app
 */

// Node Modules
import { Client, TablesDB, ID, Query } from "appwrite";

const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_PROJECT_ENDPOINT = import.meta.env
  .VITE_APPWRITE_PROJECT_ENDPOINT;

export const client = new Client()
  .setEndpoint(APPWRITE_PROJECT_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

const tablesDB = new TablesDB(client);

export { tablesDB, ID, Query };
