
export default function ExploreProductsUI ({ name, description, image }) {
    return (
        <div>
            <div className="flex flex-col gap-4 justify-center">
                <div className="w-full min-h-[300px] max-h-[320px] sm:h-fit lg:h-[400px] bg-white border-1 border-neutral-200 shadow-md rounded-lg flex flex-col items-center">
                    <img src={image} alt="product image" className="rounded-t-md h-[200px] w-full object-cover hover:scale-[1.015]"/>
                    <div className="relative flex flex-col w-full p-4 gap-6 overflow-hidden">
                        <h3 className="break-all text-sm xl:text-md font-semibold font-raleway">{name}</h3>
                        <p className="break-all xl:min-w-[400px] h-[65px] sm:h-[50px] lg:h-fit overflow-y-scroll md:overflow-hidden text-[14px] md:text-sm xl:text-md font-normal font-raleway">{description}</p>
                    </div>
                </div>
            </div>   
        </div>
    )
}