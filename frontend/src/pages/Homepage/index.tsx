import Banner from "./Banner";
import EcogesturesDesktop from "./Ecogestures/EcogesturesDesktop";
import Explanations from "./Explanations";
import EcogesturesTabletMobile from "./Ecogestures/EcogesturesTabletMobile";
import { useMediaQuery } from "usehooks-ts";

function Homepage() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <Banner />
      <Explanations />

      {isDesktop ? <EcogesturesDesktop /> : <EcogesturesTabletMobile />}
    </>
  );
}

export default Homepage;
