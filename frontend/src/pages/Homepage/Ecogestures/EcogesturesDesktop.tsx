import { TypographyH2 } from "@/components/ui/typographyH2";
import EcogestureCard from "./EcogestureCard";
import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/ui/typographyP";
import { cn } from "@/lib/utils";
import { useEcogesturesPagination } from "@/pages/Homepage/Ecogestures/useEcogesturesPagination";

const ITEM_PER_PAGE = 3;

const EcogesturesDesktop = () => {
  const { allEcogestures, loading, loadMore, hasMore } =
    useEcogesturesPagination(ITEM_PER_PAGE);

  return (
    <div className="max-w-7xl m-auto flex pt-4 pb-12 flex-col items-center gap-6">
      <TypographyH2 className="text-white">Les écogestes</TypographyH2>

      <div className="flex justify-center gap-4 xl:gap-14 flex-wrap">
        {allEcogestures.map((ecogesture) => (
          <EcogestureCard key={ecogesture.id} ecogesture={ecogesture} />
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
    </div>
  );
};

export default EcogesturesDesktop;
