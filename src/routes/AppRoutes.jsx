import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import ScrollToTop from '../Components/ScrollToTop.jsx';
import MainLayout from '../Components/Layout/mainLayout'; // تحققي هل المجلد اسمه Layout أم layout
import Home from '../Pages/Home/home.jsx';
import About from '../Pages/About/about.jsx';
import Cart from '../Pages/Cart/Cart.jsx';
import Login from '../Pages/Auth/login.jsx';
import SignUp from '../Pages/Auth/signup.jsx';
import Wishlist from '../Pages/Wishlist/wishlist.jsx';
import Checkout from '../Pages/checkout/Checkout.jsx'; 
import NotFound from '../Pages/Notfound/notfound.jsx';
import Contact from '../Pages/Contact/contact.jsx';
import ProductDetails from '../Pages/Products/prodactdetails.jsx';
import Account from '../Pages/Account/account.jsx';
import Category from '../Pages/Category/CategoryPage.jsx';
import CategoryProductsContextProvider from '../Context/CategoryProductsContext.jsx';

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <CategoryProductsContextProvider>
        <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Category />} />
          <Route path="category/:categorySlug" element={<Category />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      </CategoryProductsContextProvider>
    </>
  );
};
export default AppRoutes;