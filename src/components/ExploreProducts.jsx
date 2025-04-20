import { Link } from "react-router-dom";
import image  from "../assets/product.png";
import { IoArrowBack } from "react-icons/io5";

function ExploreProducts(){
    return(

        <div>
            <div className="z-10 sticky top-0 px-12 shadow-md flex items-center-safe justify-between bg-white w-full h-[100px]">
                <Link to={"/"}><IoArrowBack className='text-green-500 text-4xl'/></Link>
                <h1 className="xl:text-4xl text-2xl font-semibold font-raleway">All available products</h1>
            </div>  


        <div className="xl:grid xl:grid-cols-2 py-24 xl:px-16 px-4  gap-5 border-5">
            
            <div className="flex flex-col xl:flex-row gap-4 justify-center py-4 pb-12 max--w-screen border-4">
                <div className="max-w-[400px] h-fit -h-[400px] bg-white border-1 border-neutral-200 shadow-md rounded-lg flex flex-col items-center">
                    <img src={image} alt="product image" className="rounded-t-md h-[320px] w-full object-cover hover:scale-[1.015]"/>
                    <div className="relative flex flex-col w-full p-4 gap-2">
                        <h3 className="break-all text-2xl font-semibold font-raleway">Paracitamol</h3>
                    </div>
                </div>
                        
                <div className="relative flex flex-col gap-12 justify-between items-center bg-white shadow-md rounded-md">
                    <p className="break-all xl:max-w-[400px] p-4 text-md font-normal font-raleway">KA:KOnOnksDvonKA:KOkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoan</p>
                </div>
            </div>
            <div className="flex flex-col xl:flex-row gap-4 justify-center py-4 pb-12 max--w-screen border-4">
                <div className="max-w-[400px] h-fit -h-[400px] bg-white border-1 border-neutral-200 shadow-md rounded-lg flex flex-col items-center">
                    <img src={image} alt="product image" className="rounded-t-md h-[320px] w-full object-cover hover:scale-[1.015]"/>
                    <div className="relative flex flex-col w-full p-4 gap-2">
                        <h3 className="break-all text-2xl font-semibold font-raleway">Paracitamol</h3>
                    </div>
                </div>
                        
                <div className="relative flex flex-col gap-12 justify-between items-center bg-white shadow-md rounded-md">
                    <p className="break-all xl:max-w-[400px] p-4 text-md font-normal font-raleway">KA:KOnOnksDvonKA:KOkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoanvono;DviosDvonKA:KOnkovnoan</p>
                </div>
            </div>

 

          
        </div>
    </div>
    )
}
export default ExploreProducts;