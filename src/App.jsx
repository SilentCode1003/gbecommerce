import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import React from 'react'
import AllProducts from './pages/AllProducts';
import NotFoundPage from './pages/NotFoundPage'
import Productpage from './pages/Productpage';
import CartPage from './pages/Cart';
import AccountPage from './pages/AccountPage';
import JSONAllProducts  from './pages/JSONallproducts';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/AllProducts" element={<AllProducts />} />
      <Route path="/json" element={<JSONAllProducts />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/products/:id" element={<Productpage />} />
      <Route path="/Cart" element={<CartPage />} />
      <Route path="/AccountPage" element={<AccountPage />} />
      
      {/* <Route path="/product/:id" component={ProductDetail} /> */}


    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
