import React from "react";
import { useAuthStore } from "@/stores/authStore";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import { Spinner } from "@/components/ui/spinner";
import { TypographyP } from "@/components/ui/typographyP";
import type { Profile } from "@/types/User";

type Props = {
  children: (user: Profile) => React.ReactNode;
};

export default function Protected({ children }: Props) {
  const user = useAuthStore((state) => state.user);
  const isConnected = useAuthStore((state) => state.isConnected);
  const loading = useAuthStore((state) => state.isAuthLoading);

  if (loading) {
    return (
      <div className="flex text-white items-center justify-center min-h-[60vh] gap-2">
        <Spinner />
        <TypographyP>Chargement...</TypographyP>
      </div>
    );
  }

  if (!isConnected || !user) return <UnauthorizedPage />;

  return <>{children(user as Profile)}</>;
}
