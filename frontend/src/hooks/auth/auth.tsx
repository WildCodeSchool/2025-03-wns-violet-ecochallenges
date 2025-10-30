import { useState } from "react";
import { useAuth } from "./useAuth";
import { LOGIN_MUTATION } from "@/graphql/queries/logins";

type LoginResult = { success: boolean; message?: string; user?: { id: string; email: string } };

async function loginRequest(email: string, password: string): Promise<LoginResult> {
  console.log("[loginRequest] start", { email });
  const res = await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      query: LOGIN_MUTATION,
      variables: { email, password },
    }),
  });
  const json = await res.json();
  console.log("[loginRequest] response", json);
  if (json.errors) return { success: false, message: json.errors[0]?.message || "GraphQL error" };
  return json.data.login;
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();

  const login = async (email: string, password: string) => {
    console.log("[useLogin.login] called", { email });
    setLoading(true);
    setError(null);
    try {
      const result = await loginRequest(email, password);
      console.log("[useLogin.login] result", result);
      if (!result.success) {
        setError(result.message ?? "L'authentification a échouée");
        setLoading(false);
        return false;
      }
      if (result.user) setUser(result.user);
      console.log("[useLogin.login] setting user", result.user);
      setLoading(false);
      return true;
    } catch (err) {
      console.log("[useLogin.login] catch error", err);
      setError("Erreur Réseau");
      setLoading(false);
      return false;
    }
  };

  return { login, loading, error };
}