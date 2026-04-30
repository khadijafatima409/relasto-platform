import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="relative">
          <p className="text-[8rem] font-bold text-gray-300 leading-none select-none">
            404
          </p>
          {/* Astronaut illustration placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl">🧑‍🚀</span>
          </div>
        </div>
        <p className="text-xl font-bold mt-6 mb-4">Something wrong!</p>
        <Link
          to="/"
          className="border rounded-xl px-8 py-3 font-medium flex items-center gap-2 hover:bg-white transition"
        >
          Homepage →
        </Link>
      </div>
    </div>
  );
}
