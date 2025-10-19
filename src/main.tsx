/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Main entry point for the app
 */

// Node Modules
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
// CSS Link
import "./index.css";
// Routes
import router from "@/routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
