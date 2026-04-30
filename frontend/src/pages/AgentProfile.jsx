import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";

export default function AgentProfile() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [properties, setProperties] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("for_rent"); // for_rent, for_sale, about, review
  
  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  useEffect(() => {
    // Fetch Agent Data
    const fetchAgentData = async () => {
      try {
        const [agentRes, propsRes, reviewsRes] = await Promise.all([
          api.get(`/auth/users/${id}/`).catch(() => api.get(`/auth/agents/${id}/`)),
          api.get(`/properties/`, { params: { agent: id } }),
          api.get(`/reviews/`, { params: { agent: id } })
        ]);
        setAgent(agentRes.data);
        setProperties(propsRes.data.results || propsRes.data);
        setReviews(reviewsRes.data.results || reviewsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgentData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/reviews/", {
        agent: id,
        rating: reviewRating,
        comment: reviewComment
      });
      setReviews([res.data, ...reviews]);
      setReviewComment("");
      alert("Review submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review. You may have already reviewed this agent or are not logged in.");
    }
  };

  if (loading) return <div className="p-12 text-center text-gray-500">Loading Agent Profile...</div>;
  if (!agent) return <div className="p-12 text-center text-gray-500">Agent not found.</div>;

  const forRentProperties = properties.filter(p => p.status === 'rent');
  const forSaleProperties = properties.filter(p => p.status === 'sale');

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Banner & Header */}
      <div className="relative h-64 lg:h-80 w-full overflow-hidden">
         <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=2000" alt="Banner" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative -mt-16 sm:-mt-24 mb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
           <img 
              src={agent.profile?.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256"} 
              alt={agent.username} 
              className="w-32 h-32 rounded-2xl object-cover shadow-md border-4 border-white shrink-0"
           />
           <div className="flex-1 text-center sm:text-left mt-2">
              <h1 className="text-2xl font-bold">{agent.username}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500 mt-2">
                 <span className="text-yellow-500">★★★★☆</span> 
                 <span>4.5 review</span>
              </div>
           </div>
           <div className="flex flex-col sm:items-end gap-2 mt-4 sm:mt-0">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium text-black">📞</span> {agent.profile?.phone || '(123) 456-7890'}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span className="font-medium text-black">✉️</span> {agent.email || 'bruno@relasto.com'}
              </div>
              <button className="bg-black text-white px-8 py-2 rounded-lg font-medium text-sm hover:bg-gray-800 transition">
                Contact
              </button>
           </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'for_rent', label: 'For rent' },
            { id: 'for_sale', label: 'For sale' },
            { id: 'about', label: 'About' },
            { id: 'review', label: 'Review' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 text-center font-medium text-sm transition ${
                activeTab === tab.id ? 'bg-black text-white rounded-t-lg' : 'text-gray-500 hover:text-black bg-white border border-transparent hover:border-gray-200 rounded-t-lg'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          
          {/* Properties Tab */}
          {(activeTab === 'for_rent' || activeTab === 'for_sale') && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeTab === 'for_rent' ? forRentProperties : forSaleProperties).length > 0 ? (
                (activeTab === 'for_rent' ? forRentProperties : forSaleProperties).map(p => (
                  <PropertyCard key={p.id} property={p} />
                ))
              ) : (
                <p className="text-gray-400 col-span-full text-center py-12">No properties found in this category.</p>
              )}
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-12">
               <div className="flex-1 text-gray-600 text-sm leading-relaxed space-y-4">
                  <p>A slider is great way to display a slideshow featuring images or videos, usually on your homepage. Adding sliders to your site is no longer difficult. You don't have to know coding anymore.</p>
                  <p>One of the best ways to add beautiful sliders with excellent responsiveness and advanced options.</p>
               </div>
               <div className="w-px bg-gray-200 hidden md:block"></div>
               <div className="flex-1 space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Experiences</h4>
                    <p className="text-sm text-gray-600">15+ years experience</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Property Types</h4>
                    <p className="text-sm text-gray-600">Private House, Villa, Townhouse, Apartment</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Area</h4>
                    <p className="text-sm text-gray-600">California, San Jose, Miami</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                    <p className="text-sm text-gray-600">{agent.profile?.address || '59 Orchard, NY 5005, US'}</p>
                  </div>
                  <div className="flex gap-12">
                     <div>
                       <h4 className="font-semibold text-gray-900 mb-1">License No</h4>
                       <p className="text-sm text-gray-600">BF-0535</p>
                     </div>
                     <div>
                       <h4 className="font-semibold text-gray-900 mb-1">Website</h4>
                       <p className="text-sm text-gray-600 underline text-blue-500">www.abc.com</p>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* Review Tab */}
          {activeTab === 'review' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                 <h2 className="text-xl font-bold">Clients Review</h2>
              </div>
              
              <div className="space-y-6 mb-12">
                {reviews.length > 0 ? (
                  reviews.map(review => (
                    <div key={review.id} className="border border-gray-100 rounded-xl p-6 shadow-sm">
                       <p className="text-gray-600 text-sm leading-relaxed mb-6 font-serif italic">"{review.comment}"</p>
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                         <div>
                           <div className="flex gap-1 text-yellow-500 text-xs mb-1">
                             {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)} <span className="text-gray-500 ml-2">{review.rating}.0 review</span>
                           </div>
                           <h4 className="font-bold text-sm">User {review.user || review.author}</h4>
                         </div>
                       </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No reviews yet.</p>
                )}
              </div>

              {/* Add Review Form */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                 <h3 className="text-lg font-bold mb-4">Write a Review</h3>
                 <form onSubmit={handleReviewSubmit}>
                   <div className="mb-4">
                     <label className="block text-sm font-medium mb-2">Rating</label>
                     <select 
                        value={reviewRating} 
                        onChange={e => setReviewRating(Number(e.target.value))}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2"
                     >
                        {[5, 4, 3, 2, 1].map(num => (
                          <option key={num} value={num}>{num} Stars</option>
                        ))}
                     </select>
                   </div>
                   <div className="mb-4">
                     <label className="block text-sm font-medium mb-2">Comment</label>
                     <textarea 
                        value={reviewComment}
                        onChange={e => setReviewComment(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2"
                        rows="4"
                        placeholder="Write your review here..."
                        required
                     ></textarea>
                   </div>
                   <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg font-medium">
                      Submit Review
                   </button>
                 </form>
              </div>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
}
