import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real project: POST to a contact API
    setSent(true);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-2">Get in touch</h1>
        <p className="text-center text-gray-500 mb-12 max-w-lg mx-auto">
          We'd love to hear from you. Fill in the form and we'll get back to you
          as soon as possible.
        </p>
        <div className="border rounded-2xl p-8 grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="font-bold text-lg mb-6">Send a message</h2>
            {sent ? (
              <p className="text-green-600 font-medium">
                Message sent! We'll be in touch soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  ["name", "Full Name", "text"],
                  ["email", "Email Address", "email"],
                  ["phone", "Phone Number", "tel"],
                ].map(([field, ph, type]) => (
                  <div
                    key={field}
                    className="flex items-center border rounded-xl px-4 py-3"
                  >
                    <input
                      type={type}
                      placeholder={ph}
                      className="flex-1 outline-none text-sm"
                      value={form[field]}
                      onChange={(e) =>
                        setForm({ ...form, [field]: e.target.value })
                      }
                      required={field !== "phone"}
                    />
                  </div>
                ))}
                <textarea
                  placeholder="Message"
                  rows={5}
                  className="w-full border rounded-xl px-4 py-3 text-sm outline-none resize-none"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
                >
                  Send Request
                </button>
              </form>
            )}
          </div>
          {/* Info */}
          <div>
            <h2 className="font-bold text-lg mb-4">Office Address</h2>
            <p className="text-gray-600 text-sm mb-4">
              1421 San Pedro St, Los Angeles, CA 90015
            </p>
            <p className="text-sm mb-1">📞 (123) 456-7890</p>
            <p className="text-sm mb-6">✉️ info@mail.com</p>
            <h2 className="font-bold text-lg mb-3">Social</h2>
            <div className="flex gap-3">
              {["Facebook", "LinkedIn", "Twitter", "YouTube"].map((s) => (
                <span
                  key={s}
                  className="w-8 h-8 border rounded-full flex items-center justify-center text-xs text-gray-500 hover:border-brand-orange cursor-pointer"
                >
                  {s[0]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
