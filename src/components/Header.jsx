"use client"

import logo from "../assets/logo.png";
import { CiMenuFries } from "react-icons/ci";
import { RiCloseLargeLine } from "react-icons/ri";
import React from "react";
import ReactDOM from "react-dom";
import { Link, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import iv from "../assets/IVFluids-urgent-care.jpg";
import DistributorModal from "./DistributorModal";

/*Icons*/
import { FaHouse } from "react-icons/fa6";
import { GiMedicinePills } from "react-icons/gi";
import { TfiStatsUp } from "react-icons/tfi";
import { FcAbout } from "react-icons/fc";
import { FaShoppingBag } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const items = [
  { name: "New Product", description: "iV fluid" },
  { name: "New Product", description: "iV fluid" },
  { name: "New Product", description: "iV fluid" },
];

const ListItem = React.forwardRef(({ className, title, children, href, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        href={href || "#"}
        className={
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground " +
          (className || "")
        }
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        {children && (
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        )}
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";

const vidUrl = "https://youtu.be/JNIeYp4z41E?si=VHcbssEJfxa6jQQw";

function scrollToSection(id) {
  const container = document.querySelector(".snap-container");
  const target = document.getElementById(id);
  if (container && target) {
    container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  }
}

/* ─── Mobile Drawer ─────────────────────────────────────────────────────────*/

function MobileDrawer({ isOpen, onClose, onOpenDistributor }) {
  // Lock body scroll while drawer is open
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const linkClass =
    "font-raleway font-semibold inline-flex items-center text-[15px] transition-colors border border-zinc-200 bg-white hover:bg-zinc-50 active:bg-zinc-100 h-12 px-6 w-full rounded-2xl justify-start gap-3 text-zinc-800";

  const drawer = (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel — slides in from the right */}
      <div
        className={`fixed top-0 right-0 z-[999] h-full w-[85vw] max-w-[340px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header row */}
        <div className="flex justify-between items-center px-5 pt-5 pb-4 border-b border-zinc-100">
          <Link to="/" onClick={onClose}>
            <img src={logo} alt="Medin Logo" className="h-8" />
          </Link>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 border border-green-400 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
          >
            <RiCloseLargeLine className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col gap-2.5 px-5 py-5 overflow-y-auto">
          <Link onClick={onClose} className={linkClass} to="/">
            <span className="text-green-500"><FaHouse /></span> Home
          </Link>
          <Link onClick={onClose} className={linkClass} to="/exploreproducts">
            <span className="text-green-500"><GiMedicinePills /></span> Products
          </Link>
          <Link onClick={onClose} className={linkClass} to="/faqs">
            <span className="text-green-500"><TfiStatsUp /></span> Investors
          </Link>
          <Link onClick={onClose} className={linkClass} to="/ourcompany">
            <span className="text-green-500"><FcAbout /></span> About Us
          </Link>
          <Link onClick={onClose} className={linkClass} to="/careers">
            <span className="text-green-500"><FaShoppingBag /></span> Careers
          </Link>
          <button
            onClick={() => { scrollToSection("contact-section"); onClose(); }}
            className={linkClass}
          >
            <span className="text-green-500"><FaPhoneAlt /></span> Contact
          </button>
        </nav>

        {/* CTA at bottom */}
        <div className="px-5 pb-8 pt-3 border-t border-zinc-100">
          <button
            onClick={() => { onOpenDistributor(); onClose(); }}
            className="w-full bg-green-500 hover:bg-green-600 active:scale-[0.98] transition-all text-white font-raleway font-bold h-12 rounded-2xl text-[15px] shadow-md shadow-green-200"
          >
            Become A Distributor
          </button>
          <p className="text-center text-xs text-zinc-400 font-raleway mt-3">
            Medin Pharmaceuticals © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(drawer, document.body);
}

/* ─── Desktop Nav ─────────────────────────────────────────────────────────── */
function Header() {
  const [isDistributorOpen, setIsDistributorOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const navLinkClass =
    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium font-raleway font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none";

  const menu = (
    <div className="w-[430px] flex items-center ml-4 h-[40px] font-raleway font-bold">
      <NavigationMenu>
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/" className={navLinkClass}>Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-raleway font-bold">Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/exploreproducts"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <img src={iv} alt="IV Fluids" className="rounded mb-2" />
                      <div className="mb-2 text-lg font-medium">Our Products</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Cutting-edge pharmaceutical formulations driven by years of research.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {items.map((item, i) => (
                  <ListItem key={i} title={item.name}>{item.description}</ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-raleway font-bold">Investors</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a href="#" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md" />
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Shareholder Information" />
                <ListItem href="/docs" title="Corporate Governance">Governing bodies of Med-IN Pharmaceuticals</ListItem>
                <ListItem href="/docs" title="Financial Reports">Annual Financial Reports</ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-raleway font-bold">About Us</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[800px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3 h-[400px]">
                  <NavigationMenuLink asChild>
                    <a href="#" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                      <ReactPlayer
                        url={vidUrl}
                        playing={false}
                        volume={0.5}
                        controls
                        width="100%"
                        style={{ overflow: "auto", borderRadius: "8px", height: "100%" }}
                      />
                      <p className="text-sm leading-tight text-muted-foreground mt-2">
                        We create healthy innovations to make healthcare affordable and accessible.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/our-company" title="Our Company">Affordable, accessible healthcare innovations for Nigeria.</ListItem>
                <ListItem href="/bod" title="Board Of Directors">Meet the leadership steering Medin Pharmaceuticals.</ListItem>
                <ListItem href="/our-workplace" title="Our Workplace & Partners">A look at our facilities and strategic partners.</ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/careers" className={navLinkClass}>Careers</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <button
              onClick={() => scrollToSection("contact-section")}
              className={navLinkClass}
            >
              Contact
            </button>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );

  return (
    <>
      <header className="h-[65px] md:h-[80px] w-full bg-white shadow-sm flex items-center z-50 fixed top-0 left-0">
        <div className="flex items-center w-full justify-between px-4">

          <Link to="/">
            <img src={logo} alt="Logo" className="h-8" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:block">{menu}</div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <button
              onClick={() => setIsDistributorOpen(true)}
              className="bg-green-500 hover:bg-green-600 active:scale-[0.97] transition-all px-6 h-[46px] rounded-full flex items-center ml-4 text-white font-raleway font-semibold shadow-md shadow-green-200 whitespace-nowrap"
            >
              Become A Distributor
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen((p) => !p)}
            className="lg:hidden flex items-center justify-center w-10 h-10 border border-green-500 rounded-lg transition-colors hover:bg-green-50"
          >
            {isOpen
              ? <RiCloseLargeLine className="w-5 h-5 text-green-600" />
              : <CiMenuFries className="w-5 h-5 text-green-600" />
            }
          </button>
        </div>
      </header>

      {/* Mobile drawer — portalled outside header so fixed positioning works correctly */}
      <MobileDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpenDistributor={() => setIsDistributorOpen(true)}
      />

      <DistributorModal
        isOpen={isDistributorOpen}
        onClose={() => setIsDistributorOpen(false)}
      />
    </>
  );
}

export default Header;