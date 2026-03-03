import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { Spinner } from "@/components/ui/spinner";
import { TypographyP } from "@/components/ui/typographyP";
import { TypographyH1 } from "@/components/ui/typographyH1";
import EcogesturesChallenge from "./EcogesturesChallenge";
import { GET_CHALLENGE_BY_ID } from "@/graphql/queries/challengeById";
import { type GetChallengeByIdQuery } from "@/generated/graphql-types";
import { GET_VALIDATED_ECOGESTURES } from "@/graphql/queries/userEcogesture";

function ChallengeDetails() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery<GetChallengeByIdQuery>(
    GET_CHALLENGE_BY_ID,
    {
      variables: { getChallengeById: Number(id) },
      skip: !id,
    },
  );

  const { data: userEcogesturesData } = useQuery(GET_VALIDATED_ECOGESTURES, {
    variables: {
      input: { page: 1, limit: 100 },
    },
  });

  if (loading) {
    return (
      <div className="flex text-white items-center justify-center min-h-[60vh] gap-2">
        <Spinner />
        <TypographyP>Chargement...</TypographyP>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex text-white items-center justify-center min-h-[60vh]">
        <TypographyP>Erreur: {error.message}</TypographyP>
      </div>
    );
  }

  if (!data?.getChallengeById) {
    return (
      <div className="flex text-white items-center justify-center min-h-[60vh]">
        <TypographyP>Challenge non trouvé</TypographyP>
      </div>
    );
  }

  const challenge = data.getChallengeById;
  const userEcogestures =
    userEcogesturesData?.getValidatedEcogestures?.userEcogestures || [];

  return (
    <div className="max-w-7xl m-auto px-4 py-8">
      <TypographyH1 className="text-white mb-8">{challenge.label}</TypographyH1>
      <EcogesturesChallenge
        ecogestures={challenge.ecogestures ?? []}
        userEcogestures={userEcogestures}
        challengeId={challenge.id}
      />
    </div>
  );
}

export default ChallengeDetails;
