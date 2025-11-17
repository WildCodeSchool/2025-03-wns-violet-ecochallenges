import { TypographyH2 } from "@/components/ui/typographyH2";
import {
  useGetEcogesturesQuery,
  type Ecogesture,
} from "@/generated/graphql-types";
import EcogestureCard from "./EcogestureCard";
import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/ui/typographyP";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const ITEM_PER_PAGE = 3;

const EcogesturesDesktop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allEcogestures, setAllEcogestures] = useState<
    Array<Pick<Ecogesture, "id" | "label" | "pictureUrl">>
  >([]);

  const { data, loading } = useGetEcogesturesQuery({
    variables: {
      input: {
        page: currentPage,
        limit: ITEM_PER_PAGE,
      },
    },
  });

  useEffect(() => {
    if (data?.getEcogestures.ecogestures) {
      setAllEcogestures((prev) => [
        ...prev,

        // Filter to avoid duplicates when useEffect is triggered
        // (for exemple by navigating back)
        ...data.getEcogestures.ecogestures.filter(
          (ecogesture) => !prev.some((e) => e.id === ecogesture.id)
        ),
      ]);
    }
  }, [data]);

  const handleSeeMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl m-auto flex pt-4 pb-12 flex-col items-center gap-6">
      <TypographyH2 className="text-white">Les écogestes</TypographyH2>

      <div className="flex justify-center gap-4 xl:gap-14 flex-wrap">
        {allEcogestures.map((ecogesture) => (
          <EcogestureCard key={ecogesture.id} ecogesture={ecogesture} />
        ))}
      </div>

      {allEcogestures.length < (data?.getEcogestures.totalCount ?? 0) && (
        <Button
          variant="secondary"
          className={cn(
            "w-[200px]",
            loading && "opacity-50 pointer-events-none"
          )}
          onClick={handleSeeMore}
        >
          <TypographyP className="text-white">Voir plus</TypographyP>
        </Button>
      )}
    </div>
  );
};

export default EcogesturesDesktop;
