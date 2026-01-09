import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { useAuthMenuActions } from "./useAuthMenuActions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronUp, LogInIcon, UserIcon } from "lucide-react";
import { useRef, useState, type RefObject } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import MenuLink from "./MenuLink";
import { useOnClickOutside } from "usehooks-ts";
import { AvatarFallback } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";

const DesktopMenu = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { isConnected, handleLogout, userPictureUrl } = useAuthMenuActions();

  const activeLinkClass = "text-primary font-semibold";

  const userMenuRef = useRef<HTMLButtonElement>(null);
  const userMenuCardRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(
    [userMenuRef, userMenuCardRef] as RefObject<HTMLElement>[],
    () => setIsUserMenuOpen(false)
  );

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {isConnected ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : ""
                  }
                >
                  Accueil
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>
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
            <Button
              variant="ghost"
              className="hover:bg-transparent"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              ref={userMenuRef}
            >
              <Avatar>
                <AvatarImage src={userPictureUrl} />
                <AvatarFallback className="border border-white">
                  <Spinner className="w-4 h-4 text-white" />
                </AvatarFallback>
              </Avatar>
              <ChevronUp
                className={
                  isUserMenuOpen
                    ? "rotate-180 transition-transform"
                    : "transition-transform"
                }
              />
            </Button>
            <Card
              ref={userMenuCardRef}
              className={cn(
                "overflow-hidden",
                "absolute top-[3.7rem] -right-4 py-0",
                "bg-popover-foreground shadow-2xl",
                "rounded-t-none border-accent border-b-2",
                "transition-all duration-300 ease-in-out",
                "transform origin-top",
                isUserMenuOpen
                  ? "opacity-100 scale-y-100 translate-y-0"
                  : "opacity-0 scale-y-0 -translate-y-2"
              )}
            >
              <NavigationMenu className="text-background">
                <NavigationMenuList className="flex flex-col gap-0">
                  <MenuLink
                    to="/profile"
                    Icon={UserIcon}
                    setIsMenuOpen={setIsUserMenuOpen}
                  >
                    Mon profil
                  </MenuLink>
                  <MenuLink
                    to="/"
                    Icon={LogInIcon}
                    withDivider={false}
                    setIsMenuOpen={setIsUserMenuOpen}
                  >
                    <Button variant="ghost" onClick={handleLogout} size="xs">
                      Se déconnecter
                    </Button>
                  </MenuLink>
                </NavigationMenuList>
              </NavigationMenu>
            </Card>
          </>
        ) : (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink>
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
              <NavigationMenuLink>
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
