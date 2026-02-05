import { TypographyH2 } from "@/components/ui/typographyH2";
import ValidatedEcogesturesCard from "./ValidatedEcogesturesCard";
import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/ui/typographyP";
import { cn } from "@/lib/utils";
import { useValidatedEcogesturesPagination } from "./useValidatedEcogesturesPagination";

const ITEM_PER_PAGE = 3;

function ValidatedEcogesturesDesktop() {
  const { allEcogestures, loading, loadMore, hasMore } =
    useValidatedEcogesturesPagination(ITEM_PER_PAGE);

  return (
    <section className="max-w-7xl m-auto flex pt-4 pb-12 flex-col gap-6">
      <TypographyH2 className="text-white p-4 mb-8">
        Mes derniers éco-gestes validés
      </TypographyH2>

      <div className="flex justify-center gap-4 xl:gap-14 flex-wrap">
        {allEcogestures.map((userEcogesture) => (
          <ValidatedEcogesturesCard
            key={userEcogesture.id}
            id={userEcogesture.id}
            ecogesture={userEcogesture.ecogesture}
            level_validated={userEcogesture.level_validated}
          />
        ))}
      </div>
      {hasMore && (
        <Button
          variant="secondary"
          className={cn(
            "w-[200px]",
            "self-center",
            loading && "opacity-50 pointer-events-none"
          )}
          onClick={loadMore}
        >
          <TypographyP className="text-white">Voir plus</TypographyP>
        </Button>
      )}
    </section>
  );
}

export default ValidatedEcogesturesDesktop;
