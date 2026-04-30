import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function AddProperty() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    property_type: "residential",
    status: "sale",
    address: "",
    city: "",
    state: "",
    country: "US",
    bedrooms: "",
    bathrooms: "",
    area: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/properties/create/", form);
      navigate(`/listings/${data.slug}`);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create property.");
    } finally {
      setLoading(false);
    }
  };

  const field = (key, label, type = "text") => (
    <div key={key}>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        required
        className="w-full border px-4 py-2 rounded-lg text-sm"
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      />
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-8">Add a Property</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {field("title", "Title")}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              required
              rows={4}
              className="w-full border px-4 py-2 rounded-lg text-sm resize-none"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          {field("price", "Price ($)", "number")}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                className="w-full border px-4 py-2 rounded-lg text-sm"
                value={form.property_type}
                onChange={(e) =>
                  setForm({ ...form, property_type: e.target.value })
                }
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
                <option value="agricultural">Agricultural</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full border px-4 py-2 rounded-lg text-sm"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
          </div>
          {field("address", "Address")}
          <div className="grid grid-cols-3 gap-4">
            {field("city", "City")}
            {field("state", "State")}
            {field("country", "Country")}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {field("bedrooms", "Bedrooms", "number")}
            {field("bathrooms", "Bathrooms", "number")}
            {field("area", "Area (sq ft)", "number")}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Property"}
          </button>
        </form>
      </div>
    </div>
  );
}
