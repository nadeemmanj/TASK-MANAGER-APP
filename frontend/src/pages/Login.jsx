import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-sm flex-col justify-center px-4 sm:px-6">
      <h1 className="font-display text-2xl text-ink sm:text-3xl">Welcome back</h1>
      <p className="mt-1 text-sm text-slate">Sign in to see what's on your Task.</p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        {error && (
          <p className="rounded-sm border border-danger/30 bg-danger-light px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}
        <label className="grid gap-1.5">
          <span className="text-xs text-slate">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-sm border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-primary"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs text-slate">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-sm border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-primary"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-sm bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-sm text-slate">
        New here?{" "}
        <Link to="/register" className="text-primary underline underline-offset-2">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;