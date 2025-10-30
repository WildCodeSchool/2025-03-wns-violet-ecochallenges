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
          "flex justify-around w-80",
          "bg-secondary-foreground",
          "transition-transform duration-200 hover:scale-105 hover:shadow-lg"
        )}
      >
        <CardHeader className="flex flex-col items-center">
          <img
            src={ecogesture.pictureUrl}
            alt={ecogesture.label}
            className="w-16 h-16"
          />
        </CardHeader>
        <CardContent className="text-center p-4">
          <TypographyP className="text-black">{ecogesture.label}</TypographyP>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EcogestureCard;
