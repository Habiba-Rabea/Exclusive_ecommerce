import { Link } from 'react-router-dom';
import './wishlist.css';
import { productsData } from '../../data/productsData.js';
import RatingStars from '../../Components/UI/RatingStars.jsx';
import { useWishlist } from '../../Context/WishlistContext.jsx';

export default function Wishlist() {
  const { wishlistItems, toggleWishlist, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h2 className="section-title">Wishlist ({wishlistItems.length})</h2>
        {wishlistItems.length > 0 && (
          <button className="outline-btn" onClick={clearWishlist}>
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
                <button className="add-cart-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Add To Cart
                </button>
              </div>
              <div className="product-details">
                <h4 className="item-name">{item.name || item.title}</h4>
                <div className="prices">
                  <span className="current-price">{item.price || item.currentPrice}</span>
                  {(item.originalPrice) && (
                    <span className="old-price">{item.originalPrice}</span>
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
          const isLiked = wishlistItems.some((wishItem) => wishItem.id === item.id);
          return (
            <div key={item.id} className="product-card">
              <div className="image-box">
                {item.discountBadge && <span className="discount-tag">{item.discountBadge}</span>}
                <button 
                  className={`icon-action-btn ${isLiked ? 'liked' : ''}`} 
                  onClick={() => toggleWishlist(item)} 
                  title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? "red" : "none"} stroke={isLiked ? "red" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <img src={item.image} alt={item.name} />
                <button className="add-cart-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Add To Cart
                </button>
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