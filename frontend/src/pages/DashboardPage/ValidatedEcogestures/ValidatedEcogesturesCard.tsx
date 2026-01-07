import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/typographyP";
import { cn } from "@/lib/utils";
import { Award } from "lucide-react";

export type ValidatedEcogesturesCardProps = {
  id: number;
  ecogesture: {
    id: number;
    label: string;
    pictureUrl: string;
  };
  level_validated: number;
};

const calculatePoints = (level: number) => {
  switch (level) {
    case 1:
      return 50;
    case 2:
      return 100;
    case 3:
      return 150;
    default:
      return 0;
  }
};

function ValidatedEcogestureCard({
  ecogesture,
  level_validated,
}: ValidatedEcogesturesCardProps) {
  if (!ecogesture) return null;

  const points = calculatePoints(level_validated);

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
        <TypographyP className="bg-white w-full p-1 mt-2 rounded-xl flex items-center justify-center gap-1">
          <Award />
          Niveau {level_validated} validé
          <span className="font-bold ml-3"> {points} points</span>
        </TypographyP>
      </CardContent>
    </Card>
  );
}

export default ValidatedEcogestureCard;
