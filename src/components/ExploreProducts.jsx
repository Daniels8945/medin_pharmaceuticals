import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import useFetch from "./useFetch";
import ExploreProductsUI from "./ui/ExploreProductsUI";

function ExploreProducts(){
    const { data: allProducts, error, isPending } = useFetch('http://localhost:5172/allProducts');
    return(
        <div>
            <div className="z-10 sticky top-0 px-4 xl:px-12 shadow-md flex flex-col xl:flex-row  xl:items-center-safe justify-center xl:justify-between bg-white w-full h-[100px]">
                <Link to={"/"}><IoArrowBack className='text-green-500 text-4xl'/></Link>
                <h1 className="xl:text-4xl text-2xl font-semibold font-raleway text-green-500">All available products</h1>
            </div>  
            
            <div className="xl:grid xl:grid-cols-2 flex flex-wrap py-24 xl:px-16 px-4 gap-5 justify-center">
                { isPending && <div>loading...</div>}
                { error && <div>{ error }</div>}
                { allProducts && allProducts.map((product, id) => (
                <ExploreProductsUI key={id}
                    image={product.image}
                    name={product.name}
                    description={product.description}
                    />
                ))}
            </div>
        </div>
        )
}
export default ExploreProducts;