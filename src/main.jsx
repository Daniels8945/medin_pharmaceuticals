import React from 'react'
import './index.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './components/Notfound';
import AddProducts from './Dashboard/AddProducts'; //dashboard
import Mission from './components/mission';
import ExploreProducts from './components/ExploreProducts';
import BoardOfDirectors from "./pages/BoardOfDirectors"
import OurCompany from "./pages/OurCompany"
import OurWorkplace from "./pages/OurWorkplace"
import Careers from "./pages/Careers"
import ContactPage from "./pages/ContactPage"
import DynamicPage from "./pages/DynamicPage"
import Login from './Dashboard/Login'; // Login
import Products from "./Dashboard/Allproducts"
import PrivateRoute from './Dashboard/Main';
import { AuthProvider } from "./Dashboard/AuthContext"
import { SiteContentProvider } from "./context/SiteContentContext"
import SiteEditor from "./Dashboard/SiteEditor"
import UsersPage from "./Dashboard/Users"
import { Toaster } from "@/components/ui/sonner"




const router = createBrowserRouter([
   <Toaster />,
  { path:"*", element: <NotFoundPage /> },
  { path:"/", element: <App /> },
  { path:"/login", element: <Login /> }, 
  {
    element: <PrivateRoute />,
    children: [
      { path: "/addproducts", element: <AddProducts /> },
      { path: "/dashboard", element: <Products /> },
      { path: "/site-editor", element: <SiteEditor /> },
      { path: "/users", element: <UsersPage /> },
    ],
  },

  { path:"/mission&vission", element: <Mission />},
  { path:"/exploreproducts", element: <ExploreProducts />},
  { path:"/bod", element: <BoardOfDirectors />},
  { path:"/ourcompany", element: <OurCompany />},
  { path:"/our-company", element: <OurCompany />},
  { path:"/ourworkplace", element: <OurWorkplace />},
  { path:"/our-workplace", element: <OurWorkplace />},
  { path:"/careers", element: <Careers />},
  { path:"/contact", element: <ContactPage />},
  { path:"/page/:slug", element: <DynamicPage /> },
])
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SiteContentProvider>
      <RouterProvider router={router} />
    </SiteContentProvider>
  </AuthProvider>
)