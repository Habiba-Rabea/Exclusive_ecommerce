import { Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../CSS/ProductCard.css';
import RatingStars from '../UI/RatingStars.jsx';
import AddToCart from '../UI/Buttons/cart.jsx';
import { useWishlist } from '../../Context/WishlistContext.jsx';

export default function ProductCard({ product }) {
  const { wishlistItems, toggleWishlist } = useWishlist();
  
  if (!product) return null;

  const id = product.id || product._id;
  const productName = product.name || product.title || "Product";
  const { price, originalPrice, rating, reviewsCount, image } = product;

  const isLiked = wishlistItems.some((item) => (item.id || item._id) === id);

  return (
    <div className="product-card">
      <div className="product-img">
        <img src={image} alt={productName} />
        
        <div className="product-icons">
          <button 
            type="button"
            className={`iconn-btn ${isLiked ? 'liked' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart 
              size={20} 
              fill={isLiked ? "red" : "none"} 
              color={isLiked ? "red" : "currentColor"} 
            />
          </button>
          
          <Link 
            to={`/product/${id}`} 
            className="iconn-btn" 
            aria-label="View Details"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'inherit' }}
          >
            <Eye size={20} />
          </Link>
        </div>
        <AddToCart product={product} />
      </div>

      <div className="product-info">
        <h3 className="product-title">{productName}</h3>
        <div className="product-price">
          <span className="current-price">${price}</span>
          {originalPrice && (
            <span className="original-price">
              <del>${originalPrice}</del>
            </span>
          )}
        </div>
        
        <div className="product-rating-area">
          <RatingStars rating={rating} reviewsCount={reviewsCount} />
        </div>
      </div>
    </div>
  );
}