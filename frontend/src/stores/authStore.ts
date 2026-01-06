import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface User {
  id: number;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  isConnected: boolean;
  isAuthLoading: boolean;
  setUser: (user: User | null) => void;
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
