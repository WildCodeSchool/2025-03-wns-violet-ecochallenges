import { TypographyH1 } from "@/components/ui/typographyH1";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { TypographyP } from "@/components/ui/typographyP";
import { TypographyH2 } from "@/components/ui/typographyH2";

function UnauthorizedPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 my-5 text-white">
      <TypographyH1>401</TypographyH1>
      <TypographyH2>Accès non autorisé</TypographyH2>
      <TypographyP>
        Vous devez être connecté pour accéder à cette page.
      </TypographyP>
      <div className="h-80 w-80">
        <img
          src="/401-image.png"
          alt="Crew Planet - Illustration challenge écologique"
        />
      </div>
      <Link to="/signin">
        <Button>Se connecter</Button>
      </Link>
    </section>
  );
}

export default UnauthorizedPage;
