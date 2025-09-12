import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Link } from "react-router";
import { TypographyH1 } from "../ui/typographyH1";
import { cn } from "../../lib/utils";
import { useScrolled } from "../../hooks/useIsScrolled";

const Header = () => {
  const isScrolled = useScrolled();

  return (
    <header
      className={cn(
        "flex items-center justify-between",
        "sticky top-0 z-50",
        "bg-background text-white",
        "px-6 py-3",
        "transition-all duration-300",
        isScrolled ? "shadow-md" : "shadow-none"
      )}
    >
      <Link className="flex items-center gap-2" to="/">
        <img
          src="/blue-cap-logo.svg"
          alt="Captain Planet logo"
          className="h-12"
        />
        <TypographyH1
          className={cn(
            "font-sansitaBoldItalic font-medium",
            "text-3xl text-left leading-none",
            "w-28"
          )}
        >
          Captain Planet
        </TypographyH1>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink>
              <Link to="/signup">S'inscrire</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink>
              <Link to="/signin">Se connecter</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Header;
