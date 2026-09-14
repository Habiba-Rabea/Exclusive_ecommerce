import { Link, useNavigate } from 'react-router-dom';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import RatingStars from '../UI/RatingStars.jsx';
import { useWishlist } from '../../Context/WishlistContext.jsx';
import { useCart } from '../../Context/CartContext.jsx';

export default function ProductCardCategory({ product }) {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart(); 
  const navigate = useNavigate();

  if (!product) return null;

  const {
    id, name, image, price, originalPrice, discountBadge, rating, reviewsCount, subtext, description,
  } = product;

  const isLiked = wishlistItems ? wishlistItems.some((item) => (item.id || item._id) === id) : false;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    navigate('/cart');
  };

  return (
    <article className="category-product-card">
      <div className="category-product-visual">
        {discountBadge ? <span className="category-product-badge">{discountBadge}</span> : null}
        <img src={image} alt={name} loading="lazy" />

        <div className="category-product-actions">
          <button 
            type="button" 
            aria-label={`Add ${name} to wishlist`} 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`transition-colors duration-200 hover:bg-[#DB4444]! hover:text-white! ${isLiked ? 'liked' : ''}`}
          >
            <Heart 
              size={19} 
              fill={isLiked ? "red" : "none"} 
              color={isLiked ? "red" : "currentColor"} 
            />
          </button>

          <Link 
            to={`/product/${id}`} 
            aria-label={`Quick view ${name}`}  
            className="grid place-items-center size-7.75 border-0 rounded-full bg-white text-black shadow-[0_3px_10px_rgba(0,0,0,0.08)] transition-colors duration-200 hover:bg-[#DB4444]! hover:text-white!"
          >
            <Eye size={19} />
          </Link>        
        </div>

        <button 
          type="button" 
          className="category-add-to-cart"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={15} /> Add To Cart
        </button>
      </div>

      <div className="category-product-info">
        <p className="category-product-subtext">{subtext}</p>
        <Link to={`/product/${id}`}>
          <h2>{name}</h2>
        </Link>
        <p className="category-product-description">{description}</p>
        <div className="category-product-price">
          <strong>${price ? price.toLocaleString() : price}</strong>
          {originalPrice ? <del>${originalPrice.toLocaleString()}</del> : null}
        </div>
        <RatingStars rating={rating} reviewsCount={reviewsCount} />
      </div>
    </article>
  );
}