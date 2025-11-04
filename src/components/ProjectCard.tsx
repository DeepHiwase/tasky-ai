/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Project Card component for the app
 */

// Node Modules
import { Link } from "react-router";
import { Hash, MoreHorizontal } from "lucide-react";
// Custom Modules
import { cn } from "@/lib/utils";
// Components
import { Button } from "@/components/ui/button";
import ProjectActionMenu from "@/components/ProjectActionMenu";
// Types
import type { Models } from "appwrite";

type ProjectCardProps = {
  project: Models.Row;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div
      className={cn(
        "group/card relative",
        "h-14",
        "flex items-center gap-3",
        "px-2",
        "rounded-lg",
        "hover:bg-secondary",
      )}
    >
      <Hash
        size={16}
        color={project.color_hex}
        className="shrink-0"
      />
      <p className={cn("max-w-[48ch]", "text-sm truncate")}>{project.name}</p>

      {/* Active Menu */}
      <ProjectActionMenu
        defaultFormData={{
          id: project.$id,
          name: project.name,
          color_name: project.color_name,
          color_hex: project.color_hex,
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative z-20",
            "ms-auto",
            "shrink-0",
            "opacity-0",
            "group-hover/card:opacity-100",
            "max-md:opacity-100",
          )}
          aria-label="More actions"
        >
          <MoreHorizontal />
        </Button>
      </ProjectActionMenu>

      <Link
        to={`/app/projects/${project.$id}`}
        className={cn("absolute z-10", "inset-0")}
      />
    </div>
  );
};

export default ProjectCard;
