import { Heart, Eye } from 'lucide-react';
import '../../CSS/ProductCard.css';
import AddToCart from '../UI/Buttons/cart.jsx';
import RatingStars from '../UI/RatingStars.jsx';

function ProductCardOffer({ image, discount, title, currentPrice, originalPrice, rating, reviewsCount }) {
    return (
        <div className='product-card'>
            <div className='product-img'>
                {discount && <span className="product-badge-fixed">{discount}</span>}
                <img src={image} alt={title} />
            
                <div className='product-icons'>
                    <button className='iconn-btn'>
                        <Heart size={20} />
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