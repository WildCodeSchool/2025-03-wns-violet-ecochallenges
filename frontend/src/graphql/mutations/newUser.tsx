import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const SIGNUP_MUTATION = `
  mutation Signup($data: NewUserInput!) {
    signup(data: $data)
  }
`;

type Profile = { email: string; roles: string[]; username: string } | null;

export function useSignup() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();

  const signup = async (email: string, password: string) => {

    setLoading(true);
    setError(null);

    try {

      const res = await fetch(import.meta.env.VITE_API_URL_FROM_CLIENT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          query: SIGNUP_MUTATION,
          variables: { data: { email, password } },
        }),
      });

      const json = await res.json();

      if (json.errors?.length) {
        setError(json.errors[0].message || "GraphQL error");
        setLoading(false);
        return false;
      }

      const payload = json.data?.signup;

      if (typeof payload !== "string") {
        setError("Unexpected signup response");
        setLoading(false);
        return false;
      }

      let profile: Profile | null = null;
  
      try {
        
        profile = payload ? JSON.parse(payload) : null;

      } catch {
        setError("Invalid signup response format");
        setLoading(false);
        return false;
      }

      if (!profile) {
        setError("Impossible de créer le compte pour le moment");
        setLoading(false);
        return false;
      }

      setUser({ id: String(profile.username || profile.email), email: profile.email });
      setLoading(false);
      return true;

    } catch {

      setError("Network error");
      setLoading(false);
      return false;

    }
  };

  return { signup, loading, error };

}