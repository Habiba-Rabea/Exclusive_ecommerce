import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faStore, faDollarSign, faGift, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
function StateAbout(){
    return(
        <div className="state-container">
            <div className="state-card">
                <div className="state-icon">
                    <FontAwesomeIcon icon={faStore} className="icon" />
                </div>
                <h2>10.5k</h2>
                <p>Sallers active our site</p>
            </div>

            <div className="state-card">
                <div className="state-icon">
                    <FontAwesomeIcon icon={faDollarSign} className="icon" />
                </div>
                <h2>33k</h2>
                <p>Mopnthly Produduct Sale</p>
            </div>

            <div className="state-card">
                <div className="state-icon">
                    <FontAwesomeIcon icon={faGift} className="icon" />
                </div>
              <h2>45.5k</h2>
              <p>Customer active in our site</p>
            </div>

            <div className="state-card">
                <div className="state-icon">
                    <FontAwesomeIcon icon={faPiggyBank} className="icon" />
                </div>
                <h2>25k</h2>
                <p>Anual gross sale in our site</p>
            </div>
        </div>
    );


}
export default StateAbout;