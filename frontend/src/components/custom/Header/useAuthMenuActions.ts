import { useLogoutMutation } from "@/generated/graphql-types";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/authStore";

export function useAuthMenuActions() {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const isConnected = useAuthStore((state) => state.isConnected);
  const logoutStore = useAuthStore((state) => state.logout);
  const userPictureUrl = useAuthStore((state) => state.user?.pictureUrl);

  const handleLogout = async () => {
    await logout();
    logoutStore();
    navigate("/");
  };

  return { isConnected, handleLogout, userPictureUrl };
}
