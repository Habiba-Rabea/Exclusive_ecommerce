import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/home.jsx';
import Cart from '../Pages/Cart/Cart.jsx';
import Login from '../Pages/Auth/Login.jsx';
import Signup from './../Pages/Auth/Signup';
import NotFound from '../Pages/NotFound/NotFound.jsx';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;