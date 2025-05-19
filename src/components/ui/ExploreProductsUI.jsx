
export default function ExploreProductsUI ({ name, description, image }) {
    return (
        <div>
            <div className="flex flex-col xl:flex--row gap-4 justify-center py-4 w-fit">
                <div className="max-w-[400px] h-fit -h-[400px] bg-white border-1 border-neutral-200 shadow-md rounded-lg flex flex-col items-center">
                    <img src={image} alt="product image" className="rounded-t-md h-[200px] w-full object-cover hover:scale-[1.015]"/>
                    <div className="relative flex flex-col w-full p-4 gap-2">
                        <h3 className="break-all text-sm xl:text-md font-semibold font-raleway">{name}</h3>
                        <p className="break-all xl:max-w-[400px] py-4 text-sm xl:text-md font-normal font-raleway">{description}</p>
                    </div>
                </div>
                                    
                {/* <div className="relative max-w-[400px] xl:w-[400px] flex flex-col gap-12 justify-between items-center bg-white shadow-md rounded-md">
                    <p className="break-all xl:max-w-[400px] p-4 text-md font-normal font-raleway">{description}</p>
                </div> */}
            </div>   
        </div>
    )
}