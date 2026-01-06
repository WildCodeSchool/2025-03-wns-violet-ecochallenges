import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useValidatedEcogesturesPagination } from "./useValidatedEcogesturesPagination";
import { useCallback, useEffect, useState } from "react";
import { TypographyH2 } from "@/components/ui/typographyH2";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import ValidatedEcogesturesCard from "./ValidatedEcogesturesCard";

const ITEM_PER_PAGE = 6;
const PRELOAD_THRESHOLD = 3;

function ValidatedEcogesturesTabletMobile() {
  const { allEcogestures, loading, totalCount, loadMore } =
    useValidatedEcogesturesPagination(ITEM_PER_PAGE);

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadMoreIfNeeded = useCallback(() => {
    const remainingItems = allEcogestures.length - currentIndex;

    if (
      remainingItems <= PRELOAD_THRESHOLD &&
      allEcogestures.length < totalCount &&
      !loading
    ) {
      loadMore();
    }
  }, [allEcogestures.length, currentIndex, totalCount, loading, loadMore]);

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };
    carouselApi.on("select", onSelect);
    onSelect();

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    loadMoreIfNeeded();
  }, [currentIndex, loadMoreIfNeeded]);
  if (allEcogestures.length === 0 && loading) {
    return (
      <div className="max-w-7xl m-auto flex pt-4 pb-12 flex-col items-center gap-6">
        <TypographyH2 className="text-white">
          Mes derniers écogestes validés
        </TypographyH2>
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <section className="max-w-[100vw] m-auto flex pt-4 pb-12 flex-col items-center gap-6">
      <TypographyH2 className="text-white">
        Mes derniers écogestes validés
      </TypographyH2>

      <Carousel
        setApi={setCarouselApi}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {allEcogestures.map((userEcogesture, index) => (
            <CarouselItem
              key={userEcogesture.id}
              className={cn(
                "transition-all duration-300",
                index === currentIndex
                  ? "scale-100 opacity-100"
                  : "scale-90 opacity-50"
              )}
            >
              <div className="flex justify-center">
                <ValidatedEcogesturesCard
                  id={userEcogesture.id}
                  ecogesture={userEcogesture.ecogesture}
                  level_validated={userEcogesture.level_validated}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
export default ValidatedEcogesturesTabletMobile;
