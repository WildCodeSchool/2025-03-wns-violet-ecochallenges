import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface RegisterProps {
  bg?: string;
  onSubmit?: (data: { email: string; password: string }) => void | Promise<void>;
  error?: string | null;
}

export const Register = ({
  bg = "bg-white",
  onSubmit,
  error = null,
}: RegisterProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const emailValid = useMemo(() => /^\S+@\S+\.\S+$/.test(email), [email]);
  const minLength = useMemo(() => password.length >= 8, [password]);
  const hasSpecial = useMemo(() => /[!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]/.test(password),[password]);
  const hasUpper = useMemo(() => /[A-Z]/.test(password), [password]);
  const hasLower = useMemo(() => /[a-z]/.test(password), [password]);
  const hasNumber = useMemo(() => /[0-9]/.test(password), [password]);
  const passwordValid = minLength && hasSpecial && hasUpper && hasLower && hasNumber;
  const formValid = emailValid && passwordValid;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setLocalError(null);
    if (!onSubmit) return;

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

    await onSubmit({ email: trimmedEmail, password: trimmedPassword });

  };

  const ruleItem = (ok: boolean, text: string) => (
    <li className={cn("flex items-center gap-2 text-sm", ok ? "text-green-600" : "text-gray-500")}>
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
          <h1 className="text-2xl font-semibold w-full text-center">CRÉER UN COMPTE</h1>
          
          <div className="text-muted-foreground flex justify-center gap-1 text-sm w-full">
            <a href="/Signin" className="text-primary font-medium hover:underline">
              J'ai déjà un compte
            </a>
          </div>

          <div className="w-full">
            <label className="text-sm block mb-1">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="captain@planet.fr"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className={cn(bg, "text-sm")}
              required
            />
          </div>

          <div className="w-full">
            <label className="text-sm block mb-1">Mot de passe</label>
            <Input
              name="password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className={cn(bg, "text-sm")}
              required
              aria-describedby="password-hint"
            />

            <div id="password-hint" className="mt-3 w-full text-sm" aria-live="polite">
              <p className="mb-2 font-medium text-gray-700">Votre mot de passe doit contenir :</p>
              <ul className="list-inside space-y-1">
                {ruleItem(minLength, "Au moins 8 caractères")}
                {ruleItem(hasSpecial, "Au moins 1 caractère spécial (ex : ! @ # $ %)")}
                {ruleItem(hasUpper, "Au moins 1 lettre majuscule")}
                {ruleItem(hasLower, "Au moins 1 lettre minuscule")}
                {ruleItem(hasNumber, "Au moins 1 chiffre")}
              </ul>
            </div>
          </div>

          {(localError || error) && (
            <p className="text-destructive text-sm w-full">{localError ?? error}</p>
          )}

          <Button type="submit" className="w-full" disabled={!formValid}>
            S'inscrire
          </Button>

        </form>
      </div>
    </section>
  );
};