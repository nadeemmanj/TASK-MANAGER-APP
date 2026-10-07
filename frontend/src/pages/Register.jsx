import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-sm flex-col justify-center px-4 sm:px-6">
      <h1 className="font-display text-2xl text-ink sm:text-3xl">Start your Task</h1>
      <p className="mt-1 text-sm text-slate">A quiet place to track what matters.</p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        {error && (
          <p className="rounded-sm border border-danger/30 bg-danger-light px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}
        <label className="grid gap-1.5">
          <span className="text-xs text-slate">Name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-sm border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-primary"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs text-slate">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-sm border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-primary"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs text-slate">Password</span>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-sm border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-primary"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-sm bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-sm text-slate">
        Already have an account?{" "}
        <Link to="/login" className="text-primary underline underline-offset-2">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
