import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-lg transition">
      <img
        src={property.primary_image || "https://placehold.co/400x250"}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">
          {property.city}, {property.state}
        </p>
        <h3 className="font-semibold text-sm mb-2 truncate">
          {property.title}
        </h3>
        <div className="flex gap-4 text-xs text-gray-500 mb-3">
          <span>🛏 {property.bedrooms}</span>
          <span>🚿 {property.bathrooms}</span>
          <span>📐 {property.area} sq ft</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-bold text-brand-orange">
            ${Number(property.price).toLocaleString()}
          </p>
          <Link
            to={`/listings/${property.slug}`}
            className="text-xs border px-3 py-1 rounded-lg hover:bg-black hover:text-white transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
