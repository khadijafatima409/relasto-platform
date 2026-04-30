import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AgentList() {
  const [agents, setAgents] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    api
      .get("/auth/agents/", { params: city ? { city } : {} })
      .then(({ data }) => setAgents(data.results || data));
  }, [city]);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-6">Find an Agent</h1>
        <input
          placeholder="Filter by city"
          className="border px-4 py-2 rounded-lg text-sm mb-8"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Link
              key={agent.id}
              to={`/agents/${agent.id}`}
              className="border rounded-xl p-6 hover:shadow-md transition text-center"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 overflow-hidden">
                {agent.profile?.avatar ? (
                  <img
                    src={agent.profile.avatar}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl flex items-center justify-center h-full">
                    👤
                  </span>
                )}
              </div>
              <p className="font-semibold">{agent.username}</p>
              <p className="text-xs text-gray-500">
                {agent.profile?.city}, {agent.profile?.country}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
