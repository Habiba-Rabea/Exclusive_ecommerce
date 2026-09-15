import { Link } from 'react-router-dom';
import './wishlist.css';
import { productsData } from '../../data/productsData.js';
import RatingStars from '../../Components/UI/RatingStars.jsx';
import AddToCart from '../../Components/UI/Buttons/cart.jsx'; 
import { useWishlist } from '../../Context/WishlistContext.jsx';
import { useCart } from '../../Context/CartContext.jsx';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const handleMoveAllToBag = () => {
    wishlistItems.forEach((item) => {
      addToCart(item);
    });
    clearWishlist();
  };

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h2 className="section-title">Wishlist ({wishlistItems.length})</h2>
        {wishlistItems.length > 0 && (
          <button className="outline-btn" onClick={handleMoveAllToBag}>
            Move All To Bag
          </button>
        )}
      </div>

      <div className="products-grid">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div key={item.id} className="product-card">
              <div className="image-box">
                {item.discountBadge && <span className="discount-tag">{item.discountBadge}</span>}
                <button 
                  className="icon-action-btn" 
                  onClick={() => removeFromWishlist(item.id)} 
                  title="Delete"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
                <img src={item.image} alt={item.name || item.title} />
                <AddToCart product={item} />
              </div>
              <div className="product-details">
                <h4 className="item-name">{item.name || item.title}</h4>
                <div className="prices">
                  <span className="current-price">${item.price || item.currentPrice}</span>
                  {item.originalPrice && (
                    <span className="old-price">${item.originalPrice}</span>
                  )}
                </div>
                {item.rating && (
                  <RatingStars rating={item.rating} reviewsCount={item.reviewsCount} />
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px', color: '#777' }}>
            Your Wishlist is empty.
          </p>
        )}
      </div>

      <div className="wishlist-header section-spacing">
        <div className="header-label">
          <span className="red-box"></span>
          <h2 className="section-title">Just For You</h2>
        </div>
        <Link to="/products" style={{ textDecoration: 'none' }}>
          <button className="outline-btn">See All</button>
        </Link>
      </div>

      <div className="products-grid">
        {productsData.slice(0, 4).map((item) => {
          return (
            <div key={item.id} className="product-card">
              <div className="image-box">
                {item.discountBadge && <span className="discount-tag">{item.discountBadge}</span>}
                <img src={item.image} alt={item.name} />
                <AddToCart product={item} />
              </div>
              <div className="product-details">
                <h4 className="item-name">{item.name}</h4>
                <div className="prices">
                  <span className="current-price">${item.price}</span>
                  {item.originalPrice && (
                    <span className="old-price">${item.originalPrice}</span>
                  )}
                </div>
                <RatingStars rating={item.rating} reviewsCount={item.reviewsCount} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}