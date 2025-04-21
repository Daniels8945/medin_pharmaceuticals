import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
function Mission() {
    return(
    <div className="h-screen w-full"> 

            <div className="gap-2 z-10 sticky top-0 px-4 xl:px-12 shadow-md flex flex-col xl:flex-row xl:items-center-safe justify-center xl:justify-between bg-white w-full h-[100px]">
                       <Link to={"/"}><IoArrowBack className='text-green-500 text-4xl'/></Link>
                       <h1 className="xl:text-4xl text-2xl font-semibold font-raleway text-green-500">United by Purpose</h1>
            </div>

        <div className="flex justify-center items-center xl:p-12 p-4 h-fit w-full">
            <div className="w-6xl flex flex-wrap gap-12">
                <div className="flex flex-col gap-6">
                    <h1  className="mt-4 text-5xl font-semibold font-raleway hover:scale-[1.050] hover:text-green-500 transition-all duration-300 ease-in-out">Objectives</h1>
                    <p className="font-worksans font-medium hover:scale-[1.015] transition-all duration-300 ease-in-out">To contribute to the Healthcare needs of the Country. <br />
                        Production of large and small volume parental intravenous fluids in the nation.<br />
                        To ensure a robust customer/supplier relationship via:<br />
                        Quality products.<br />
                        On-time delivery.<br />
                        To ensure that Med-In parental fluids are readily available in Major health care centers in the Country.
                        To also engage appropriate partnerships with Health Institutions applying Med-In framework</p>
                </div>

                <div className="flex flex-col gap-6">
                    <h1  className="mt-4 text-5xl font-semibold font-raleway hover:scale-[1.050] hover:text-green-500 transition-all duration-300 ease-in-out">Vission</h1>
                    <p className="font-worksans font-medium hover:scale-[1.015] transition-all duration-300 ease-in-out">Meeting the health sector needs through the production of quality parenteral pharmaceutical products at affordable cost.</p>
                </div>
            
            <div className="flex flex-col gap-6">
                    <h1  className="mt-4 text-5xl font-semibold font-raleway hover:scale-[1.050] hover:text-green-500 transition-all duration-300 ease-in-out">Mission</h1>
                    <p className="font-worksans font-medium hover:scale-[1.015] transition-all duration-300 ease-in-out">Sustainable delivery of high-quality pharmaceutical products of world health organization (WHO) and national agency for food and drug administration (NAFDAC) prescribed standards, at an affordable cost to the Nigerian health sector and the sub-region.</p>
            </div>
            
            </div>
        </div>
    </div>
)}
export default Mission;