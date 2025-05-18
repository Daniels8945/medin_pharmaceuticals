import React from "react";

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
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Board of Directors</h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {directors.map((director, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={director.photo}
              alt={director.name}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{director.name}</h3>
            <p className="text-green-600 font-medium">{director.title}</p>
            <p className="text-sm text-gray-700 mt-3">{director.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BoardOfDirectors;