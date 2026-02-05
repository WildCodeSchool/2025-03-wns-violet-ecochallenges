import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "../authStore";

describe("authStore - Unit Tests", () => {
  beforeEach(() => {
    // Reset store before each test using store actions
    useAuthStore.getState().logout();
    useAuthStore.getState().setAuthLoading(false);
  });

  describe("setUser", () => {
    it("should set the user and isConnected to true", () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        username: "testuser",
      };

      useAuthStore.getState().setUser(mockUser);

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isConnected).toBe(true);
    });

    it("should set isConnected to false when user is null", () => {
      useAuthStore.getState().setUser(null);

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isConnected).toBe(false);
    });
  });

  describe("logout", () => {
    it("should reset the user and isConnected", () => {
      // Set an authenticated user
      useAuthStore.getState().setUser({
        id: 1,
        email: "test@example.com",
        username: "testuser",
      });

      // Log out
      useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isConnected).toBe(false);
    });
  });

  describe("Complete login/logout scenario", () => {
    it("should handle a complete authentication cycle", () => {
      // Initial state
      let state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isConnected).toBe(false);
      expect(state.isAuthLoading).toBe(false);

      // Start loading
      useAuthStore.getState().setAuthLoading(true);
      state = useAuthStore.getState();
      expect(state.isAuthLoading).toBe(true);

      // Successful login
      const mockUser = {
        id: 1,
        email: "test@example.com",
        username: "testuser",
      };
      useAuthStore.getState().setUser(mockUser);
      useAuthStore.getState().setAuthLoading(false);

      state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isConnected).toBe(true);
      expect(state.isAuthLoading).toBe(false);

      // Logout
      useAuthStore.getState().logout();
      state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isConnected).toBe(false);
    });
  });
});
