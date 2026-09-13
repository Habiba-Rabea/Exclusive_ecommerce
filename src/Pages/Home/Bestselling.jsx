import ProductCard from '../../Components/Common/ProductCard';
import ViewAllProducts from '../../Components/UI/Buttons/ViewAllProducts';
import '../../CSS/Bestselling.css';
import { productsData } from '../../data/productsData.js'; 

const BestSelling = () => {
  const bestSellingProducts = productsData.slice(0, 4); 

  return (
    <section className="bestselling-section">
      <div className="section-badge">
        <div className="badge-rectangle"></div>
        <span>This Month</span>
      </div>
      <div className="bestselling-header">
        <h2 className="section-title">Best Selling Products</h2>
        <ViewAllProducts text="View All" />
      </div>
      <div className="products-grid">
        {bestSellingProducts.map((product) => (
          <ProductCard key={product.id || product.name} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSelling;