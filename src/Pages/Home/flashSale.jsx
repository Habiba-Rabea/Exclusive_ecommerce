import { useRef } from "react";
import Timer from '../../Components/Common/SalesTimer.jsx';
import ProductCardOffer from '../../Components/Common/ProductCardOffer.jsx';
import ViewAllProducts from '../../Components/UI/Buttons/ViewAllProducts.jsx';
import SectionHeader from '../../Components/Common/sectionheader.jsx';
import { ArrowLeft, ArrowRight } from 'lucide-react'; 
import '../../CSS/flashSale.css';
import { Link } from 'react-router-dom';

import img1 from '../../assets/Images/home/img1.jpg';
import img2 from '../../assets/Images/home/img2.jpg';
import img3 from '../../assets/Images/home/img3.jpg';
import img4 from '../../assets/Images/home/img4.jpg';
import img5 from '../../assets/Images/home/img5.jpg';
import img6 from '../../assets/Images/home/img6.jpg';
import img7 from '../../assets/Images/home/img7.jpg';
import img8 from '../../assets/Images/home/img8.jpg';

function FlashSale() {
    const scrollRef = useRef(null);

    const products = [
        {
            id: 1,
            image: img1,
            discount: "-13%",
            title: "Force Feedback Wheel",
            currentPrice: "$349",
            originalPrice: "$399",
            rating: 5,
            reviewsCount: 43
        },
        {
            id: 2,
            image: img2,
            discount: "-35%",
            title: "Sonic Bass Pro Wireless",
            currentPrice: "$199",
            originalPrice: "$249",
            rating: 5,
            reviewsCount: 142
        },
        {
            id: 3,
            image: img3,
            discount: "-13%",
            title: "Creator Pro Duo",
            currentPrice: "$1,999",
            originalPrice: "$2,999",
            rating: 5,
            reviewsCount: 25
        },
        {
            id: 4,
            image: img4,
            discount: "-15%",
            title: "Quantum X Prime",
            currentPrice: "$849",
            originalPrice: "$999",
            rating: 4,
            reviewsCount: 74
        },
        {
            id: 5,
            image: img5,
            discount: "-12%",
            title: "WorkStation Studio Z",
            currentPrice: "$2,199",
            originalPrice: "$2,499",
            rating: 4,
            reviewsCount: 19
        },
        {
            id: 6,
            image: img6,
            discount: "-13%",
            title: "Ultra Adventure Watch",
            currentPrice: "$699",
            originalPrice: "$799",
            rating: 4.5,
            reviewsCount: 79
        },
         {
            id: 7,
            image: img7,
            discount: "-14%",
            title: "Aperture FX DSLR",
            currentPrice: "$1,199",
            originalPrice: "$1,399",
            rating: 4,
            reviewsCount: 51
        },
         {
            id: 8,
            image: img8,
            discount: "-14%",
            title: "Studio Fold Ultra",
            currentPrice: "$1,199",
            originalPrice: "$1,399",
            rating: 5,
            reviewsCount: 31
        },
    ];

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <section className="flash-sales-section">
            <div className="flash-header">
                <div className="title-with-timer">
                    <div className="flash-title-timer-group">
                        <SectionHeader tag="Today's" title="Flash Sales" />
                        <Timer />
                    </div>

                    <div className="flash-buttons">
                        <button className="arrow-btn" aria-label="Previous" onClick={scrollLeft}>
                            <ArrowLeft size={20} />
                        </button>
                        <button className="arrow-btn" aria-label="Next" onClick={scrollRight}>
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flash-products-grid" ref={scrollRef}>
                {products.map((product) => (
                    <ProductCardOffer 
                        key={product.id}
                        product={product} 
                        id={product.id}
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