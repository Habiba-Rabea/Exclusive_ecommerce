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
                        <li><Link to="/products/Woman's Fashion/Tops">Tops</Link></li>
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
                    <Link to="/products/Home & Lifestyle">Home & Lifestyle</Link>
                    </li>

                    <li className="sidebar-item">
                    <Link to="/products/Medicine">Medicine</Link>
                    </li>

                    <li className="sidebar-item">
                    <Link to="/products/Sports & Outdoor">Sports & Outdoor</Link>
                </li>

                <li className="sidebar-item">
                    <Link to="/products/Baby's & Toys">Baby's & Toys</Link>
                </li>

                <li className="sidebar-item">
                    <Link to="/products/Groceries & Pets">Groceries & Pets</Link>
                </li>

                <li className="sidebar-item">
                    <Link to="/products/Health & Beauty">Health & Beauty</Link>
                </li>
                </ul>
            </aside>
    );
}
export default Sidebar;