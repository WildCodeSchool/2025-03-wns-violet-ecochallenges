import Banner from "./Banner";
import EcogesturesDesktop from "./Ecogestures/EcogesturesDesktop";
import Explanations from "./Explanations";
import EcogesturesTabletMobile from "./Ecogestures/EcogesturesTabletMobile";
import { useMediaQuery } from "usehooks-ts";
import { cn, HEADER_FOOTER_HEIGHT } from "@/lib/utils";

function Homepage() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section className={cn(`min-h-[calc(100vh-${HEADER_FOOTER_HEIGHT}px)]`)}>
      <Banner />
      <Explanations />

      {isDesktop ? <EcogesturesDesktop /> : <EcogesturesTabletMobile />}
    </section>
  );
}

export default Homepage;
