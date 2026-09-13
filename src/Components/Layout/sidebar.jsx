import { Link } from 'react-router-dom';
import '../../CSS/Sidebar.css';

function Sidebar() {
    return(
        <aside className="sidebar">
            <ul className="sidebar-list">
                <li className="sidebar-item">
                    <Link to="/category/phones">Phones</Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/category/computers">Computers</Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/category/smartwatch">SmartWatch</Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/category/camera">Camera</Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/category/headphones">HeadPhones</Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/category/gaming">Gaming</Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;