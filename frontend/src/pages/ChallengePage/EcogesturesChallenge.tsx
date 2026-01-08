import { TypographyH2 } from "@/components/ui/typographyH2";
import EcogestureChallengeCard from "./EcogestureChallengeCard";

function EcogesturesChallenge() {
  return (
    <section className="max-w-7xl m-auto flex pt-4 pb-12 flex-col gap-6">
      <TypographyH2 className="text-white">Les écogestes</TypographyH2>

      <EcogestureChallengeCard />
    </section>
  );
}

export default EcogesturesChallenge;
