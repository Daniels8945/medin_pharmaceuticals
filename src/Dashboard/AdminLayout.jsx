import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from "../assets/logo.png";
import {
  MdAddBox,
  MdOutlineInventory2,
  MdLogout,
  MdMenu,
  MdClose,
} from "react-icons/md";
import ReactDOM from "react-dom";

const NAV = [
  { label: "Products",    icon: MdOutlineInventory2, to: "/dashboard" },
  { label: "Add Product", icon: MdAddBox,            to: "/addproducts" },
];

function SidebarContent({ onClose }) {
  const { pathname } = useLocation();
  const { current: user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full bg-[#0d1f13] text-white select-none">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 pt-6 pb-5 border-b border-white/10">
        <Link to="/" onClick={onClose}>
          <img src={logo} alt="Medin" className="h-7 brightness-0 invert" />
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-white/50 hover:text-white lg:hidden">
            <MdClose className="text-xl" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 px-3 pt-5">
        <p className="px-3 mb-2 text-[10px] font-bold tracking-widest uppercase text-white/30">
          Menu
        </p>
        {NAV.map(({ label, icon: Icon, to }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold font-raleway transition-all duration-150 ${
                active
                  ? "bg-green-500 text-white shadow-md shadow-green-900/40"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              }`}
            >
              <Icon className="text-[18px] shrink-0" />
              {Icon && <span className="sr-only">{label}</span>}
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 pb-5 pt-3 border-t border-white/10">
        {user && (
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 mb-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {(user.name || user.email || "A")[0].toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">{user.name || "Admin"}</p>
              <p className="text-xs text-white/40 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold font-raleway text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
        >
          <MdLogout className="text-[18px] shrink-0" />
          Sign out
        </button>
      </div>
    </div>
  );
}

function MobileDrawer({ open, onClose }) {
  const drawer = (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`fixed top-0 left-0 z-[999] h-full w-[260px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent onClose={onClose} />
      </div>
    </>
  );
  return ReactDOM.createPortal(drawer, document.body);
}

export default function AdminLayout({ children, title, action }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { pathname } = useLocation();
  const currentNav = NAV.find((n) => n.to === pathname);

  return (
    <div className="flex h-screen bg-zinc-50 font-raleway overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-[220px] xl:w-[240px] shrink-0 flex-col h-full">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-[60px] bg-white border-b border-zinc-200 flex items-center justify-between px-5 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-zinc-600 hover:text-zinc-900 p-1"
            >
              <MdMenu className="text-xl" />
            </button>
            <h1 className="text-[15px] font-bold text-zinc-800">
              {title || currentNav?.label || "Dashboard"}
            </h1>
          </div>
          {action && <div>{action}</div>}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}