import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
 
function ProductCard ({name, description, image}) {
return (
        <div className="relative h-[400px] bg-white border-1 border-neutral-200 shadow-md rounded-lg flex flex-col items-center">
           <img src={image} alt="product image" className="rounded-t-md h-[220px] w-full object-cover hover:scale-[1.015]"/>
          <div className=" flex flex-col w-full p-4 gap-2">
            <h3 className="break-all lg:text-lg font-semibold font-raleway">{name}</h3>
            <p className="break-all text-gray-500 font-raleway truncate">{description}</p>
            <Link to={"/exploreproducts"} className="break-all cursor-pointer text-black mt-4 text-md truncate font-bold font-raleway flex items-center gap-4">View {name} details<IoArrowForward className="text-green-500 text-lg" /></Link>
          </div>
        </div>
  );
}
export default ProductCard;