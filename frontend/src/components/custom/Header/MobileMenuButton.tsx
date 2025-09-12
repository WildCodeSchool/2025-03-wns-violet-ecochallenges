import { cn } from "../../../lib/utils";

const MobileMenuButton = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}) => {
  return (
    <button
      className="md:hidden flex flex-col gap-1 p-2"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Toggle menu"
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
    </button>
  );
};

export default MobileMenuButton;
