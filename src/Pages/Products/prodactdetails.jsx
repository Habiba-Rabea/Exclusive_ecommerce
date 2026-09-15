import { useState, useEffect } from "react";
import Breadcrumb from "../../Components/Common/Breadcrumb.jsx";
import RatingStars from "../../Components/UI/RatingStars.jsx";
import ProductCardCategory from "../../Components/Category/ProductCardCategory.jsx";
import { Heart, Truck, RotateCcw } from "lucide-react";
import { productsData, productImagesMap, productStockMap } from "../../data/productsData.js";
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from "../../Context/CartContext.jsx";
import { useWishlist } from "../../Context/WishlistContext.jsx";
import "./productDetails.css";
import '../../App.css';

const staticColors = [
  { name: "Black", hex: "#202020" },
  { name: "White", hex: "#f5f5f5" },
  { name: "Blue", hex: "#1e40af" },
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();

  const Eproduct = productsData.find((p) => p.id === Number(id));

  if (!Eproduct) {
    return <h1 className="text-not-found">Product not found</h1>;
  }

  const imgs = productImagesMap[Eproduct.id] || [];
  const IsInStock = productStockMap[Eproduct.id] ?? true;

  const [selectedImage, setSelectedImage] = useState(imgs[0]);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const isWishlisted = wishlistItems.some((item) => item.id === Eproduct.id);

  function increaseQty() { setQuantity((q) => q + 1); }
  function decreaseQty() { setQuantity((q) => (q > 1 ? q - 1 : 1)); }

  function handleAddToCart() {
    if (!IsInStock) return;
    addToCart({
      id: Eproduct.id,
      title: Eproduct.name,
      name: Eproduct.name,
      price: Eproduct.price,
      image: selectedImage || imgs[0],
      color: selectedColor,
      quantity: quantity
    });
    navigate('/cart');
  }

  useEffect(() => {
    setSelectedImage(imgs[0]);
    setSelectedColor("Black");
    setQuantity(1);
  }, [id]);

  return (
    <main className="container_p">
      <Breadcrumb
        items={[
          { name: "Home", link: "/" },
          { name: "Products", link: "/products" },
          { name: Eproduct.name },
        ]}
      />

      <div className="product-main-section">
        {/* images */}
        <div className="product-gallery">
          <div className="thumbnail-list">
            {imgs.map((img, index) => (
              <button
                key={index}
                type="button"
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

        <div className="product_info">
          <h1 className="product-name">{Eproduct.name}</h1>
          <div className="rating-stock">
            <RatingStars
              rating={Eproduct.rating}
              reviewsCount={Eproduct.reviewsCount}
            />

            <span className={IsInStock ? "inStock" : "outOfStock"}>
              {IsInStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <p className="product-price">${Eproduct.price.toFixed(2)}</p>

          <p className="product-description">{Eproduct.description}</p>

          <div className="divider"></div>
          <div className="colors-section">
            <span>Colours:</span>
            <div className="color-options">
              {staticColors.map((color) => (
                <button
                  key={color.name}
                  type="button"
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
          <div className="action-row">
            <div className="quantity-box">
              <button type="button" className="qty-btn" onClick={decreaseQty}>−</button>
              <span>{quantity}</span>
              <button type="button" className="qty-btn" onClick={increaseQty}>+</button>
            </div>

            <button 
              type="button"
              className="buy-now-btn" 
              onClick={handleAddToCart} 
              disabled={!IsInStock}
            >
              {IsInStock ? "Buy Now" : "Out of Stock"}
            </button>

            <button 
              type="button" 
              className="wishlist-btn" 
              aria-label="add to favorite"
              onClick={() => toggleWishlist(Eproduct)}
            >
              <Heart 
                size={20} 
                fill={isWishlisted ? "#db4444" : "none"} 
                color={isWishlisted ? "#db4444" : "currentColor"} 
              />
            </button>
          </div>

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

      <div className="related-items">
        <div className="related-title">
          <span className="red-bar"></span>
          <h2>Related Item</h2>
        </div>
        
        <div className="related-grid">
          {productsData
            .filter((p) => p.category === Eproduct.category && p.id !== Eproduct.id)
            .slice(0, 4)
            .map((p) => (
              <ProductCardCategory key={p.id} product={p} />
            ))}
        </div>
      </div>
    </main>
  );
}
