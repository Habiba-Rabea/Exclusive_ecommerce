import { Routes, Route } from 'react-router-dom';
import MainLayout from '../Components/Layout/mainLayout';
import Home from '../Pages/Home/home.jsx';
import Cart from '../Pages/Cart/Cart.jsx';
import Login from '../Pages/Auth/login.jsx';
import Signup from '../Pages/Auth/Signup.jsx';
import Wishlist from '../Pages/Wishlist/wishlist.jsx';
import Checkout from '../Pages/checkout/Checkout.jsx';
import NotFound from '../Pages/Notfound/notfound.jsx';
import Contact from '../Pages/Contact/contact.jsx';
import ProductDetails from '../Pages/Products/prodactdetails.jsx';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="contact" element={<Contact />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/product" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;