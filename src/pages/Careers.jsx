import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiChevronDown, FiChevronUp, FiMail } from "react-icons/fi";
import { useSiteContent, DEFAULT_CAREERS } from "@/context/SiteContentContext";

function JobCard({ job }) {
  const [open, setOpen] = useState(false);
  const responsibilities = Array.isArray(job.responsibilities) ? job.responsibilities : [];

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
        <div className="px-6 pb-7 border-t border-gray-100 pt-5">
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

          {responsibilities.length > 0 && (
            <>
              <h4 className="text-sm font-bold font-raleway text-gray-600 uppercase tracking-wide mb-3">Key Responsibilities</h4>
              <ul className="space-y-2 mb-6">
                {responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-raleway text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </>
          )}

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
  const { careersContent } = useSiteContent();

  const heroTitle    = careersContent?.heroTitle    ?? DEFAULT_CAREERS.heroTitle;
  const heroSubtitle = careersContent?.heroSubtitle ?? DEFAULT_CAREERS.heroSubtitle;
  const ctaEmail     = careersContent?.ctaEmail     ?? DEFAULT_CAREERS.ctaEmail;
  const jobs         = Array.isArray(careersContent?.jobs) && careersContent.jobs.length > 0
    ? careersContent.jobs
    : DEFAULT_CAREERS.jobs;

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
          <h1 className="text-4xl xl:text-5xl font-bold font-raleway mb-4">{heroTitle}</h1>
          <p className="text-green-100 font-raleway text-lg max-w-2xl">{heroSubtitle}</p>
        </div>

        {/* Job Listings */}
        <section className="py-14 px-4 xl:px-12 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-raleway">Open Positions</h2>
            <span className="bg-green-100 text-green-700 text-xs font-semibold font-raleway px-3 py-1 rounded-full">
              {jobs.length} {jobs.length === 1 ? "role" : "roles"} available
            </span>
          </div>
          {jobs.length === 0 ? (
            <p className="text-gray-400 font-raleway text-center py-12">No open positions at this time. Check back soon.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {jobs.map((job, i) => (
                <JobCard key={i} job={job} />
              ))}
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="py-12 px-4 xl:px-12 bg-gray-50 text-center">
          <h3 className="text-xl font-bold font-raleway mb-2">Don't see a fit?</h3>
          <p className="text-gray-500 font-raleway text-sm mb-5">Send your CV to us and we'll keep you in mind for future opportunities.</p>
          <a
            href={`mailto:${ctaEmail}`}
            className="inline-flex items-center gap-2 border border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-raleway font-semibold text-sm px-6 py-3 rounded-full transition"
          >
            <FiMail /> {ctaEmail}
          </a>
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default Careers;
