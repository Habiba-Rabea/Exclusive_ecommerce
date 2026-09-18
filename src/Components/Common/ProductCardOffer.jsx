import { Heart, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import '../../CSS/ProductCard.css';
import AddToCart from '../UI/Buttons/cart.jsx';
import RatingStars from '../UI/RatingStars.jsx';
import { useWishlist } from '../../Context/WishlistContext.jsx'; 
import { useCart } from '../../Context/CartContext.jsx';

function ProductCardOffer({ product, image, discount, title, currentPrice, originalPrice, rating, reviewsCount }) {
    const { wishlistItems, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const rawPrice = currentPrice ? String(currentPrice).replace(/[^0-9.]/g, '') : "0";
    const numericPrice = Number(rawPrice) || 0;
    const productData = {
        id: product?.id || (title ? title.toLowerCase().replace(/\s+/g, '-') : Math.random()), 
        title: title || product?.title || product?.name || "Product",
        name: title || product?.title || product?.name || "Product",
        image: image || product?.image || "",
        price: numericPrice || product?.price || 0,
        originalPrice: originalPrice || product?.originalPrice,
        rating: rating || product?.rating || 5,
        reviewsCount: reviewsCount || product?.reviewsCount || 0,
        ...product
    };

    const isLiked = wishlistItems ? wishlistItems.some((item) => (item.id || item._id) === productData.id) : false;

    const handleAddToCartClick = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        
        const success = addToCart(productData);
        
        if (!success) {
           navigate('/login');
            return;
        }
    };

    return (
        <div className='product-card'>
            <div className='product-img'>
                {discount && <span className="product-badge-fixed">{discount}</span>}
                <img src={productData.image} alt={productData.title} />
            
                <div className='product-icons'>
                    <button 
                        type="button"
                        className={`iconn-btn ${isLiked ? 'liked' : ''}`} 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(productData);
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
                        to={`/product/${productData.id}`} 
                        className="iconn-btn" 
                        aria-label="View Details" 
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'inherit' }}
                    >
                        <Eye size={20} />
                    </Link>
                </div>
                <AddToCart product={productData} onClick={handleAddToCartClick} />
            </div>

            <div className="product-info">
                <h3 className="product-title">{productData.title}</h3>
                <div className="product-price">
                    <span className="current-price">${productData.price}</span>
                    {productData.originalPrice && (
                        <span className="original-price"><del>{productData.originalPrice}</del></span>
                    )}
                </div>
                
                <div className="product-rating-area">
                  <RatingStars rating={productData.rating} reviewsCount={productData.reviewsCount} />
                </div>
            </div>
        </div>
    );
}

export default ProductCardOffer;