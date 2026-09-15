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
        {bestSellingProducts.map((product, index) => {
          const normalizedProduct = {
            id: product.id || `bestsell-${index}`,
            name: product.name || product.title || "Product Name",
            title: product.title || product.name || "Product Name",
            price: typeof product.price === 'number' ? product.price : parseFloat(product.price || 0),
            image: product.image || product.img,
            rating: product.rating || 5,
            reviewsCount: product.reviewsCount || product.reviews || 0,
            ...product
          };

          return (
            <ProductCard 
              key={normalizedProduct.id} 
              product={normalizedProduct} 
            />
          );
        })}
      </div>
    </section>
  );
};

export default BestSelling;