/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Router configuration for the app
 */

// Node Modules
import { createBrowserRouter } from "react-router";
// Layouts
import RootLayout from "@/layouts/RootLayout";
// Pages
import HomePage from "@/pages/HomePage";
// Error Boundaries
import RootErrorBoundary from "@/pages/RootErrorBoundary";
// Types
import type { RouteObject } from "react-router";

const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: rootRouteChildren,
  },
]);

export default router;
