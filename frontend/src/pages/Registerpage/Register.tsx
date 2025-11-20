import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SIGNUP_MUTATION } from "@/graphql/mutations/newUser";
import { Link } from "react-router";

interface RegisterProps {
  bg?: string;
  error?: string | null;
  onSuccess?: () => void;
}

type Profile = { email: string; roles: string[]; username: string } | null;

export const Register = ({
  bg = "bg-white",
  error = null,
  onSuccess,
}: RegisterProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emailValid = useMemo(() => /^\S+@\S+\.\S+$/.test(email), [email]);
  const minLength = useMemo(() => password.length >= 8, [password]);
  const hasSpecialChar = useMemo(
    () => /[!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]/.test(password),
    [password]
  );
  const hasUpper = useMemo(() => /[A-Z]/.test(password), [password]);
  const hasLower = useMemo(() => /[a-z]/.test(password), [password]);
  const hasNumber = useMemo(() => /[0-9]/.test(password), [password]);
  const passwordValid =
    minLength && hasSpecialChar && hasUpper && hasLower && hasNumber;
  const formValid = emailValid && passwordValid && !loading;

  const signup = async (email: string, password: string) => {
    setLoading(true);
    setLocalError(null);

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
        setLocalError(json.errors[0].message || "Erreur GraphQL");
        setLoading(false);
        return false;
      }

      const payload = json.data?.signup;

      if (typeof payload !== "string") {
        setLocalError("Format de réponse inattendu");
        setLoading(false);
        return false;
      }

      let profile: Profile | null = null;
      try {
        profile = payload ? JSON.parse(payload) : null;
      } catch {
        setLocalError("Format de réponse invalide");
        setLoading(false);
        return false;
      }

      if (!profile) {
        setLocalError("Impossible de créer le compte pour le moment");
        setLoading(false);
        return false;
      }

      setLoading(false);
      if (onSuccess) onSuccess();
      return true;
    } catch {
      setLocalError("Erreur réseau");
      setLoading(false);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setLocalError("Adresse email invalide.");
      return;
    }

    if (!passwordValid) {
      setLocalError("Mot de passe invalide.");
      return;
    }

    await signup(trimmedEmail, trimmedPassword);
  };

  const ruleItem = (ok: boolean, text: string) => (
    <li
      className={cn(
        "flex items-center gap-2 text-sm",
        ok ? "text-green-600" : "text-gray-500"
      )}
    >
      <span aria-hidden>{ok ? "✓" : "○"}</span>
      <span>{text}</span>
    </li>
  );

  return (
    <section className="flex items-center justify-center">
      <div className="w-full px-4">
        <form
          onSubmit={handleSubmit}
          className={cn(
            bg,
            "w-full max-w-2xl mx-auto flex flex-col items-start gap-y-6 rounded-lg border px-10 py-12 shadow-md"
          )}
        >
          <h1 className="text-2xl font-semibold w-full text-center">
            CRÉER UN COMPTE
          </h1>

          <div className="text-muted-foreground flex justify-center gap-1 text-sm w-full">
            <Link
              to="/Signin"
              className="text-primary font-medium hover:underline"
            >
              J'ai déjà un compte
            </Link>
          </div>

          <div className="w-full">
            <label htmlFor="register-email" className="text-sm block mb-1">
              Email
            </label>
            <input
              id="register-email"
              name="email"
              type="email"
              placeholder="captain@planet.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "block w-full rounded-md border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              )}
              required
              aria-invalid={email.length > 0 ? !emailValid : undefined}
            />
          </div>

          <div className="w-full">
            <label htmlFor="register-password" className="text-sm block mb-1">
              Mot de passe
            </label>
            <input
              id="register-password"
              name="password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "block w-full rounded-md border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              )}
              required
              aria-describedby="password-hint"
              aria-invalid={password.length > 0 ? !passwordValid : undefined}
            />

            <div
              id="password-hint"
              className="mt-3 w-full text-sm"
              aria-live="polite"
              role="status"
            >
              <p className="mb-2 font-medium text-gray-700">
                Votre mot de passe doit contenir :
              </p>
              <ul className="list-inside space-y-1">
                {ruleItem(minLength, "Au moins 8 caractères")}
                {ruleItem(
                  hasSpecialChar,
                  "Au moins 1 caractère spécial (ex : ! @ # $ %)"
                )}
                {ruleItem(hasUpper, "Au moins 1 lettre majuscule")}
                {ruleItem(hasLower, "Au moins 1 lettre minuscule")}
                {ruleItem(hasNumber, "Au moins 1 chiffre")}
              </ul>
            </div>
          </div>

          {(localError || error) && (
            <p
              className="text-destructive text-sm w-full"
              role="alert"
              aria-live="assertive"
            >
              {localError ?? error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={!formValid || loading}
            aria-disabled={!formValid || loading}
          >
            {loading ? "Chargement..." : "S'inscrire"}
          </Button>
        </form>
      </div>
    </section>
  );
};
