import { useAuthStore } from "@/stores/authStore";
import UnauthorizedPage from "./UnauthorizedPage.tsx";
import { Spinner } from "@/components/ui/spinner";
import { TypographyP } from "@/components/ui/typographyP";

function ProfilePage() {
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

  return <main></main>;
}

export default ProfilePage;
