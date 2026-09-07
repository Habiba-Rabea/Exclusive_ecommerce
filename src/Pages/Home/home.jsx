import Sidebar from '../../Components/Layout/sidebar';
import HeroSec from './HeroSec.jsx';
import FlashSale from './flashSale.jsx';
import Category from '../Home/Category.jsx';
import '../../CSS/home.css';
import NewArrivalSection from './newarrival.jsx';
import ServicesSection  from './servicesection.jsx';
import BestSelling  from './Bestselling.jsx';


function Home() {
    return (
        <div className="home-page">
            <div className="top-section">
                <Sidebar />
                <HeroSec />
            </div>

            <div className="bottom-section">
                <FlashSale />

             <div className="page-divider"></div>
                   
                <Category/>

                 <div className="page-divider"></div>
                 <BestSelling/>
                 <NewArrivalSection />
                 <ServicesSection />
            </div>
        </div>
    );
}

export default Home;