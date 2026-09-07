import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import person1 from '../../assets/Images/person1.png';
import person2 from '../../assets/Images/person2.png';
import person3 from '../../assets/Images/person3.png';
function Team(){
    return(
        <div className="team-sec">
        <div className="team-container">
            <div className="team-card">
                <div className="team-image">
                    <img src={person1} alt="person1"/>
                </div>
                <div className="team-info">
                    <h3>Tom Cruise</h3>
                    <p>Founder & Chairman</p>
                    </div>
                    <div className="team-social">
                    <Link to="#"><FontAwesomeIcon icon={faTwitter} /></Link>
                    <Link to="#"><FontAwesomeIcon icon={faInstagram} /></Link>
                    <Link to="#"><FontAwesomeIcon icon={faLinkedinIn} /></Link>
                        </div>
            </div>

            <div className="team-card">
                <div className="team-image">
                    <img src={person2} alt="person2"/>
                </div>
                <div className="team-info">
                    <h3>Emma Watson</h3>
                    <p>Managing Director</p>
                    </div>
                    <div className="team-social">
                    <Link to="#"><FontAwesomeIcon icon={faTwitter} /></Link>
                    <Link to="#"><FontAwesomeIcon icon={faInstagram} /></Link>
                    <Link to="#"><FontAwesomeIcon icon={faLinkedinIn} /></Link>
                        </div>
            </div>

            <div className="team-card">
                <div className="team-image">
                    <img src={person3} alt="person3"/>
                </div>
                <div className="team-info">
                    <h3>Will Smith</h3>
                    <p>Product Designer</p>
                    </div>
                    <div className="team-social">
                    <Link to="#"><FontAwesomeIcon icon={faTwitter} /></Link>
                    <Link to="#"><FontAwesomeIcon icon={faInstagram} /></Link>
                    <Link to="#"><FontAwesomeIcon icon={faLinkedinIn} /></Link>
                        </div>
            </div>
        </div>

        <div className="team-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot-active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            </div>
        </div>
    );
}
export default Team;