import logo from "../assets/logo.png";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";



function Footer() {
  return (
    <div className="w-full h-6xl bg-green-700 py-22 xl:px-12">
      <div className="flex flex-col w-full justify--between px-4">

            <div className="flex- items--center border-b-1 border-zinc-300 pb-8">
                <div className="flex xl:flex-row flex-col items-center justify-between gap-8">
                    <img src={logo} alt="Logo" className="h-8"/>

                      <div className="flex flex--col gap-8 text-white font-raleway font-semibold">
                        <a href="" className="flex items-center justify-center border rounded-full w-[40px] h-[40px] text-2xl"><FaLinkedinIn /></a>
                        <a href="" className="flex items-center justify-center border rounded-full w-[40px] h-[40px] text-2xl"><FaXTwitter /></a>
                        <a href="" className="flex items-center justify-center border rounded-full w-[40px] h-[40px] text-2xl"><IoLogoInstagram /></a>
                        <a href="" className="flex items-center justify-center border rounded-full w-[40px] h-[40px] text-2xl"><FaFacebookF /></a>
                        <a href="" className="flex items-center justify-center border rounded-full w-[40px] h-[40px] text-2xl"><FaYoutube /></a>
                      </div>
                    </div>
            </div>      
            
            <div className="pb-12 border-b-1 border-zinc-300 flex xl:flex-row justify-between flex-col gap-8 text-white font-raleway font-semibold pt-12">
                  
                <div className="flex xl:flex-row flex-col gap-8">
                  <div className="flex flex-col text-white gap-5">
                    <h1 className="text-2xl font-semibold font-worksans">Company</h1>
                        <div className="flex flex-col text-md font-raleway font-semibold text-zinc-300 gap-5">
                            <a href="" className="hover:text-white">Product</a>
                            <a href="" className="hover:text-white">About Us</a>
                            <a href="" className="hover:text-white">Services</a> 
                            <a href="" className="hover:text-white">Privacy Policy</a>
                            <a href="" className="hover:text-white">Terms of Service</a>
                        </div>
                  </div>
                                  
                  <div className="flex flex-col text-white gap-5">
                    <h1 className="text-2xl font-semibold font-worksans">Resources</h1>
                        <div className="flex flex-col text-md font-raleway font-semibold text-zinc-300 gap-5">
                            <a href="" className="hover:text-white">Educational</a>
                            <a href="" className="hover:text-white">Mental Health Resource</a>
                            <a href="" className="hover:text-white">Nutrition</a> 
                            <a href="" className="hover:text-white">Medical Guide</a>
                        </div>
                  </div>
                </div>

                 <div className="flex xl:flex-row flex-col gap-8">
                    <div className="flex flex-col text-white gap-5">
                        <h1 className="text-2xl font-semibold font-worksans">Corporate Office</h1>
                            <div className="flex flex-col text-md font-raleway font-semibold text-zinc-300 gap-5">
                                <p className="hover:text-white">info@medinpharma.com</p>
                                <p className="hover:text-white font-worksans">+234 708 058 2578</p>
                                <p className="hover:text-white font-worksans xl:w-[220px]">5C, Adekunle Lawal Street, Off 2nd Avenue, Ikoyi Lagos</p> 
                            </div>
                      </div>
                      <div className="flex flex-col text-white gap-5">
                        <h1 className="text-2xl font-semibold font-worksans">Factory</h1>
                            <div className="flex flex-col text-md font-raleway font-semibold text-zinc-300 gap-5">
                                <p className="hover:text-white">info@medinpharma.com</p>
                                <p className="hover:text-white font-worksans">+234 9060734377</p>
                                <p className="hover:text-white font-worksans xl:w-[220px]">Lagos-Ibadan Express way Shagamu Interchange</p> 
                            </div>
                      </div>
                 </div>
            
            </div>

            <p className="pt-10 text-sm font-normal font-worksans text-white">© Medin Pharmaceuticals 2025 - All rights reserved | Designed by Hydro Bytes</p>
        </div>
    </div>
  );
}
export default Footer;