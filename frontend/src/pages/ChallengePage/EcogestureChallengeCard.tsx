import { Card, CardContent } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/typographyP";
import { cn } from "@/lib/utils";

function EcogestureChallengeCard() {
  return (
    <Card
      className={cn(
        "flex justify-around gap-4 min-h-[165px]",
        "bg-secondary-foreground w-80 py-3",
        "transition-transform duration-200 lg:hover:scale-105"
      )}
    >
      <CardContent className="text-center text-black">
        <TypographyP className="w-full p-1 mt-2 rounded-xl flex items-center justify-center gap-1">
          blabla
        </TypographyP>
      </CardContent>
    </Card>
  );
}

export default EcogestureChallengeCard;
