import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import "./checkout.css";

const Checkout = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
    saveInfo: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value 
    });
  };
  const shipping = subtotal === 0 || subtotal >= 500 ? 0 : 15;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert("Order Placed Successfully!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <div className="breadcrumbs">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link> / {" "}
        <Link to="/cart" style={{ color: "inherit", textDecoration: "none" }}>Cart</Link> / {" "}
        <span>Checkout</span>
      </div>

      <h1 className="main-title">Billing Details</h1>

      <div className="checkout-content">
        <form id="checkout-form" className="billing-form" onSubmit={handlePlaceOrder}>
          <div className="input-group">
            <label>First Name<span>*</span></label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Street Address<span>*</span></label>
            <input
              type="text"
              name="streetAddress"
              required
              value={formData.streetAddress}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Apartment, floor, etc. (optional)</label>
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Town/City<span>*</span></label>
            <input
              type="text"
              name="townCity"
              required
              value={formData.townCity}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Phone Number<span>*</span></label>
            <input
              type="tel"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Email Address<span>*</span></label>
            <input
              type="email"
              name="emailAddress"
              required
              value={formData.emailAddress}
              onChange={handleInputChange}
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="saveInfo"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleInputChange}
            />
            <label htmlFor="saveInfo">Save this information for faster check-out next time</label>
          </div>
        </form>
        <div className="order-summary">
          <div className="order-items-list">
            {cartItems.length === 0 ? (
              <p>No products in cart.</p>
            ) : (
              cartItems.map((item) => (
                <div className="order-item" key={item.id}>
                  <div className="item-info">
                    {item.image && <img src={item.image} alt={item.title || item.name} />}
                    <span>{item.title || item.name} (x{item.quantity})</span>
                  </div>
                  <span className="item-price">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>

          <div className="calc-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <hr />

          <div className="calc-row">
            <span>Shipping:</span>
            <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
          </div>
          <hr />

          <div className="calc-row total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="payment-options">
            <div className="payment-option">
              <div className="radio-label">
                <input
                  type="radio"
                  id="bank"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                />
                <label htmlFor="bank">Bank</label>
              </div>
            </div>

            <div className="payment-option">
              <div className="radio-label">
                <input
                  type="radio"
                  id="cash"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                />
                <label htmlFor="cash">Cash on delivery</label>
              </div>
            </div>
          </div>

          <button type="submit" form="checkout-form" className="btn-order">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};
export default Checkout;