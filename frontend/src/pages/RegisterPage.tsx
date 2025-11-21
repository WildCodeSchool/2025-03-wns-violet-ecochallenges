import React from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "@/graphql/mutations/signup";
import { cn, HEADER_FOOTER_HEIGHT } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

type Profile = { email: string; roles: string[]; username: string } | null;

export default function RegisterPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [localError, setLocalError] = React.useState<string | null>(null);
  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const minLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordValid =
    minLength && hasSpecialChar && hasUpper && hasLower && hasNumber;

  const [signup, { loading }] = useMutation(SIGNUP_MUTATION);
  const formValid = emailValid && passwordValid && !loading;
  const navigate = useNavigate();

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

    try {
      const { data } = await signup({
        variables: { data: { email: trimmedEmail, password: trimmedPassword } },
      });
      const payload = data?.signup;
      let profile: Profile | null = null;
      try {
        profile = payload ? JSON.parse(payload) : null;
      } catch {
        setLocalError("Format de réponse invalide");
        return;
      }
      if (!profile) {
        setLocalError("Impossible de créer le compte pour le moment");
        return;
      }
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setLocalError(err?.message || "Erreur réseau");
    }
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
    <div
      className={cn(
        `flex items-center justify-center mt-10 mb-10`,
        `min-h-[calc(100vh-${HEADER_FOOTER_HEIGHT}px)]`
      )}
    >
      <section className="flex items-center justify-center">
        <div className="w-full px-4">
          <form
            onSubmit={handleSubmit}
            className={cn(
              "bg-white",
              "w-full max-w-2xl mx-auto flex flex-col items-start gap-y-6 rounded-lg border px-10 py-12 shadow-md"
            )}
          >
            <h1 className="text-2xl font-semibold w-full text-center">
              CRÉER UN COMPTE
            </h1>

            <div className="text-muted-foreground flex justify-center gap-1 text-sm w-full">
              <Link
                to="/signin"
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

            {localError && (
              <p
                className="text-destructive text-sm w-full"
                role="alert"
                aria-live="assertive"
              >
                {localError}
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
    </div>
  );
}
