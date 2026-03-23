import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import ExploreProductsUI from "./ui/ExploreProductsUI";
import * as React from "react";
import { getItems } from "@/appwrite";

function ExploreProducts() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadItems = async () => {
      const data = await getItems();
      setProducts(data);
      setLoading(false);
    //   setTimeout(() => {setLoading(false)}, 1000);
    };
    loadItems();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="z-10 sticky gap-4 top-0 px-4 xl:px-12 shadow-md flex flex-col xl:flex-row xl:items-center-safe justify-center xl:justify-between bg-white w-full h-[100px]">
        <Link to={"/"}>
          <IoArrowBack className="text-green-500 text-2xl lg:text-[20px]" />
        </Link>
        <h1 className="xl:text-3xl text-1xl font-semibold font-raleway text-green-500">
          All available products
        </h1>
      </div>

      {loading ? (
        // Loading skeleton grid
        <div className="xl:grid lg:grid-cols-3 grid grid-cols-2 py-24 xl:px-16 px-4 gap-5 justify-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-gray-200 animate-pulse h-64 w-full"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center py-32 px-4 gap-6 text-center">
          <div className="text-7xl">🛒</div>
          <h2 className="text-2xl font-bold font-raleway text-gray-700">
            No Products Available
          </h2>
          <p className="text-gray-500 font-raleway max-w-sm">
            It looks like there are no products listed at the moment. Please check back later.
          </p>
          <Link
            to={"/"}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold font-raleway px-6 py-3 rounded-full transition duration-300"
          >
            <IoArrowBack className="text-xl" />
            Back to Home
          </Link>
        </div>
      ) : (
        // Products grid
        <div className="xl:grid lg:grid-cols-3 grid grid-cols-2 py-24 xl:px-16 px-4 gap-5 justify-center">
          {products.map((product, id) => (
            <ExploreProductsUI
              key={id}
              imageId={product.imageId}
              image={product.imageUrl}
              name={product.name}
              description={product.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExploreProducts;