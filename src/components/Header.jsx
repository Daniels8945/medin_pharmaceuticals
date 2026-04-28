"use client"

import logo from "../assets/logo.png";
import { CiMenuFries } from "react-icons/ci";
import { RiCloseLargeLine, RiMedicineBottleFill } from "react-icons/ri";
import React from "react";
import ReactDOM from "react-dom";
import { Link, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import iv from "../assets/IVFluids-urgent-care.jpg";
import DistributorModal from "./DistributorModal";
import { useSiteContent } from "@/context/SiteContentContext";
import { getBannerUrl } from "@/appwrite";

/* ── Nav Icons ────────────────────────────────────────────────────────────── */
import { FaHouse } from "react-icons/fa6";
import { FaShoppingBag, FaPhoneAlt, FaBuilding, FaUserTie, FaHandshake, FaChartPie, FaFileAlt } from "react-icons/fa";
import { GiMedicinePills } from "react-icons/gi";
import { TfiStatsUp } from "react-icons/tfi";
import { FcAbout } from "react-icons/fc";
import { IoChevronDown } from "react-icons/io5";
import { MdOutlineInventory2 } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";


const ListItem = React.forwardRef(({ className, title, children, href, ...props }, ref) => {
  const cls = "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground " + (className || "");
  const content = (
    <>
      <div className="text-sm font-medium leading-none">{title}</div>
      {children && <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>}
    </>
  );
  return (
    <li>
      <NavigationMenuLink asChild>
        {href && href.startsWith("/")
          ? <Link ref={ref} to={href} className={cls} {...props}>{content}</Link>
          : <a ref={ref} href={href || "#"} className={cls} {...props}>{content}</a>
        }
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const vidUrl = "https://youtu.be/JNIeYp4z41E?si=VHcbssEJfxa6jQQw";

/* ── Mobile Accordion ─────────────────────────────────────────────────────── */
function MobileAccordion({ icon, label, children }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full">
      {/* Trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-between w-full h-12 px-6 rounded-2xl border border-zinc-200 bg-white hover:bg-zinc-50 active:bg-zinc-100 transition-colors font-raleway font-semibold text-[15px] text-zinc-800"
      >
        <span className="flex items-center gap-3 min-w-0">
          <span className="text-green-500 flex-shrink-0">{icon}</span>
          <span className="truncate">{label}</span>
        </span>
        <IoChevronDown
          className={`text-green-500 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Smooth height animation via CSS grid trick — no JS measurement needed */}
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="mt-1 ml-4 flex flex-col border-l-2 border-green-400 pl-3 pb-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Sub-link inside an accordion */
function SubLink({ icon, label, to, href, onClick }) {
  const cls =
    "flex items-center gap-3 font-raleway font-medium text-[14px] text-zinc-600 hover:text-green-600 hover:bg-green-50 active:bg-green-100 px-4 py-2.5 rounded-xl transition-colors w-full text-left";

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={cls}>
        <span className="text-green-400 text-base flex-shrink-0">{icon}</span>
        {label}
      </Link>
    );
  }
  return (
    <a href={href || "#"} onClick={onClick} className={cls}>
      <span className="text-green-400 text-base flex-shrink-0">{icon}</span>
      {label}
    </a>
  );
}

/* ── Mobile Drawer ────────────────────────────────────────────────────────── */
function MobileDrawer({ isOpen, onClose, onOpenDistributor, ctaText }) {
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const linkClass =
    "flex items-center font-raleway font-semibold text-[15px] transition-colors border border-zinc-200 bg-white hover:bg-zinc-50 active:bg-zinc-100 h-12 px-6 w-full rounded-2xl gap-3 text-zinc-800";

  const drawer = (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
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
        <nav className="flex-1 min-h-0 flex flex-col gap-2.5 px-5 py-5 overflow-y-auto">

          {/* Home — flat */}
          <Link onClick={onClose} className={linkClass} to="/">
            <span className="text-green-500"><FaHouse /></span> Home
          </Link>

          {/* Products — accordion */}
          <MobileAccordion icon={<GiMedicinePills />} label="Products">
            <SubLink
              icon={<MdOutlineInventory2 />}
              label="Browse All Products"
              to="/exploreproducts"
              onClick={onClose}
            />
            <SubLink
              icon={<RiMedicineBottleFill />}
              label="IV Fluids"
              to="/exploreproducts"
              onClick={onClose}
            />
            <SubLink
              icon={<GiMedicinePills />}
              label="New Product"
              to="/exploreproducts"
              onClick={onClose}
            />
          </MobileAccordion>

          {/* Investors — accordion */}
          <MobileAccordion icon={<TfiStatsUp />} label="Investors">
            <SubLink
              icon={<FaChartPie />}
              label="Shareholder Information"
              href="/docs"
            />
            <SubLink
              icon={<HiOutlineOfficeBuilding />}
              label="Corporate Governance"
              href="/docs"
            />
            <SubLink
              icon={<FaFileAlt />}
              label="Financial Reports"
              href="/docs"
            />
          </MobileAccordion>

          {/* About Us — accordion */}
          <MobileAccordion icon={<FcAbout />} label="About Us">
            <SubLink
              icon={<FaBuilding />}
              label="Our Company"
              to="/our-company"
              onClick={onClose}
            />
            <SubLink
              icon={<BsPeopleFill />}
              label="Board of Directors"
              to="/bod"
              onClick={onClose}
            />
            <SubLink
              icon={<FaHandshake />}
              label="Our Workplace & Partners"
              to="/our-workplace"
              onClick={onClose}
            />
          </MobileAccordion>

          {/* Careers — flat */}
          <Link onClick={onClose} className={linkClass} to="/careers">
            <span className="text-green-500"><FaShoppingBag /></span> Careers
          </Link>

          {/* Contact — flat */}
          <Link onClick={onClose} className={linkClass} to="/contact">
            <span className="text-green-500"><FaPhoneAlt /></span> Contact
          </Link>

        </nav>

        {/* CTA at bottom */}
        <div className="px-5 pb-8 pt-3 border-t border-zinc-100">
          <button
            onClick={() => { onOpenDistributor(); onClose(); }}
            className="w-full bg-green-500 hover:bg-green-600 active:scale-[0.98] transition-all text-white font-raleway font-bold h-12 rounded-2xl text-[15px] shadow-md shadow-green-200"
          >
            {ctaText || "Become A Distributor"}
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

/* ── Desktop Nav ──────────────────────────────────────────────────────────── */
function Header() {
  const [isDistributorOpen, setIsDistributorOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { headerContent, navProductsContent, navPanelContent } = useSiteContent();
  const ctaText = headerContent?.ctaText || "Become A Distributor";
  const items = Array.isArray(navProductsContent) && navProductsContent.length > 0
    ? navProductsContent
    : [{ name: "New Product", description: "iV fluid", link: "" }];
  const panelTitle = navPanelContent?.title || "Our Products";
  const panelDesc  = navPanelContent?.description || "Cutting-edge pharmaceutical formulations driven by years of research.";
  const panelImg   = getBannerUrl(navPanelContent?.imageId) || iv;

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
                      <img src={panelImg} alt={panelTitle} className="rounded mb-2" />
                      <div className="mb-2 text-lg font-medium">{panelTitle}</div>
                      <p className="text-sm leading-tight text-muted-foreground">{panelDesc}</p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {items.map((item, i) => (
                  <ListItem key={i} title={item.name} href={item.link || undefined}>{item.description}</ListItem>
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
            <NavigationMenuLink asChild>
              <Link to="/contact" className={navLinkClass}>Contact</Link>
            </NavigationMenuLink>
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

          <div className="hidden lg:block">{menu}</div>

          <div className="hidden lg:block">
            <button
              onClick={() => setIsDistributorOpen(true)}
              className="bg-green-500 hover:bg-green-600 active:scale-[0.97] transition-all px-6 h-[46px] rounded-full flex items-center ml-4 text-white font-raleway font-semibold shadow-md shadow-green-200 whitespace-nowrap"
            >
              {ctaText}
            </button>
          </div>

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

      <MobileDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpenDistributor={() => setIsDistributorOpen(true)}
        ctaText={ctaText}
      />

      <DistributorModal
        isOpen={isDistributorOpen}
        onClose={() => setIsDistributorOpen(false)}
      />
    </>
  );
}

export default Header;