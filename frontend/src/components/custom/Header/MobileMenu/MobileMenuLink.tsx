import { Link } from "react-router";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "../../../ui/navigation-menu";
import { TypographyP } from "../../../ui/typographyP";
import { cn } from "../../../../lib/utils";

const MobileMenuLink = ({
  to,
  children,
  Icon,
  withDivider = true,
}: {
  to: string;
  children: string;
  Icon: React.ElementType;
  withDivider?: boolean;
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
          <Link to={to}>
            <Icon className="text-background group-hover/icon:text-white" />
            <TypographyP>{children}</TypographyP>
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </>
  );
};

export default MobileMenuLink;
