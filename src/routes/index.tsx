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
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import AuthSyncPage from "@/pages/AuthSyncPage";
// Error Boundaries
import RootErrorBoundary from "@/pages/RootErrorBoundary";
// Types
import type { RouteObject } from "react-router";

const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "auth-sync",
    element: <AuthSyncPage />,
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
