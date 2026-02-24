import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const directors = [
  {
    name: "Dr. Jane Doe",
    title: "Chairperson",
    photo: "/images/jane.jpg",
    bio: "Dr. Jane brings 20 years of leadership in the energy sector and sits on multiple international boards."
  },
  {
    name: "Mr. John Smith",
    title: "Managing Director",
    photo: "/images/john.jpg",
    bio: "A strategic thinker with expertise in business development and operations management."
  },
  {
    name: "Mrs. Linda White",
    title: "Director of Finance",
    photo: "/images/linda.jpg",
    bio: "Linda has over 15 years of experience in corporate finance and capital planning."
  },
];

function BoardOfDirectors() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[80px]">
        <div className="bg-green-700 py-16 px-4 xl:px-12 text-white">
          <Link to="/" className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 font-raleway text-sm">
            <IoArrowBack /> Back to Home
          </Link>
          <p className="text-green-300 font-raleway font-semibold text-sm uppercase tracking-widest mb-2">About Us</p>
          <h1 className="text-4xl xl:text-5xl font-bold font-raleway mb-4">Board of Directors</h1>
          <p className="text-green-100 font-raleway text-lg max-w-2xl">
            Meet the leadership team guiding MED-IN Pharmaceuticals.
          </p>
        </div>
        <section className="py-14 px-4 xl:px-12 max-w-6xl mx-auto">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {directors.map((director, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <img
                  src={director.photo}
                  alt={director.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4 bg-gray-100"
                />
                <h3 className="text-lg font-bold font-raleway">{director.name}</h3>
                <p className="text-green-600 font-medium font-raleway text-sm">{director.title}</p>
                <p className="text-sm text-gray-500 font-raleway mt-3 leading-relaxed">{director.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default BoardOfDirectors;