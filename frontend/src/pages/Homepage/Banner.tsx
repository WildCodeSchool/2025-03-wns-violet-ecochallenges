import { Button } from "../../components/ui/button";
import { TypographyH2 } from "../../components/ui/typographyH2";
import { TypographyP } from "../../components/ui/typographyP";
import { Link } from "react-router";
import { cn } from "../../lib/utils";

function Banner() {
  return (
    <div 
      className={cn(
        "flex flex-col",
        "lg:flex-row",
        "lg:items-center",
        "lg:justify-between",
        "p-4",
        "lg:p-8"
        )}
      >
      <div className={cn("flex",
        "flex-col",
        "space-y-4",
        "lg:flex-1"
        )}
        >
        <TypographyH2>Lance ton challenge écolo !</TypographyH2>
        
        <TypographyP>
          Crée un challenge, invite ton groupe et passe à l'action, un éco-geste à la fois.
        </TypographyP>
        
        <div className={cn(
          "flex",
          "flex-col",
          "items-center",
          "space-y-3",
          "sm:flex-row",
          "sm:justify-center",
          "sm:space-y-0",
          "sm:gap-5",
          "lg:justify-start"
        )}
        >
          <Button asChild className={(
            "w-[200px]"
            )}
            >
            <Link to="/signin">S'inscrire</Link>
          </Button>

          <Button asChild variant="secondary" className={cn(
            "w-[200px]"
            )}>
            <Link to="/signup">Se connecter</Link>
          </Button>
        </div>
      </div>
      
      <img 
        src="/crew-planet.png" 
        alt="Crew Planet - Illustration challenge écologique" 
        className={cn(
          "hidden", 
          "lg:block", 
          "w-[150px]",
          "h-auto", 
          "ml-8"
        )}
      />
    </div>
  );
}

export default Banner;