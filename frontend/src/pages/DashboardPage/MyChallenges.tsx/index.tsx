import { cn } from "@/lib/utils";
import { TypographyH3 } from "@/components/ui/typographyH3";
import {
  ChallengeFilter,
  useGetCurrentUserQuery,
  useGetMyChallengesQuery,
} from "@/generated/graphql-types";
import { useState } from "react";
import ChallengeCard from "./ChallengeCard";
import { Spinner } from "@/components/ui/spinner";
import ChallengeFilters from "./ChallengeFilters";

const MyChallenges = () => {
  const [filter, setFilter] = useState(ChallengeFilter.InProgress);
  const { data: myChallengesData, loading: myChallengesLoading } =
    useGetMyChallengesQuery({
      variables: {
        input: {
          filter: filter,
        },
      },
    });

  const { data: currentUserData, loading: currentUserLoading } =
    useGetCurrentUserQuery();

  if (myChallengesLoading || currentUserLoading) {
    return <Spinner />;
  }

  if (!myChallengesData?.getMyChallenges || !currentUserData?.getCurrentUser) {
    return <div>Erreur de chargement</div>;
  }

  return (
    <div className={cn("max-w-7xl mx-auto", "p-4 mt-8")}>
      <TypographyH3 className="text-white mb-8">Mes Challenges</TypographyH3>

      <ChallengeFilters filter={filter} onFilterChange={setFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myChallengesData.getMyChallenges.challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            userId={currentUserData.getCurrentUser.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MyChallenges;
