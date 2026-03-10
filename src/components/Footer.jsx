import React from "react";
import "../styles/footer.css";

export const Footer = () => {
  return (
    <div className="footer-wrapper">
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-grid">
            
            {/* Column 1: Company Info */}
            <div className="footer-col">
              <div className="footer-logo">
               
                <h2>Aber Al-Khayal General <br /> Contracting Company</h2>
              </div>
              <p className="company-bio">
                We provide high-quality engineering and contracting solutions in Electrical, Mechanical, and Civil sectors across Saudi Arabia.
              </p>
              <div className="footer-socials">
                <a href="#" className="social-link"><i className="fa fa-twitter"></i></a>
                <a href="#" className="social-link"><i className="fa fa-facebook"></i></a>
                <a href="#" className="social-link"><i className="fa fa-youtube"></i></a>
                <a href="#" className="social-link"><i className="fa fa-linkedin"></i></a>
              </div>
            </div>

            {/* Column 2: Contact */}
            <div className="footer-col">
              <h3>Address</h3>
              <div className="contact-item">
                <span className="icon">📍</span>
                <p>101 Business Tower, King Abdul Aziz Road, Aljubail 35513</p>
              </div>
              <h3>Phone</h3>
              <div className="contact-item">
                <span className="icon">📞</span>
                <p>+0581741769</p>
              </div>
               <h3>Email</h3>
              <div className="contact-item">
                <span className="icon">✉️</span>
                <p>info@aberalkhayal.com</p>
              </div>
            </div>

            {/* Column 3: Quick Links */}
            <div className="footer-col">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Our Services</a></li>
                <li><a href="#clients">Our Clients</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="footer-col">
              <h3>Newsletter</h3>
              <p>Subscribe for company updates and project news.</p>
              <form className="footer-newsletter">
                <input type="email" placeholder="Your email" required />
                <button type="submit">Subscribe</button>
              </form>
            </div>

          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Aber Al-Khayal General Contracting Company — All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};