import { useRef, useEffect, useState } from "react";
import { TypographyH2 } from "@/components/ui/typographyH2";
import {
  useGetEcogesturesQuery,
  type Ecogesture,
} from "@/generated/graphql-types";
import EcogestureCard from "./EcogestureCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const ITEM_PER_BATCH = 5;

const EcogesturesTabletMobile = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [allEcogestures, setAllEcogestures] = useState<
    Array<Pick<Ecogesture, "id" | "label" | "pictureUrl">>
  >([]);

  const { data } = useGetEcogesturesQuery({
    variables: {
      input: {
        page: currentPage,
        limit: ITEM_PER_BATCH,
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

  return (
    <div className="flex pt-4 pb-12 flex-col items-center gap-6">
      <TypographyH2 className="text-white">Les écogestes</TypographyH2>
      <Carousel className="w-full">
        <CarouselContent className="-ml-[250px]">
          {[...allEcogestures].map((ecogesture: any) => (
            <CarouselItem
              key={ecogesture.id}
              className="flex justify-center basis-1/3 pl-[250px]"
            >
              <EcogestureCard ecogesture={ecogesture} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
export default EcogesturesTabletMobile;
