import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { useAuthMenuActions } from "./useAuthMenuActions";

const DesktopMenu = () => {
  const { isConnected, handleLogout } = useAuthMenuActions();

  const activeLinkClass = "text-primary font-semibold";

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {isConnected ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : ""
                  }
                >
                  Mes challenges
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>
                <Button variant="ghost" onClick={handleLogout} size="xs">
                  Se déconnecter
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : ""
                  }
                >
                  S'inscrire
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : ""
                  }
                >
                  Se connecter
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default DesktopMenu;
