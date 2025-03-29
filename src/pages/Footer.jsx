import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>We provide the best platform for exploring content across various categories. Stay connected for the latest updates.</p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>About</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: support@myblogs.com</p>
          <p>Phone: +91 876323332</p>
          <p>Address: Delhi,India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MyBlogs. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;