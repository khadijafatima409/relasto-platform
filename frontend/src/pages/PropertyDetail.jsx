import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VisitRequestForm from "../components/VisitRequestForm";

export default function PropertyDetail() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/properties/${slug}/`).then(({ data }) => {
      setProperty(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="p-12">Loading...</div>;
  if (!property) return <div className="p-12">Property not found.</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Image gallery */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {property.images.slice(0, 4).map((img, i) => (
            <img
              key={img.id}
              src={img.image}
              alt=""
              className={`rounded-xl object-cover ${i === 0 ? "col-span-2 h-72" : "h-40"}`}
            />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Details */}
          <div className="md:col-span-2">
            <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
            <p className="text-gray-500 text-sm mb-4">
              {property.address}, {property.city}, {property.state}
            </p>
            <p className="text-brand-orange text-2xl font-bold mb-6">
              ${Number(property.price).toLocaleString()}
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {property.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                ["Bedrooms", property.bedrooms],
                ["Bathrooms", property.bathrooms],
                ["Area", `${property.area} sqft`],
              ].map(([label, val]) => (
                <div key={label} className="border rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="font-bold">{val}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div>
                <h2 className="font-semibold mb-3">Features</h2>
                <div className="grid grid-cols-2 gap-2">
                  {property.features.map((f) => (
                    <div key={f.id} className="text-sm text-gray-600">
                      ✓ {f.key}: {f.value}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Agent + Visit form */}
          <div>
            {property.agent && (
              <div className="border rounded-xl p-4 mb-4">
                <p className="text-xs text-gray-400 mb-1">Listed by</p>
                <p className="font-semibold">{property.agent.username}</p>
                <p className="text-xs text-gray-500">
                  {property.agent.profile?.phone}
                </p>
              </div>
            )}
            <VisitRequestForm property={property} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
