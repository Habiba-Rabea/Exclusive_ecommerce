import React from "react"; 
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Moon } from 'lucide-react';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import '../../CSS/Navbar.css';

function Navbar() {
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

                <div className="nav-actions">
                    <button aria-label="Toggle theme" className="icon-btn">
                        <Moon size={20} color="#000" />
                    </button>
                    <Link to="/wishlist" aria-label="Wishlist" className="action-link">
                        <Heart size={20} />
                    </Link>
                    <Link to="/cart" aria-label="Cart" className="action-link">
                        <ShoppingCart size={20} />
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;