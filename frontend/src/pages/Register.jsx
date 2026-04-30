import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ email: "", username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/register/", {
        email: form.email,
        username: form.username,
        password: form.password
      });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Email or username might already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center py-12">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Create Account</h1>
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
              type="text"
              placeholder="Username"
              className="flex-1 outline-none text-sm"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div className="flex items-center border rounded-xl px-4 py-3 gap-3">
            <span className="text-gray-400">✉️</span>
            <input
              type="email"
              placeholder="Email address"
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
              minLength="6"
            />
          </div>
          <div className="flex items-center border rounded-xl px-4 py-3 gap-3">
            <span className="text-gray-400">🔒</span>
            <input
              type="password"
              placeholder="Confirm Password"
              className="flex-1 outline-none text-sm"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-60 mt-4"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <hr className="my-6" />
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-black">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
