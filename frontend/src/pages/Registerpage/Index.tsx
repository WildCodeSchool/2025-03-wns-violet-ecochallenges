import { Register } from "@/components/custom/Register";
import { useSignup } from "@/graphql/mutations/newUser";
import { useNavigate } from "react-router";

export default function SignupPage() {

  const { signup, loading, error } = useSignup();
  const navigate = useNavigate();
  const handleSubmit = async (data: { email: string; password: string }) => {

    const ok = await signup(data.email, data.password);

    if (ok) {
      navigate("/", { replace: true });
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center">
      <Register onSubmit={handleSubmit} loading={loading} error={error ?? undefined} />
    </div>

  );

}