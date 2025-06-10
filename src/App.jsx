import Header from "./components/Header"; 
import Hero from "./components/Hero"; 
import Products from "./components/ProductsPage"; 
import AboutUs from "./components/AboutUs"; 
import Footer from "./components/Footer"; 
import Contact from "./components/Contact";


// import { useLocation } from 'react-router-dom';
// import { useEffect } from "react";
// import { logout } from "./appwrite";

function App() {
  // const location = useLocation();
  // useEffect(() => {
  // const publicPaths = ["/", "/login"];
  // const isLeavingDashboard = publicPaths.includes(location.pathname);

  // const handleLogout = async () => {
  //   if (isLeavingDashboard) {
  //     try {
  //       await logout()
  //     } catch (error) {
  //       console.error("Logout failed", error);
  //       }
  //     }
  //   }
  //   handleLogout();
  // }, [location]);

  return (
    <div>
          <Header />
          <Hero />
          <Products />
          <AboutUs />
          <Contact />
          <Footer />
    </div>
  );
}

export default App;