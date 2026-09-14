import '../../../CSS/Buttons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../../Context/CartContext.jsx';

function AddToCart({ product, item }) {
  const { addToCart } = useCart();
  const currentProduct = product || item;

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentProduct) {
      console.error("AddToCart: No product passed to cart button!");
      return;
    }

    const productId = currentProduct.id || currentProduct._id || currentProduct.productId;

    if (!productId) {
      console.error("AddToCart: Product exists but lacks an ID!", currentProduct);
      return;
    }

    addToCart({
      id: productId,
      title: currentProduct.title || currentProduct.name || "Product",
      price: Number(currentProduct.price) || 0,
      image: currentProduct.image || currentProduct.img || "",
      ...currentProduct
    });
  };

  return (
    <button 
      type="button" 
      className="add-to-cart-btn" 
      onClick={handleCartClick}
    >
      <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
      <span>Add To Cart</span>
    </button>
  );
}

export default AddToCart;