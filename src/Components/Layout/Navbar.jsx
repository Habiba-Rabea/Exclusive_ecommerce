import { useState } from "react"; 
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Menu, X, User, Package, LogOut } from 'lucide-react';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import '../../CSS/Navbar.css';
import { productsData } from '../../data/productsData.js';
import { useWishlist } from '../../Context/WishlistContext.jsx';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { wishlistItems } = useWishlist();
    const wishlistCount = wishlistItems.length;

    const [cartCount, setCartCount] = useState(0);

    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const query = searchQuery.trim().toLowerCase();
        if (!query) return;

        const availableCategories = ['phones', 'computers', 'smartwatch', 'camera', 'headphones', 'gaming'];
        const matchedCategory = availableCategories.find(categoryItem => categoryItem.includes(query));

        if (matchedCategory) {
            navigate(`/category/${matchedCategory}`);
        } else {
            const foundProduct = productsData.find(product => 
                product.name.toLowerCase().includes(query)
            );

            if (foundProduct && foundProduct.category) {
                navigate(`/category/${foundProduct.category}?search=${encodeURIComponent(searchQuery)}`);
            } else {
                navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            }
        }

        setSearchQuery("");
    };

    return (
        <header className="navbar-header">
            <div className="top-banner">
                <span>Up to 50% OFF on All Electronics with Free Express Delivery!</span>
                <Link to="/products" className="banner-link">ShopNow</Link>
                <LanguageSelector />
            </div>
            
            <nav className="main-nav">
                <div className="nav-logo">
                    <Link to="/">Exclusive</Link> 
                </div>

                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li>
                        <NavLink to="/" end className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            Contact
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            Sign Up
                        </NavLink>
                    </li>
                </ul>

                <form onSubmit={handleSearchSubmit} className="search-container">
                    <input 
                        type="text" 
                        placeholder="What are you looking for?" 
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-btn-icon">
                        <Search size={18} />
                    </button>
                </form>

                <div className="nav-actions">
                    <Link to="/wishlist" aria-label="Wishlist" className="action-link badge-container">
                        <Heart size={20} />
                        {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
                    </Link>
                    
                    <Link to="/cart" aria-label="Cart" className="action-link badge-container">
                        <ShoppingCart size={20} />
                        {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
                    </Link>
                    
                    <div className="account-dropdown">
                        <button 
                            className={`icon-btn account-btn ${isAccountMenuOpen ? 'active-account' : ''}`}
                            onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                            aria-label="Account menu"
                        >
                            <User size={20} />
                        </button>

                        {isAccountMenuOpen && (
                            <div className="account-dropdown-menu">
                                <Link to="/account" onClick={() => setIsAccountMenuOpen(false)} className="dropdown-item">
                                    <User size={16} /> Manage My Account
                                </Link>
                                <Link to="/account" onClick={() => setIsAccountMenuOpen(false)} className="dropdown-item">
                                    <Package size={16} /> My Order
                                </Link>
                                <Link to="/wishlist" onClick={() => setIsAccountMenuOpen(false)} className="dropdown-item">
                                    <Heart size={16} /> My WishList
                                </Link>
                                <Link to="/logout" onClick={() => setIsAccountMenuOpen(false)} className="dropdown-item">
                                    <LogOut size={16} /> Logout
                                </Link>
                            </div>
                        )}
                    </div>

                    <button className="menu-toggle-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;