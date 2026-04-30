import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VisitRequestForm from "../components/VisitRequestForm";
import PropertyCard from "../components/PropertyCard";

export default function PropertyDetail() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [latestProperties, setLatestProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localInfoTab, setLocalInfoTab] = useState("map");

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top when slug changes
    setLoading(true);
    Promise.all([
      api.get(`/properties/${slug}/`),
      api.get(`/properties/`, { params: { limit: 3 } }),
    ])
      .then(([propRes, latestRes]) => {
        setProperty(propRes.data);
        const results = latestRes.data.results || latestRes.data;
        setLatestProperties(results.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return <div className="p-12 text-center text-gray-500">Loading...</div>;
  if (!property)
    return (
      <div className="p-12 text-center text-gray-500">Property not found.</div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="md:col-span-2">
            <img
              src={
                property.images?.[0]?.image ||
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200"
              }
              className="w-full h-[400px] object-cover rounded-2xl shadow-sm"
              alt="Main"
            />
          </div>
          <div className="grid grid-rows-2 gap-4 h-[400px]">
            <img
              src={
                property.images?.[1]?.image ||
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800"
              }
              className="w-full h-full object-cover rounded-2xl shadow-sm"
              alt="Sub 1"
            />
            <div className="relative w-full h-full">
              <img
                src={
                  property.images?.[2]?.image ||
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
                }
                className="w-full h-full object-cover rounded-2xl shadow-sm"
                alt="Sub 2"
              />
              {property.images?.length > 3 && (
                <div className="absolute inset-0 bg-white bg-opacity-90 rounded-2xl flex items-center justify-center font-bold text-sm cursor-pointer shadow-sm m-4 max-h-12 mt-auto">
                  <span className="flex items-center gap-2">
                    🖼️ {property.images.length - 3} more
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header section */}
            <div>
              <h1 className="text-3xl font-bold mb-3 leading-tight">
                {property.title}
              </h1>
              <p className="text-gray-500 mb-6">
                {property.address}, {property.city}, {property.state}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                  <h3 className="text-3xl font-bold mb-1">
                    ${Number(property.price).toLocaleString()}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">
                    Online / Cash Payment
                  </p>
                </div>
                <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                  <h3 className="text-3xl font-bold mb-1">
                    ${Math.round(Number(property.price) / 12).toLocaleString()}{" "}
                    / month
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">
                    0% EMI for 6 Months
                  </p>
                </div>
              </div>

              <h2 className="text-lg font-bold mb-3">
                Well-constructed {property.area} Sq Ft Home Is Now Offering To
                You In {property.city} For Sale
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                {property.description} A slider is great way to display a
                slideshow featuring images or videos, usually on your homepage.
                Adding sliders to your site is no longer difficult. You don't
                have to know coding anymore.
              </p>
            </div>

            {/* Local Information */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Local Information</h2>
              <div className="flex gap-2 mb-6">
                {["map", "schools", "crime", "shop_eat"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setLocalInfoTab(tab)}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition border ${
                      localInfoTab === tab
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {tab.replace("_", " ").charAt(0).toUpperCase() +
                      tab.replace("_", " ").slice(1)}
                  </button>
                ))}
              </div>
              <div>
                {/* Map placeholder */}
                <img
                  src={
                    "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200"
                  }
                  alt="Map"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Home Highlights */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Home Highlights</h2>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">• Parking</span>{" "}
                  <span className="font-medium">No Info</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">• HOA</span>{" "}
                  <span className="font-medium">None</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">• Outdoor</span>{" "}
                  <span className="font-medium">No Info</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">• Price/Sqft</span>{" "}
                  <span className="font-medium">
                    {property.area > 0
                      ? `$${Math.round(Number(property.price) / property.area)}`
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">• A/C</span>{" "}
                  <span className="font-medium">No Info</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">• Listed</span>{" "}
                  <span className="font-medium">No Info</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-gray-500">• Year Built</span>{" "}
                  <span className="font-medium">2021</span>
                </div>
              </div>
              {property.features?.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold mb-4">Additional Features</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    {property.features.map((f) => (
                      <div key={f.id}>
                        ✓ {f.key}:{" "}
                        <span className="font-medium text-black">
                          {f.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Agent Information */}
            {property.agent && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6">Agent Information</h2>
                <div className="flex items-center gap-4">
                  <img
                    src={
                      property.agent.profile?.avatar ||
                      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256"
                    }
                    alt={property.agent.username}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg">
                      {property.agent.username}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <span className="text-yellow-500">★★★★☆</span> 4 review
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-gray-600">
                      <span className="flex items-center gap-2">
                        ✉️ bruno@relasto.com
                      </span>
                      <span className="flex items-center gap-2">
                        📞 +65 0231 965 965
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 sticky top-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Request for Visit</h2>
              <VisitRequestForm property={property} />
            </div>
          </div>
        </div>

        {/* Latest Properties */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Latest Property Listings</h2>
            <Link
              to="/listings"
              className="text-orange-500 font-medium text-sm flex items-center gap-1 hover:text-orange-600"
            >
              Explore All <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
