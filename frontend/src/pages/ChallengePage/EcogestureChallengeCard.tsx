import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typographyH3";
import { TypographyP } from "@/components/ui/typographyP";
import { VALIDATE_ECOGESTURE } from "@/graphql/queries/validateEcogesture";
import { cn } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { type GetValidatedEcogesturesQuery } from "@/generated/graphql-types";

interface Ecogesture {
  id: number;
  label: string;
  description: string;
  pictureUrl: string;
  level1Expectation?: string;
  level2Expectation?: string;
  level3Expectation?: string;
}

type UserEcogesture =
  GetValidatedEcogesturesQuery["getValidatedEcogestures"]["userEcogestures"][number];

interface EcogestureChallengeCardProps {
  ecogesture: Ecogesture;
  userEcogestures: UserEcogesture[];
  challengeId: number;
}

function EcogestureChallengeCard({
  ecogesture,
  userEcogestures = [],
  challengeId,
}: EcogestureChallengeCardProps) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [loading, setLoading] = useState(false);

  const [validateEcogesture] = useMutation(VALIDATE_ECOGESTURE, {
    refetchQueries: ["GetValidatedEcogestures"],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      setCurrentLevel(data.validateEcogesture.level_validated);
      setLoading(false);
    },
    onError: (error) => {
      console.error("Erreur lors de la validation de l'écogeste: ", error);
      setLoading(false);
    },
  });

  useEffect(() => {
    if (userEcogestures && userEcogestures.length > 0) {
      const userEcogesture = userEcogestures.find(
        (userEco) =>
          userEco.ecogesture.id === ecogesture.id &&
          userEco.challenge?.id === challengeId,
      );

      if (userEcogesture) {
        setCurrentLevel(userEcogesture.level_validated);
      } else {
        setCurrentLevel(0);
      }
    }
  }, [userEcogestures, ecogesture.id, challengeId]);

  const handleValidate = () => {
    const nexLevel = currentLevel + 1;
    if (nexLevel <= 3) {
      setLoading(true);
      validateEcogesture({
        variables: {
          ecogestureId: ecogesture.id,
          level_validated: nexLevel,
          challengeId: challengeId,
        },
      });
    }
  };

  const nextLevel = currentLevel + 1;
  const isCompleted = currentLevel === 3;

  return (
    <Card
      className={cn(
        "flex justify-around gap-4 min-h-[165px]",
        "bg-secondary-foreground w-80 py-3",
      )}
    >
      <img
        src={ecogesture.pictureUrl}
        alt={ecogesture.label}
        className="h-[8rem]"
      />
      {currentLevel > 0 && (
        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
        </div>
      )}
      <CardContent className="p-4">
        <TypographyH3 className="mb-2 text-black">
          {ecogesture.label}
        </TypographyH3>
        <TypographyP className="text-sm text-black p-4">
          {ecogesture.description}
        </TypographyP>
        <div className="space-y-3 mb-4">
          <div>
            <TypographyP
              className={cn(
                "text-sm font-semibold mb-1 text-black",
                `${currentLevel >= 1 ? "text-green-600" : "text-black"}`,
              )}
            >
              Niveau 1 {currentLevel >= 1 && "✓"}
            </TypographyP>
            <TypographyP className="text-xs text-gray-600">
              {ecogesture.level1Expectation}
            </TypographyP>
          </div>

          <div>
            <TypographyP
              className={cn(
                "text-sm font-semibold mb-1 text-black",
                `${currentLevel >= 2 ? "text-green-600" : "text-black"}`,
              )}
            >
              Niveau 2 {currentLevel >= 2 && "✓"}
            </TypographyP>
            <TypographyP className="text-xs text-gray-600">
              {ecogesture.level2Expectation}
            </TypographyP>
          </div>

          <div>
            <TypographyP
              className={cn(
                "text-sm font-semibold mb-1 text-black",
                `${currentLevel >= 3 ? "text-green-700" : "text-black"}`,
              )}
            >
              Niveau 3 {currentLevel >= 3 && "✓"}
            </TypographyP>
            <TypographyP className="text-xs text-gray-600">
              {ecogesture.level3Expectation}
            </TypographyP>
          </div>
        </div>

        {!isCompleted && (
          <>
            <Button
              onClick={handleValidate}
              disabled={loading}
              className={cn(
                "w-15 flex justify-self-center",
                "transition-transform duration-500 ease-in-out hover:scale-105 ",
              )}
            >
              {loading ? "Validation..." : `Valider le niveau ${nextLevel}`}
            </Button>
          </>
        )}

        {isCompleted && (
          <div className="text-center p-4 rounded">
            <TypographyP className="text-green-700 font-semibold">
              ✅ Félictations, l'écogeste est terminé !
            </TypographyP>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default EcogestureChallengeCard;
