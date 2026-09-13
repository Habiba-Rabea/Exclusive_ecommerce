import { Heart, Eye } from 'lucide-react';
import '../../CSS/ProductCard.css';
import AddToCart from '../UI/Buttons/cart.jsx';
import RatingStars from '../UI/RatingStars.jsx';
import { useWishlist } from '../../Context/WishlistContext.jsx'; 

function ProductCardOffer({ product, image, discount, title, currentPrice, originalPrice, rating, reviewsCount }) {
    
    const { wishlistItems, toggleWishlist } = useWishlist();

    const productData = product || {
        id: title ? title.toLowerCase().replace(/\s+/g, '-') : Math.random(), 
        name: title,
        image,
        price: currentPrice,
        originalPrice,
        rating,
        reviewsCount
    };

    const isLiked = wishlistItems.some((item) => item.id === productData.id);

    return (
        <div className='product-card'>
            <div className='product-img'>
                {discount && <span className="product-badge-fixed">{discount}</span>}
                <img src={image} alt={title} />
            
                <div className='product-icons'>
                    <button 
                        className={`iconn-btn ${isLiked ? 'liked' : ''}`} 
                        onClick={() => toggleWishlist(productData)}
                        title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                        <Heart 
                            size={20} 
                            fill={isLiked ? "red" : "none"} 
                            color={isLiked ? "red" : "currentColor"} 
                        />
                    </button>
                    <button className="iconn-btn">
                        <Eye size={20} />
                    </button>
                </div>

                <AddToCart />
            </div>

            <div className="product-info">
                <h3 className="product-title">{title}</h3>
                <div className="product-price">
                    <span className="current-price">{currentPrice}</span>
                    <span className="original-price"><del>{originalPrice}</del></span>
                </div>
                
                <div className="product-rating-area">
                  <RatingStars rating={rating} reviewsCount={reviewsCount} />
                </div>
            </div>
        </div>
    );
}

export default ProductCardOffer;