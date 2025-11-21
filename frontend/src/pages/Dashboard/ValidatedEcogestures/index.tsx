import { Card } from "@/components/ui/card";
import { TypographyH2 } from "@/components/ui/typographyH2";
import { cn } from "@/lib/utils";

function ValidatedEcogestures() {
  return (
    <section className="container mx-auto w-full max-w-7xl text-white">
      <TypographyH2 className="text-white p-4 mb-8">
        Mes derniers éco-gestes validés
      </TypographyH2>
      <Card
        className={cn(
          "flex justify-around gap-4 min-h-[165px]",
          "bg-secondary-foreground w-80 py-3",
          "transition-transform duration-200 lg:hover:scale-105"
        )}
      ></Card>
      {/* TODO Pour avoir "les écogestes validés par un user", il faudrait
      normalement une table qui track la validation individuelle d'un écogesture
      par un user (genre UserEcogestureProgress ou ValidatedEcogesture avec
      id_user, id_ecogesture, level_validated, validated_at...). Ma question
      pour toi : Est-ce qu'il existe une autre table que je ne vois pas sur ce
      schéma ? Ou est-ce que la logique métier considère qu'un user a "validé"
      tous les écogestures des challenges auxquels il participe (via is_invited
      avec is_accepted = true) ? */}
    </section>
  );
}

export default ValidatedEcogestures;
