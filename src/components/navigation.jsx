import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&family=Barlow:wght@300;400;500&display=swap');

  /* ── Root vars ── */
  :root {
    --nav-height: 76px;
    --orange: #ff7b00;
    --white: #ffffff;
  }

  /* ══════════════════════
     NAVBAR BASE
  ══════════════════════ */
  .nav-root {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    transition: background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease;
  }

  /* Transparent on top of hero — with blur */
  .nav-root.nav-top {
    background: rgba(0,0,0,0.18);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: none;
  }

  /* Frosted glass after scrolling */
  .nav-root.nav-scrolled {
    background: rgba(8, 8, 8, 0.72);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4);
  }

  /* Thin orange accent line at very top */
  .nav-root::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--orange) 40%, var(--orange) 60%, transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .nav-root.nav-scrolled::before {
    opacity: 1;
  }

  /* ── Inner container ── */
  .nav-container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
  }

  /* ══════════════════════
     LOGO
  ══════════════════════ */
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    flex-shrink: 0;
  }

  /* Logo image with white background */
  .nav-logo-img-wrap {
    width: 48px;
    height: 48px;
    background: #fffefd;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.25);
    overflow: hidden;
  }
  .nav-logo-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .nav-logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1.5;
  }
  .nav-logo-main {
    font-family: 'Oswald', sans-serif;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 2.5px;
    color: #ffffff;
    text-transform: uppercase;
  }
  .nav-logo-sub {
    font-family: 'Barlow', sans-serif;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 4px;
    color: var(--orange);
    text-transform: uppercase;
    margin-top: 2px;
  }

  /* ══════════════════════
     NAV LINKS
  ══════════════════════ */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 6px;
    list-style: none;
    margin: 0; padding: 0;
  }

  .nav-links li a {
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.92);
    text-decoration: none;
    padding: 8px 14px;
    border-radius: 2px;
    position: relative;
    transition: color 0.22s;
    display: block;
  }

  /* Underline reveal on hover */
  .nav-links li a::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 14px; right: 14px;
    height: 1.5px;
    background: var(--orange);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
  }
  .nav-links li a:hover {
    color: #fff;
  }
  .nav-links li a:hover::after {
    transform: scaleX(1);
  }

  /* Active link */
  .nav-links li a.active {
    color: var(--orange);
  }
  .nav-links li a.active::after {
    transform: scaleX(1);
  }

  /* Contact Us — special CTA button */
  .nav-links li.nav-cta a {
    color: #fff;
    background: var(--orange);
    padding: 9px 20px;
    border-radius: 2px;
    font-weight: 600;
    letter-spacing: 2px;
    transition: background 0.22s, transform 0.18s, box-shadow 0.22s;
    box-shadow: 0 2px 12px rgba(255,123,0,0.35);
  }
  .nav-links li.nav-cta a::after { display: none; }
  .nav-links li.nav-cta a:hover {
    background: #e06c00;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(255,123,0,0.5);
    color: #fff;
  }

  /* ══════════════════════
     MOBILE HAMBURGER
  ══════════════════════ */
  .nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 6px;
    outline: none;
    flex-shrink: 0;
  }
  .nav-hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: #fff;
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
    transform-origin: center;
  }
  .nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ══════════════════════
     MOBILE MENU PANEL
  ══════════════════════ */
  .nav-mobile {
    display: none;
    position: fixed;
    top: var(--nav-height);
    left: 0; right: 0;
    background: rgba(6,6,6,0.96);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-top: 1px solid rgba(255,255,255,0.07);
    padding: 20px 0 32px;
    transform: translateY(-12px);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.32s cubic-bezier(0.16,1,0.3,1), opacity 0.28s ease;
    z-index: 999;
  }
  .nav-mobile.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  .nav-mobile ul {
    list-style: none;
    margin: 0; padding: 0;
  }
  .nav-mobile ul li a {
    display: block;
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.75);
    text-decoration: none;
    padding: 14px 40px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: color 0.2s, padding-left 0.2s;
  }
  .nav-mobile ul li a:hover {
    color: var(--orange);
    padding-left: 52px;
  }
  .nav-mobile ul li:last-child a {
    color: var(--orange);
    font-weight: 600;
    border-bottom: none;
    margin-top: 8px;
  }

  /* ══════════════════════
     RESPONSIVE
  ══════════════════════ */
  @media (max-width: 900px) {
    .nav-links { display: none; }
    .nav-hamburger { display: flex; }
    .nav-mobile { display: block; }
    .nav-container { padding: 0 24px; }
  }

  @media (max-width: 480px) {
    .nav-logo-main { font-size: 16px; letter-spacing: 1.5px; }
    .nav-logo-sub { font-size: 9px; }
    .nav-logo-img-wrap { width: 38px; height: 38px; }
  }
`;

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  const links = [
    { label: "Home",       to: "/" },
    { label: "About",      to: "/about" },
    { label: "Services",   to: "/services" },
    { label: "Clients",    to: "/clients" },
  ];

  return (
    <>
      <style>{navStyles}</style>

      {/* ── Main navbar ── */}
      <nav className={`nav-root ${scrolled ? "nav-scrolled" : "nav-top"}`}>
        <div className="nav-container">

          {/* Logo */}
          <Link to="/" className="nav-logo">
            <div className="nav-logo-img-wrap">
              <img src="./img/logo.png" alt="Aber Al-Khayal Logo" />
            </div>
            <div className="nav-logo-text">
              <span className="nav-logo-main">Aber Al-Khayal</span>
              <span className="nav-logo-sub">General Contracting</span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="nav-links">
            {links.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={location.pathname === to ? "active" : ""}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="nav-cta">
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className={`nav-hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>

        </div>
      </nav>

      {/* ── Mobile slide-down menu ── */}
      <div className={`nav-mobile ${mobileOpen ? "open" : ""}`}>
        <ul>
          {links.map(({ label, to }) => (
            <li key={to}>
              <Link to={to}>{label}</Link>
            </li>
          ))}
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>
    </>
  );
};
