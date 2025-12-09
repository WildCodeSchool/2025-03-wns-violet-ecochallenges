import { TypographyH2 } from "@/components/ui/typographyH2";
import EcogestureCard from "./EcogestureCard";
import { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEcogesturesPagination } from "@/pages/HomePage/Ecogestures/useEcogesturesPagination";
import Autoplay from "embla-carousel-autoplay";

const ITEM_PER_PAGE = 6;
const PRELOAD_THRESHOLD = 3;

const EcogesturesTabletMobile = () => {
  const { allEcogestures, loading, totalCount, loadMore } =
    useEcogesturesPagination(ITEM_PER_PAGE);

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Progressive loading management.
  // Use useCallback to avoid recreating loadMoreIfNeeded on each render
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

  // Slide change listener
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

  // Load more items when needed
  useEffect(() => {
    loadMoreIfNeeded();
  }, [currentIndex, loadMoreIfNeeded]);

  if (allEcogestures.length === 0 && loading) {
    return (
      <div className="max-w-7xl m-auto flex pt-4 pb-12 flex-col items-center gap-6">
        <TypographyH2 className="text-white">Les écogestes</TypographyH2>
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="max-w-[100vw] m-auto flex pt-4 pb-12 flex-col items-center gap-6">
      <TypographyH2 className="text-white">Les écogestes</TypographyH2>

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
          {allEcogestures.map((ecogesture, index) => (
            <CarouselItem
              key={ecogesture.id}
              className={cn(
                "transition-all duration-300",
                index === currentIndex
                  ? "scale-100 opacity-100"
                  : "scale-90 opacity-50"
              )}
            >
              <div className="flex justify-center">
                <EcogestureCard ecogesture={ecogesture} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default EcogesturesTabletMobile;
