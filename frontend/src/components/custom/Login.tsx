import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/generated/graphql-types";
import { useNavigate } from "react-router";
import { useState } from "react";

interface Login {
  bg?: string;
  onSubmit?: (data: {
    email: string;
    password: string;
  }) => void | Promise<void>;
  error?: string | null;
}

// TODO : Vérifier que le token est bien stocké dans les cookies
// vérifier la bonne gestion des erreurs. Supprimer les console.log lorsque dashboard sera créée.

export const Login = ({ bg = "bg-white", onSubmit }: Login) => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";

    try {
      const { data } = await login({
        variables: { data: { email, password } },
      });
      if (!data?.login) {
        throw new Error(" ❌ No token received");
      }

      console.log(" ✅ Login successful:", data);
      console.log("Email : ", email);
      console.log("Token: ", data.login);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Une erreur inconnue est survenue.");
      }
      console.error("Login error:", err);
    }

    if (onSubmit) {
      await onSubmit({ email, password });
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <form
            onSubmit={handleSubmit}
            className={cn(
              bg,
              "min-w-sm border-muted flex w-full max-w-sm flex-col items-start gap-y-4 rounded-md border px-6 py-8 shadow-md"
            )}
          >
            <h1 className="text-xl font-semibold self-center">Se connecter</h1>

            <div className="text-muted-foreground flex justify-center gap-1 text-sm w-full">
              <a
                href="/Signup"
                className="text-primary font-medium hover:underline"
              >
                Je n'ai pas encore de compte
              </a>
            </div>

            <label className="text-sm self-start">Email:</label>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className={cn(bg, "text-sm")}
              required
            />

            <label className="text-sm self-start">Mot de passe:</label>
            <Input
              name="password"
              type="password"
              placeholder="Mot de passe"
              className={cn(bg, "text-sm")}
              required
            />

            {errorMessage && (
              <p className="text-destructive text-sm">{errorMessage}</p>
            )}

            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
