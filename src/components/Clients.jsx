import React from "react";

const clientStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Barlow:wght@300;400;500&display=swap');

  #clients {
    background: #f4f2ee;
    font-family: 'Barlow', sans-serif;
    padding: 80px 0 100px;
    overflow: hidden;
  }

  /* ── Header ── */
  .clients-header {
    max-width: 1100px;
    margin: 0 auto 50px; /* Increased bottom margin here */
    padding: 0 48px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 32px;
    flex-wrap: wrap;
  }

  .clients-title {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(36px, 5vw, 76px);
    font-weight: 700;
    color: #111;
    text-transform: uppercase;
    line-height: 0.95;
    margin: 0;
  }
  .clients-title span { color: #ff7b00; }

  /* ══ MARQUEE TRACK ══ */
  .clients-marquee-wrap {
    max-width: 1000px;
    margin: 60px auto 16px; /* Increased top margin to 60px for more air */
    padding: 0 48px;
    overflow: hidden;
    position: relative;
  }

  .clients-marquee-track {
    display: flex;
    gap: 0;
    width: max-content;
    animation: marquee-scroll 28s linear infinite;
  }
  .clients-marquee-wrap:hover .clients-marquee-track {
    animation-play-state: paused;
  }

  @keyframes marquee-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .client-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 180px;
    margin: 0 12px;
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.07);
    border-radius: 6px;
    padding: 28px 24px 18px;
    position: relative;
    transition: box-shadow 0.28s ease, border-color 0.28s ease, transform 0.22s ease;
    flex-shrink: 0;
    cursor: pointer;
  }

  .client-card:hover {
    box-shadow: 0 10px 36px rgba(0,0,0,0.10);
    border-color: rgba(255,123,0,0.35);
    transform: translateY(-4px);
  }

  .client-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: #ff7b00;
    border-radius: 6px 6px 0 0;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  .client-card:hover::before {
    transform: scaleX(1);
  }

  .client-logo {
    max-width: 100%;
    max-height: 80px;
    width: auto;
    object-fit: contain;
    display: block;
    transition: transform 0.3s ease;
  }

  .client-card:hover .client-logo {
    transform: scale(1.07);
  }

  .client-name {
    font-family: 'Barlow', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #bbb;
    margin-top: 10px;
    transition: color 0.25s;
  }
  .client-card:hover .client-name {
    color: #ff7b00;
  }

  .clients-footer {
    max-width: 1100px;
    margin: 48px auto 0;
    padding: 0 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }
  .clients-footer-text {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #bbb;
  }
  .clients-footer-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Barlow', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #111;
    text-decoration: none;
    border-bottom: 1.5px solid #111;
    padding-bottom: 2px;
    transition: color 0.22s, border-color 0.22s;
  }
  .clients-footer-cta:hover {
    color: #ff7b00;
    border-color: #ff7b00;
    text-decoration: none;
  }
  .clients-footer-cta svg {
    width: 13px; height: 13px;
    stroke: currentColor; stroke-width: 2.5;
    fill: none; stroke-linecap: round; stroke-linejoin: round;
    transition: transform 0.2s;
  }
  .clients-footer-cta:hover svg { transform: translate(2px,-2px); }

  @media (max-width: 768px) {
    #clients { padding: 60px 0 70px; }
    .clients-header { padding: 0 24px; margin-bottom: 30px; }
    .clients-marquee-wrap { margin-top: 20px; }
    .clients-footer { padding: 0 24px; flex-direction: column; align-items: flex-start; }
    .client-card { width: 170px; height: 140px; margin: 0 8px; }
  }
`;

const clientsData = [
  { logo: "./img/clients/client1.png", name: "Al Qaryan Group" },
  { logo: "./img/clients/client2.png", name: "SABIC" },
  { logo: "./img/clients/client3.png", name: "Tiejun" },
  { logo: "./img/clients/client4.png", name: "Sinopec" },
  { logo: "./img/clients/client5.png", name: "Ahmadiah" },
  { logo: "./img/clients/client6.png", name: "Halliburton" },
  { logo: "./img/clients/client7.png", name: "Samref" },
  { logo: "./img/clients/client8.png", name: "Sinoma" },
];

export const Clients = () => {
  const doubled = [...clientsData, ...clientsData];

  return (
    <>
      <style>{clientStyles}</style>
      <section id="clients">
        <div className="clients-header">
          <div className="clients-header-left">
            <div style={{ width: '60px', height: '0px', background: '#ff7b00', marginBottom: '15px' }}></div>
            <h2 className="clients-title">
              Our <span>Clients</span>
            </h2>
          </div>
        </div>

        <div className="clients-marquee-wrap">
          <div className="clients-marquee-track">
            {doubled.map((client, i) => (
              <div key={i} className="client-card">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="client-logo"
                />
                <span className="client-name">{client.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="clients-footer">
          <span className="clients-footer-text">Est. 2010 · Riyadh, KSA</span>
          <a href="#contact" className="clients-footer-cta">
            Become a Partner
            <svg viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10"/></svg>
          </a>
        </div>
      </section>
    </>
  );
};