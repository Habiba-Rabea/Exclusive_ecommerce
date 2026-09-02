import {Heart, Eye} from 'lucide-react';
import '../../CSS/ProductCard.css';
import card1 from '../../assets/home/card1.jpg';
import AddToCart from '../UI/Buttons/cart.jsx';
import RatingStars from '../UI/RatingStars.jsx';

function ProductCardOffer(){
    return(
        <div className='product-card'>
            <div className='product-img'>
                <span className="product-badge-fixed">-40%</span>
                <img src={card1} alt='game'/>
            
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
                <h3 className="product-title">HAVIT HV-G92 Gamepad</h3>
                <div className="product-price">
                    <span className="current-price">$120</span>
                    <span className="original-price"><del>$160</del></span>
                </div>
                <RatingStars/>
            </div>
        </div>
    );
}

export default ProductCardOffer;