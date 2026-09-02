import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/home.jsx';
import Cart from '../Pages/Cart/Cart.jsx';
import Login from '../Pages/Auth/login.jsx';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
export default AppRoutes;