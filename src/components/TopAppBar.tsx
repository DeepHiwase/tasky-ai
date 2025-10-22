/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Top App Bar component for the app
 */

// Components
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Kbd from "@/components/Kbd";

const TopAppBar = () => {
  return (
    <div className="">
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger />
        </TooltipTrigger>

        <TooltipContent className="flex items-center justify-between">
          <p>Tooltip sidebar</p>

          <Kbd KbdList={["Ctrl", "B"]} />
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default TopAppBar;
