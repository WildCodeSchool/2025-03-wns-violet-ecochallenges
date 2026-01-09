import type { ProfileLight } from "@/types/User";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
  user: ProfileLight | null;
  isConnected: boolean;
  isAuthLoading: boolean;
  setUser: (user: ProfileLight | null) => void;
  setAuthLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    isConnected: false,
    isAuthLoading: true,

    setUser: (user) =>
      set(() => ({
        user,
        isConnected: !!user,
      })),
    setAuthLoading: (isLoading) =>
      set(() => ({
        isAuthLoading: isLoading,
      })),
    logout: () =>
      set(() => ({
        user: null,
        isConnected: false,
      })),
  }))
);
