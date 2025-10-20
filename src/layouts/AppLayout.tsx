/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description App layout for the app
 */

// Node Modules
import { Outlet } from "react-router";
// Components
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <TooltipProvider
        delayDuration={500}
        disableHoverableContent
      >
        <AppSidebar />

        <SidebarTrigger />
        <div>AppLayout</div>
        <Outlet />
      </TooltipProvider>
    </SidebarProvider>
  );
};

export default AppLayout;
