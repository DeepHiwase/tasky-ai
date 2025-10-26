/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Sidebar component for the app
 */

// Node Modules
import { Link, useLocation } from "react-router";
import { UserButton } from "@clerk/clerk-react";
import { CirclePlus, Plus, ChevronRight } from "lucide-react";
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
// Hooks
import { useSidebar } from "@/components/ui/sidebar";
// Constants
import { SIDEBAR_LINKS } from "@/constants";

const AppSidebar = () => {
  const location = useLocation();

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

                  <SidebarMenuBadge>0</SidebarMenuBadge>
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

            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarGroupAction aria-label="Add project">
                  <Plus />
                </SidebarGroupAction>
              </TooltipTrigger>

              <TooltipContent side="right">Add project</TooltipContent>
            </Tooltip>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <p className={cn("p-2", "text-muted-foreground text-sm")}>
                      Click + to add some projects
                    </p>
                  </SidebarMenuItem>
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
