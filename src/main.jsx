import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { WishlistProvider } from './Context/WishlistContext.jsx';
import { AuthProvider } from './Context/AuthContext.jsx'; 
import './index.css'; 
import { CartProvider } from './Context/CartContext.jsx';;
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> 
        <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);