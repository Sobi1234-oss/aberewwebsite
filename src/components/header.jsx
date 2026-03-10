import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Barlow:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  #header {
    height: 100vh;
    min-height: 600px;
    position: relative;
    overflow: hidden;
    font-family: 'Barlow', sans-serif;
    background: #0a0a0a;
  }

  #header .swiper,
  #header .swiper-wrapper,
  #header .swiper-slide {
    height: 100%;
  }

  /* ══════════════════════════════
     SLIDE LAYOUT
  ══════════════════════════════ */
  .slide-inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  /* ── Two-image diagonal split ── */
  .slide-grid {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: #0a0a0a;
    min-height: 0;
  }

  /* Both images fill full area, clipped diagonally */
  .grid-img {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: #111;
  }

  /* LEFT image — diagonal cut on right side (slant ~30deg = 120deg from horizontal) */
  .grid-img.img-left {
    clip-path: polygon(0 0, 60% 0, 46% 100%, 0 100%);
    z-index: 1;
  }

  /* RIGHT image — mirror diagonal cut on left side */
  .grid-img.img-right {
    clip-path: polygon(60% 0, 100% 0, 100% 100%, 46% 100%);
    z-index: 1;
  }

  /* Glowing seam line along the diagonal */
  .slide-grid-seam {
    position: absolute;
    top: 0; bottom: 0;
    left: 53%;
    width: 2px;
    background: linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.6) 25%, rgba(255,255,255,0.6) 75%, transparent 100%);
    transform: skewX(-28deg);
    z-index: 5;
    pointer-events: none;
  }

  .grid-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 7s ease;
  }

  .swiper-slide-active .grid-img img {
    transform: scale(1.06);
  }

  /* Very light tint */
  .grid-img::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(5,5,5,0.07);
    z-index: 1;
    pointer-events: none;
  }

  /* Bottom fade for text readability */
  .slide-grid-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0,0,0,0.92) 0%,
      rgba(0,0,0,0.40) 30%,
      rgba(0,0,0,0.03) 55%,
      transparent      100%
    );
    pointer-events: none;
    z-index: 4;
  }

  /* ── Bottom bar: text left + nav right ── */
  .slide-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 40px 36px 40px;
    gap: 24px;
  }

  /* ── TEXT AREA — bottom left, shifted right ── */
  .slide-text {
    flex: 1;
    padding-left: 8vw;
    min-width: 0;
  }

  /* Glass backdrop behind all text content */
  .slide-text-inner {
    display: inline-block;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 6px;
    padding: 28px 32px 24px 28px;
    max-width: 560px;
    width: 100%;
  }

  .hero-tag {
    display: inline-block;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #ff7b00;
    margin-bottom: 10px;
    opacity: 1;
    transform: translateY(8px);
    transition: none;
    background: rgba(52, 51, 51, 0.09);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.22);
    border-radius: 4px;
    padding: 5px 16px;
  }
  .swiper-slide-active .hero-tag {
    opacity: 2;
    transform: translateY(0);
    transition: opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s;
  }

  .hero-title {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(44px, 5.8vw, 84px);
    font-weight: 700;
    line-height: 0.95;
    letter-spacing: 1px;
    color: #ffffff;
    text-transform: uppercase;
    margin-bottom: 4px;
    opacity: 0;
    transform: translateY(14px);
    transition: none;
  }
  .swiper-slide-active .hero-title {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.6s ease 0.28s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.28s;
  }

  .hero-subtitle {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(22px, 2.8vw, 42px);
    font-weight: 500;
    letter-spacing: 5px;
    color: #ff7b00;
    text-transform: uppercase;
    display: block;
    margin-bottom: 12px;
    opacity: 0;
    transform: translateY(12px);
    transition: none;
  }
  .swiper-slide-active .hero-subtitle {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.6s ease 0.38s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.38s;
  }

  .hero-desc {
    font-size: clamp(15px, 1.6vw, 19px);
    font-weight: 300;
    line-height: 1.7;
    color: rgba(255,255,255,0.68);
    max-width: 480px;
    margin-bottom: 20px;
    opacity: 0;
    transform: translateY(10px);
    transition: none;
  }
  .swiper-slide-active .hero-desc {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.55s ease 0.5s, transform 0.55s ease 0.5s;
  }

  /* ── BUTTONS — below text, still on left ── */
  .hero-btns {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(10px);
    transition: none;
  }
  .swiper-slide-active .hero-btns {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.5s ease 0.65s, transform 0.5s ease 0.65s;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: #ffffff;
    padding: 11px 26px;
    font-family: 'Oswald', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    text-decoration: none;
    border: 2px solid #ffffff;
    border-radius: 2px;
    transition: background 0.22s, color 0.22s, transform 0.18s, border-color 0.22s;
  }
  .btn-primary:hover {
    background: #ff7b00;
    border-color: #ff7b00;
    color: #fff;
    transform: translateY(-2px);
  }
  .btn-primary svg {
    width: 14px; height: 14px;
    stroke: currentColor; stroke-width: 2.5;
    fill: none; stroke-linecap: round; stroke-linejoin: round;
    transition: transform 0.2s;
  }
  .btn-primary:hover svg { transform: translateX(3px); }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: #ffffff;
    padding: 11px 24px;
    font-family: 'Oswald', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
    border: 2px solid rgba(255,255,255,0.45);
    border-radius: 2px;
    transition: border-color 0.22s, background 0.22s, transform 0.18s;
  }
  .btn-secondary:hover {
    border-color: #ffffff;
    background: rgba(255,255,255,0.08);
    transform: translateY(-2px);
  }

  /* ══════════════════════════════
     NAV BUTTONS — bottom right
  ══════════════════════════════ */
  .slide-nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;
    align-self: flex-end;
  }

  .nav-arrow {
    width: 50px;
    height: 50px;
    border-radius: 3px;
    border: 1.5px solid rgba(255,255,255,0.18);
    background: #ffffff;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: #ff7b00;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    transition: background 0.22s, border-color 0.22s, transform 0.18s;
    box-shadow: 0 4px 18px rgba(0,0,0,0.4);
  }
  .nav-arrow:hover {
    background: #f0eae4;
    border-color: #ff7b00;
    transform: scale(1.08);
  }
  .nav-arrow svg {
    width: 18px; height: 18px;
    stroke: currentColor; stroke-width: 2px;
    fill: none; stroke-linecap: round; stroke-linejoin: round;
    pointer-events: none;
  }

  /* ── Slide counter — between nav buttons ── */
  .nav-count {
    text-align: center;
    pointer-events: none;
  }
  .nav-count span {
    font-family: 'Oswald', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.4);
  }
  .nav-count strong {
    color: #ff7b00;
    font-size: 14px;
  }

  /* ── Pagination ── */
  #header .swiper-pagination { display: none; }
  #header .swiper-button-next,
  #header .swiper-button-prev { display: none !important; }

  /* ══════════════════════════════
     RESPONSIVE
  ══════════════════════════════ */
  @media (max-width: 900px) {
    .slide-bottom { padding: 0 24px 28px 24px; }
    .slide-grid { gap: 2px; }
  }

  @media (max-width: 640px) {
    .slide-bottom {
      flex-direction: column;
      align-items: flex-start;
      padding: 0 20px 24px 20px;
    }
    .slide-nav {
      flex-direction: row;
      align-self: flex-start;
      margin-top: 16px;
    }
    .hero-desc { display: none; }
    .slide-grid { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }
  }

  @media (max-width: 420px) {
    .btn-primary, .btn-secondary { padding: 10px 18px; font-size: 11px; }
    .nav-arrow { width: 42px; height: 42px; }
  }
