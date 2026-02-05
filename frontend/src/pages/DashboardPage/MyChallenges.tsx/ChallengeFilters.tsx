import { Button } from "@/components/ui/button";
import { ChallengeFilter } from "@/generated/graphql-types";
import { CircleCheck, Hourglass, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  filter: ChallengeFilter;
  onFilterChange: (filter: ChallengeFilter) => void;
}

const ChallengeFilters = ({ filter, onFilterChange }: Props) => {
  const active = "bg-primary text-secondary font-bold";
  const inactive = "bg-secondary text-white font-bold/50";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 sm:flex-row",
        "mx-auto",
        "p-4 my-4 w-full"
      )}
    >
      <Button
        className={cn(
          "w-36 justify-center gap-2",
          filter === ChallengeFilter.InProgress ? active : inactive
        )}
        onClick={() => {
          onFilterChange(ChallengeFilter.InProgress);
        }}
      >
        <Hourglass
          className={cn(
            "w-5 h-5",
            filter === ChallengeFilter.InProgress
              ? "text-secondary"
              : "text-white"
          )}
        />
        En cours
      </Button>

      <Button
        className={cn(
          "w-36 justify-center gap-2",
          filter === ChallengeFilter.CreatedByMe ? active : inactive
        )}
        onClick={() => {
          onFilterChange(ChallengeFilter.CreatedByMe);
        }}
      >
        <User
          className={cn(
            "w-5 h-5",
            filter === ChallengeFilter.CreatedByMe
              ? "text-secondary"
              : "text-white"
          )}
        />
        Crées
      </Button>

      <Button
        className={cn(
          "w-36 justify-center gap-2",
          filter === ChallengeFilter.Finished ? active : inactive
        )}
        onClick={() => {
          onFilterChange(ChallengeFilter.Finished);
        }}
      >
        <CircleCheck
          className={cn(
            "w-5 h-5",
            filter === ChallengeFilter.Finished
              ? "text-secondary"
              : "text-white"
          )}
        />
        Terminés
      </Button>
    </div>
  );
};

export default ChallengeFilters;
