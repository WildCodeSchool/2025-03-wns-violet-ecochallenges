import { Register } from "@/components/custom/Register";
import { useSignup } from "@/graphql/mutations/newUser";
import { useNavigate } from "react-router";

export default function SignupPage() {

  const { signup, error } = useSignup();
  const navigate = useNavigate();
  const handleSubmit = async (data: { email: string; password: string }) => {

    const ok = await signup(data.email, data.password);

    if (ok) {
      navigate("/", { replace: true }); // Redirection si await signup est true
    }

  };

  return (

    <div className="flex items-center justify-center mt-10 mb-10">
      <Register onSubmit={handleSubmit} error={error ?? undefined} />
    </div>

  );

}