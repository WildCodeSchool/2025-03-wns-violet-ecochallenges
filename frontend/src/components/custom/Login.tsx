import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/generated/graphql-types";
import { useNavigate } from "react-router";

interface LoginProps {
  bg?: string;
  onSubmit?: (data: {
    email: string;
    password: string;
  }) => void | Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export const Login = ({
  bg = "bg-white",
  onSubmit,
  loading = false,
  error = null,
}: LoginProps) => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

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
      if (!data?.login) throw new Error(" ❌ No token received");

      console.log(" ✅ Login successful:", data);
      console.log("Email : ", email);
      console.log("Token: ", data.login);
      navigate("/dashboard");
    } catch (err) {
      console.error("😭 Login error:", err);
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

            {error && <p className="text-destructive text-sm">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Chargement..." : "Se connecter"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
