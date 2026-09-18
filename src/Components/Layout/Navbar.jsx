import { useState } from "react"; 
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Menu, X, User, Package, LogOut } from 'lucide-react';
import '../../CSS/Navbar.css';
import { productsData } from '../../data/productsData.js';
import { useWishlist } from '../../Context/WishlistContext.jsx';
import { useAuth } from '../../Context/AuthContext.jsx';
import { useCart } from '../../Context/CartContext.jsx';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { currentUser, logout } = useAuth();
    const { wishlistItems } = useWishlist();
    const wishlistCount = wishlistItems ? wishlistItems.length : 0;
    const { cartItems } = useCart();
    const cartCount = cartItems 
        ? cartItems.reduce((total, item) => total + (item.quantity || 1), 0) 
        : 0;

    const navigate = useNavigate();
    const location = useLocation();

    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        setIsAccountMenuOpen(false);
        navigate('/',{replace : true});
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
                    {!currentUser && (
                        <li>
                            <NavLink to="/signup" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                Sign Up
                            </NavLink>
                        </li>
                    )}
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
                    {!isAuthPage && (
                        <>
                            <Link to="/wishlist" aria-label="Wishlist" className="action-link badge-container">
                                <Heart size={20} />
                                {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
                            </Link>
                            
                            <Link to="/cart" aria-label="Cart" className="action-link badge-container">
                                <ShoppingCart size={20} />
                                {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
                            </Link>
                        </>
                    )}
                    
                    {currentUser && (
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
                                    <button onClick={handleLogout} className="dropdown-item logout-item" style={{background: 'none', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px'}}>
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <button className="menu-toggle-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;