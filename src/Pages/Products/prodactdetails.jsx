import { useState } from "react";
import Breadcrumb from "../../Components/Common/Breadcrumb.jsx";
import RatingStars from "../../Components/UI/RatingStars.jsx";
import ProductCard from "../../Components/Common/ProductCard.jsx";
import { Heart, Truck, RotateCcw } from "lucide-react";
import { productDetails } from "../../data/MockData.js";
import "./productDetails.css";
import '../../App.css';


export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(productDetails.images[0]);
  const [selectedColor, setSelectedColor] = useState(productDetails.colors[0].name);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  function increaseQty (){ setQuantity((q) => q + 1)};
  function decreaseQty () { setQuantity((q) => (q > 1 ? q - 1 : 1))};

  return (
    <main className="container">
      <Breadcrumb items={productDetails.breadcrumb} />

      <div className="product-main-section">
        {/* images*/}
        <div className="product-gallery">
          <div className="thumbnail-list">
            {productDetails.images.map((img, index) => (
              <button
                key={index}
                className={`thumbnail-item ${
                  img === selectedImage ? "thumbnail-active" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt="image" />
              </button>
            ))}
          </div>

          <div className="main-image">
            <img src={selectedImage} alt="main_image" />
          </div>
        </div>

        {/*info */}
        <div className="product_info">
          <h1 className="product-name">{productDetails.name}</h1>
        <div className="rating-stock">
          <RatingStars
            rating={productDetails.rating}
            reviewsCount={productDetails.reviewsCount}
          />

          <span className="inStock">
            {productDetails.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
          <p className="product-price">${productDetails.price.toFixed(2)}</p>

          <p className="product-description">{productDetails.description}</p>

          <div className="divider"></div>

          {/*colors*/}
          <div className="colors-section">
            <span>Colours:</span>
            <div className="color-options">
              {productDetails.colors.map((color) => (
                <button
                  key={color.name}
                  className={`color-circle ${
                    selectedColor === color.name ? "color-selected" : ""
                  }`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          {/* sizes*/}
          <div className="sizes-section">
            <span>Size:</span>
            <div className="size-options">
              {productDetails.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-box ${
                    selectedSize === size ? "size-active" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* quantity & buttons*/}
          <div className="action-row">
            <div className="quantity-box">
              <button className="qty-btn" onClick={decreaseQty}>−</button>
              <span>{quantity}</span>
              <button className="qty-btn" onClick={increaseQty}>+</button>
            </div>

            <button className="buy-now-btn">Buy Now</button>

            <button className="wishlist-btn" aria-label="add to favorite">
              <Heart size={20} />
            </button>
          </div>

          {/* delivery*/}
          <div className="delivery-box">
            <div className="delivery-row">
              <Truck size={24} />
              <div>
                <p className="delivery-title">Free Delivery</p>
                <p className="delivery-subtitle">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="delivery-row">
              <RotateCcw size={24} />
              <div>
                <p className="delivery-title">Return Delivery</p>
                <p className="delivery-subtitle">
                  Free 30 Days Delivery Returns. Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* related items */}
      <div className="related-items">
        <div className="related-title">
          <span className="red-bar"></span>
          <h2>Related Item</h2>
          </div>
        <div className="related-grid">
          
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
      </div>
    </main>
  );
}
