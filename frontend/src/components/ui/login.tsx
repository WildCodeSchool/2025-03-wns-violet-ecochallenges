import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface LoginProps {
  heading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
  bg?: string;
}

const Login = ({
  heading = "CREER UN COMPTE",
  buttonText = "S'inscrire",
  signupUrl = "https://shadcnblocks.com",
  bg = "bg-white"
}: LoginProps) => {
  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <div className={cn(bg, "min-w-sm border-muted {bg} flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md")}>
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
            <div className="text-muted-foreground flex justify-center gap-1 text-sm">
              <a
                href={signupUrl}
                className="text-primary font-medium hover:underline"
              >
                J'ai déjà un compte
              </a>
            </div>
            <label
              className="text-sm self-start">
              Email:
            </label>
            <Input
              type="email"
              placeholder="Email"
              className={cn(bg,"text-sm bg-white")}
              required
            />
            <label
              className="text-sm self-start">
              Mot de passe:
            </label>
            <Input
              type="password"
              placeholder="Mot de passe"
              className={cn(bg,"text-sm bg-white")}
              required
            />
            <Button type="submit" className="w-full">
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login };
