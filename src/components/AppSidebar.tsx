/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Sidebar component for the app
 */

// Node Modules
import { Link, useLocation, useLoaderData } from "react-router";
import { UserButton } from "@clerk/clerk-react";
import {
  CirclePlus,
  Plus,
  ChevronRight,
  Hash,
  MoreHorizontal,
} from "lucide-react";
// Custom Modules
import { cn } from "@/lib/utils";
// Components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import Logo from "@/components/Logo";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import TaskFormDialog from "@/components/TaskFormDialog";
import ProjectFormDialog from "@/components/ProjectFormDialog";
import ProjectActionMenu from "@/components/ProjectActionMenu";
// Hooks
import { useSidebar } from "@/components/ui/sidebar";
import { useProjects } from "@/contexts/ProjectContext";
// Constants
import { SIDEBAR_LINKS } from "@/constants";
// Types
import type { AppLoaderData } from "@/routes/loaders/appLoader";

const AppSidebar = () => {
  const location = useLocation();
  const projects = useProjects();

  const { taskCounts } = useLoaderData() as AppLoaderData;

  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          to="/app/inbox"
          className="p-2"
        >
          <Logo />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Task create button */}
              <SidebarMenuItem>
                <TaskFormDialog>
                  <SidebarMenuButton className="!text-primary">
                    <CirclePlus /> Add Task
                  </SidebarMenuButton>
                </TaskFormDialog>
              </SidebarMenuItem>

              {/* Sidebar Links */}
              {SIDEBAR_LINKS.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.href}
                    onClick={() => {
                      if (isMobile) setOpenMobile(false);
                    }}
                  >
                    <Link to={item.href}>
                      <item.icon />

                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>

                  {/* Show task count in inbox menu items */}
                  {item.href === "/app/inbox" &&
                    Boolean(taskCounts.inboxTasks) && (
                      <SidebarMenuBadge>
                        {taskCounts.inboxTasks}
                      </SidebarMenuBadge>
                    )}

                  {item.href === "/app/today" &&
                    Boolean(taskCounts.todayTasks) && (
                      <SidebarMenuBadge>
                        {taskCounts.todayTasks}
                      </SidebarMenuBadge>
                    )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* All Projects */}
        <Collapsible
          defaultOpen
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className={cn(
                "text-sm text-sidebar-foreground",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <CollapsibleTrigger>
                <ChevronRight
                  className={cn(
                    "me-2",
                    "transition-transform",
                    "group-data-[state=open]/collapsible:rotate-90",
                  )}
                />
                Projects
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            {/* Project Create Button */}
            <Tooltip>
              <ProjectFormDialog method="POST">
                <TooltipTrigger asChild>
                  <SidebarGroupAction aria-label="Add project">
                    <Plus />
                  </SidebarGroupAction>
                </TooltipTrigger>
              </ProjectFormDialog>

              <TooltipContent side="right">Add project</TooltipContent>
            </Tooltip>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {projects?.rows
                    .slice(0, 5)
                    // @ts-expect-error ignore as APPwrite SDK don't provide sol for this
                    .map(({ $id, name, color_name, color_hex }) => (
                      <SidebarMenuItem key={$id}>
                        <SidebarMenuButton
                          asChild
                          isActive={
                            location.pathname === `/app/projects/${$id}`
                          }
                          onClick={() => {
                            if (isMobile) setOpenMobile(false);
                          }}
                        >
                          <Link to={`/app/projects/${$id}`}>
                            <Hash color={color_hex} />

                            <span>{name}</span>
                          </Link>
                        </SidebarMenuButton>

                        <ProjectActionMenu
                          defaultFormData={{
                            id: $id,
                            name,
                            color_name,
                            color_hex,
                          }}
                          side="right"
                          align="start"
                        >
                          <SidebarMenuAction
                            aria-label="More actions"
                            showOnHover
                            className="bg-accent"
                          >
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </ProjectActionMenu>
                      </SidebarMenuItem>
                    ))}

                  {projects !== null && projects.total > 5 && (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className="text-muted-foreground"
                        isActive={location.pathname === "/app/projects"}
                        onClick={() => {
                          if (isMobile) setOpenMobile(false);
                        }}
                      >
                        <Link to="/app/projects">
                          <MoreHorizontal /> All projects
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}

                  {!projects?.total && (
                    <SidebarMenuItem>
                      <p className={cn("p-2", "text-muted-foreground text-sm")}>
                        Click + to add some projects
                      </p>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter className="group w-full">
        <UserButton
          showName
          appearance={{
            theme: undefined,
            elements: {
              rootBox: "!w-full",
              userButtonBox: "!flex !flex-row-reverse !items-center !gap-2",
              userButtonTrigger:
                "!shadow-none !w-full !justify-start !p-2 !rounded-md hover:!bg-sidebar-accent !transition-colors",
              userButtonOuterIdentifier: "!ps-0 !text-sm !font-medium",
              popoverBox: "!pointer-events-auto !p-2",
            },
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
