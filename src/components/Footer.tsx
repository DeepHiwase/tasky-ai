/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Footer component for the app
 */

// Custom Modules
import { cn } from "@/lib/utils";
// Components
import { Separator } from "@/components/ui/separator";
// Constants
import { SOCIAL_LINKS } from "@/constants";

const Footer = () => {
  return (
    <footer className="p-4 pb-0">
      <div
        className={cn(
          "container",
          "min-h-16",
          "py-4",
          "flex flex-col gap-3 items-center",
          "bg-background border border-b-0 rounded-t-xl",
          "lg:flex-row lg:justify-between",
        )}
      >
        <p className="text-sm text-center">&copy; 2025 deephiwase</p>

        <ul className="flex flex-wrap items-center">
          {SOCIAL_LINKS.map(({ href, label }, index) => (
            <li
              key={index}
              className="flex items-center"
            >
              <a
                href={href}
                className={cn(
                  "text-sm text-muted-foreground",
                  "hover:text-foreground",
                )}
                target="_blank"
              >
                {label}
              </a>

              {index !== SOCIAL_LINKS.length - 1 && (
                <Separator
                  orientation="vertical"
                  className={cn("mx-3", "h-3")}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
