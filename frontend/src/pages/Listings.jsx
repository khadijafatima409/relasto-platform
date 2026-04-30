import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";

export default function Listings() {
  const [properties, setProperties] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    property_type: "",
    status: "",
    city: "",
  });
  const [page, setPage] = useState(1);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v)),
      };
      const { data } = await api.get("/properties/", { params });
      setProperties(data.results);
      setCount(data.count);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [page, filters]);

  return (
    <div>
      <Navbar />
      {/* Search bar */}
      <div className="bg-brand-light py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-3">
          <input
            className="border px-4 py-2 rounded-lg text-sm flex-1"
            placeholder="City / Street"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          />
          <select
            className="border px-4 py-2 rounded-lg text-sm"
            value={filters.property_type}
            onChange={(e) =>
              setFilters({ ...filters, property_type: e.target.value })
            }
          >
            <option value="">All Types</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
            <option value="agricultural">Agricultural</option>
          </select>
          <select
            className="border px-4 py-2 rounded-lg text-sm"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Buy / Rent</option>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
          <button
            onClick={() => setPage(1)}
            className="bg-black text-white px-6 py-2 rounded-lg text-sm"
          >
            Search
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-sm text-gray-500 mb-6">{count} properties found</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex gap-2 mt-10 justify-center">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Previous
          </button>
          <button
            disabled={count <= page * 12}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
