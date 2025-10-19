/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Logo component for the app
 */

// Custom Modules
import { cn } from "@/lib/utils";
// Assets
import { logo } from "@/assets";

const Logo = () => {
  return (
    <div className={cn("flex items-center gap-3", "font-semibold text-lg")}>
      <img
        src={logo}
        alt="Tasky AI"
        className="size-6"
      />
      Tasky AI
    </div>
  );
};

export default Logo;
