import { Button } from "../../components/ui/Button";
import { TypographyH2 } from "../../components/ui/typographyH2";
import { TypographyP } from "../../components/ui/TypographyP";
import { Link } from "react-router";
import crewPlanetLogo from "../../../public/crew-planet.png"

function Banner() {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 lg:p-8">

            <div className="flex flex-col space-y-4 lg:flex-1">
                <TypographyH2>Lance ton challenge écolo !</TypographyH2>
                <TypographyP>
                    Crée un challenge, invite ton groupe et passe à l'action, un éco-geste à la fois.
                </TypographyP>
                <div className="flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:gap-5 lg:w-full">
                    <Link to="#" className="lg:flex-1">
                        <Button className="w-full lg:flex-1">S'inscrire</Button>
                    </Link>
                    <Link to="#" className="lg:flex-1">
                        <Button className="bg-secondary text-white w-full lg:flex-1">Se connecter</Button>
                    </Link>
                </div>
            </div>
            
            <img 
                src={crewPlanetLogo} 
                alt="Crew Planet Logo" 
                className="hidden lg:block lg:flex-1 lg:max-w-md lg:ml-8"
            />
        </div>
    );
}

export default Banner;