import React from "react";
import ProductCard from "./ui/ProductCard";
import { ProductItems } from "../file/file";
import { IoArrowForward } from "react-icons/io5";

function Products() {
  const productRef = React.useRef(null);
  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const [scrollRight, setScrollRight] = React.useState(0);



  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - productRef.current.offsetLeft);
    setScrollLeft(productRef.current.scrollLeft);
    setScrollRight(productRef.current.scrollRight);    
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false)
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  }
  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - productRef.current.offsetLeft || e.pageX - productRef.current.offsetRight;
    const walk = (x - startX) * 2;
    productRef.current.scrollLeft = scrollLeft - walk;
    productRef.current.scrollRight = scrollRight + walk;
  };

  return (
    <div className="bg-lightgreen-100 w-full py-12 flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 xl:px-12 flex flex-col gap-12">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <h2 className="text-4xl font-bold font-raleway">Products</h2>
          <p className="text-black text-lg font-bold font-raleway flex items-center gap-2">
            Explore our range of products
            <IoArrowForward className="text-green-500 text-3xl"/>
          </p>
        </div>

        <div
          ref={productRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className="border flex overflow-x-auto no-scrollbar gap-4 scroll-smooth select-none"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y"
          }}
        >
          <div className="shrink-0 w-4 sm:w-12"></div>

          {ProductItems.map((product, index) => (
            <div
              key={index}
              className="shrink-0 w-sm scroll-ml-4 sm:scroll-ml-12 transition-transform duration-300"
            >
              <ProductCard
                name={product.name}
                description={product.description}
                image={product.image}
              />
            </div>
          ))}

          <div className="shrink-0 w-4 sm:w-12"></div>
        </div>
      </div>
    </div>
  );
}

export default Products;




{/* <div className="gap-4 scroll-smooth select-none">
<Carousel>
  <CarouselPrevious className="xl:hidden absolute left-0 bottom-0 z-7 b-0 text-green-300 hover:text-green-500">
    <button className=" bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"></button>
  </CarouselPrevious>
  <CarouselContent className="-ml-4">
    {ProductItems.map((product, index) => (
      <CarouselItem className="pl-4 md:basis-1/3 sm:basis-1/3 xl:basis-1/3" key={index} >
        <ProductCard
          name={product.name}
          description={product.description}
          image={product.image}
        />
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselNext className="xl:hidden absolute right-0 bottom-0 z-7 text-green-300 hover:text-green-500">
    <button className="bg-white text-black p-2 rounded-full shadow-md transition duration-300"></button>
  </CarouselNext>
</Carousel> */}