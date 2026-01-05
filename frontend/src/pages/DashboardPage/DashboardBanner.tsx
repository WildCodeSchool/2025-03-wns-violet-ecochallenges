import { cn } from "@/lib/utils";
import { TypographyH2 } from "@/components/ui/typographyH2";
import { TypographyP } from "@/components/ui/typographyP";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function DashboardBanner({ username }: { username: string }) {
  return (
    <div
      className={cn(
        "max-w-7xl mx-auto",
        "flex flex-col items-center justify-between sm:flex-row gap-8",
        "p-4 mt-8"
      )}
    >
      <div className={cn("flex flex-col")}>
        <TypographyH2 className="text-white">
          Bienvenue {username} !
        </TypographyH2>

        <TypographyP className="text-white">On passe à l'action ?</TypographyP>
      </div>
      <Link to="/new-challenge">
        <Button>Créer un challenge</Button>
      </Link>
    </div>
  );
}

export default DashboardBanner;
