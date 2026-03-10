import React from "react";
import "../styles/testimonials.css";

const testimonialData = [
  {
    name: "Eng. Fahad Al-Subaie",
    text: "Aber Al-Khayal's commitment to safety standards in our Riyadh projects was exemplary. Truly a reliable engineering partner.",
    img: "./img/testimonials/user1.jpg"
  },
  {
    name: "Dr. Sultan Bin Khalid",
    text: "Exceptional quality management. They delivered our industrial facility upgrades exactly to ISO standards and ahead of schedule.",
    img: "./img/testimonials/user2.jpg"
  },
  {
    name: "Salem Al-Zahrani",
    text: "The Eco-Engineering approach they used for our site development showed deep respect for the local environment and Vision 2030 goals.",
    img: "./img/testimonials/user3.jpg"
  },
  {
    name: "Abdulrahman Al-Qahtani",
    text: "Highly professional team. Their transparent communication and technical expertise in civil works are the best in the Kingdom.",
    img: "./img/testimonials/user4.jpg"
  }
];

export const Testimonials = () => {
  const doubledData = [...testimonialData, ...testimonialData];

  return (
    <section id="testimonials">
      <div className="ts-header">
        <div className="ts-header-left">
          <div className="ts-accent-bar"></div>
          <h2 className="ts-title">
            Client <span>Testimonials</span>
          </h2>
        </div>
      </div>

      {/* FIXED WIDTH WRAPPER - Matches your Clients Portion */}
      <div className="ts-marquee-container">
        <div className="ts-marquee-wrap">
          <div className="ts-marquee-track">
            {doubledData.map((d, i) => (
              <div key={i} className="ts-card">
                <div className="ts-card-top">
                   <img src={d.img} alt={d.name} className="ts-avatar" />
                   <div className="ts-card-header-text">
                      <span className="ts-name">{d.name}</span>
                      <span className="ts-location">Saudi Arabia</span>
                   </div>
                </div>
                <p className="ts-quote">"{d.text}"</p>
                <div className="ts-stars">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ts-footer">
        <span className="ts-footer-text">Verified Partnerships · KSA</span>
        <a href="#contact" className="ts-footer-cta">
          
          <svg viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10"/></svg>
        </a>
      </div>
    </section>
  );
};