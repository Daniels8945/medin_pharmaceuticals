import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const objectives = [
  "Contribute to the healthcare needs of the country.",
  "Production of large and small volume parenteral intravenous fluids in the nation.",
  "Ensure a robust customer/supplier relationship via quality products and on-time delivery.",
  "Ensure that Med-In parenteral fluids are readily available in major healthcare centres across the country.",
  "Engage appropriate partnerships with health institutions applying the Med-In framework.",
];

function OurCompany() {
  const [openTab, setOpenTab] = useState("objectives");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[80px]">

        {/* Hero Banner */}
        <div className="bg-green-700 py-16 px-4 xl:px-12 text-white">
          <Link to="/" className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 font-raleway text-sm">
            <IoArrowBack /> Back to Home
          </Link>
          <p className="text-green-300 font-raleway font-semibold text-sm uppercase tracking-widest mb-2">About Us</p>
          <h1 className="text-4xl xl:text-5xl font-bold font-raleway mb-4">Our Company</h1>
          <p className="text-green-100 font-raleway text-lg max-w-2xl">
            Our contribution to healthcare needs — incorporated in 1987 and committed to making quality pharmaceuticals accessible and affordable.
          </p>
        </div>

        {/* Company Overview */}
        <section className="py-14 px-4 xl:px-12 max-w-7xl mx-auto">
          <p className="text-gray-500 font-raleway text-sm uppercase tracking-widest font-semibold mb-2 text-green-600">Who We Are</p>
          <h2 className="text-3xl xl:text-4xl font-bold font-raleway mb-6">MED-IN Hospital & Pharmaceuticals Services Limited</h2>
          <div className="grid xl:grid-cols-2 gap-10 text-gray-600 font-raleway text-[15px] leading-relaxed">
            <p>
              MED-IN Hospital & Pharmaceuticals Services Limited has its corporate office located at 5C Adekunle Lawal Street, Off 2nd Avenue, Ikoyi, Lagos State, Nigeria. Incorporated in <strong>1987</strong> as a wholesale pharmaceutical company, MED-IN has grown into a key player in the Nigerian health sector.
            </p>
            <p>
              MED-IN's Intravenous (I.V.) fluid production plant began operations in <strong>2018</strong>, after registration of its premises by the Pharmaceutical Council of Nigeria (PCN). Products were approved by NAFDAC in the same year. The I.V. factory is situated on the Lagos-Ibadan Expressway, near Shagamu Interchange, Ogun State, with an installed capacity of <strong>3.6 million bottles per annum</strong> and allowance for 500% expansion. An ongoing project is installing Rommelag 360 equipment with a capacity of 21 million bottles per annum.
            </p>
          </div>
        </section>

        {/* Mission / Vision / Objectives Tabs */}
        <section className="bg-gray-50 py-14 px-4 xl:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex gap-4 mb-10 border-b border-gray-200">
              {["objectives", "mission", "vision"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setOpenTab(tab)}
                  className={`pb-3 px-2 font-raleway font-semibold text-sm capitalize border-b-2 transition-colors ${
                    openTab === tab
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {openTab === "objectives" && (
              <div>
                <h3 className="text-2xl font-bold font-raleway mb-6">Our Objectives</h3>
                <ul className="space-y-4">
                  {objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 font-raleway text-gray-600 text-[15px]">
                      <span className="mt-1 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {openTab === "mission" && (
              <div>
                <h3 className="text-2xl font-bold font-raleway mb-6">Our Mission</h3>
                <p className="text-gray-600 font-raleway text-[16px] leading-relaxed max-w-3xl">
                  Sustainable delivery of high-quality pharmaceutical products of World Health Organization (WHO) and National Agency for Food and Drug Administration (NAFDAC) prescribed standards, at an affordable cost to the Nigerian health sector and the sub-region.
                </p>
              </div>
            )}

            {openTab === "vision" && (
              <div>
                <h3 className="text-2xl font-bold font-raleway mb-6">Our Vision</h3>
                <p className="text-gray-600 font-raleway text-[16px] leading-relaxed max-w-3xl">
                  Meeting the health sector needs through the production of quality parenteral pharmaceutical products at affordable cost.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Cards Row */}
        <section className="py-14 px-4 xl:px-12 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-gray-100 shadow-md rounded-2xl hover:shadow-lg transition">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold font-raleway text-lg">1987</span>
              </div>
              <h3 className="text-lg font-bold font-raleway mb-2">Founded</h3>
              <p className="text-gray-500 text-sm font-raleway">Incorporated as a wholesale pharmaceutical company serving Nigeria's health sector.</p>
            </div>
            <div className="p-8 bg-white border border-gray-100 shadow-md rounded-2xl hover:shadow-lg transition">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold font-raleway text-sm">PCN</span>
              </div>
              <h3 className="text-lg font-bold font-raleway mb-2">PCN & NAFDAC Certified</h3>
              <p className="text-gray-500 text-sm font-raleway">Registered by the Pharmaceutical Council of Nigeria and approved by NAFDAC in 2018.</p>
            </div>
            <div className="p-8 bg-white border border-gray-100 shadow-md rounded-2xl hover:shadow-lg transition">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold font-raleway text-sm">3.6M</span>
              </div>
              <h3 className="text-lg font-bold font-raleway mb-2">Production Capacity</h3>
              <p className="text-gray-500 text-sm font-raleway">3.6 million bottles per annum with allowance for 500% expansion and ongoing Rommelag 360 installation.</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default OurCompany;
