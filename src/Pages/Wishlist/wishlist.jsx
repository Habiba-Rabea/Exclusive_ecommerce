import React, { useState } from 'react';
import './wishlist.css';

const initialWishlist = [
  {
    id: 1,
    name: 'Gucci duffle bag',
    price: 960,
    originalPrice: 1160,
    discount: '-35%',
    image: 'https://pngimg.com/d/bag_PNG10672.png',
  },
  {
    id: 2,
    name: 'RGB liquid CPU Cooler',
    price: 1960,
    originalPrice: null,
    discount: null,
    image: 'https://pngimg.com/d/cooler_PNG101569.png',
  },
  {
    id: 3,
    name: 'GP11 Shooter USB Gamepad',
    price: 550,
    originalPrice: null,
    discount: null,
    image: 'https://pngimg.com/d/gamepad_PNG79.png',
  },
  {
    id: 4,
    name: 'Quilted Satin Jacket',
    price: 750,
    originalPrice: null,
    discount: null,
    image: 'https://pngimg.com/d/jacket_PNG8050.png',
  },
];

const justForYou = [
  {
    id: 5,
    name: 'ASUS FHD Gaming Laptop',
    price: 960,
    originalPrice: 1160,
    discount: '-35%',
    rating: 5,
    reviews: 65,
    image: 'https://pngimg.com/d/laptop_PNG5940.png',
  },
  {
    id: 6,
    name: 'IPS LCD Gaming Monitor',
    price: 1160,
    originalPrice: null,
    discount: null,
    rating: 5,
    reviews: 65,
    image: 'https://pngimg.com/d/monitor_PNG101646.png',
  },
  {
    id: 7,
    name: 'HAVIT HV-G92 Gamepad',
    price: 560,
    originalPrice: null,
    badge: 'NEW',
    rating: 5,
    reviews: 65,
    image: 'https://pngimg.com/d/gamepad_PNG87.png',
  },
  {
    id: 8,
    name: 'AK-900 Wired Keyboard',
    price: 200,
    originalPrice: null,
    discount: null,
    rating: 5,
    reviews: 65,
    image: 'https://pngimg.com/d/keyboard_PNG101838.png',
  },
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlist);

  const removeItem = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <div className="wishlist-container">
      {/* Top Section */}
      <div className="wishlist-header">
        <h2 className="section-title">Wishlist ({wishlistItems.length})</h2>
        <button className="outline-btn">Move All To Bag</button>
      </div>

      <div className="products-grid">
        {wishlistItems.map((item) => (
          <div key={item.id} className="product-card">
            <div className="image-box">
              {item.discount && <span className="discount-tag">{item.discount}</span>}
              <button 
                className="icon-action-btn" 
                onClick={() => removeItem(item.id)} 
                title="Delete"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
              <img src={item.image} alt={item.name} />
              <button className="add-cart-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Add To Cart
              </button>
            </div>
            <div className="product-details">
              <h4 className="item-name">{item.name}</h4>
              <div className="prices">
                <span className="current-price">${item.price}</span>
                {item.originalPrice && (
                  <span className="old-price">${item.originalPrice}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Just For You Section */}
      <div className="wishlist-header section-spacing">
        <div className="header-label">
          <span className="red-box"></span>
          <h2 className="section-title">Just For You</h2>
        </div>
        <button className="outline-btn">See All</button>
      </div>

      <div className="products-grid">
        {justForYou.map((item) => (
          <div key={item.id} className="product-card">
            <div className="image-box">
              {item.discount && <span className="discount-tag">{item.discount}</span>}
              {item.badge && <span className="badge-new">{item.badge}</span>}
              <button className="icon-action-btn" title="Quick View">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
              <img src={item.image} alt={item.name} />
              <button className="add-cart-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Add To Cart
              </button>
            </div>
            <div className="product-details">
              <h4 className="item-name">{item.name}</h4>
              <div className="prices">
                <span className="current-price">${item.price}</span>
                {item.originalPrice && (
                  <span className="old-price">${item.originalPrice}</span>
                )}
              </div>
              <div className="ratings">
                <span className="stars">★★★★★</span>
                <span className="reviews">({item.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}