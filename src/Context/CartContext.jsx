import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser, user } = useAuth();
  const activeUser = currentUser || user;
  const userId = activeUser?.id || activeUser?.email;
  const cartKey = userId ? `cart_${userId}` : 'cart_guest';

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(cartKey);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(cartKey);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } catch {
      setCartItems([]);
    }
  }, [cartKey]);

  useEffect(() => {
    try {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    } catch {
    }
  }, [cartItems, cartKey]);

  const addToCart = (product) => {
    const activeUser = currentUser || user;
    if (!activeUser) {
      return false;
    }

    if (!product) return true;
    const productId = product.id || product._id || product.productId;
    if (!productId) return true;
    
    const quantityToAdd = Math.max(1, Number(product.quantity) || 1);

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => (item.id || item._id) === productId);

      if (existingIndex > -1) {
        return prev.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: (Number(item.quantity) || 1) + quantityToAdd }
            : item
        );
      }
      return [
        ...prev,
        {
          id: productId,
          title: product.title || product.name || "Product",
          price: Number(product.price) || 0,
          image: product.image || product.img || "",
          color: product.color || "",
          quantity: quantityToAdd,
        },
      ];
    });

    return true;
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => (item.id || item._id) !== id));
  };

  const updateQuantity = (id, quantity) => {
    const qty = Math.max(1, Number(quantity));
    setCartItems((prev) =>
      prev.map((item) => ((item.id || item._id) === id ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};