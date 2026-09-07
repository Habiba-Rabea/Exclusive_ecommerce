import { Link } from "react-router-dom";
import hero_about from "../../assets/images/hero_about.jpg";

function Story() {
    return (
        <div className="story-container">
            <div className="story-breadcrumb">
                <Link to="/">Home</Link> / <span>About</span>
            </div>

            <div className="story-content-wrapper">
                <div className="story-text-side">
                    <h1>Our Story</h1>
                    <p>
                        Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.
                    </p>
                    <p>
                        Exclusive has more than 1 Million products to offer, growing at a very fast,Exclusive offers a diverse assortment in categories ranging from consumer.
                    </p>
                </div>
                <div className="story-image-side">
                    <img src={hero_about} alt="Shopping Girls" />
                </div>
            </div>
        </div>
    );
}

export default Story;