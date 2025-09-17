import { cn } from "../../../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
} from "../../../ui/navigation-menu";
import { Card } from "../../../ui/card";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { GoSignIn } from "react-icons/go";
import MobileMenuLink from "./MobileMenuLink";
import type { RefObject } from "react";

const MobileMenu = ({
  isMenuOpen,
  ref,
}: {
  isMenuOpen: boolean;
  ref: RefObject<HTMLDivElement | null>;
}) => {
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
          <MobileMenuLink to="/signup" Icon={HiOutlinePencilSquare}>
            S'inscrire
          </MobileMenuLink>

          <MobileMenuLink to="/signin" Icon={GoSignIn} withDivider={false}>
            Se connecter
          </MobileMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
    </Card>
  );
};

export default MobileMenu;
