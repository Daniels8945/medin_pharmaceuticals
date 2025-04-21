import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";

const NotFoundPage = () => {
    return(
        <div className="flex justify-center place-items-center h-screen px-4 xl:px-12">
                <div>
                <h1  className="mt-4 text-5xl font-semibold font-raleway flex items-center justify-center gap-8">Page Not Found <TbError404 className="text-8xl text-green-600" /></h1>
                    <p className="xl:w-5xl items-center text-[14px] xl:text-[18px] font-medium font-raleway gap-2 flex-block">We're sorry, but the page you're looking for may have been moved or deleted. Please try locating the page by using the site search or visit some of these sections of <Link to={"/"} className="cursor-pointer hover:underline text-green-400 font-semibold">medin pharmaceutical</Link></p>
                </div>
        </div>
    )
}
export default NotFoundPage;