import React, { useEffect, useRef } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { MdLocalPharmacy } from "react-icons/md";
import { FiMapPin, FiUser, FiMail, FiPhone, FiBriefcase } from "react-icons/fi";

function DistributorModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    state: "",
    experience: "",
    message: "",
  });

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  const nigerianStates = [
    "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
    "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT – Abuja","Gombe",
    "Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos",
    "Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto",
    "Taraba","Yobe","Zamfara",
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      onClick={handleBackdropClick}
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
    >
      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-zinc-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <MdLocalPharmacy className="text-green-600 text-xl" />
              </div>
              <div>
                <h2 className="font-raleway font-bold text-xl text-gray-900">
                  Become a Distributor
                </h2>
                <p className="text-sm text-zinc-500 font-raleway">
                  Partner with Medin Pharmaceuticals
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-700"
            >
              <RiCloseLargeLine />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {submitted ? (
            <div className="text-center py-10 flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-raleway font-bold text-xl text-gray-900">Application Received!</h3>
              <p className="text-zinc-500 font-raleway text-sm max-w-xs">
                Thank you, <strong>{form.fullName}</strong>! Our team will review your application and reach out within 3–5 business days.
              </p>
              <button
                onClick={onClose}
                className="mt-4 bg-green-500 hover:bg-green-600 transition-colors text-white font-raleway font-semibold px-8 py-2.5 rounded-full text-sm"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p className="text-sm text-zinc-500 font-raleway">
                Fill out the form below and a member of our team will contact you to discuss the distribution partnership.
              </p>

              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-raleway font-semibold text-gray-700 flex items-center gap-1.5">
                  <FiUser className="text-green-500" /> Full Name
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Amaka Okonkwo"
                  className="border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-raleway focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                />
              </div>

              {/* Email + Phone row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-raleway font-semibold text-gray-700 flex items-center gap-1.5">
                    <FiMail className="text-green-500" /> Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-raleway focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-raleway font-semibold text-gray-700 flex items-center gap-1.5">
                    <FiPhone className="text-green-500" /> Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+234 80..."
                    className="border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-raleway focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                  />
                </div>
              </div>

              {/* Company */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-raleway font-semibold text-gray-700 flex items-center gap-1.5">
                  <FiBriefcase className="text-green-500" /> Company / Business Name
                </label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                  placeholder="Your company or business name"
                  className="border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-raleway focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                />
              </div>

              {/* State + Experience row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-raleway font-semibold text-gray-700 flex items-center gap-1.5">
                    <FiMapPin className="text-green-500" /> State
                  </label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                    className="border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-raleway focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all bg-white"
                  >
                    <option value="">Select state</option>
                    {nigerianStates.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-raleway font-semibold text-gray-700">
                    Years of Experience
                  </label>
                  <select
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    required
                    className="border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-raleway focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all bg-white"
                  >
                    <option value="">Select range</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1 – 3 years</option>
                    <option value="3-5">3 – 5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-raleway font-semibold text-gray-700">
                  Additional Information <span className="text-zinc-400 font-normal">(optional)</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell us about your distribution network, target region, etc."
                  className="border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-raleway focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-2 w-full bg-green-500 hover:bg-green-600 active:scale-[0.98] transition-all text-white font-raleway font-bold py-3 rounded-full text-sm shadow-md shadow-green-200"
              >
                Submit Application
              </button>

              <p className="text-xs text-center text-zinc-400 font-raleway">
                By submitting you agree to our privacy policy. We'll never share your information.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default DistributorModal;
