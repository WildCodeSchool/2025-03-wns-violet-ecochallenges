import { TypographyH2 } from "../../components/ui/typographyH2.tsx";
import ExplanationItem from "@/components/custom/ExplanationItem.tsx";

function Explanations() {
  return (
    <section className="font-urbanist md:bg-secondary py-8">
      <TypographyH2 className="text-white p-4 mb-8">
        Comment ça marche ?
      </TypographyH2>

      <div className="flex flex-col md:flex-row items-center  gap-4 md:gap-8 px-4">
        <ExplanationItem
          number={1}
          content={"Je crée un challenge"}
          display="left"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-[5rem] h-[4rem] text-white mt-auto hidden md:block "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.dev/svgjs"
          viewBox="0 0 800 800"
          className="h-[8rem] text-white mt-auto font-bold self-end absolute -right-2 top-[30rem] md:hidden"
        >
          <g
            stroke-width="9"
            stroke="hsl(174, 42%, 65%)"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(0.766044443118978,0.6427876096865393,-0.6427876096865393,0.766044443118978,324.6972666270245,-163.532821122207)"
          >
            <path
              d="M181.3744659423828 273.27195739746094Q818.3744659423828 -20.728042602539062 527.3744659423828 619.2719573974609 "
              marker-end="url(#SvgjsMarker2729)"
            ></path>
          </g>
          <defs>
            <marker
              markerWidth="7"
              markerHeight="7"
              refX="3.5"
              refY="3.5"
              viewBox="0 0 7 7"
              orient="auto"
              id="SvgjsMarker2729"
            >
              <polyline
                points="0,3.5 3.5,1.75 0,0"
                fill="none"
                stroke-width="1.1666666666666667"
                stroke="hsl(174, 42%, 65%)"
                stroke-linecap="round"
                transform="matrix(1,0,0,1,1.1666666666666667,1.75)"
                stroke-linejoin="round"
              ></polyline>
            </marker>
          </defs>
        </svg>

        <ExplanationItem
          number={2}
          content={"J'ajoute des éco-gestes"}
          display="left"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-[5rem] h-[4rem] text-white mt-auto hidden md:block "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.dev/svgjs"
          viewBox="0 0 800 800"
          className="h-[8rem] text-white mt-auto font-bold transform scale-x-[-1] origin-center self-start absolute -left-2 bottom-[15rem] md:hidden"
        >
          <g
            stroke-width="9"
            stroke="hsl(174, 42%, 65%)"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(0.766044443118978,0.6427876096865393,-0.6427876096865393,0.766044443118978,324.6972666270245,-163.532821122207)"
          >
            <path
              d="M181.3744659423828 273.27195739746094Q818.3744659423828 -20.728042602539062 527.3744659423828 619.2719573974609 "
              marker-end="url(#SvgjsMarker2729)"
            ></path>
          </g>
          <defs>
            <marker
              markerWidth="7"
              markerHeight="7"
              refX="3.5"
              refY="3.5"
              viewBox="0 0 7 7"
              orient="auto"
              id="SvgjsMarker2729"
            >
              <polyline
                points="0,3.5 3.5,1.75 0,0"
                fill="none"
                stroke-width="1.1666666666666667"
                stroke="hsl(174, 42%, 65%)"
                stroke-linecap="round"
                transform="matrix(1,0,0,1,1.1666666666666667,1.75)"
                stroke-linejoin="round"
              ></polyline>
            </marker>
          </defs>
        </svg>

        <ExplanationItem
          number={3}
          content={"J'invite mes amis"}
          display="left"
        />
      </div>
    </section>
  );
}

export default Explanations;
