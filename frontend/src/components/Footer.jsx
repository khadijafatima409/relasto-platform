import { Link } from "react-router-dom";

const cols = {
  Features: ["Home v1", "Home v2", "About", "Contact", "Search"],
  Information: [
    "Listing v1",
    "Listing v2",
    "Property Details",
    "Agent List",
    "Agent Profile",
  ],
  Documentation: ["Blog", "FAQ", "Privacy Policy", "License"],
  Others: [
    "Log in",
    "Enter OTP",
    "New Password",
    "Reset Password",
    "Create Account",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t pt-12 pb-6 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        <div>
          <p className="text-brand-orange font-bold text-lg mb-2">🏠 Relasto</p>
          <p className="text-xs text-gray-500 mb-4">
            59 Beverly Hill Ave, Brooklyn Town, New York, NY 5630, CA, US
          </p>
          <p className="text-xs text-gray-500">+(123) 456-7890</p>
          <p className="text-xs text-gray-500">info@mail.com</p>
        </div>
        {Object.entries(cols).map(([title, links]) => (
          <div key={title}>
            <p className="font-semibold text-sm mb-3">{title}</p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l}>
                  <Link
                    to="#"
                    className="text-xs text-gray-500 hover:text-brand-orange"
                  >
                    {l}
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
