import {Link} from 'react-router-dom';
import '../../CSS/Sidebar.css';

function Sidebar() {
    return(
        <aside className="sidebar">
            <ul className="sidebar-list">
                <li className="sidebar-item-dropdown">
                    <Link to="/products" className="sidebar-link">Woman's Fashion<span className="arrow">&gt;</span></Link>
                    <ul className="submenu">
                        <li><Link to="/products">Dresses</Link></li>
                        <li><Link to="/products">Bags</Link></li>
                        <li><Link to="/products">Shoes</Link></li>
                    </ul>
                    </li>

                    <li className="sidebar-item-dropdown">
                    <Link to="/products" className="sidebar-link">
                        Men's Fashion <span className="arrow">&gt;</span>
                    </Link>
                    <ul className="submenu">
                        <li><Link to="/products">Shirts</Link></li>
                        <li><Link to="/products">Pants</Link></li>
                    </ul>
                </li>
                <li className="sidebar-item">
                    <Link to="/products">Electronics</Link>
                    </li>

                    <li className="sidebar-item">
                    <Link to="/products">furniture</Link>
                    </li>


                    <li className="sidebar-item">
                    <Link to="/products">Sports</Link>
                </li>

                </ul>
            </aside>
    );
}
export default Sidebar;