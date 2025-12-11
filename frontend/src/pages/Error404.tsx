import { TypographyH1 } from "@/components/ui/typographyH1";
import { TypographyH2 } from "@/components/ui/typographyH2";
import { TypographyP } from "@/components/ui/typographyP";

const Error404 = () => (
  <div className="flex flex-col items-center justify-center gap-4 my-5 text-white">
    <TypographyH1>404</TypographyH1>
    <TypographyH2>Page non trouvée</TypographyH2>
    <TypographyP>La page que vous cherchez n'existe pas.</TypographyP>
    <img
      src="/404-image.png"
      alt="Crew Planet - Illustration challenge écologique"
    />
  </div>
);

export default Error404;
