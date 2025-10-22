/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Keyboard component for the app
 */

// Custom Modules
import { cn } from "@/lib/utils";

type KbdProps = {
  KbdList: string[];
};

const Kbd: React.FC<KbdProps> = ({ KbdList }) => {
  return (
    <div className="space-x-1">
      <span className="sr-only">Key shortcut is, </span>

      {KbdList.map((item, index) => (
        <kbd
          key={index}
          className={cn(
            "px-1 py-0.5",
            "inline-block bg-background/10 rounded-full",
          )}
        >
          {item}
        </kbd>
      ))}
    </div>
  );
};

export default Kbd;
