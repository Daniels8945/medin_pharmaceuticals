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

  if (loading) return <div>Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/login"/>;
};
export default PrivateRoute;