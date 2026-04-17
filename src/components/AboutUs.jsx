import React from "react";
import ReactPlayer from "react-player"
import { AboutUsItems } from "../data/data";
import  AboutCard  from "./ui/AboutCard";
import AboutImg from "../assets/pexels.jpeg";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/context/SiteContentContext";


function AboutUs() {
  const { aboutContent } = useSiteContent();

  const whyUsLabel         = aboutContent?.whyUsLabel         ?? "Why Us";
  const commitmentHeading  = aboutContent?.commitmentHeading  ?? "Our Commitment to Quality";
  const aboutUsLabel       = aboutContent?.aboutUsLabel       ?? "About Us";
  const contributionHeading= aboutContent?.contributionHeading?? "Our contribution to health care needs";
  const companyIntro       = aboutContent?.companyIntro       ?? "MED-IN Hospital & Pharmaceuticals Services Limited has its corporate office located at 5C Adekunle Lawal Road of second Avenue, Ikoyi, Lagos State, Nigeria was incorporated in 1987 as a wholesale pharmaceutical company.";
  const companyName        = aboutContent?.companyName        ?? "Medin Pharmaceuticals";
  const companyHistory     = aboutContent?.companyHistory     ?? "";
  const videoUrl           = aboutContent?.videoUrl           ?? "https://youtu.be/lmVzPh3M4ec?si=_bxEI3kCByTFZ5de";

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 xl:px-12 md:py-12 sm:py-12 xl:py-26">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-center w-full">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 xl:w-7xl xl:gap-12 py-4">
                <p className="text-green-500 text-lg font-bold font-raleway flex items-center gap-2">{whyUsLabel}</p>
                <h2 className="text-2xl xl:text-4xl font-bold font-raleway">{commitmentHeading}</h2>
            </div>
        </div>

        <div className="flex md:grid md:grid-flow-col grid-rows-2 xl:flex flex-col xl:flex-row xl:gap-4 gap-4  justify-center w-full py-4">
            {AboutUsItems.map((item, index) => (
                <AboutCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}/>
            ))}
        </div>

        <ReactPlayer
            url={videoUrl}
            playing={false}
            volume={0.5}
            controls={true}
            className="w-full max-w-7xl mt-8"
            width="100%"
            style={{
                overflow: "auto",
                borderRadius: "8px",
                height:"100%"
            }}/>


        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-center w-full">
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 xl:w-7xl xl:gap-12 pt-8">
                        <p className="text-green-500 text-lg font-bold font-raleway flex items-center gap-2">{aboutUsLabel}</p>
                        <h2 className="text-2xl xl:text-4xl font-bold font-raleway">{contributionHeading}</h2>
                    </div>
        </div>

        <div className="flex flex-col xl:items-center justify-center w-full pt-6">
            <p className="xl:w-6xl text-[14px] xl:text-[18px] font-medium font-raleway">{companyIntro}</p>

                <div className="flex flex-col-reverse xl:flex-row pt-16 gap-6">
                    <div>
                        <h2 className="pb-10 text-4xl xl:text-5xl font-bold font-raleway">{companyName}</h2>
                        <p className="xl:w-sm text-[14px] xl:text-[14px] font-medium font-raleway">{companyHistory}</p>
                        <Link to={"/mission&vission"}>
                            <button className="flex items-center text-2xl font-bold font-raleway gap-4 pt-4 cursor-pointer hover:underline">Mission & Vision <FaExternalLinkAlt className="text-green-500" /></button>
                        </Link>
                    </div>
                   <div className="xl:w-3xl min-h-[400px]">
                        <img src={ AboutImg } alt="About image" className="object-cover w-full h-[400px] xl:h--screen rounded-md"/>
                   </div>
                </div>
        </div>
    </div>
  );
}
export default AboutUs;
