import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast, faHeadset, faShieldHalved } from '@fortawesome/free-solid-svg-icons';


function Services(){
 return(
   <div className="services-sec">
    <div className="services-container">
        
        <div className="service-card">
            <div className="service-icon-outer">
                <div className="service-icon-inner">
                    <FontAwesomeIcon icon={faTruckFast} className="service-svg" />
                </div>
            </div>
           <h3>FREE AND FAST DELIVERY</h3>
           <p>Free delivery for all orders over $140</p>
        </div>

        <div className="service-card">
            <div className="service-icon-outer">
                <div className="service-icon-inner">
                    <FontAwesomeIcon icon={faHeadset} className="service-svg" />
                </div>
            </div>
            <h3>24/7 CUSTOMER SERVICE</h3>
            <p>Friendly 24/7 customer support</p>
        </div>

        <div className="service-card">
            <div className="service-icon-outer">
                <div className="service-icon-inner">
                   <FontAwesomeIcon icon={faShieldHalved} className="service-svg" />
                </div>
            </div>
            <h3>MONEY BACK GUARANTEE</h3>
            <p>We reurn money within 30 days</p>
        </div>

    </div>
   </div>
 );
}

export default Services;