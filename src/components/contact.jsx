import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";
import "../styles/contact.css";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Replace with your actual EmailJS IDs
    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_PUBLIC_KEY")
      .then(
        (result) => {
          alert("Message Sent Successfully!");
          clearState();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <section id="contact-section">
      <div className="ct-main-container">
        
        <div className="ct-grid">
          {/* LEFT SIDE: FORM */}
          <div className="ct-form-column">
            <div className="ct-header">
              <div className="ct-accent-bar"></div>
              <h2 className="ct-title">Get In <span>Touch</span></h2>
              <p className="ct-subtitle">
                Partner with Aber Al-Khayal for your next engineering milestone.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="ct-form">
              <div className="ct-input-row">
                <div className="ct-field">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Full Name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="ct-field">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email Address"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="ct-field">
                <textarea
                  name="message"
                  value={message}
                  rows="5"
                  placeholder="Tell us about your project..."
                  required
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="ct-submit-btn">
                Send Inquiry <span>→</span>
              </button>
            </form>
          </div>

          {/* RIGHT SIDE: INFO */}
          <div className="ct-info-column">
            <div className="ct-info-card">
              <h3>Contact Details</h3>
              
              <div className="ct-info-item">
                <div className="ct-icon">📍</div>
                <div>
                  <h4>Headquarters</h4>
                  <p>{props.data ? props.data.address : "Riyadh, Saudi Arabia"}</p>
                </div>
              </div>

              <div className="ct-info-item">
                <div className="ct-icon">📞</div>
                <div>
                  <h4>Call Us</h4>
                  <p>{props.data ? props.data.phone : "+966 ..."}</p>
                </div>
              </div>

              <div className="ct-info-item">
                <div className="ct-icon">✉</div>
                <div>
                  <h4>Email Support</h4>
                  <p>{props.data ? props.data.email : "info@aberalkhayal.com"}</p>
                </div>
              </div>

              <div className="ct-social-links">
                <a href={props.data?.facebook || "#"} className="ct-social-icon">FB</a>
                <a href={props.data?.twitter || "#"} className="ct-social-icon">TW</a>
                <a href={props.data?.youtube || "#"} className="ct-social-icon">YT</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER AREA */}
      
    </section>
  );
};