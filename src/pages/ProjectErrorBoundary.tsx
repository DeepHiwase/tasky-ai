/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Project Error Boundary Page for the app
 */

// Custom Modules
import { cn } from "@/lib/utils";
// Components
import Head from "@/components/Head";
import TopAppBar from "@/components/TopAppBar";
// Assets
import { pageNotFound } from "@/assets";

const ProjectErrorBoundary = () => {
  return (
    <>
      <Head title="Project not found" />

      <TopAppBar title="Project not found" />

      <div
        className={cn(
          "container",
          "flex flex-col grow justify-center items-center",
        )}
      >
        <figure className="mt-10">
          <img
            src={pageNotFound}
            alt="404 page not found"
            width={360}
          />
        </figure>

        <h1 className={cn("mt-4 mb-2", "text-2xl font-semibold text-center")}>
          Project not found
        </h1>

        <p className={cn("max-w-[40ch]", "text-muted-foreground text-center")}>
          Uh oh! No project matches this ID. Double-check it or explore other
          projects!
        </p>
      </div>
    </>
  );
};

export default ProjectErrorBoundary;
