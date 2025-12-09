import { Register } from "@/pages/Registerpage/Register";
import { useNavigate } from "react-router";

export default function SignupPage() {
  const navigate = useNavigate();

  // Cette fonction sera appelée par Register quand le compte est créé
  const handleSuccess = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex items-center justify-center mt-10 mb-10">
      <Register onSuccess={handleSuccess} />
    </div>
  );
}