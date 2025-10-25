/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description App layout for the app
 */

// Node Modules
import { Outlet } from "react-router";
// Components
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const AppLayout = () => {
  return (
    <>
      <SidebarProvider>
        <TooltipProvider
          delayDuration={500}
          disableHoverableContent
        >
          <AppSidebar />

          <main className="flex-1">
            <Outlet />
          </main>
        </TooltipProvider>
      </SidebarProvider>

      <Toaster />
    </>
  );
};

export default AppLayout;
