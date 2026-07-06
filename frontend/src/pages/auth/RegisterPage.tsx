import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { register } from "../../services/auth.service";
import { useAuth } from "../../contexts/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();

  const { refreshUser } = useAuth();

  const [email, setEmail] = useState("");

  const [name, setName]=useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register({
        name,
        email,
        password,
      });

      await refreshUser();

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
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
          Register
        </h1>

          <input
             type="text"
              placeholder="Name"
               value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 w-full rounded-lg border p-3"
                />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="mb-4 w-full rounded-lg border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="mb-6 w-full rounded-lg border p-3"
        />

        <button
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 p-3 text-white"
        >
          {loading
            ? "Registering..."
            : "Register"}
        </button>

        <p className="mt-6 text-center">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-blue-600"
          >
            login
          </Link>

        </p>

      </form>

    </div>
  );
}