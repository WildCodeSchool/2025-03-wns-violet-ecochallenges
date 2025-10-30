import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// mock useAuth before importing the hook under test
const setUserMock = vi.fn();
vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({ user: null, setUser: setUserMock }),
}));

import { useSignup } from "./newUser"; // import after mock

describe("useSignup hook", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function mountHook() {
    // capture hook return value
    const hookRef: any = {};
    function TestComponent() {
      Object.assign(hookRef, useSignup());
      return null;
    }
    render(<TestComponent />);
    return hookRef;
  }

  it("successful signup -> returns true and calls setUser", async () => {
    const profile = { email: "a@a.com", roles: ["USER"], username: "a" };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ data: { signup: JSON.stringify(profile) } }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const hook = mountHook();

    await act(async () => {
      const ok = await hook.signup("a@a.com", "pwd");
      expect(ok).toBe(true);
    });

    expect(fetchMock).toHaveBeenCalled();
    expect(setUserMock).toHaveBeenCalledWith({ id: String(profile.username || profile.email), email: profile.email });
    expect(hook.loading).toBe(false);
    expect(hook.error).toBeNull();
  });

  it("graphql error -> sets error and returns false", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ errors: [{ message: "Email already used" }], data: null }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const hook = mountHook();

    await act(async () => {
      const ok = await hook.signup("a@a.com", "pwd");
      expect(ok).toBe(false);
    });

    expect(hook.loading).toBe(false);
    expect(hook.error).toBe("Email already used");
    expect(setUserMock).not.toHaveBeenCalled();
  });

  it("signup returns null profile -> sets error and returns false", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ data: { signup: "null" } }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const hook = mountHook();

    await act(async () => {
      const ok = await hook.signup("a@a.com", "pwd");
      expect(ok).toBe(false);
    });

    expect(hook.loading).toBe(false);
    // message used in hook for null profile
    expect(hook.error).toBe("Impossible de créer le compte pour le moment");
    expect(setUserMock).not.toHaveBeenCalled();
  });

  it("network error -> sets generic network error and returns false", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("network"));
    vi.stubGlobal("fetch", fetchMock);

    const hook = mountHook();

    await act(async () => {
      const ok = await hook.signup("a@a.com", "pwd");
      expect(ok).toBe(false);
    });

    expect(hook.loading).toBe(false);
    expect(hook.error).toBe("Network error");
    expect(setUserMock).not.toHaveBeenCalled();
  });
});