import { Link } from "react-router";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "../../../ui/navigation-menu";
import { TypographyP } from "../../../ui/typographyP";
import { cn } from "../../../../lib/utils";
import { Button } from "@/components/ui/button";

const MobileMenuLink = ({
  to,
  children,
  Icon,
  withDivider = true,
  setIsMenuOpen,
}: {
  to: string;
  children: string;
  Icon: React.ElementType;
  withDivider?: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <NavigationMenuItem className="w-full">
        <NavigationMenuLink
          asChild
          className={cn(
            "group/icon",
            "flex flex-row gap-6 items-center justify-between",
            "px-8",
            "border-b-accent rounded-none",
            withDivider ? "border-b" : "border-b-0"
          )}
        >
          <Button
            asChild
            className="bg-transparent"
            onClick={() => setIsMenuOpen(false)}
          >
            <Link to={to}>
              <Icon className="text-background group-hover/icon:text-white" />
              <TypographyP>{children}</TypographyP>
            </Link>
          </Button>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </>
  );
};

export default MobileMenuLink;
