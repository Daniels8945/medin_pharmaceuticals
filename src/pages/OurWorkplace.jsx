import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const workplaceImages = [
  { src: "/images/office1.jpg", caption: "Team Collaboration Space" },
  { src: "/images/lab1.jpg", caption: "Product Testing Lab" },
  { src: "/images/office2.jpg", caption: "Main Office" },
  { src: "/images/event1.jpg", caption: "Annual Innovation Meetup" },
];

const partnerLogos = [
  { src: "/images/partner1.png", name: "GreenTech Ltd" },
  { src: "/images/partner2.png", name: "TechBridge Africa" },
  { src: "/images/partner3.png", name: "SolarEdge Partners" },
  { src: "/images/partner4.png", name: "DataSync Systems" },
];

function OurWorkplace() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[80px]">
        <div className="bg-green-700 py-16 px-4 xl:px-12 text-white">
          <Link to="/" className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 font-raleway text-sm">
            <IoArrowBack /> Back to Home
          </Link>
          <p className="text-green-300 font-raleway font-semibold text-sm uppercase tracking-widest mb-2">About Us</p>
          <h1 className="text-4xl xl:text-5xl font-bold font-raleway mb-4">Our Workplace & Partners</h1>
          <p className="text-green-100 font-raleway text-lg max-w-2xl">
            Explore our facilities, production plant, and the partners who help us deliver on our mission.
          </p>
        </div>
        <section className="px-4 xl:px-12 py-14 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold font-raleway mb-8">Our Facilities</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-16">
            {workplaceImages.map((img, index) => (
              <div key={index} className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100">
                <img src={img.src} alt={img.caption} className="w-full h-48 object-cover bg-gray-100" />
                <div className="p-3 bg-white text-center text-sm font-medium font-raleway text-gray-600">
                  {img.caption}
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold font-raleway mb-8">Our Partners</h2>
          <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="w-24 h-24 object-contain mb-2 grayscale hover:grayscale-0 transition bg-gray-100 rounded-xl p-2"
                />
                <p className="text-sm font-semibold font-raleway text-gray-500">{partner.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default OurWorkplace;
