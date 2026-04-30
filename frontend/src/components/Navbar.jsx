import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b bg-white sticky top-0 z-50">
      <Link
        to="/"
        className="flex items-center gap-2 text-brand-orange font-bold text-xl"
      >
        <span className="text-2xl">🏠</span> Relasto
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
        <Link to="/" className="flex items-center gap-1 hover:text-black">
          Home <span className="text-gray-400 text-xs">▼</span>
        </Link>
        <Link to="/listings" className="flex items-center gap-1 hover:text-black">
          Listing <span className="text-gray-400 text-xs">▼</span>
        </Link>
        <Link to="/agents" className="flex items-center gap-1 hover:text-black">
          Agents <span className="text-gray-400 text-xs">▼</span>
        </Link>
        <Link to="/listings" className="hover:text-black">
          Property
        </Link>
        <Link to="#" className="hover:text-black">
          Blog
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <button className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-black">
          <span className="text-lg">🔍</span> Search
        </button>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-brand-orange">{user.username}</span>
            {user.is_agent && (
              <Link to="/add-property" className="text-sm font-medium text-black hover:text-orange-500">
                + Add Property
              </Link>
            )}
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="text-sm border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-[#1e1e1e] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition"
          >
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}
