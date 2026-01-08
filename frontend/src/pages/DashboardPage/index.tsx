import DashboardBanner from "./DashboardBanner";
import UnauthorizedPage from "../UnauthorizedPage";
import { Spinner } from "@/components/ui/spinner";
import { TypographyP } from "@/components/ui/typographyP";
import { useAuthStore } from "@/stores/authStore";
import ValidatedEcogesturesDesktop from "./ValidatedEcogestures/ValidatedEcogesturesDesktop";
import { useMediaQuery } from "usehooks-ts";
import ValidatedEcogesturesTabletMobile from "./ValidatedEcogestures/ValidatedEcogesturesTabletMobile";

function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const isConnected = useAuthStore((state) => state.isConnected);
  const loading = useAuthStore((state) => state.isAuthLoading);

  if (!isConnected || !user) {
    return <UnauthorizedPage />;
  }
  const isDesktop = useMediaQuery("(min-width: 1024px)");

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
      <DashboardBanner username={user.username} />

      {isDesktop ? (
        <ValidatedEcogesturesDesktop />
      ) : (
        <ValidatedEcogesturesTabletMobile />
      )}
    </main>
  );
}

export default DashboardPage;
