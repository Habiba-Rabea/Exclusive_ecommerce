import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import "../../CSS/Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === "EXCLUSIVE10") {
      setDiscount(0.1);
      alert("Coupon Applied: 10% Off!");
    } else {
      alert("Invalid Coupon Code");
    }
  };
  const discountedSubtotal = subtotal - subtotal * discount;
  const shipping = subtotal === 0 || subtotal >= 500 ? 0 : 15;
  const total = discountedSubtotal + shipping;

  return (
    <div className="cart-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <span>Cart</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products" className="btn-red" style={{ textDecoration: 'none' }}>
            Go Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-table-header">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
          </div>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div className="cart-item-row" key={item.id}>
                <div className="product-info">
                  <div className="product-img-wrapper">
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove Item"
                    >
                      &times;
                    </button>
                    {item.image && <img src={item.image} alt={item.title || item.name} />}
                  </div>
                  <span className="product-title">{item.title || item.name}</span>
                </div>
                <div className="product-price">${item.price}</div>
                <div className="product-quantity">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val) && val > 0) {
                        updateQuantity(item.id, val);
                      }
                    }}
                  />
                </div>
                <div className="product-subtotal">
                  ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-actions-row">
            <Link to="/products" className="btn-outline">
              Return To Shop
            </Link>
          </div>
          <div className="cart-bottom-section">
            <div className="coupon-box">
              <input
                type="text"
                placeholder="Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button className="btn-red" onClick={handleApplyCoupon}>
                Apply Coupon
              </button>
            </div>

            <div className="cart-total-box">
              <h3>Cart Total</h3>
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <>
                  <hr />
                  <div className="total-row discount-row" style={{ color: "#db4444" }}>
                    <span>Discount (10%):</span>
                    <span>-${(subtotal * discount).toFixed(2)}</span>
                  </div>
                </>
              )}
              <hr />
              <div className="total-row">
                <span>Shipping:</span>
                <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
              </div>
              <hr />
              <div className="total-row">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                className="btn-red btn-checkout"
                onClick={() => navigate("/checkout")}
              >
                Process to checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;