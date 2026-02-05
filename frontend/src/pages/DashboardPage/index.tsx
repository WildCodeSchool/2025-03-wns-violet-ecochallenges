import DashboardBanner from "./DashboardBanner";
import Protected from "@/components/auth/Protected";
import { useMediaQuery } from "usehooks-ts";
import ValidatedEcogesturesDesktop from "./ValidatedEcogestures/ValidatedEcogesturesDesktop";
import ValidatedEcogesturesTabletMobile from "./ValidatedEcogestures/ValidatedEcogesturesTabletMobile";
import MyChallenges from "./MyChallenges.tsx";

function DashboardPage() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <Protected>
      {(user) => (
        <main>
          <DashboardBanner username={user.username} />
          <MyChallenges user={user} />
          {isDesktop ? (
            <ValidatedEcogesturesDesktop />
          ) : (
            <ValidatedEcogesturesTabletMobile />
          )}
        </main>
      )}
    </Protected>
  );
}

export default DashboardPage;
