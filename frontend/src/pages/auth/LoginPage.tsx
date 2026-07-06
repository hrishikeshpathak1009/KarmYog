import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { login } from "../../services/auth.service";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { refreshUser } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login({
        email,
        password,
      });

      await refreshUser();

      navigate("/dashboard");
    } catch (err: any) {
  console.log(err);

  console.log("Status:", err.response?.status);
  console.log("Data:", err.response?.data);

  alert(
    err.response?.data?.message ??
    JSON.stringify(err.response?.data) ??
    "Something went wrong"
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >

        <h1 className="mb-6 text-center text-3xl font-bold">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="mb-4 w-full rounded-lg border p-3"
        />

        <div className="relative mb-6">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full rounded-lg border p-3 pr-12"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
  >
    {showPassword ? (
      <EyeOff size={20} />
    ) : (
      <Eye size={20} />
    )}
  </button>
</div>

        <button
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 p-3 text-white"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p className="mt-6 text-center">

          Don't have an account?

          <Link
            to="/register"
            className="ml-2 text-blue-600"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}