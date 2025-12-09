import { TypographyH1 } from "@/components/ui/typographyH1";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function UnauthorizedPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <TypographyH1>401 - Non autorisé</TypographyH1>
      <p className="text-lg text-center max-w-md">
        Vous devez être connecté pour accéder à cette page.
      </p>
      <Link to="/signin">
        <Button>Se connecter</Button>
      </Link>
    </section>
  );
}

export default UnauthorizedPage;
