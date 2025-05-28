import React from 'react'
import './index.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import NotFoundPage from './components/Notfound';
import AddProducts from './Dashboard/AddProducts'; //dashboard
import Mission from './components/mission';
import ExploreProducts from './components/ExploreProducts';
import BoardOfDirectors from "./pages/BoardOfDirectors"
import OurCompany from "./pages/OurCompany"
import OurWorkplace from "./pages/OurWorkplace"
import Login from './Dashboard/Login'; // Login
import Products from "./Dashboard/Allproducts"
import PrivateRoute from './Dashboard/Main';
import { AuthProvider } from "./Dashboard/AuthContext"
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
    ],
  },

  { path:"/mission&vission", element: <Mission />},
  { path:"/exploreproducts", element: <ExploreProducts />},
  { path:"/bod", element: <BoardOfDirectors />},
  { path:"/our-company", element: <OurCompany />},
  { path:"/our-workplace", element: <OurWorkplace />},
])
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
