import React, { useState } from "react"; 
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Moon, Menu, X } from 'lucide-react';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import '../../CSS/Navbar.css';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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


              
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><Link to="/" className="nav-link active" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                    <li><Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link></li>
                    <li><Link to="/signup" className="nav-link" onClick={() => setIsMenuOpen(false)}>Sign Up</Link></li>
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

                     <button className="menu-toggle-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                    {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;