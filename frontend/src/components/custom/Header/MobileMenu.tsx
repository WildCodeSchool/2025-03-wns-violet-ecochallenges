import { Link } from "react-router";
import { cn } from "../../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../ui/navigation-menu";

const MobileMenu = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  return (
    <div
      className={cn(
        "md:hidden",
        "absolute top-full right-0",
        isMenuOpen ? "block" : "hidden"
      )}
    >
      <NavigationMenu className="bg-background border-t border-gray-300/20">
        <NavigationMenuList className="flex flex-col items-center space-y-2 p-4">
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
    </div>
  );
};

export default MobileMenu;
