import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom"
import ProductItems from "./ui/Allproducts";
import { getItems } from "@/appwrite";
import * as React from "react";

function Products(){
    const [products, setProducts] = React.useState([]);
    React.useEffect(() => {
        const loadItems = async () => {
        const data = await getItems();
        setProducts(data);
        };
        loadItems();
    }, []);

    return(
        <div className="flex flex-col gap-8">
           <div  className="gap-2 z-10 sticky top-0 px-4 xl:px-12 shadow-md flex flex-col xl:flex-row xl:items-center-safe justify-center xl:justify-between bg-white w-full h-[100px]">
                <h1 className="text-4xl font-semibold font-raleway text-green-500">All available products</h1>
                <Link to="/addproducts" className="flex items-center text-2xl font-bold font-raleway gap-4 pt-4 cursor-pointer hover:underline"> Add Products <FaExternalLinkAlt className="text-green-500" /> </Link>
           </div>

            { products && products.map((product, id) => (
                <div key={id} className="mx-12 py-12">
                <ProductItems
                    id={product.$id}
                    imageId={product.imageId}
                    image={product.imageUrl}
                    name={product.name}
                    description={product.description}
                    
                />
                </div>
            ))}            
        </div>
    )
}
export default  Products;