import { cn } from "../../../lib/utils";
import { useScrolled } from "../../../hooks/useIsScrolled";
import { useEffect, useRef, useState } from "react";
import MobileMenuButton from "./MobileMenuButton";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import LogoLink from "./LogoLink";

const Header = () => {
  const isScrolled = useScrolled();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  //TODO: scroll at top when clicking on logo link

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (
        menuRef.current &&
        closeButtonRef.current &&
        target &&
        !menuRef.current.contains(target) &&
        !closeButtonRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-10",
        "transition-shadow duration-300",
        isScrolled || isMenuOpen ? "shadow-md" : "shadow-none"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between",
          "bg-background text-white",
          "max-w-7xl px-4 py-3 m-auto"
        )}
      >
        <LogoLink />

        <MobileMenuButton
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          buttonRef={closeButtonRef}
        />

        <DesktopMenu />
      </div>
      <MobileMenu isMenuOpen={isMenuOpen} menuRef={menuRef} />
    </header>
  );
};

export default Header;
