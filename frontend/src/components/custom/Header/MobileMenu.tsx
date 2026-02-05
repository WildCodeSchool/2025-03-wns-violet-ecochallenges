import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Card } from "@/components/ui/card";
import MenuLink from "./MenuLink";
import type { RefObject } from "react";
import {
  HouseIcon,
  LogInIcon,
  SquarePenIcon,
  UserRoundPenIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthMenuActions } from "./useAuthMenuActions";

const MobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  ref,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ref: RefObject<HTMLDivElement | null>;
}) => {
  const { isConnected, handleLogout } = useAuthMenuActions();

  return (
    <Card
      ref={ref}
      className={cn(
        "md:hidden overflow-hidden",
        "absolute top-full right-0 py-0",
        "bg-popover-foreground shadow-2xl",
        "rounded-t-none border-accent border-b-2",
        "transition-all duration-300 ease-in-out",
        "transform origin-top",
        isMenuOpen
          ? "opacity-100 scale-y-100 translate-y-0"
          : "opacity-0 scale-y-0 -translate-y-2"
      )}
    >
      <NavigationMenu className="text-background">
        <NavigationMenuList className="flex flex-col gap-0">
          {isConnected ? (
            <>
              <MenuLink to="/" Icon={HouseIcon} setIsMenuOpen={setIsMenuOpen}>
                Accueil
              </MenuLink>

              <MenuLink
                to="/dashboard"
                Icon={SquarePenIcon}
                setIsMenuOpen={setIsMenuOpen}
              >
                Mes challenges
              </MenuLink>

              <MenuLink
                to="/profile"
                Icon={UserRoundPenIcon}
                setIsMenuOpen={setIsMenuOpen}
              >
                Mon profil
              </MenuLink>

              <MenuLink
                to="/"
                Icon={LogInIcon}
                withDivider={false}
                setIsMenuOpen={setIsMenuOpen}
              >
                <Button variant="ghost" onClick={handleLogout} size="xs">
                  Se déconnecter
                </Button>
              </MenuLink>
            </>
          ) : (
            <>
              <MenuLink
                to="/signup"
                Icon={SquarePenIcon}
                setIsMenuOpen={setIsMenuOpen}
              >
                S'inscrire
              </MenuLink>

              <MenuLink
                to="/signin"
                Icon={LogInIcon}
                withDivider={false}
                setIsMenuOpen={setIsMenuOpen}
              >
                Se connecter
              </MenuLink>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </Card>
  );
};

export default MobileMenu;
