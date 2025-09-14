import type { RefObject } from "react";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";

const MobileMenuButton = ({
  isMenuOpen,
  setIsMenuOpen,
  ref,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  ref: RefObject<HTMLButtonElement | null>;
}) => {
  return (
    <Button
      className={cn(
        "md:hidden",
        "bg-inherit hover:bg-inherit",
        "flex flex-col gap-1 p-2"
      )}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Toggle menu"
      ref={ref}
    >
      <span
        className={cn(
          "h-0.5 w-6 bg-white transition-all",
          isMenuOpen && "rotate-45 translate-y-1.5"
        )}
      />
      <span
        className={cn(
          "h-0.5 w-6 bg-white transition-all",
          isMenuOpen && "opacity-0"
        )}
      />
      <span
        className={cn(
          "h-0.5 w-6 bg-white transition-all",
          isMenuOpen && "-rotate-45 -translate-y-1.5"
        )}
      />
    </Button>
  );
};

export default MobileMenuButton;
