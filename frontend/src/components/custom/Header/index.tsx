import { Link } from "react-router";
import { TypographyH1 } from "../../ui/typographyH1";
import { cn } from "../../../lib/utils";
import { useScrolled } from "../../../hooks/useIsScrolled";
import { useState } from "react";
import MobileMenuButton from "./MobileMenuButton";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const isScrolled = useScrolled();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={cn("max-w-7xl mx-auto", "sticky top-0 z-50")}>
      <div
        className={cn(
          "flex items-center justify-between",
          "bg-background text-white",
          "px-4 py-3",
          "transition-shadow duration-300",
          isScrolled ? "shadow-md" : "shadow-none"
        )}
      >
        <Link className="flex items-center gap-2" to="/">
          <img
            src="/blue-cap-logo.svg"
            alt="Captain Planet logo"
            className="h-8 md:h-12"
          />
          <TypographyH1
            className={cn(
              "font-sansitaBoldItalic font-medium",
              "text-xl md:text-3xl text-left leading-none",
              "w-20 md:w-28"
            )}
          >
            Captain Planet
          </TypographyH1>
        </Link>

        <MobileMenuButton
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

        <DesktopMenu />

        {isMenuOpen && <MobileMenu isMenuOpen={isMenuOpen} />}
      </div>
    </header>
  );
};

export default Header;
