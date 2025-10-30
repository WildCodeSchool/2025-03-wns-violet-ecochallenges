import { Login } from "@/components/ui/login";
import { useLogin } from "@/hooks/auth/auth";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const { login, loading, error } = useLogin();

  const handleSubmit = async (data: { email: string; password: string }) => {
    const ok = await login(data.email, data.password);
    if (ok) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Login onSubmit={handleSubmit} loading={loading} error={error ?? undefined} />
    </div>
  );
}