import { Button } from "../../components/ui/button";
import { TypographyH2 } from "../../components/ui/typographyH2";
import { TypographyP } from "../../components/ui/typographyP";
import { Link } from "react-router";
import { cn } from "../../lib/utils";

function Banner() {
  return (
    <div
      className={cn(
        "w-full max-w-7xl mx-auto",
        "flex flex-col lg:flex-row lg:items-center lg:justify-between",
        "p-4 lg:p-8"
      )}
    >
      <div className={cn("flex flex-col lg:flex-1 space-y-4")}>
        <TypographyH2 className="text-white">
          Lance ton challenge écolo !
        </TypographyH2>

        <TypographyP className="text-white">
          Crée un challenge, invite ton groupe et passe à l'action, un éco-geste
          à la fois.
        </TypographyP>

        <div
          className={cn(
            "flex flex-col items-center space-y-3 sm:flex-row sm:justify-center sm:space-y-0 lg:justify-start",
            "sm:gap-5"
          )}
        >
          <Button asChild className="w-[200px]">
            <Link to="/signup">S'inscrire</Link>
          </Button>

          <Button asChild variant="secondary" className="w-[200px]">
            <Link to="/signin">Se connecter</Link>
          </Button>
        </div>
      </div>

      <img
        src="/crew-planet.png"
        alt="Crew Planet - Illustration challenge écologique"
        className={cn("hidden", "lg:block lg:flex-1", "lg:max-w-md lg:ml-8")}
      />
    </div>
  );
}

export default Banner;
