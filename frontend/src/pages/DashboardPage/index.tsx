import DashboardBanner from "./DashboardBanner";
import Protected from "@/components/auth/Protected";
import { useMediaQuery } from "usehooks-ts";
import ValidatedEcogesturesDesktop from "./ValidatedEcogestures/ValidatedEcogesturesDesktop";
import ValidatedEcogesturesTabletMobile from "./ValidatedEcogestures/ValidatedEcogesturesTabletMobile";

function DashboardPage() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <Protected>
      {(user) => (
        <main>
          <DashboardBanner username={user.username} />
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
