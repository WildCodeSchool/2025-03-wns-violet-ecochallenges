import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/typographyP";
import type { Ecogesture } from "@/generated/graphql-types";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

type EcogestureProps = {
  ecogesture: Pick<Ecogesture, "id" | "label" | "pictureUrl">;
};

const EcogestureCard = ({ ecogesture }: EcogestureProps) => {
  return (
    <Link to={`/ecogestures/${ecogesture.id}`} className="flex">
      <Card
        className={cn(
          "flex justify-around gap-4",
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
        <CardContent className="text-center">
          <TypographyP className="text-black">{ecogesture.label}</TypographyP>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EcogestureCard;
