import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import heroImg from "../assets/hero.png";
import img1 from "../assets/img_image.png";

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    city: "",
    property_type: "",
    price_range: "",
  });

  useEffect(() => {
    // Fetch some properties to display as featured
    api
      .get("/properties/", { params: { limit: 6 } })
      .then(({ data }) => {
        setFeaturedProperties(data.results.slice(0, 6)); // Ensure max 6
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchParams.city) query.append("city", searchParams.city);
    if (searchParams.property_type) query.append("property_type", searchParams.property_type);
    navigate(`/listings?${query.toString()}`);
  };

  return (
    <div className="font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#fcf8f4] py-16 px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-xl">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Find a perfect property<br />Where you'll love to live
          </h1>
          <p className="text-gray-500 mb-10 text-lg">
            We helps businesses customize, automate and scale up their ad production and delivery.
          </p>

          <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
              <button className="flex-1 bg-black text-white py-2 rounded-md font-medium text-sm">Buy</button>
              <button className="flex-1 text-gray-600 py-2 rounded-md font-medium text-sm hover:bg-gray-200 transition">Sell</button>
              <button className="flex-1 text-gray-600 py-2 rounded-md font-medium text-sm hover:bg-gray-200 transition">Rent</button>
            </div>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="City/Street"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
                  value={searchParams.city}
                  onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
                />
              </div>
              <div>
                <select
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400 bg-white"
                  value={searchParams.property_type}
                  onChange={(e) => setSearchParams({ ...searchParams, property_type: e.target.value })}
                >
                  <option value="">Property Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="agricultural">Agricultural</option>
                </select>
              </div>
              <div>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400 bg-white">
                  <option value="">Price Range</option>
                  <option value="0-50000">$0 - $50,000</option>
                  <option value="50000-100000">$50,000 - $100,000</option>
                  <option value="100000+">$100,000+</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-black text-white py-3 rounded-xl font-medium mt-2">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-orange-100 rounded-full -z-10 blur-3xl opacity-50"></div>
          {/* using img1 for placeholder if hero isn't a house */}
          <img src={img1} alt="House" className="w-full h-auto object-cover rounded-3xl" />
        </div>
      </section>

      {/* Features & Stats */}
      <section className="py-20 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Simple & easy way to find your dream Appointment</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium">Get Started</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-50 p-6 rounded-2xl">
              <div className="w-10 h-10 bg-orange-100 text-orange-500 flex items-center justify-center rounded-full mb-4">📍</div>
              <h3 className="font-bold text-lg">Search your location</h3>
            </div>
            <div className="bg-orange-50 p-6 rounded-2xl">
              <div className="w-10 h-10 bg-orange-100 text-orange-500 flex items-center justify-center rounded-full mb-4">👁️</div>
              <h3 className="font-bold text-lg">Visit Appointment</h3>
            </div>
            <div className="bg-orange-50 p-6 rounded-2xl">
              <div className="w-10 h-10 bg-orange-100 text-orange-500 flex items-center justify-center rounded-full mb-4">🏠</div>
              <h3 className="font-bold text-lg">Get your dream house</h3>
            </div>
            <div className="bg-orange-50 p-6 rounded-2xl">
              <div className="w-10 h-10 bg-orange-100 text-orange-500 flex items-center justify-center rounded-full mb-4">😊</div>
              <h3 className="font-bold text-lg">Enjoy your Appointment</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-b border-gray-100 py-12">
          <div>
            <h3 className="text-4xl font-bold mb-2">$15.4M</h3>
            <p className="text-gray-500 text-sm">Owned from<br/>Properties transactions</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">25K+</h3>
            <p className="text-gray-500 text-sm">Properties for Buy & sell<br/>Successfully</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">500</h3>
            <p className="text-gray-500 text-sm">Daily completed<br/>transactions</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">600+</h3>
            <p className="text-gray-500 text-sm">Regular Clients</p>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold">Featured Properties</h2>
          <Link to="/listings" className="text-orange-500 font-medium text-sm flex items-center gap-1 hover:text-orange-600">
            Explore All <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        
        <div className="flex gap-8 mb-10 border-b border-gray-200">
          <button className="pb-4 font-medium border-b-2 border-black">Resident Property</button>
          <button className="pb-4 text-gray-500 font-medium hover:text-black transition">Commercial Property</button>
          <button className="pb-4 text-gray-500 font-medium hover:text-black transition">Industrial Property</button>
          <button className="pb-4 text-gray-500 font-medium hover:text-black transition">Agriculture Property</button>
        </div>

        {loading ? (
          <p className="text-center text-gray-400 py-12">Loading properties...</p>
        ) : featuredProperties.length === 0 ? (
          <p className="text-center text-gray-400 py-12">No featured properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </section>

      {/* Testimonials / More Info */}
      <section className="py-20 px-6 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Simple & easy way to find your dream Appointment</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium">Get Started</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
           {/* Placeholder for the collage */}
           <img src={img1} alt="House 1" className="w-full h-48 object-cover rounded-xl" />
           <img src={img1} alt="House 2" className="w-full h-48 object-cover rounded-xl mt-8" />
           <img src={img1} alt="House 3" className="w-full h-48 object-cover rounded-xl" />
           <img src={img1} alt="House 4" className="w-full h-48 object-cover rounded-xl mt-8" />
        </div>
      </section>

      {/* Best Rated Host */}
      <section className="py-20 px-6 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="w-full h-96 bg-orange-500 rounded-3xl absolute -z-10 translate-x-4 translate-y-4"></div>
          <img src={img1} alt="House Exterior" className="w-full h-96 object-cover rounded-3xl shadow-xl" />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">Best rated host on popular rental sites</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. In a free hour, when our power of choice is untrammelled.
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3 text-sm font-medium"><span className="text-green-500">✓</span> Find excellent deals</li>
            <li className="flex items-center gap-3 text-sm font-medium"><span className="text-green-500">✓</span> Friendly host & Fast support</li>
            <li className="flex items-center gap-3 text-sm font-medium"><span className="text-green-500">✓</span> Secure payment system</li>
          </ul>
          <button className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium mb-12">Learn more</button>
          
          <div className="pt-8 border-t border-gray-100 flex gap-6 items-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden shrink-0">
               {/* Avatar */}
               <div className="w-full h-full bg-gray-300"></div>
            </div>
            <div>
              <h4 className="font-bold">Taylor Wilson</h4>
              <p className="text-sm text-gray-500">Product Manager - Static Mania</p>
              <p className="text-sm text-gray-700 italic mt-3 font-serif">
                "Eget eu massa et consectetur. Mauris donec. Leo a, id sed duis proin sodales. Turpis viverra diam porttitor mattis morbi ac amet. Euismod commodo. We get you customer relationships that last."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News & Consult */}
      <section className="bg-[#1e1e1e] text-white py-20 px-6 lg:px-20 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold">News & Consult</h2>
            <Link to="#" className="text-orange-500 font-medium text-sm flex items-center gap-1 hover:text-orange-400">
              Explore All <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "9 Easy-to-Ambitious DIY Projects to Improve Your Home" },
              { title: "Serie Shophouse Launch In July, Opportunity For Investors" },
              { title: "Looking for a New Place? Use This Time to Create Your Wishlist" }
            ].map((article, i) => (
              <div key={i} className="group cursor-pointer">
                <img src={img1} alt={article.title} className="w-full h-64 object-cover rounded-2xl mb-6 group-hover:opacity-90 transition" />
                <h3 className="font-bold text-xl mb-4 group-hover:text-orange-400 transition">{article.title}</h3>
                <span className="text-orange-500 text-sm font-medium flex items-center gap-1">Read the Article &rarr;</span>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-24 bg-gray-300 bg-opacity-10 rounded-3xl p-12 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">For Recent Update, News.</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              We helps businesses customize, automate and scale up their ad production and delivery.
            </p>
            <form className="flex max-w-md mx-auto gap-2">
              <input 
                type="email" 
                placeholder="Enter your Email" 
                className="flex-1 px-4 py-3 rounded-lg text-black focus:outline-none"
              />
              <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
