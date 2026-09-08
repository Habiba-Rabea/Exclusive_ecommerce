import { Eye, Heart, ShoppingCart } from 'lucide-react';
import RatingStars from '../UI/RatingStars.jsx';

export default function ProductCardCategory({ product }) {
  const {
    name, image, price, originalPrice, discountBadge, rating, reviewsCount, subtext, description,
  } = product;

  return (
    <article className="category-product-card">
      <div className="category-product-visual">
        {discountBadge ? <span className="category-product-badge">{discountBadge}</span> : null}
        <img src={image} alt={name} loading="lazy" />
        <div className="category-product-actions">
          <button type="button" aria-label={`Add ${name} to wishlist`}><Heart size={19} /></button>
          <button type="button" aria-label={`Quick view ${name}`}><Eye size={19} /></button>
        </div>
        <button type="button" className="category-add-to-cart"><ShoppingCart size={15} /> Add To Cart</button>
      </div>
      <div className="category-product-info">
        <p className="category-product-subtext">{subtext}</p>
        <h2>{name}</h2>
        <p className="category-product-description">{description}</p>
        <div className="category-product-price">
          <strong>${price.toLocaleString()}</strong>
          {originalPrice ? <del>${originalPrice.toLocaleString()}</del> : null}
        </div>
        <RatingStars rating={rating} reviewsCount={reviewsCount} />
      </div>
    </article>
  );
}
