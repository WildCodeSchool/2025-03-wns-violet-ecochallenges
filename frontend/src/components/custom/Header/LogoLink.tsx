import { Link } from "react-router";
import { TypographyH1 } from "../../ui/typographyH1";
import { cn } from "../../../lib/utils";

const LogoLink = () => {
  return (
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
  );
};

export default LogoLink;
