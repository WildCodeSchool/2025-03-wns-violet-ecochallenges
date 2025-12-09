import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/generated/graphql-types";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

// TODO : Supprimer les console.log lorsque dashboard sera créée, ils ne sont là que pour tester la connexion pour le moment.

export const Login = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Une erreur inconnue est survenue.");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <section className={`flex items-center justify-center my-6`}>
      <div className="flex items-center justify-center">
        <div className="w-full px-4">
          <form
            onSubmit={handleSubmit}
            className={cn(
              "max-w-2xl w-full bg-white rounded-lg border shadow-md",
              "mx-auto flex flex-col items-start",
              "gap-y-6 px-10 py-12"
            )}
          >
            <h1 className="text-2xl font-semibold w-full text-center">
              SE CONNECTER
            </h1>

            <div className="text-muted-foreground flex justify-center gap-1 text-sm w-full">
              <Link
                to="/signup"
                className="text-primary font-medium hover:underline"
              >
                Je n'ai pas encore de compte
              </Link>
            </div>

            <div className="w-full">
              <label className="text-sm block mb-1">Email</label>
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="captain@planet.fr"
                className={cn(
                  "block w-full rounded-md border bg-transparent border-gray-300",
                  "px-3 py-2 text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-primary"
                )}
                required
              />
            </div>
            <div className="w-full">
              <label className="text-sm block mb-1">Mot de passe</label>
              <Input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className={cn(
                  "block w-full rounded-md border bg-transparent border-gray-300",
                  "px-3 py-2 text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-primary"
                )}
                required
              />
            </div>

            {errorMessage && (
              <p className="text-destructive text-sm">{errorMessage}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={!email || !password}
            >
              Se connecter
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
