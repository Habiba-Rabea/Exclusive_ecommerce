export default function CategoryHeader({ title, description, productCount }) {
  return (
    <header className="category-header">
      <div>
        <p className="category-eyebrow"><span /> CURATED COLLECTION</p>
        <h1>{title}</h1>
        <p className="category-description">{description}</p>
      </div>
      <div className="category-count" aria-label={`${productCount} products in collection`}>
        <strong>{productCount}</strong>
        <span>PRODUCTS<br />IN COLLECTION</span>
      </div>
    </header>
  );
}


