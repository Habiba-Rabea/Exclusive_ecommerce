import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Vector from '../../assets/Icons/Vector.svg';
import {FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3 className="footer-logo">Exclusive</h3>
          <h4>Subscribe</h4>
          <p>Get 10% off your first order</p>
          <form onSubmit={(e) => e.preventDefault()} className="subscribe-input">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" aria-label="Send">
              <img src={Vector} alt="Send" className="send-icon" />
            </button>
          </form>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>
        <div className="footer-col">
          <h4>Account</h4>
          <ul>
            <li><Link to="/account">My Account</Link></li>
            <li><Link to="/login">Login / Register</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><a href="#">Shop</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Quick Link</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms Of Use</a></li>
            <li><a href="#">FAQ</a></li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Download App</h4>
          <span className="app-subtitle">Save $3 with App New User Only</span>
          
          <div className="download-container">
            <div className="qr-code">
              <img src="src/assets/Images/QrCode.png" alt="QR Code" />
            </div>
            <div className="app-buttons">
              <a href="https://play.google.com" target="_blank" rel="noreferrer">
                <img src="src/assets/Images/googlestore.png" alt="Google Play" />
              </a>
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noreferrer">
                <img src="src/assets/Images/appstore.png" alt="App Store" />
              </a>
            </div>
          </div>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF size={18} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter size={18} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram size={18} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn size={18} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; Copyright Rimel 2022. All right reserved</p>
      </div>
    </footer>
  );
};
export default Footer;