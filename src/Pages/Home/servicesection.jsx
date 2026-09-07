import '../../CSS/servicesection.css';
import { FaTruckFast, FaHeadphones, FaShieldHalved, FaArrowUp } from 'react-icons/fa6';
const ServicesSection = () => {
  return (
    <section className="services-container">
      <div className="services-grid">
        <div className="service-item">
          <div className="icon-outer-ring">
            <div className="icon-inner-circle">
              <FaTruckFast className="service-icon" />
            </div>
          </div>
          <h3>FREE AND FAST DELIVERY</h3>
          <p>Free delivery for all orders over $140</p>
        </div>
        <div className="service-item">
          <div className="icon-outer-ring">
            <div className="icon-inner-circle">
              <FaHeadphones className="service-icon" />
            </div>
          </div>
          <h3>24/7 CUSTOMER SERVICE</h3>
          <p>Friendly 24/7 customer support</p>
        </div>
        <div className="service-item">
          <div className="icon-outer-ring">
            <div className="icon-inner-circle">
              <FaShieldHalved className="service-icon" />
            </div>
          </div>
          <h3>MONEY BACK GUARANTEE</h3>
          <p>We return money within 30 days</p>
        </div>
      </div>
      <a href="#top" className="scroll-to-top-btn" aria-label="Scroll to top">
        <FaArrowUp />
      </a>
    </section>
  );
};
export default ServicesSection;