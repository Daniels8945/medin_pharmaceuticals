import React from "react";
import ProductCard from "./ui/ProductCard";
import { IoArrowForward } from "react-icons/io5";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import { Link } from "react-router-dom"
import { getItems } from "@/appwrite";

function Products() {
      const [products, setProducts] = React.useState([]);
      React.useEffect(() => {
          const loadItems = async () => {
          const data = await getItems();
          setProducts(data);
          };
          loadItems();
      }, []);
      
  return (
    <div className="bg-lightgreen-100 w-full py-22 md:py-12 sm:py:12 xl:py-26 flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 xl:px-12 flex flex-col gap-12">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <h2 className="text-4xl font-bold font-raleway">Products</h2>
          <Link to={"/exploreproducts"} className="text-black text-lg font-bold font-raleway flex items-center gap-2 hover:underline">
            Explore our range of products
            <IoArrowForward className="text-green-500 text-3xl"/>
          </Link>
        </div>
        
              <div className="gap-4 scroll-smooth select-none">
                <Carousel>
                  <CarouselPrevious className="xl:hidden absolute left-0 bottom-0 z-7 b-0 text-green-300 hover:text-green-500">
                    <button className=" bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"></button>
                  </CarouselPrevious>
                  <CarouselContent className="-ml-4">
                    {products && products.slice(0, 3).map((product, id) => (
                      <CarouselItem className="pl-4 md:basis-1/3 sm:basis-1/3 xl:basis-1/3" key={id} >
                        <ProductCard
                          imageId={product.imageId}
                          image={product.imageUrl}
                          name={product.name}
                          description={product.description}
                          />

                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselNext className="xl:hidden absolute right-0 bottom-0 z-7 text-green-300 hover:text-green-500">
                    <button className="bg-white text-black p-2 rounded-full shadow-md transition duration-300"></button>
                  </CarouselNext>
                </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Products;
