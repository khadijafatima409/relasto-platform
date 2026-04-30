import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b bg-white sticky top-0 z-50">
      <Link
        to="/"
        className="flex items-center gap-2 text-brand-orange font-bold text-lg"
      >
        🏠 Relasto
      </Link>
      <div className="hidden md:flex gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-brand-orange">
          Home
        </Link>
        <Link to="/listings" className="hover:text-brand-orange">
          Listing
        </Link>
        <Link to="/agents" className="hover:text-brand-orange">
          Agents
        </Link>
        <Link to="/contact" className="hover:text-brand-orange">
          Contact
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-600">{user.username}</span>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
          >
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}
