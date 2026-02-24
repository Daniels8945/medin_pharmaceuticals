import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[80px]">

        {/* Hero Banner */}
        <div className="bg-green-700 py-16 px-4 xl:px-12 text-white">
          <Link to="/" className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 font-raleway text-sm">
            <IoArrowBack /> Back to Home
          </Link>
          <p className="text-green-300 font-raleway font-semibold text-sm uppercase tracking-widest mb-2">Contact</p>
          <h1 className="text-4xl xl:text-5xl font-bold font-raleway mb-4">Get In Touch</h1>
          <p className="text-green-100 font-raleway text-lg max-w-2xl">
            Have a question about our products or want to become a distributor? Reach out and our team will get back to you.
          </p>
        </div>

        {/* Contact Info + Form */}
        <section className="py-14 px-4 xl:px-12 max-w-7xl mx-auto">
          <div className="grid xl:grid-cols-2 gap-14">

            {/* Left: Address Cards */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold font-raleway mb-6">Our Locations</h2>
              </div>

              {/* Corporate Office */}
              <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <FiMapPin className="text-lg" />
                  </div>
                  <h3 className="font-bold font-raleway text-gray-800">Corporate Office</h3>
                </div>
                <p className="text-gray-500 font-raleway text-sm leading-relaxed">
                  5C, Adekunle Lawal Street,<br />
                  Off 2nd Avenue, Ikoyi,<br />
                  Lagos, Nigeria
                </p>
              </div>

              {/* Factory */}
              <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <FiMapPin className="text-lg" />
                  </div>
                  <h3 className="font-bold font-raleway text-gray-800">Factory</h3>
                </div>
                <p className="text-gray-500 font-raleway text-sm leading-relaxed">
                  Lagos-Ibadan Expressway,<br />
                  Shagamu Interchange,<br />
                  Ogun State, Nigeria
                </p>
              </div>

              {/* Contact Details */}
              <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
                <h3 className="font-bold font-raleway text-gray-800 mb-4">Contact Details</h3>
                <div className="flex flex-col gap-3">
                  <a href="mailto:info@medinpharma.com" className="flex items-center gap-3 text-sm font-raleway text-gray-500 hover:text-green-600 transition">
                    <FiMail className="text-green-500 shrink-0" />
                    info@medinpharma.com
                  </a>
                  <a href="tel:+2349060734377" className="flex items-center gap-3 text-sm font-raleway text-gray-500 hover:text-green-600 transition">
                    <FiPhone className="text-green-500 shrink-0" />
                    +234 9060734377 (Factory)
                  </a>
                  <a href="tel:+2347080582578" className="flex items-center gap-3 text-sm font-raleway text-gray-500 hover:text-green-600 transition">
                    <FiPhone className="text-green-500 shrink-0" />
                    +234 708 058 2578 (Office)
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <h2 className="text-2xl font-bold font-raleway mb-6">Send a Message</h2>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-[300px] bg-green-50 rounded-2xl border border-green-200 text-center p-8">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                  <h3 className="text-lg font-bold font-raleway text-green-700 mb-2">Message Sent!</h3>
                  <p className="text-sm font-raleway text-gray-500">Thank you for reaching out. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-zinc-400 font-raleway" htmlFor="name">Full Name</label>
                    <input
                      className="w-full h-[44px] px-4 bg-gray-100 rounded-xl font-raleway font-medium text-sm text-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                      type="text" id="name" placeholder="Your Name" required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-zinc-400 font-raleway" htmlFor="email">Email Address</label>
                    <input
                      className="w-full h-[44px] px-4 bg-gray-100 rounded-xl font-raleway font-medium text-sm text-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                      type="email" id="email" placeholder="Your Email" required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-zinc-400 font-raleway" htmlFor="subject">Subject</label>
                    <input
                      className="w-full h-[44px] px-4 bg-gray-100 rounded-xl font-raleway font-medium text-sm text-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                      type="text" id="subject" placeholder="Subject" required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-zinc-400 font-raleway" htmlFor="message">Message</label>
                    <textarea
                      className="w-full px-4 py-3 bg-gray-100 rounded-xl font-raleway font-medium text-sm text-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
                      id="message" rows="5" placeholder="Your Message" required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-raleway font-semibold rounded-xl transition"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Map */}
        <div className="h-[400px] w-full flex justify-center px-4 xl:px-12 mb-12">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126915.16558543697!2d3.3210594!3d6.5243793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d5779d66f5b%3A0x1f747b4ddc6e44e6!2sIkoyi%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2s!4v1631379436801!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </main>
      <Footer />
    </div>
  );
}

export default ContactPage;
