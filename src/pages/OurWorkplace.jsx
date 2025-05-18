import React from "react";

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
    <section className="px-4 py-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Our Workplace</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-16">
        {workplaceImages.map((img, index) => (
          <div key={index} className="rounded overflow-hidden shadow-md hover:shadow-xl transition">
            <img src={img.src} alt={img.caption} className="w-full h-48 object-cover" />
            <div className="p-3 bg-white text-center text-sm font-medium text-gray-700">
              {img.caption}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-center mb-10">Our Partners</h2>
      <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center">
        {partnerLogos.map((partner, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={partner.src}
              alt={partner.name}
              className="w-24 h-24 object-contain mb-2 grayscale hover:grayscale-0 transition"
            />
            <p className="text-sm font-semibold text-gray-600">{partner.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OurWorkplace;
