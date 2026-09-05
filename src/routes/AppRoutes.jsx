import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/home.jsx';
import Cart from '../Pages/Cart/Cart.jsx';
import Login from '../Pages/Auth/login.jsx';
import Wishlist from '../Pages/Wishlist/wishlist.jsx';
import Checkout from '../Pages/checkout/Checkout.jsx';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>

  );
};
export default AppRoutes;

