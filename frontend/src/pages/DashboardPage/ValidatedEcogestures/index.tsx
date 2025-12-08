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

    </section>
  );
}

export default ValidatedEcogestures;
