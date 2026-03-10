import React from "react";
import { Testimonials } from "../components/testimonials";
import { Clients } from "../components/Clients";
import { Contact } from "../components/contact";
import { Footer } from "../components/Footer";
import "../styles/clientpage.css"; // Import the new CSS

const ClientsPage = ({ data }) => (
  <>
    {/* Clients Component */}
    <div className="cp-clients-wrapper">
      <Clients />
    </div>
    
    {/* NEW SECTION: Professional Content */}
    <section className="cp-pro-section">
      <div className="cp-pro-container">
        <div className="cp-pro-content">
          <span className="cp-pro-sub">Why Partner With Us</span>
          <h2>Driving Innovation Through <br /><span>Strategic Partnerships</span></h2>
          <p>
            At Aber Al-Khayal, we believe in building more than just structures; we build enduring relationships. 
            Our commitment to quality, safety, and timely delivery ensures that our clients receive unparalleled 
            value in every project, aligning with the ambitious goals of Saudi Vision 2030.
          </p>
          <div className="cp-pro-features">
            <div>✓ International Standards</div>
            <div>✓ Local Expertise</div>
            <div>✓ Sustainable Solutions</div>
          </div>
        </div>
      </div>
    </section>
    
    {/* Testimonials Component */}
    <div className="cp-testimonials-wrapper">
      <Testimonials data={data} />
    </div>

    {/* Contact and Footer */}
    <Contact />
    <Footer />
  </>
);

export default ClientsPage;