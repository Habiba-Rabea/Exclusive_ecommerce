import { Heart, Eye } from 'lucide-react';
import '../../CSS/ProductCard.css';
import AddToCart from '../UI/Buttons/cart.jsx';
import RatingStars from '../UI/RatingStars.jsx';
import { useWishlist } from '../../Context/WishlistContext.jsx'; 

function ProductCardOffer({ product, image, discount, title, currentPrice, originalPrice, rating, reviewsCount }) {
    const { wishlistItems, toggleWishlist } = useWishlist();
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

    const isLiked = wishlistItems.some((item) => (item.id || item._id) === productData.id);

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
                    <button 
                        type="button" 
                        className="iconn-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    >
                        <Eye size={20} />
                    </button>
                </div>
                <AddToCart product={productData} />
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