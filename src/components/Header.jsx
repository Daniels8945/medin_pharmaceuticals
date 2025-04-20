import logo from "../assets/logo.png";
import { CiMenuFries } from "react-icons/ci";
import React from "react";
import { Link } from "react-router-dom";

const menu= (
        <div className="w-[346px] justify-between flex items-center ml-4 h-[40px] font-raleway font-bold">
            <Link to="/">Home</Link>
            <Link to="/Products">Products</Link>
            <Link to="/Contact">Contact Us</Link>
            <Link to="/AboutUs">About Us</Link>
        </div>
  )
  
function Header() {

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const dialog = (
    <>
      {/* <dialog className="fixed animate-in fade-in slide-in-from-top-5 flex flex-col gap-3 h-full w-full pt-4 px-4 bg-white z-[21] overflow-hidden scroll-none">
      <dialog className="animate-in fade-in slide-in-from-top-5 flex flex-col gap-3 h-full w-full pt-4 px-4 bg-white z-[21] overflow-hidden scroll-none" isOpen>
          <Link className="inline-flex items-center whitespace-nowrap text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full rounded-xl justify-center" to="/#features">Features</Link>
          <Link className="inline-flex items-center whitespace-nowrap text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full rounded-xl justify-center" to="/pricing">Pricing</Link>
          <Link className="inline-flex items-center whitespace-nowrap text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full rounded-xl justify-center" to="/#faqs">FAQs</Link>
          <Link className="inline-flex items-center whitespace-nowrap text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full rounded-xl justify-center" to="/#testimonials">Testimonial</Link>
                      
      <div className="flex-row-end w-full gap-3 border--t pt-4 border--dashed bg">
        <div className="flex-row-center grow gap-2 justify-center flex">
            <Link className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full" to="https://x.com">
                <RxTwitterLogo />
             </Link>

            <Link className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full" to="https://discord.gg">
                    <RxDiscordLogo />
            </Link>
          </div>
      </div>
      </dialog>  */}
    </>
  )



  return (
    <header className="h-[65px] md:h-[80px] w-full bg-white shadow-md flex justify-center items-center z-10 fixed top-0 left-0">
      <div className="flex items-center w-full justify-between px-4">
        <img src={logo} alt="Logo" className="h-8"/>
        <div className="hidden lg:block">
              {menu}
        </div>
        <div  className="hidden lg:block">
            <button className="bg-green-500 p-4 max-w-[200px] h-[46px] rounded-full flex justify-center items-center ml-4 text-white font-raleway font-semibold">Become A Distributor</button>
        </div>

        <button onClick={toggleMenu}  className="lg:hidden flex items-center justify-center w-[40px] h-[40px] border border-green-500 rounded-md">
            { isOpen ? 
            <CiMenuFries className="w-[24px] h-[24px] text-green-500"/>
            : 
            <CiMenuFries className="w-[24px] h-[24px] text-green-500"/>}
        </button>

        { isOpen && dialog }
      </div>
    </header>
  );
}
export default Header;