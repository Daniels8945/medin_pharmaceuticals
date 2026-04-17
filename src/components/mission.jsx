import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Header from "./Header";
import Footer from "./Footer";
import { useSiteContent, DEFAULT_MISSION } from "@/context/SiteContentContext";

function Mission() {
  const { missionContent } = useSiteContent();
  const heroTitle      = missionContent?.heroTitle      ?? DEFAULT_MISSION.heroTitle;
  const objectivesText = missionContent?.objectivesText ?? DEFAULT_MISSION.objectivesText;
  const visionText     = missionContent?.visionText     ?? DEFAULT_MISSION.visionText;
  const missionText    = missionContent?.missionText    ?? DEFAULT_MISSION.missionText;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[80px]">
        <div className="bg-green-700 py-16 px-4 xl:px-12 text-white">
          <Link to={"/"} className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 font-raleway text-sm">
            <IoArrowBack /> Back to Home
          </Link>
          <p className="text-green-300 font-raleway font-semibold text-sm uppercase tracking-widest mb-2">About Us</p>
          <h1 className="text-4xl xl:text-5xl font-bold font-raleway mb-4">{heroTitle}</h1>
        </div>

        <div className="flex justify-center items-center xl:p-12 p-4 h-fit w-full">
          <div className="w-6xl flex flex-wrap gap-12">
            <div className="flex flex-col gap-6">
              <h1 className="mt-4 text-5xl font-semibold font-raleway hover:scale-[1.050] hover:text-green-500 transition-all duration-300 ease-in-out">Objectives</h1>
              <p className="font-worksans font-medium hover:scale-[1.015] transition-all duration-300 ease-in-out whitespace-pre-line">{objectivesText}</p>
            </div>

            <div className="flex flex-col gap-6">
              <h1 className="mt-4 text-5xl font-semibold font-raleway hover:scale-[1.050] hover:text-green-500 transition-all duration-300 ease-in-out">Vision</h1>
              <p className="font-worksans font-medium hover:scale-[1.015] transition-all duration-300 ease-in-out">{visionText}</p>
            </div>

            <div className="flex flex-col gap-6">
              <h1 className="mt-4 text-5xl font-semibold font-raleway hover:scale-[1.050] hover:text-green-500 transition-all duration-300 ease-in-out">Mission</h1>
              <p className="font-worksans font-medium hover:scale-[1.015] transition-all duration-300 ease-in-out">{missionText}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Mission;
