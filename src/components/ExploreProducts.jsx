import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import ExploreProductsUI from "./ui/ExploreProductsUI";
import * as React from "react";
import { getItems } from "@/appwrite";

function ExploreProducts(){
        const [products, setProducts] = React.useState([]);
        React.useEffect(() => {
            const loadItems = async () => {
            const data = await getItems();
            setProducts(data);
            };
            loadItems();
        }, []);
    
    return(
        <div>
            <div className="z-10 sticky top-0 px-4 xl:px-12 shadow-md flex flex-col xl:flex-row  xl:items-center-safe justify-center xl:justify-between bg-white w-full h-[100px]">
                <Link to={"/"}><IoArrowBack className='text-green-500 text-4xl'/></Link>
                <h1 className="xl:text-4xl text-2xl font-semibold font-raleway text-green-500">All available products</h1>
            </div>  
            
            <div className="xl:grid xl:grid-cols-2 flex flex-wrap py-24 xl:px-16 px-4 gap-5 justify-center">
                { products&& products.map((product, id) => (
                <ExploreProductsUI key={id}
                    imageId={product.imageId}
                    image={product.imageUrl}
                    name={product.name}
                    description={product.description}
                    />
                ))}
            </div>
        </div>
        )
}
export default ExploreProducts;