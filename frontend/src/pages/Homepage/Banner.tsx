import { Button } from "../../components/ui/Button";
import { TypographyH2 } from "../../components/ui/TypographyH2";
import crewPlanetLogo from "../../../public/crew-planet.png"

function Banner() {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4">
            {/* Contenu texte et boutons */}
            <div className="flex flex-col space-y-4 lg:flex-1">
                <TypographyH2>Lance ton challenge écolo !</TypographyH2>
                <p className="text-gray-600">
                    Crée un challenge, invite ton groupe et passe à l'action, un éco-geste à la fois.
                </p>
                <div className="flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-4">
                    <Button>S'inscrire</Button>
                    <Button className="bg-secondary">Se connecter</Button>
                </div>
            </div>
            
            <img 
                src={crewPlanetLogo} 
                alt="Crew Planet" 
                className="hidden lg:block lg:flex-1 lg:max-w-md lg:ml-8"
            />
        </div>
    );
}

export default Banner;