import SectionHeader from '../../Components/Common/sectionheader'; 
import '../../CSS/Newarrival.css';
import ps5Img from '../../assets/Images/home/playstation_large 1.png';
import lapImg from '../../assets/Images/home/Newarrival2.jpg';
import speakersImg from '../../assets/Images/home/transparent.png';
import smartImg from '../../assets/Images/home/smartwatch.jpg';
const NewArrivalSection = () => {
  return (
    <article className="new-arrival-wrapper">
      <SectionHeader tag="Featured" title="New Arrival" />
      <div className="arrival-content">
        <figure className="card card-large">
          <img src={ps5Img} alt="PlayStation 5 Console" />
          <figcaption>
            <h3>PlayStation 5</h3>
            <p>Black and White version of the PS5 coming out on sale.</p>
            <a href="/products">Shop Now</a>
          </figcaption>
        </figure>
        <div className="right-stack">
          <figure className="card card-wide">
            <img src={lapImg} alt="lap's Collections" />
            <figcaption>
              <h3>Laptops Collections</h3>
              <p>Featured Laptops collections that give you another vibe.</p>
              <a href="/products">Shop Now</a>
            </figcaption>
          </figure>
          <div className="bottom-row">
            <figure className="card">
              <img src={speakersImg} alt="Amazon Wireless Speakers" />
              <figcaption>
                <h3>Speakers</h3>
                <p>Amazon wireless speakers</p>
                <a href="/products">Shop Now</a>
              </figcaption>
            </figure>
            <figure className="card">
              <img src={smartImg} alt="Gucci Intense Oud Perfume" />
              <figcaption>
                <h3>Smart watch</h3>
                <p>GUCCI INTENSE OUD EDP</p>
                <a href="/products">Shop Now</a>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewArrivalSection;