import { TypographyH2 } from "../../components/ui/typographyH2.tsx";
import ExplanationItem from "@/pages/Explanations/ExplanationItem.tsx";
import Arrow from "@/pages/Explanations/Arrow.tsx";

function Explanations() {
  return (
    <section className="font-urbanist md:bg-secondary py-8 max-w-8xl m-auto">
      <TypographyH2 className="text-white p-4 mb-8">
        Comment ça marche ?
      </TypographyH2>

      <div className="flex flex-col lg:flex-row items-center lg:justify-center gap-4 lg:gap-8 px-4">
        <div className="relative">
          <ExplanationItem
            number={1}
            content={"Je crée un challenge"}
            displayDirection="left"
          />

          <Arrow
            type="curved"
            className="absolute -right-[4.3rem] top-5 lg:hidden"
            direction="right"
          />
        </div>
        <Arrow type="straight" className="hidden lg:block" />

        <div className="relative">
          <ExplanationItem
            number={2}
            content={"J'ajoute des éco-gestes"}
            displayDirection="left"
          />

          <Arrow
            type="curved"
            className="absolute -left-[4.3rem] top-[1rem] lg:hidden"
            direction="left"
          />
        </div>

        <Arrow type="straight" className="hidden lg:block" />

        <ExplanationItem
          number={3}
          content={"J'invite mes amis"}
          displayDirection="left"
        />
      </div>
    </section>
  );
}

export default Explanations;
