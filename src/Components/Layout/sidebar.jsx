import {Link} from 'react-router-dom';
import '../../CSS/Sidebar.css';

function Sidebar() {
    return(
        <aside className="sidebar">
            <ul className="sidebar-list">
                <li className="sidebar-item-dropdown">
                    <Link to="/products/Woman's Fashion" className="sidebar-link">Woman's Fashion<span className="arrow">&gt;</span></Link>
                    <ul className="submenu">
                        <li><Link to="/products/Woman's Fashion/Dresses">Dresses</Link></li>
                        <li><Link to="/products/Woman's Fashion/Bags">Bags</Link></li>
                        <li><Link to="/products/Woman's Fashion/Shoes">Shoes</Link></li>
                    </ul>
                    </li>

                    <li className="sidebar-item-dropdown">
                    <Link to="/products/Men's Fashion" className="sidebar-link">
                        Men's Fashion <span className="arrow">&gt;</span>
                    </Link>
                    <ul className="submenu">
                        <li><Link to="/products/Men's Fashion/Shirts">Shirts</Link></li>
                        <li><Link to="/products/Men's Fashion/Pants">Pants</Link></li>
                    </ul>
                </li>
                <li className="sidebar-item">
                    <Link to="/products/Electronics">Electronics</Link>
                    </li>

                    <li className="sidebar-item">
                    <Link to="/products/furniture">furniture</Link>
                    </li>


                    <li className="sidebar-item">
                    <Link to="/products/Sports">Sports</Link>
                </li>

                </ul>
            </aside>
    );
}
export default Sidebar;