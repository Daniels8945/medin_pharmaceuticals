import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiChevronDown, FiChevronUp, FiMail } from "react-icons/fi";

const jobs = [
  {
    id: 1,
    title: "Chief Finance Officer (CFO)",
    qualification: "BSc or HND in Accounting",
    experience: "Minimum of 15 years cognate experience in the manufacturing industry",
    summary:
      "The CFO will be responsible for overseeing the company's overall financial operations and ensuring long-term financial sustainability. The role involves setting financial strategies, managing financial risks, and maintaining the fiscal health of the organization.",
    responsibilities: [
      "Oversee all financial operations of the company",
      "Develop and implement financial strategies aligned with business goals",
      "Manage budgeting, forecasting, and cash flow",
      "Monitor and mitigate financial risks",
      "Ensure long-term financial growth and stability",
      "Handle investor relations and financial reporting",
    ],
    email: "alexanderejere@medinpharm.com",
    deadline: "15th February, 2026",
  },
  {
    id: 2,
    title: "Production Pharmacist",
    qualification: "Minimum of BSc in Pharmacy",
    experience: "Minimum of 2 years cognate experience in a manufacturing company",
    summary:
      "The Production Pharmacist will support pharmaceutical manufacturing operations with a focus on infusion and drug development, coordinating production staff, ensuring regulatory compliance, and promoting efficiency within the production process.",
    responsibilities: [
      "Participate in infusion and drug development processes",
      "Coordinate and supervise production staff",
      "Ensure compliance with regulatory and quality standards",
      "Support regulatory affairs and documentation requirements",
      "Promote productivity and continuous process improvement",
    ],
    email: "alexanderejere@medinpharm.com",
    deadline: "15th February, 2026",
  },
  {
    id: 3,
    title: "Cost Accountant",
    qualification: "Minimum of BSc or HND in Accounting",
    experience: "Minimum of 5 years relevant experience in a manufacturing company",
    summary:
      "The Cost Accountant will analyze production costs, manage inventory valuation, and provide financial insights to support cost control and informed decision-making across manufacturing operations.",
    responsibilities: [
      "Analyze production costs including materials, labour, and overhead",
      "Manage inventory valuation and develop standard costing systems",
      "Monitor cost variances against budgets and report findings",
      "Identify opportunities for cost reduction and efficiency improvement",
      "Work closely with operations and management for accurate financial reporting",
      "Support management with cost analysis for strategic decision-making",
    ],
    email: "alexanderejere@medinpharm.com",
    deadline: "15th February, 2026",
  },
];

function JobCard({ job }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      <button
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <div>
          <h3 className="text-lg font-bold font-raleway text-gray-800">{job.title}</h3>
          <p className="text-sm text-gray-400 font-raleway mt-1">
            {job.qualification} &nbsp;·&nbsp; Deadline: {job.deadline}
          </p>
        </div>
        <div className="shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
          {open ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </button>

      {open && (
        <div className="px-6 pb-7 border-t border-gray-100 pt-5 animate-in fade-in slide-in-from-top-2">
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-raleway mb-1">Qualification</p>
              <p className="text-sm font-semibold font-raleway text-gray-700">{job.qualification}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-raleway mb-1">Experience</p>
              <p className="text-sm font-semibold font-raleway text-gray-700">{job.experience}</p>
            </div>
          </div>

          <h4 className="text-sm font-bold font-raleway text-gray-600 uppercase tracking-wide mb-2">Job Summary</h4>
          <p className="text-sm text-gray-600 font-raleway mb-5 leading-relaxed">{job.summary}</p>

          <h4 className="text-sm font-bold font-raleway text-gray-600 uppercase tracking-wide mb-3">Key Responsibilities</h4>
          <ul className="space-y-2 mb-6">
            {job.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm font-raleway text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                {r}
              </li>
            ))}
          </ul>

          <a
            href={`mailto:${job.email}`}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-raleway font-semibold text-sm px-5 py-2.5 rounded-full transition"
          >
            <FiMail /> Apply — {job.email}
          </a>
        </div>
      )}
    </div>
  );
}

function Careers() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[80px]">

        {/* Hero Banner */}
        <div className="bg-green-700 py-16 px-4 xl:px-12 text-white">
          <Link to="/" className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 font-raleway text-sm">
            <IoArrowBack /> Back to Home
          </Link>
          <p className="text-green-300 font-raleway font-semibold text-sm uppercase tracking-widest mb-2">Careers</p>
          <h1 className="text-4xl xl:text-5xl font-bold font-raleway mb-4">Join a Team Committed to Excellence</h1>
          <p className="text-green-100 font-raleway text-lg max-w-2xl">
            At MedinPharma, we believe our people are our greatest strength. We are passionate about innovation, growth, and delivering meaningful solutions that make an impact. If you're driven, curious, and ready to grow your career, we'd love to work with you.
          </p>
        </div>

        {/* Job Listings */}
        <section className="py-14 px-4 xl:px-12 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-raleway">Open Positions</h2>
            <span className="bg-green-100 text-green-700 text-xs font-semibold font-raleway px-3 py-1 rounded-full">
              {jobs.length} roles available
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 px-4 xl:px-12 bg-gray-50 text-center">
          <h3 className="text-xl font-bold font-raleway mb-2">Don't see a fit?</h3>
          <p className="text-gray-500 font-raleway text-sm mb-5">Send your CV to us and we'll keep you in mind for future opportunities.</p>
          <a
            href="mailto:info@medinpharma.com"
            className="inline-flex items-center gap-2 border border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-raleway font-semibold text-sm px-6 py-3 rounded-full transition"
          >
            <FiMail /> info@medinpharma.com
          </a>
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default Careers;
