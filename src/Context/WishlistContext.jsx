import { createContext, useContext } from 'react';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
const WishlistContext = createContext();
export function WishlistProvider({ children }) {
  const { currentUser, user } = useAuth();
  const navigate = useNavigate();
  const activeUser = currentUser || user;
  const userId = activeUser?.id || activeUser?.email;
  const wishlistKey = userId ? `wishlist_${userId}` : 'wishlist_guest';
  const [wishlistItems, setWishlistItems] = useLocalStorage(wishlistKey, []);

  const toggleWishlist = (product) => {
    if (!activeUser) {
      navigate('/login');
      return;
    }

    if (!product) return;
    const productId = product.id || product._id;

    setWishlistItems((prev) => {
      const exists = prev.some((item) => (item.id || item._id) === productId);
      if (exists) {
        return prev.filter((item) => (item.id || item._id) !== productId);
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => (item.id || item._id) !== id));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}