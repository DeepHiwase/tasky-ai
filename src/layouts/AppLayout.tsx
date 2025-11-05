/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description App layout for the app
 */

// Node Modules
import { Outlet, useNavigation, useLoaderData } from "react-router";
// Custom Modules
import { cn } from "@/lib/utils";
// Components
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ProjectProvider } from "@/contexts/ProjectContext";
// Types
import type { AppLoaderData } from "@/routes/loaders/appLoader";

const AppLayout = () => {
  const navigation = useNavigation();
  const { projects } = useLoaderData<AppLoaderData>();

  const isLoading = navigation.state === "loading" && !navigation.formData;

  return (
    <>
      <ProjectProvider projects={projects}>
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
      </ProjectProvider>

      <Toaster />
    </>
  );
};

export default AppLayout;
