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
                <h1 className="xl:text-3xl text-2xl font-semibold font-raleway text-green-500">All available products</h1>
                <Link to="/addproducts" className="text-zinc-500 flex items-center text-[20px] font-semibold font-raleway gap-4 pt-4 cursor-pointer hover:underline"> Add Products <FaExternalLinkAlt className="text-green-500" /> </Link>
           </div>

            <div className="flex flex-col justify-center items-center pb-8 px-4">
                <div className="w-full flex items-center justify-center">
                    <div className="border pb-4 rounded-2xl overflow-x-auto">
                        <div className="py-4 flex px-10 gap-73 border-b w-fit">
                            <p className="font-bold font-raleway text-[16px] text-zinc-500 min-w-[120px]">Product Name</p>
                            <p className="font-bold font-raleway text-[16px] text-zinc-500 min-w-[120px]">Description</p>
                            <p className="font-bold font-raleway text-[16px] text-zinc-500 min-w-[120px]">Action</p>
                        </div>
                        
                            { products && products.map((product, id) => (
                                <ProductItems
                                key={id}
                                id={product.$id}
                                imageId={product.imageId}
                                image={product.imageUrl}
                                name={product.name}
                                description={product.description}/>
                            ))}            
                    </div>
            </div>
        </div>
    </div>
    )
}
export default  Products;