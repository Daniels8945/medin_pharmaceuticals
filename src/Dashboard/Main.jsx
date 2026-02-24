import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { logout } from "../appwrite";
import { useEffect } from "react";

const PrivateRoute = () => {

  const { current: user, loading } = useAuth();

  const location = useLocation();
  useEffect(() => {
  const publicPaths = ["/", "/login"];
  const isLeavingDashboard = publicPaths.includes(location.pathname);

  const handleLogout = async () => {
    if (isLeavingDashboard) {
      try {
        await logout()
      } catch (error) {
        console.error("Logout failed", error);
        }
      }
    }
    handleLogout();
  }, [location]);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-50">
        <div className="flex flex-col items-center gap-3">
          <svg className="w-8 h-8 animate-spin text-green-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-zinc-400 font-raleway">Verifying session…</p>
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
  
};
export default PrivateRoute;