import { Card, CardContent } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/typographyP";
import { useGetEcogesturesQuery } from "@/generated/graphql-types";
import { cn } from "@/lib/utils";

function EcogestureChallengeCard() {
  const { data, loading, error } = useGetEcogesturesQuery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.getEcogestures.ecogestures.map((ecogesture) => (
        <Card
          className={cn(
            "flex justify-around gap-4 min-h-[165px]",
            "bg-secondary-foreground w-80 py-3",
            "transition-transform duration-200 lg:hover:scale-105"
          )}
          key={ecogesture.id}
        >
          <CardContent className="text-center text-black">
            <TypographyP className="w-full p-1 mt-2 rounded-xl flex items-center justify-center gap-1">
              {ecogesture.label}
            </TypographyP>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default EcogestureChallengeCard;
