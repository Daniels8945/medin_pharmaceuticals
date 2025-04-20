
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom"

import useFetch from "../UseFetch";
import ProductItems from "./ui/Allproducts";

function Products(){

    const { data: allProducts } = useFetch('http://localhost:5172/allProducts');
    return(
        <div className="mx-12 py-12 flex flex-col gap-8">
           <div className="flex items-center justify-between">
                <h1 className="text-4xl font-semibold font-raleway">All available products</h1>
                <Link to="/addproducts" className="flex items-center text-2xl font-bold font-raleway gap-4 pt-4 cursor-pointer hover:underline"> Add Products <FaExternalLinkAlt className="text-green-500" /> </Link>
           </div>

            { allProducts && allProducts.map((product, id) => (
                <div key={id}>
                <ProductItems
                    image={product.image}
                    name={product.name}
                    description={product.description}
                />
                </div>
            ))}            
        </div>
    )
}
export default  Products;