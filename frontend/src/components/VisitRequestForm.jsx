import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function VisitRequestForm({ property }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    preferred_date: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await api.post("/visits/create/", {
        ...form,
        property: property.id,
        agent: property.agent.id,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success")
    return (
      <p className="text-green-600 font-medium p-4 border rounded-xl">
        Visit request sent!
      </p>
    );

  return (
    <form onSubmit={handleSubmit} className="border rounded-xl p-4 space-y-3">
      <h2 className="font-semibold">Request a Visit</h2>
      {status === "error" && (
        <p className="text-red-500 text-xs">
          Something went wrong. Please try again.
        </p>
      )}
      {[
        ["full_name", "Full Name"],
        ["email", "Email"],
        ["phone", "Phone"],
      ].map(([f, ph]) => (
        <input
          key={f}
          required
          placeholder={ph}
          type={f === "email" ? "email" : "text"}
          className="w-full border px-3 py-2 rounded-lg text-sm"
          value={form[f]}
          onChange={(e) => setForm({ ...form, [f]: e.target.value })}
        />
      ))}
      <input
        type="date"
        required
        className="w-full border px-3 py-2 rounded-lg text-sm"
        value={form.preferred_date}
        onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
      />
      <textarea
        placeholder="Message (optional)"
        rows={3}
        className="w-full border px-3 py-2 rounded-lg text-sm resize-none"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <button
        type="submit"
        className="w-full bg-brand-orange text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
      >
        Submit Request
      </button>
    </form>
  );
}
