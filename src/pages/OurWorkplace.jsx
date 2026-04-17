import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useSiteContent, DEFAULT_WORKPLACE } from "@/context/SiteContentContext";
import { getBannerUrl } from "@/appwrite";

function OurWorkplace() {
  const { workplaceContent } = useSiteContent();

  const heroTitle    = workplaceContent?.heroTitle    ?? DEFAULT_WORKPLACE.heroTitle;
  const heroSubtitle = workplaceContent?.heroSubtitle ?? DEFAULT_WORKPLACE.heroSubtitle;
  const facilities   = workplaceContent?.facilities   ?? DEFAULT_WORKPLACE.facilities;
  const partners     = workplaceContent?.partners     ?? DEFAULT_WORKPLACE.partners;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[80px]">
        <div className="bg-green-700 py-16 px-4 xl:px-12 text-white">
          <Link to="/" className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 font-raleway text-sm">
            <IoArrowBack /> Back to Home
          </Link>
          <p className="text-green-300 font-raleway font-semibold text-sm uppercase tracking-widest mb-2">About Us</p>
          <h1 className="text-4xl xl:text-5xl font-bold font-raleway mb-4">{heroTitle}</h1>
          <p className="text-green-100 font-raleway text-lg max-w-2xl">{heroSubtitle}</p>
        </div>

        <section className="px-4 xl:px-12 py-14 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold font-raleway mb-8">Our Facilities</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-16">
            {facilities.map((item, index) => {
              const imgSrc = item.imageId ? getBannerUrl(item.imageId) : null;
              return (
                <div key={index} className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100">
                  {imgSrc ? (
                    <img src={imgSrc} alt={item.caption} className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 font-raleway text-sm">
                      No image
                    </div>
                  )}
                  <div className="p-3 bg-white text-center text-sm font-medium font-raleway text-gray-600">
                    {item.caption}
                  </div>
                </div>
              );
            })}
          </div>

          <h2 className="text-2xl font-bold font-raleway mb-8">Our Partners</h2>
          <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center">
            {partners.map((partner, index) => {
              const logoSrc = partner.logoId ? getBannerUrl(partner.logoId) : null;
              return (
                <div key={index} className="flex flex-col items-center">
                  {logoSrc ? (
                    <img
                      src={logoSrc}
                      alt={partner.name}
                      className="w-24 h-24 object-contain mb-2 grayscale hover:grayscale-0 transition bg-gray-100 rounded-xl p-2"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center mb-2 text-gray-400 text-xs font-raleway text-center p-2">
                      No logo
                    </div>
                  )}
                  <p className="text-sm font-semibold font-raleway text-gray-500">{partner.name}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default OurWorkplace;
