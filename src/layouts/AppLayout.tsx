/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description App layout for the app
 */

// Node Modules
import { Outlet, useNavigation } from "react-router";
// Custom Modules
import { cn } from "@/lib/utils";
// Components
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const AppLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading" && !navigation.formData;

  return (
    <>
      <SidebarProvider>
        <TooltipProvider
          delayDuration={500}
          disableHoverableContent
        >
          <AppSidebar />

          <main
            className={cn(
              "flex-1",
              isLoading && "opacity-50 pointer-events-none",
            )}
          >
            <Outlet />
          </main>
        </TooltipProvider>
      </SidebarProvider>

      <Toaster />
    </>
  );
};

export default AppLayout;
