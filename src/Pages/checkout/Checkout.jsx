import React, { useState } from 'react';
import './checkout.css';

const orderItems = [
  {
    id: 1,
    name: 'LCD Monitor',
    price: 650,
    image: 'https://pngimg.com/d/monitor_PNG101646.png',
  },
  {
    id: 2,
    name: 'H1 Gamepad',
    price: 1100,
    image: 'https://pngimg.com/d/gamepad_PNG79.png',
  },
];

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const subtotal = orderItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="checkout-container">
      <div className="breadcrumbs">
        Account / My Account / Product / View Cart / <span>CheckOut</span>
      </div>

      <h1 className="main-title">Billing Details</h1>

      <div className="checkout-content">
        {/* Left Column: Form */}
        <form className="billing-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>First Name<span>*</span></label>
            <input type="text" required />
          </div>

          <div className="input-group">
            <label>Company Name</label>
            <input type="text" />
          </div>

          <div className="input-group">
            <label>Street Address<span>*</span></label>
            <input type="text" required />
          </div>

          <div className="input-group">
            <label>Apartment, floor, etc. (optional)</label>
            <input type="text" />
          </div>

          <div className="input-group">
            <label>Town/City<span>*</span></label>
            <input type="text" required />
          </div>

          <div className="input-group">
            <label>Phone Number<span>*</span></label>
            <input type="tel" required />
          </div>

          <div className="input-group">
            <label>Email Address<span>*</span></label>
            <input type="email" required />
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="saveInfo" defaultChecked />
            <label htmlFor="saveInfo">Save this information for faster check-out next time</label>
          </div>
        </form>

        {/* Right Column: Order Summary */}
        <div className="order-summary">
          <div className="order-items-list">
            {orderItems.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-info">
                  <img src={item.image} alt={item.name} />
                  <span>{item.name}</span>
                </div>
                <span className="item-price">${item.price}</span>
              </div>
            ))}
          </div>

          <div className="calc-row">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <hr />
          <div className="calc-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <hr />
          <div className="calc-row total">
            <span>Total:</span>
            <span>${subtotal}</span>
          </div>

          {/* Payment Selection */}
          <div className="payment-options">
            <div className="payment-option">
              <div className="radio-label">
                <input
                  type="radio"
                  id="bank"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="bank">Bank</label>
              </div>
              <div className="card-logos">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
              </div>
            </div>

            <div className="payment-option">
              <div className="radio-label">
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="cod">Cash on delivery</label>
              </div>
            </div>
          </div>

          {/* Coupon */}
          <div className="coupon-box">
            <input type="text" placeholder="Coupon Code" />
            <button className="btn-coupon">Apply Coupon</button>
          </div>

          {/* Submit */}
          <button className="btn-order">Place Order</button>
        </div>
      </div>
    </div>
  );
}