`;

export const Header = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      tag: "Est. 2010 · Riyadh, KSA",
      title: "Aber Al-Khayal",
      subtitle: "General Contracting",
      desc: "Comprehensive engineering solutions across Electrical, Mechanical, and Civil disciplines — built with precision, delivered with excellence.",
      btn: "Get Started",
      images: [
        "./img/hero/hero1.jpg",
        "./img/hero/hero1.3.jpg"
      ]
    },
    {
      tag: "Electrical Division",
      title: "Power &",
      subtitle: "Automation",
      desc: "Cutting-edge power distribution, lighting control, and industrial automation systems optimized for every sector.",
      btn: "Explore Systems",
      images: [
        "./img/hero/hero2.1.jpg",
        "./img/hero/hero2.3.jpg"
      ]
    },
    {
      tag: "Mechanical Division",
      title: "HVAC &",
      subtitle: "Plumbing",
      desc: "High-performance HVAC and plumbing installations engineered with modern technology to maximize efficiency.",
      btn: "View Solutions",
      images: [
        "./img/hero/hero3.3.jpg",
        "./img/hero/hero3.4.jpg"
      ]
    },
    {
      tag: "Civil Division",
      title: "Structure &",
      subtitle: "Infrastructure",
      desc: "From structural design to full construction management — delivering high-quality infrastructure.",
      btn: "Our Projects",
      images: [
        "./img/hero/hero4.1.jpg",
        "./img/hero/hero4.2.jpg"
      ]
    }
  ];


  const total = slides.length;

  return (
    <>
      <style>{styles}</style>
      <header id="header">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          loop={true}
          onSwiper={(s) => { swiperRef.current = s; }}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          style={{ height: "100%" }}
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="slide-inner">

                {/* Diagonal split: 2 images */}
                <div className="slide-grid">
                  <div className="grid-img img-left">
                    <img src={slide.images[0]} alt={slide.title} />
                  </div>
                  <div className="grid-img img-right">
                    <img src={slide.images[1]} alt={slide.subtitle} />
                  </div>
                  <div className="slide-grid-seam" />
                  <div className="slide-grid-overlay" />
                </div>

                {/* Bottom bar: TEXT LEFT + NAV RIGHT */}
                <div className="slide-bottom">

                  {/* Text area — bottom left */}
                  <div className="slide-text">
                    <div className="hero-tag">{slide.tag}</div>
                    <h1 className="hero-title">{slide.title}</h1>
                    <span className="hero-subtitle">{slide.subtitle}</span>
                    <p className="hero-desc">{slide.desc}</p>

                    {/* Buttons directly below text */}
                    <div className="hero-btns">
                      <a href="#features" className="btn-primary">
                        {slide.btn}
                        <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </a>
                      <a href="#contact" className="btn-secondary">
                        Contact Us
                      </a>
                    </div>
                  </div>

                  {/* Nav arrows — bottom right */}
                  <div className="slide-nav">
                    <button
                      className="nav-arrow"
                      aria-label="Previous"
                      onClick={() => swiperRef.current?.slidePrev()}
                    >
                      <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>

                    <div className="nav-count">
                      <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
                      <span> / {String(total).padStart(2, "0")}</span>
                    </div>

                    <button
                      className="nav-arrow"
                      aria-label="Next"
                      onClick={() => swiperRef.current?.slideNext()}
                    >
                      <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </header>
    </>
  );
};
