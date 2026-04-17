import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useSiteContent, DEFAULT_COMPANY } from "@/context/SiteContentContext";

function OurCompany() {
  const [openTab, setOpenTab] = useState("objectives");
  const { companyContent } = useSiteContent();

  const heroTitle    = companyContent?.heroTitle    ?? DEFAULT_COMPANY.heroTitle;
  const heroSubtitle = companyContent?.heroSubtitle ?? DEFAULT_COMPANY.heroSubtitle;
  const overview1    = companyContent?.overview1    ?? DEFAULT_COMPANY.overview1;
  const overview2    = companyContent?.overview2    ?? DEFAULT_COMPANY.overview2;
  const objectives   = companyContent?.objectives   ?? DEFAULT_COMPANY.objectives;
  const missionText  = companyContent?.missionText  ?? DEFAULT_COMPANY.missionText;
  const visionText   = companyContent?.visionText   ?? DEFAULT_COMPANY.visionText;

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
          <h1 className="text-4xl xl:text-5xl font-bold font-raleway mb-4">{heroTitle}</h1>
          <p className="text-green-100 font-raleway text-lg max-w-2xl">{heroSubtitle}</p>
        </div>

        {/* Company Overview */}
        <section className="py-14 px-4 xl:px-12 max-w-7xl mx-auto">
          <p className="text-gray-500 font-raleway text-sm uppercase tracking-widest font-semibold mb-2 text-green-600">Who We Are</p>
          <h2 className="text-3xl xl:text-4xl font-bold font-raleway mb-6">MED-IN Hospital & Pharmaceuticals Services Limited</h2>
          <div className="grid xl:grid-cols-2 gap-10 text-gray-600 font-raleway text-[15px] leading-relaxed">
            <p>{overview1}</p>
            <p>{overview2}</p>
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
                <p className="text-gray-600 font-raleway text-[16px] leading-relaxed max-w-3xl">{missionText}</p>
              </div>
            )}

            {openTab === "vision" && (
              <div>
                <h3 className="text-2xl font-bold font-raleway mb-6">Our Vision</h3>
                <p className="text-gray-600 font-raleway text-[16px] leading-relaxed max-w-3xl">{visionText}</p>
              </div>
            )}
          </div>
        </section>

        {/* Stats Cards */}
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
