import { TypographyH2 } from "@/components/ui/typographyH2";
import EcogestureChallengeCard from "./EcogestureChallengeCard";
import type { UserEcogesture } from "@/generated/graphql-types";

interface Ecogesture {
  id: number;
  label: string;
  description: string;
  pictureUrl: string;
}

interface EcogesturesChallengeProps {
  ecogestures: Ecogesture[];
  userEcogestures: UserEcogesture[];
  challengeId: number;
}

function EcogesturesChallenge({
  ecogestures,
  userEcogestures,
  challengeId,
}: EcogesturesChallengeProps) {
  return (
    <section className="flex flex-col gap-6">
      <TypographyH2 className="text-white">Les écogestes</TypographyH2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ecogestures.map((ecogesture) => (
          <EcogestureChallengeCard
            key={ecogesture.id}
            ecogesture={ecogesture}
            userEcogestures={userEcogestures}
            challengeId={challengeId}
          />
        ))}
      </div>
    </section>
  );
}

export default EcogesturesChallenge;
