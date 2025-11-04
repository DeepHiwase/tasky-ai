/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Project Action Menu component for the app
 */

// Node Modules
import { Edit } from "lucide-react";
// Custom Modules
import { cn } from "@/lib/utils";
// Components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ProjectFormDialog from "@/components/ProjectFormDialog";
import { Button } from "@/components/ui/button";
import ProjectDeleteButton from "@/components/ProjectDeleteButton";
// Types
import type { Project } from "@/types";
import type { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

interface ProjectActionMenuProps extends DropdownMenuContentProps {
  defaultFormData: Project;
}

const ProjectActionMenu: React.FC<ProjectActionMenuProps> = ({
  children,
  defaultFormData,
  ...props
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent {...props}>
        <DropdownMenuItem asChild>
          <ProjectFormDialog
            method="PUT"
            defaultFormData={defaultFormData}
          >
            <Button
              variant="ghost"
              size="sm"
              className={cn("w-full", "px-2", "justify-start")}
            >
              <Edit /> Edit
            </Button>
          </ProjectFormDialog>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <ProjectDeleteButton defaultFormData={defaultFormData} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectActionMenu;
