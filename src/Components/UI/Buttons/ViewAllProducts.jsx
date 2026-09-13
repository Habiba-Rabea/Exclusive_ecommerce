import { Link } from 'react-router-dom';
import '../../../CSS/Buttons.css';

const ViewAllProducts = ({ text = "View All", to = "/products", onClick }) => {
  return (
    <Link to={to} className="view-all-products-btn" onClick={onClick}>
      {text}
    </Link>
  );
};

export default ViewAllProducts;