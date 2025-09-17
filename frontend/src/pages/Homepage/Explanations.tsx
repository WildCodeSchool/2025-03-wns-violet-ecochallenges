import { useEffect, useState } from "react";
import { TypographyH2 } from "../../components/ui/typographyH2.tsx";
import {
  Card,
  CardContent,
  CardDescription,
} from "../../components/ui/card.tsx";

function Explanations() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleScreenType = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleScreenType();
    window.addEventListener("resize", handleScreenType);
    return () => window.removeEventListener("resize", handleScreenType);
  });

  return (
    <main className="font-urbanist md:bg-secondary max-h-xl">
      <TypographyH2 className="text-white p-4">
        Comment ça marche ?
      </TypographyH2>

      <div className="md:flex flex-row justify-center">
        <div className="mt-8">
          <Card className="bg-secondary-foreground text-black flex items-center gap-4 p-4 max-w-xs mx-auto">
            <CardDescription className="rounded-full text-black bg-white w-10 h-10 flex items-center justify-center text-lg font-bold">
              1
            </CardDescription>
            <CardContent className="p-0">Je crée un challenge</CardContent>
          </Card>
        </div>

        {isDesktop ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-[5rem] h-[4rem] text-white mt-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        ) : (
          <svg
            width="45"
            height="45"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary flex justify-self-end items-center m-4"
          >
            <path
              d="M5 15H4L0 11L4 7H5V10H11C12.6569 10 14 8.65685 14 7C14 5.34315 12.6569 4 11 4H4V2H11C13.7614 2 16 4.23858 16 7C16 9.76142 13.7614 12 11 12H5V15Z"
              fill="currentColor"
            />
          </svg>
        )}

        <div className="mt-8">
          <Card className="bg-secondary-foreground text-black flex items-center gap-4 p-4 max-w-xs mx-auto">
            <CardContent className="p-0">J'ajoute des éco-gestes</CardContent>
            <CardDescription className="rounded-full text-black bg-white w-10 h-10 flex items-center justify-center text-lg font-bold">
              2
            </CardDescription>
          </Card>
        </div>
        {isDesktop ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-[5rem] h-[4rem] text-white mt-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        ) : (
          <svg
            width="45"
            height="45"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary flex justify-end items-center m-4"
          >
            <path
              d="M11 15H12L16 11L12 7H11V10H5C3.34315 10 2 8.65685 2 7C2 5.34315 3.34315 4 5 4H12V2H5C2.23858 2 0 4.23858 0 7C0 9.76142 2.23858 12 5 12H11V15Z"
              fill="currentColor"
            />
          </svg>
        )}

        <div className="mt-8">
          <Card className="bg-secondary-foreground text-black flex items-center gap-4 p-4 max-w-xs mx-auto">
            <CardDescription className="rounded-full text-black bg-white w-10 h-10 flex items-center justify-center text-lg font-bold">
              3
            </CardDescription>
            <CardContent className="p-0">J'invite des amis</CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default Explanations;
