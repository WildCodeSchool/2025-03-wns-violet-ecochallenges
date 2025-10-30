import { cn } from "@/lib/utils";

interface ArrowProps {
  type: "curved" | "straight";
  direction?: "left" | "right";
  className?: string;
}

function Arrow({ type, className, direction }: ArrowProps) {
  if (type === "straight") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-[5rem] h-[4rem] text-white my-auto hidden lg:block"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
        />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:svgjs="http://svgjs.dev/svgjs"
      viewBox="0 0 800 800"
      className={cn(
        "h-[6rem] text-white font-bold",
        direction === "left" ? "transform scale-x-[-1]" : "",
        className
      )}
    >
      <g
        strokeWidth="9"
        stroke="hsl(174, 42%, 65%)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="matrix(0.766044443118978,0.6427876096865393,-0.6427876096865393,0.766044443118978,324.6972666270245,-163.532821122207)"
      >
        <path
          d="M181.3744659423828 273.27195739746094Q818.3744659423828 -20.728042602539062 527.3744659423828 619.2719573974609"
          markerEnd={`url(#SvgjsMarker${
            direction === "left" ? "2730" : "2729"
          })`}
        />
      </g>
      <defs>
        <marker
          markerWidth="7"
          markerHeight="7"
          refX="3.5"
          refY="3.5"
          viewBox="0 0 7 7"
          orient="auto"
          id={`SvgjsMarker${direction === "left" ? "2730" : "2729"}`}
        >
          <polyline
            points="0,3.5 3.5,1.75 0,0"
            fill="none"
            strokeWidth="1.1666666666666667"
            stroke="hsl(174, 42%, 65%)"
            strokeLinecap="round"
            transform="matrix(1,0,0,1,1.1666666666666667,1.75)"
            strokeLinejoin="round"
          />
        </marker>
      </defs>
    </svg>
  );
}

export default Arrow;
