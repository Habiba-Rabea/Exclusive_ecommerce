import Timer from '../../Components/Common/SalesTimer.jsx';
import ProductCardOffer from '../../Components/Common/ProductCardOffer.jsx';
import ViewAllProducts from '../../Components/UI/Buttons/ViewAllProducts.jsx';
import SectionHeader from '../../Components/Common/sectionheader.jsx';
import { ArrowLeft, ArrowRight } from 'lucide-react'; 
import '../../CSS/flashSale.css';
import { Link } from 'react-router-dom';

import card1 from '../../assets/Images/home/card1.jpg';
import card2 from '../../assets/Images/home/card2.png';
import card3 from '../../assets/Images/home/card3.png';
import card4 from '../../assets/Images/home/card4.png';
import card5 from '../../assets/Images/home/card5.png';

function FlashSale() {
    const products = [
        {
            id: 1,
            image: card1,
            discount: "-40%",
            title: "HAVIT HV-G92 Gamepad",
            currentPrice: "$120",
            originalPrice: "$160",
            rating: 5,
            reviewsCount: 88
        },
        {
            id: 2,
            image: card2,
            discount: "-35%",
            title: "AK-900 Wired Keyboard",
            currentPrice: "$960",
            originalPrice: "$1160",
            rating: 4,
            reviewsCount: 75
        },
        {
            id: 3,
            image: card3,
            discount: "-30%",
            title: "IPS LCD Gaming Monitor",
            currentPrice: "$370",
            originalPrice: "$400",
            rating: 5,
            reviewsCount: 99
        },
        {
            id: 4,
            image: card4,
            discount: "-25%",
            title: "S-Series Comfort Chair",
            currentPrice: "$375",
            originalPrice: "$400",
            rating: 4,
            reviewsCount: 99
        },
        {
            id: 5,
            image: card5,
            discount: "-25%",
            title: "Gucci duffle bag",
            currentPrice: "$960",
            originalPrice: "$1160",
            rating: 4,
            reviewsCount: 65
        },
        {
            id: 6,
            image: card5,
            discount: "-25%",
            title: "Gucci duffle bag",
            currentPrice: "$960",
            originalPrice: "$1160",
            rating: 4.5,
            reviewsCount: 65
        }
    ];

    return (
        <section className="flash-sales-section">
            <div className="flash-header">
    <div className="title-with-timer">
        
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
            <SectionHeader tag="Today's" title="Flash Sales" />
            <Timer />
        </div>

       
        <div className="flash-buttons">
            <button className="arrow-btn" aria-label="Previous">
                <ArrowLeft size={20} />
            </button>
            <button className="arrow-btn" aria-label="Next">
                <ArrowRight size={20} />
            </button>
        </div>

    </div>
</div>

            <div className="flash-products-grid">
                {products.map((product) => (
                    <ProductCardOffer 
                        key={product.id}
                        image={product.image}
                        discount={product.discount}
                        title={product.title}
                        currentPrice={product.currentPrice}
                        originalPrice={product.originalPrice}
                        rating={product.rating}
                        reviewsCount={product.reviewsCount}
                    />
                ))}
            </div>

            <Link to="/products" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <ViewAllProducts text="View All Products" />
            </Link>
        </section>
    );
}

export default FlashSale;