/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Header component for the app
 */

// Node Modules
import { Link } from "react-router";
// Custom Modules
import { cn } from "@/lib/utils";
// Components
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className={cn("fixed top-0 left-0", "p-4", "w-full")}>
      <div
        className={cn(
          "container",
          "h-16",
          "flex justify-between items-center",
          "border backdrop-blur-3xl rounded-xl",
        )}
      >
        <Link to="/">
          <Logo />
        </Link>

        <div className={cn("flex items-center gap-2")}>
          <Button
            asChild
            variant="ghost"
          >
            <Link to="/login">Sign in</Link>
          </Button>

          <Button asChild>
            <Link to="/register">Start for free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
