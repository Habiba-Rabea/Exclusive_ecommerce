import { useRef } from "react";
import Timer from '../../Components/Common/SalesTimer.jsx';
import ProductCardOffer from '../../Components/Common/ProductCardOffer.jsx';
import ViewAllProducts from '../../Components/UI/Buttons/ViewAllProducts.jsx';
import SectionHeader from '../../Components/Common/sectionheader.jsx';
import { ArrowLeft, ArrowRight } from 'lucide-react'; 
import '../../CSS/flashSale.css';

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
            id: 91,
            image: img1,
            discount: "-13%",
            name: "Force Feedback Wheel",
            title: "Force Feedback Wheel",
            price: 349,
            currentPrice: "$349",
            originalPrice: "$399",
            rating: 5,
            reviewsCount: 43
        },
        {
            id: 75,
            image: img2,
            discount: "-9%",
            name: "Audiophile Reference 800",
            title: "Audiophile Reference 800",
            price: 499,
            currentPrice: "$499",
            originalPrice: "$549",
            rating: 5,
            reviewsCount: 142
        },
        {
            id: 25,
            image: img3,
            discount: "-13%",
            name: "Creator Pro Duo",
            title: "Creator Pro Duo",
            price: 1999,
            currentPrice: "$1,999",
            originalPrice: "$2,999",
            rating: 5,
            reviewsCount: 25
        },
        {
            id: 11,
            image: img4,
            discount: "-15%",
            name: "Quantum X Prime",
            title: "Quantum X Prime",
            price: 849,
            currentPrice: "$849",
            originalPrice: "$999",
            rating: 4,
            reviewsCount: 74
        },
        {
            id: 21,
            image: img5,
            discount: "-12%",
            name: "WorkStation Studio Z",
            title: "WorkStation Studio Z",
            price: 2199,
            currentPrice: "$2,199",
            originalPrice: "$2,499",
            rating: 4,
            reviewsCount: 19
        },
        {
            id: 47,
            image: img6,
            discount: "-13%",
            name: "Ultra Adventure Watch",
            title: "Ultra Adventure Watch",
            price: 699,
            currentPrice: "$699",
            originalPrice: "$799",
            rating: 4.5,
            reviewsCount: 79
        },
        {
            id: 50,
            image: img7,
            discount: "-14%",
            name: "Aperture FX DSLR",
            title: "Aperture FX DSLR",
            price: 1199,
            currentPrice: "$1,199",
            originalPrice: "$1,399",
            rating: 4,
            reviewsCount: 51
        },
        {
            id: 4,
            image: img8,
            discount: "-14%",
            name: "Studio Fold Ultra",
            title: "Studio Fold Ultra",
            price: 1199,
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

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <ViewAllProducts text="View All Products" />
            </div>
        </section>
    );
}

export default FlashSale;