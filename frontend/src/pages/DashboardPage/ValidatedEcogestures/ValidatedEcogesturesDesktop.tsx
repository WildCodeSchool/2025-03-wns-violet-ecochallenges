import { TypographyH2 } from "@/components/ui/typographyH2";
import { useGetValidatedEcogesturesQuery } from "@/generated/graphql-types";
import ValidatedEcogesturesCard from "./ValidatedEcogesturesCard";
import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/ui/typographyP";
import { cn } from "@/lib/utils";

const ITEM_PER_PAGE = 3;

function ValidatedEcogesturesDesktop() {
  const { allEcogestures, loading, loadMore, hasMore } =
    useGetValidatedEcogesturesQuery(ITEM_PER_PAGE);

  console.log("allEcogestures ============ ", allEcogestures);

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
