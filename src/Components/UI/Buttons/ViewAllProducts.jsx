import { Link } from 'react-router-dom';
import '../../../CSS/Buttons.css';

const ViewAllProducts = ({ text = "Back to Home Page", onClick }) => {
  return (
    <button className="view-all-products-btn" onClick={onClick}>
      {text}
    </button>
  );
};

export default ViewAllProducts;