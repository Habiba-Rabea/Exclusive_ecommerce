import { Heart, Eye } from 'lucide-react';
import '../../CSS/ProductCard.css';
import RatingStars from '../UI/RatingStars.jsx';
import AddToCart from '../UI/Buttons/cart.jsx';
import { useWishlist } from '../../Context/WishlistContext.jsx';

export default function ProductCard({ product }) {
  const { wishlistItems, toggleWishlist } = useWishlist();
  
  const { id, name, price, originalPrice, rating, reviewsCount, image } = product || {};

  const isLiked = wishlistItems.some((item) => item.id === id);

  return (
    <div className="product-card">
      <div className="product-img">
        <img src={image} alt={name} />
        
        <div className="product-icons">
          <button 
            type="button"
            className={`iconn-btn ${isLiked ? 'liked' : ''}`}
            onClick={() => toggleWishlist(product)}
            title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart 
              size={20} 
              fill={isLiked ? "red" : "none"} 
              color={isLiked ? "red" : "currentColor"} 
            />
          </button>
          
          <button type="button" className="iconn-btn">
            <Eye size={20} />
          </button>
        </div>

       
        <AddToCart />
      </div>

      <div className="product-info">
        <h3 className="product-title">{name}</h3>
        <div className="product-price">
          <span className="current-price">${price}</span>
          {originalPrice && <span className="original-price"><del>${originalPrice}</del></span>}
        </div>
        
        <div className="product-rating-area">
          <RatingStars rating={rating} reviewsCount={reviewsCount} />
        </div>
      </div>
    </div>
  );
}