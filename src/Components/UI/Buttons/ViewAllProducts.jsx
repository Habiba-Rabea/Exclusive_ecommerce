
import { Link } from 'react-router-dom';
import '../../../CSS/Buttons.css';

function viewallproducts({ text = "View All Products" }) {
    return (
        <div className="view-all-container">
        <Link to="/products" className='view-all-products-btn'>
            {text}
        </Link>
        </div>
    );
}

export default viewallproducts;