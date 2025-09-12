import { Button } from "../../components/ui/Button";
import { TypographyH2 } from "../../components/ui/typographyH2";
import { TypographyP } from "../../components/ui/TypographyP";
import { Link } from "react-router";

function Banner() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 lg:p-8">
      {/* Section contenu principal */}
      <div className="flex flex-col space-y-4 lg:flex-1">
        <TypographyH2>Lance ton challenge écolo !</TypographyH2>
        
        <TypographyP>
          Crée un challenge, invite ton groupe et passe à l'action, un éco-geste à la fois.
        </TypographyP>
        
        {/* Section boutons d'action */}
        <div className="flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:gap-5 lg:w-full">
          {/* //TODO Définir la route "Signup" */}
          <Link to="#" className="lg:flex-1">
            <Button className="w-full">S'inscrire</Button>
          </Link>

          {/* //TODO Définir la route "Signin" */}
          <Link to="#" className="lg:flex-1">
            <Button variant="secondary" className="w-full text-secondary-foreground">
              Se connecter
            </Button>
          </Link>
        </div>
        
      </div>
      
      {/* Image visible uniquement sur desktop */}
      <img 
        src="/crew-planet.png" 
        alt="Crew Planet - Illustration challenge écologique" 
        className="hidden lg:block lg:flex-1 lg:max-w-md lg:ml-8"
      />
    </div>
  );
}

export default Banner;