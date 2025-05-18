import React from "react";

function OurCompany() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Our Company</h2>
      <p className="text-center max-w-3xl mx-auto text-gray-600 text-lg mb-10">
        We are a forward-thinking company committed to providing innovative solutions that power progress across industries. With a strong emphasis on quality, technology, and sustainability, we strive to make a lasting impact on every client we serve.
      </p>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-green-600 mb-2">Our Mission</h3>
          <p className="text-gray-600 text-sm">
            To deliver high-quality, innovative products and services that improve lives and empower communities.
          </p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-green-600 mb-2">Our Vision</h3>
          <p className="text-gray-600 text-sm">
            To be a global leader in our field by redefining standards and continuously embracing growth through technology.
          </p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-green-600 mb-2">Core Values</h3>
          <ul className="text-gray-600 text-sm space-y-1">
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-bold text-center mb-4">What We Do</h3>
        <p className="text-center max-w-4xl mx-auto text-gray-600 text-base">
          Our company specializes in delivering cutting-edge products and services that span across energy, technology, and logistics. We work closely with partners to ensure measurable value, customer satisfaction, and long-term impact.
        </p>
      </div>
    </section>
  );
}

export default OurCompany;
