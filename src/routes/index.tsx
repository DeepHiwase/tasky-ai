/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Router configuration for the app
 */

// Node Modules
import { createBrowserRouter } from "react-router";
// Layouts
import RootLayout from "@/layouts/RootLayout";
import AppLayout from "@/layouts/AppLayout";
// Pages
import HomePage from "@/pages/HomePage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import AuthSyncPage from "@/pages/AuthSyncPage";
import InboxPage from "@/pages/InboxPage";
// Error Boundaries
import RootErrorBoundary from "@/pages/RootErrorBoundary";
// Actions
import appAction from "@/routes/actions/appAction";
// Loaders
import inboxTaskLoader from "@/routes/loaders/inboxLoader";
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

const appRouteChildren: RouteObject[] = [
  {
    path: "inbox",
    element: <InboxPage />,
    loader: inboxTaskLoader,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: rootRouteChildren,
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: appRouteChildren,
    action: appAction,
  },
]);

export default router;
