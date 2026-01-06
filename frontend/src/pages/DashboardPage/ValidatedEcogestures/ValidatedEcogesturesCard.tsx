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
  if (!ecogesture) return null;

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-award-icon lucide-award"
          >
            <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
            <circle cx="12" cy="8" r="6" />
          </svg>
          Niveau {level_validated} validé
        </TypographyP>
      </CardContent>
    </Card>
  );
}

export default ValidatedEcogesturesCard;
