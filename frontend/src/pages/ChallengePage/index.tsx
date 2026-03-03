import { useAuthStore } from "@/stores/authStore";
import UnauthorizedPage from "../UnauthorizedPage";
import { Spinner } from "@/components/ui/spinner";
import { TypographyP } from "@/components/ui/typographyP";
import Protected from "@/components/auth/Protected";
import ChallengeDetails from "./ChallengeDetails";

function ChallengePage() {
  const user = useAuthStore((state) => state.user);
  const isConnected = useAuthStore((state) => state.isConnected);
  const loading = useAuthStore((state) => state.isAuthLoading);

  if (!isConnected || !user) {
    return <UnauthorizedPage />;
  }

  if (loading) {
    return (
      <div className="flex text-white items-center justify-center min-h-[60vh] gap-2">
        <Spinner />
        <TypographyP>Chargement...</TypographyP>
      </div>
    );
  }
  return (
    <main>
      <Protected>{() => <ChallengeDetails />}</Protected>
    </main>
  );
}

export default ChallengePage;
