/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Project Context for the app
 */

// Node Modules
import { createContext, useContext } from "react";
// Types
import type { Models } from "appwrite";

type ProjectProviderProps = {
  projects: Models.RowList<Models.Row>;
  children: React.ReactNode;
};

const ProjectContext = createContext<Models.RowList<Models.Row> | null>(null);

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  projects,
  children,
}) => {
  return (
    <ProjectContext.Provider value={projects}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
