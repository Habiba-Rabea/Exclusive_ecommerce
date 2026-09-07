import ProductCard from '../../Components/Common/ProductCard';
import ViewAllProducts from '../../Components/UI/Buttons/ViewAllProducts';
import '../../CSS/Bestselling.css';
import JacketImg from '../../assets/Images/home/shirt.png';
import BagImg from '../../assets/Images/home/card5.png';
import speakersImg from '../../assets/Images/home/speakers.png';
import libraryImage from '../../assets/Images/home/library.png';
const bestSellingProducts = [
  {
    id: 1,
    name: 'The north coat',
    price: 260,
    originalPrice: 360,
    rating: 5,
    reviewsCount: 65,
    image: JacketImg, 
  },
  {
    id: 2,
    name: 'Gucci duffle bag',
    price: 960,
    originalPrice: 1160,
    rating: 4.5,
    reviewsCount: 65,
    image: BagImg,
  },
  {
    id: 3,
    name: 'RGB liquid CPU Cooler',
    price: 160,
    originalPrice: 170,
    rating: 4.5,
    reviewsCount: 65,
    image: speakersImg,
  },
  {
    id: 4,
    name: 'Small BookShelf',
    price: 360,
    originalPrice: null,
    rating: 5,
    reviewsCount: 65,
    image: libraryImage,
  },
];
const BestSelling = () => {
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
export default BestSelling;