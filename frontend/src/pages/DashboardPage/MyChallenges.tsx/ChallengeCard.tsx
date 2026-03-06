import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TypographyH3 } from "@/components/ui/typographyH3";
import { formatDate, cn } from "@/lib/utils";
import { type GetMyChallengesQuery } from "@/generated/graphql-types";
import {
  Calendar,
  Users,
  Clock,
  Hourglass,
  User,
  CircleCheck,
} from "lucide-react";
import { Link } from "react-router";

interface ChallengeCardProps {
  challenge: GetMyChallengesQuery["getMyChallenges"]["challenges"][number];
  userId: number | undefined;
}

const ChallengeCard = ({ challenge, userId }: ChallengeCardProps) => {
  const now = new Date();
  const startingDate = new Date(challenge.startingDate);
  const endingDate = new Date(challenge.endingDate);

  const isChallengeInProgress = now >= startingDate && now <= endingDate;
  const isChallengeFinished = now >= endingDate;

  const diffTime = Math.abs(endingDate.getTime() - now.getTime());
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <Link to={`/challenge/${challenge.id}`}>
      <Card
        className={cn(
          "w-full overflow-hidden pt-0",
          "bg-secondary-foreground border-none shadow-2xl",
        )}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={challenge.pictureUrl}
            alt="Photo du challenge"
            className="w-full h-full object-cover"
          />
          <div
            className={cn(
              "absolute top-3 right-3",
              "bg-white/90 p-2 rounded-lg shadow-md",
              "flex gap-2",
            )}
          >
            {challenge.createdBy.id === userId && (
              <User className="w-5 h-5 text-slate-700" />
            )}
            {isChallengeInProgress && (
              <Hourglass className="w-5 h-5 text-slate-700" />
            )}
            {isChallengeFinished && (
              <CircleCheck className="w-5 h-5 text-slate-700" />
            )}
          </div>
        </div>

        <CardContent className="p-6">
          <TypographyH3 className="text-2xl font-bold text-slate-900 mb-6">
            {challenge.label}{" "}
          </TypographyH3>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Calendar className="w-5 h-5 text-slate-700" />
              </div>
              <div className="flex-1 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">
                  Date de début
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {formatDate(challenge.startingDate)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Users className="w-5 h-5 text-slate-700" />
              </div>
              <div className="flex-1 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">
                  Participants
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {challenge.participants?.length || 0}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Clock className="w-5 h-5 text-slate-700" />
              </div>
              <div className="flex-1 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">
                  Temps restant
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {isChallengeFinished
                    ? "Challenge terminé"
                    : `${daysRemaining} jours`}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-end">
              <span className="text-sm font-bold text-slate-900">
                {challenge.progressPercentage}%
              </span>
            </div>
            <Progress
              value={challenge.progressPercentage}
              className="h-3 bg-white/60"
              aria-label={`Progression : ${challenge.progressPercentage}%`}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ChallengeCard;
