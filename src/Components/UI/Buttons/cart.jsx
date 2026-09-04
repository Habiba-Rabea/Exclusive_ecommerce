import '../../../CSS/Buttons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function AddToCart(){
    return(
        <button className='add-to-cart-btn'>
            <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
            Add To Cart
        </button>
    );
}
export default AddToCart;