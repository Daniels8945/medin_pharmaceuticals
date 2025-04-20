import React from 'react'
import './index.css'
import App from './App.jsx'
import Main from   "./components/Dashboard/main";
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './components/Notfound';
import AddProducts from './components/Dashboard/AddProducts'; //dashboard
import Mission from './components/mission';
import ExploreProducts from './components/ExploreProducts';

const router = createBrowserRouter([
  { path:"/", element: <App /> },
  { path:"/dashboard", element: <Main /> },
  { path:"*", element: <NotFoundPage /> },
  { path:"/addproducts", element: < AddProducts /> },
  { path:"/mission&vission", element: <Mission />},
  { path:"/exploreproducts", element: <ExploreProducts />}

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
