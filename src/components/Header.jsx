"use client"

import logo from "../assets/logo.png";
import { CiMenuFries } from "react-icons/ci";
import { RiCloseLargeLine } from "react-icons/ri";
import React from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

const items = [
  {
   name: "New Product",
   description: "iV fluid",
  },
  {
   name: "New Product",
   description: "iV fluid",
  },
  {
    name: "New Product",
    description: "iV fluid",
  },
]


const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" +
            className
          }
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


const vidUrl = "https://youtu.be/JNIeYp4z41E?si=VHcbssEJfxa6jQQw"
const menu = (
        <div className="w-[400px] justify-between flex items-center ml-4 h-[40px] font-raleway font-bold">
          
            {/* <Link to="/">Home</Link>
            <Link to="/Products">Products</Link>
            <Link to="/Contact">Contact Us</Link>
            <Link to="/AboutUs">About Us</Link> */}

            <NavigationMenu>
              <NavigationMenuList>
                
                  <NavigationMenuItem>
                        <Link to="/">
                          <NavigationMenuLink>Home</NavigationMenuLink>
                        </Link>
                  </NavigationMenuItem>



                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-raleway font-bold">Products</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/"
                              >
                              
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  Our Products
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                Our suite of cutting edge technology has been effective to drive innovation and provide precise and accurate data for our products.
                                </p>
                              </a>
                                </NavigationMenuLink>
                              </li>
                              {items.map((item) => 
                                <ListItem 
                                key={item}
                                title={item.name}
                                children={item.description}
                                >
                                </ListItem>
                              )}
                        </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

              <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-raleway font-bold">Investors</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  {/* Our Products */}
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  {/* Our suite of cutting edge technology has been effective to drive innovation and provide precise and accurate data for our products. */}
                                </p>
                              </a>
                                </NavigationMenuLink>
                              </li>
                                <ListItem href="/docs" title="Share Holder Information">
                                  
                                </ListItem>

                                <ListItem href="/docs" title="Coperate Governance">
                                  Governing bodies Of the Med-IN Pharmaceuticals
                                </ListItem>

                                <ListItem href="/docs" title="Finacial Reports">
                                  Annual Finacianl Reports
                                </ListItem>
                        </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>


                  <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-raleway font-bold">About Us</NavigationMenuTrigger>
                  <NavigationMenuContent className="h-[450px]">
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[800px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3 h-[400px]">
                          <NavigationMenuLink asChild >
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                               <ReactPlayer 
                                   url={vidUrl}
                                   playing={false}
                                   volume={0.5}
                                   controls={true}
                                   className="w-full max-w-7xl mt-8"
                                   width="100%"
                                   style={{
                                       overflow: "auto",
                                       borderRadius: "8px",
                                       height:"100%"
                                   }}/>
                              <p className="text-sm leading-tight text-muted-foreground">
                                We create healthy innovations to make healthcare
                                affordable and accessible to the Nigerian health sector.
                              </p>
                            </a>
                              </NavigationMenuLink>
                            </li>
                            <ListItem href="/our-company" title="Our Comapany">
                                We create healthy innovations to make healthcare
                                affordable and accessible to the Nigerian health sector.
                            </ListItem>
                           <ListItem href="/bod" title="Board Of Directors">
                                We create healthy innovations to make healthcare
                                affordable and accessible to the Nigerian health sector.
                            </ListItem>
                            <ListItem href="/our-workplace" title="Our Work Place and Partners">
                                We create healthy innovations to make healthcare
                                affordable and accessible to the Nigerian health sector.
                            </ListItem>
                      </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>



                  <NavigationMenuItem>
                        <Link to="/">
                          <NavigationMenuLink>Contact</NavigationMenuLink>
                        </Link>
                  </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
        </div>
)
function Header() {

  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  }, [isOpen]);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsModalOpen(false)
  };

  const dialog = (
    <>
      <dialog className="absolute lg:hidden fixed- animate-in fade-in slide-in-from-top-5 flex flex-col gap-3 top-0 w-full h-screen py-6 px-4  overflow-hidden scroll-none" isOpen>
            <div className='flex justify-between items-center pb-2 bg-inerit'>
                    <Link to='/' className='flex items-center gap-2' >
                      <img src={logo} alt="Logo" className="h-8"/>
                    </Link>

                <button onClick={toggleMenu}  className="lg:hidden flex items-center justify-center w-[40px] h-[40px] border border-green-500 rounded-md">
                { isOpen ? <RiCloseLargeLine className="w-[24px] h-[24px] text-green-500"/> : <CiMenuFries className="w-[24px] h-[24px] text-green-500"/>}
                </button>
            </div>
          <Link className="font-raleway font-bold inline-flex items-center whitespace-nowrap text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full rounded-xl justify-center" to="/#features"></Link>
          <Link className="font-raleway font-bold inline-flex items-center whitespace-nowrap text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full rounded-xl justify-center" to="/pricing"></Link>
          <Link className="font-raleway font-bold inline-flex items-center whitespace-nowrap text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full rounded-xl justify-center" to="/#faqs"></Link>
          <Link className="font-raleway font-bold inline-flex items-center whitespace-nowrap text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full rounded-xl justify-center" to="/#testimonials"></Link>
          <Link className="bg-green-500 text-white font-raleway font-bold inline-flex items-center whitespace-nowrap text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 border border-input bg-background- hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full rounded-xl justify-center" to="/#testimonials">Become A Distributor</Link>
      </dialog> 
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
            { isOpen ? <CiMenuFries className="w-[24px] h-[24px] text-green-500"/> : <CiMenuFries className="w-[24px] h-[24px] text-green-500"/>}
        </button>
        { isOpen && dialog }
      </div>
    </header>
  );
}
export default Header;