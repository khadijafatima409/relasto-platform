import { Link } from "react-router-dom";

const cols = [
  {
    title: "Features",
    links: [
      { label: "Home", path: "/" },
      { label: "About", path: "/contact" },
      { label: "Contact", path: "/contact" },
      { label: "Search", path: "/listings" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "Listing", path: "/listings" },
      { label: "Property Details", path: "/listings" },
      { label: "Agent List", path: "/agents" },
      { label: "Agent Profile", path: "/agents/1" },
    ],
  },
  {
    title: "Documentation",
    links: [
      { label: "Blog", path: "#" },
      { label: "FAQ", path: "#" },
      { label: "Privacy Policy", path: "#" },
      { label: "License", path: "#" },
    ],
  },
  {
    title: "Others",
    links: [
      { label: "Log in", path: "/login" },
      { label: "Reset Password", path: "/login" },
      { label: "Create Account", path: "/register" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t pt-12 pb-6 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        <div>
          <p className="flex items-center gap-2 text-brand-orange font-bold text-xl mb-4">
             <span className="text-2xl">🏠</span> Relasto
          </p>
          <p className="text-xs text-gray-500 mb-4">
            59 Beverly Hill Ave, Brooklyn Town, New York, NY 5630, CA, US
          </p>
          <p className="text-xs text-gray-500 mb-1">+(123) 456-7890</p>
          <p className="text-xs text-gray-500">info@mail.com</p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <p className="font-semibold text-sm mb-4">{col.title}</p>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.path}
                    className="text-xs text-gray-500 hover:text-black transition font-medium"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-gray-400 mt-8">
        © 2022. All rights reserved.
      </p>
    </footer>
  );
}
