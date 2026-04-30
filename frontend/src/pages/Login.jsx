import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login/", form);
      login(data.access, data.refresh);
      navigate("/");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Log in</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded-xl px-4 py-3 gap-3">
            <span className="text-gray-400">👤</span>
            <input
              type="email"
              placeholder="user / email address"
              className="flex-1 outline-none text-sm"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="flex items-center border rounded-xl px-4 py-3 gap-3">
            <span className="text-gray-400">🔒</span>
            <input
              type="password"
              placeholder="Password"
              className="flex-1 outline-none text-sm"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" /> Remember
            </label>
            <a href="/forgot-password" className="font-semibold">
              Forgot Password
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <button
            type="button"
            className="w-full border py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="Google"
            />
            Log in with Google
          </button>
        </form>

        <hr className="my-4" />
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/register" className="font-bold text-black">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}
