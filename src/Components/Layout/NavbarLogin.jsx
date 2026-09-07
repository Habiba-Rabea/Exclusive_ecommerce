import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import '../../CSS/Navbar.css';
function NavbarLogin() {
    return (
        <header className="navbar-header">
            <div className="top-banner">
                <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
                <Link to="/products" className="banner-link">ShopNow</Link>
                <LanguageSelector />
            </div>
            <nav className="main-nav">
                <div className="nav-logo">
                    <Link to="/">Exclusive</Link> 
                </div>
                <ul className="nav-links">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/contact" className="nav-link">Contact</Link></li>
                    <li><Link to="/about" className="nav-link">About</Link></li>
                    <li><Link to="/signup" className="nav-link">Sign Up</Link></li>
                </ul>
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="What are you looking for?" 
                        className="search-input"
                    />
                    <Search size={18} style={{ color: '#000' }} />
                </div>
            </nav>
        </header>
    );
}
export default NavbarLogin;