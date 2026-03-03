import { useLogoutMutation } from "@/generated/graphql-types";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/authStore";
import { useApolloClient } from "@apollo/client";

export function useAuthMenuActions() {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const isConnected = useAuthStore((state) => state.isConnected);
  const logoutStore = useAuthStore((state) => state.logout);
  const userPictureUrl = useAuthStore((state) => state.user?.pictureUrl);
  const client = useApolloClient();

  const handleLogout = async () => {
    try {
      await logout();
      await client.clearStore();
      logoutStore();
      navigate("/");
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return { isConnected, handleLogout, userPictureUrl };
}
