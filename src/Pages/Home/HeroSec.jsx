import {Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import '../../CSS/HeroSec.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { faLaptop, faCamera, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import slider1 from '../../assets/Images/home/slider1.jpg';
import slider2 from '../../assets/Images/home/slider2.png';
import slider3 from '../../assets/Images/home/slider3.jpg';
import slider4 from '../../assets/Images/home/slider4.png';


function HeroSec() {
    return(
        <Carousel id="slider" indicators={true} controls={false} interval={3000} className="custom-hero-carousel">
            
            
            <Carousel.Item>
                <div className="banner-slide-content">
                    <div className="banner-text-box">
                        <div className="banner-top-title">
                          
                            <FontAwesomeIcon icon={faApple} className="logo-icon" />
                            <span className='textt'>iPhone 14 Series</span>
                        </div>
                        <h2>Up to 10%<br />off Voucher</h2>
                        <Link to="/products" className="shop-now-link">
                            Shop Now <FontAwesomeIcon icon={faArrowRight} className="arrow" />
                        </Link>
                    </div>

                    <div className="banner-img-box">
                        <img src={slider1} alt="iPhone 14" />
                                            </div>
                </div>
            </Carousel.Item>

       
            <Carousel.Item>
    <div className="banner-slide-content">
        <div className="banner-text-box">
            <div className="banner-top-title">
                <FontAwesomeIcon icon={faApple} className="logo-icon" />
                <span className='textt'>Apple AirPods</span>
            </div>
            <h2>Up to 10%<br />off Voucher</h2>
            <Link to="/products" className="shop-now-link">
                Shop Now <FontAwesomeIcon icon={faArrowRight} className="arrow" />
            </Link>
        </div>
        <div className="banner-img-box">
            <img src={slider2} alt="Headphones" />
        </div>
    </div>
</Carousel.Item>

         <Carousel.Item>
    <div className="banner-slide-content">
        <div className="banner-text-box">
            <div className="banner-top-title">
               <FontAwesomeIcon icon={faCamera} className="logo-icon" />
                <span className='textt'>Canon EOS Series</span>
            </div>
            <h2>Mega Sale Up to 20% Off</h2>
            <Link to="/products" className="shop-now-link">
                Shop Now <FontAwesomeIcon icon={faArrowRight} className="arrow" />
            </Link>
        </div>
        <div className="banner-img-box">
            <img src={slider3} alt="Canon DSLR Camera" />
        </div>
    </div>
</Carousel.Item>

             <Carousel.Item>
    <div className="banner-slide-content">
        <div className="banner-text-box">
            <div className="banner-top-title">
                <FontAwesomeIcon icon={faLaptop} className="logo-icon" />
                <span className='textt'>High-Performance Laptops</span>
            </div>
            <h2>Mega Sale Up to 20% Off</h2>
            <Link to="/products" className="shop-now-link">
                Shop Now <FontAwesomeIcon icon={faArrowRight} className="arrow" />
            </Link>
        </div>
        <div className="banner-img-box">
            <img src={slider4} alt="Powerful Gaming Laptop" />
        </div>
    </div>
</Carousel.Item>

        </Carousel>

        
    );
}
export default HeroSec;