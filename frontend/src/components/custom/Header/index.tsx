import { cn } from "../../../lib/utils";
import { useScrolled } from "../../../hooks/useIsScrolled";
import { useRef, useState, type RefObject } from "react";
import MobileMenuButton from "./MobileMenuButton";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import LogoLink from "./LogoLink";
import { useOnClickOutside } from "usehooks-ts";

const Header = () => {
  const isScrolled = useScrolled();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside([menuRef, closeButtonRef] as RefObject<HTMLElement>[], () =>
    setIsMenuOpen(false)
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-10",
        "bg-background text-white",
        "transition-shadow duration-300",
        isScrolled || isMenuOpen ? "shadow-md" : "shadow-none"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between",
          "max-w-7xl px-4 py-3 m-auto"
        )}
      >
        <LogoLink />

        <MobileMenuButton
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          ref={closeButtonRef}
        />

        <DesktopMenu />
      </div>
      <MobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        ref={menuRef}
      />
    </header>
  );
};

export default Header;
