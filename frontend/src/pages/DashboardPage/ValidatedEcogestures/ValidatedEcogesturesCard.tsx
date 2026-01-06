import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/typographyP";
import { cn } from "@/lib/utils";

export type ValidatedEcogesturesCardProps = {
  id: number;
  ecogesture: {
    id: number;
    label: string;
    pictureUrl: string;
  };
  level_validated: number;
};

function ValidatedEcogesturesCard({
  ecogesture,
  level_validated,
}: ValidatedEcogesturesCardProps) {
  if(!ecogesture) {
    console.error("Ecogesture data is missing");
    return null;
  }
  return (
    <Card
      className={cn(
        "flex justify-around gap-4 min-h-[165px]",
        "bg-secondary-foreground w-80 py-3",
        "transition-transform duration-200 lg:hover:scale-105"
      )}
    >
      <CardHeader className="flex flex-col items-center">
        <img
          src={ecogesture.pictureUrl}
          alt={ecogesture.label}
          className="w-16 h-16"
        />
      </CardHeader>
      <CardContent className="text-center text-black">
        <TypographyP>{ecogesture.label}</TypographyP>
        <TypographyP className="bg-white w-full p-1 mt-2 rounded-xl">
          Niveau {level_validated} validé
        </TypographyP>
      </CardContent>
    </Card>
  );
}

export default ValidatedEcogesturesCard;
