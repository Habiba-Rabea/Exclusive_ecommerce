import { Heart, Eye } from 'lucide-react';
import '../../CSS/ProductCard.css';
import card1 from '../../assets/images/home/card1.jpg';
import AddToCart from '../UI/Buttons/cart.jsx';
import RatingStars from '../UI/RatingStars.jsx';
function ProductCard({ product }) {
    const {
        name = "HAVIT HV-G92 Gamepad",
        price = 120,
        originalPrice = 160,
        rating = 5,
        reviewsCount = 88,
        image = card1
    } = product || {};

    return (
        <div className='product-card'>
            <div className='product-img'>
                <img src={image} alt={name} />
            
                <div className='product-icons'>
                    <button className='iconn-btn' type="button" aria-label="Add to wishlist">
                        <Heart size={20} />
                    </button>
                    <button className="iconn-btn" type="button" aria-label="Quick view">
                        <Eye size={20} />
                    </button>
                </div>

                <AddToCart />
            </div>
            <div className="product-info">
                <h3 className="product-title">{name}</h3>
                <div className="product-price">
                    <span className="current-price">${price}</span>
                    {originalPrice && (
                        <span className="original-price"><del>${originalPrice}</del></span>
                    )}
                </div>
                <RatingStars rating={rating} reviewsCount={reviewsCount} />
            </div>
        </div>
    );
}

export default ProductCard;