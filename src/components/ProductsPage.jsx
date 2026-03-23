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
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadItems = async () => {
      const data = await getItems();
      setProducts(data);
      setLoading(false);
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

        {loading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-gray-200 animate-pulse h-64 w-full" />
            ))}
          </div>
        ) : products.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
            <div className="text-7xl">🌿</div>
            <h3 className="text-2xl font-bold font-raleway text-gray-700">
              No Products Yet
            </h3>
            <p className="text-gray-500 font-raleway max-w-sm">
              We're stocking up! Check back soon or explore our full catalogue in the meantime.
            </p>
            <Link
              to={"/exploreproducts"}
              className="mt-2 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold font-raleway px-6 py-3 rounded-full transition duration-300"
            >
              Explore Products
              <IoArrowForward className="text-xl" />
            </Link>
          </div>
        ) : (
          // Products carousel
          <div className="gap-4 scroll-smooth select-none">
            <Carousel>
              <CarouselPrevious className="xl:hidden absolute left-0 bottom-0 z-7 b-0 text-green-300 hover:text-green-500">
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"></button>
              </CarouselPrevious>
              <CarouselContent className="-ml-4">
                {products.slice(0, 3).map((product, id) => (
                  <CarouselItem className="pl-4 md:basis-1/3 sm:basis-1/3 xl:basis-1/3" key={id}>
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
        )}

      </div>
    </div>
  );
}

export default Products;