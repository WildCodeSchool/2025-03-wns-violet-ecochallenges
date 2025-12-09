import DashboardBanner from "./DashboardBanner";
import UnauthorizedPage from "../UnauthorizedPage";
import { useGetCurrentUserQuery } from "@/generated/graphql-types";
import { Spinner } from "@/components/ui/spinner";
import { TypographyP } from "@/components/ui/typographyP";

function DashboardPage() {
  const { data, loading, error } = useGetCurrentUserQuery();

  if (loading) {
    return (
      <div className="flex text-white items-center justify-center min-h-[60vh] gap-2">
        <Spinner />
        <TypographyP>Chargement...</TypographyP>
      </div>
    );
  }

  if (error || !data?.getCurrentUser) {
    return <UnauthorizedPage />;
  }

  return (
    <main>
      <DashboardBanner username={data.getCurrentUser.username} />
    </main>
  );
}

export default DashboardPage;
