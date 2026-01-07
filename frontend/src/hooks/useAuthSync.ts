import { useGetCurrentUserQuery } from "@/generated/graphql-types";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

export const useAuthSync = () => {
  const { data, loading } = useGetCurrentUserQuery();
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthLoading = useAuthStore((state) => state.setAuthLoading);

  useEffect(() => {
    setAuthLoading(loading);

    if (!loading && data?.getCurrentUser) {
      {
        setUser({
          id: data?.getCurrentUser?.id,
          email: data?.getCurrentUser?.email,
          username: data?.getCurrentUser?.username,
        });
      }
    }
  }, [data, loading, setUser, setAuthLoading]);
};
