import React, { useEffect, useRef, useCallback, memo } from "react";
import "../styles/services.css";

const servicesData = [
  {
    id: "01",
    name: "Civil Engineering",
    arabic: "الهندسة المدنية والبنية التحتية",
    text: "We specialize in large-scale structural development and urban infrastructure. From advanced site preparation to high-durability structural concrete, our engineers deliver projects built to last generations.",
    extraText: "In alignment with Saudi Vision 2030, we integrate sustainable engineering practices and advanced BIM modelling, ensuring every structure meets the highest safety standards from harsh desert terrain to high-density urban cores.",
    tags: ["Foundation", "Structural Design", "Urban Planning", "BIM", "Infrastructure"],
    image: "./img/services/service3.1.jpg",
    gallery: [
      "./img/servicedetails/pic5.jpg",
      "./img/servicedetails/pic2.jpg",
      "./img/servicedetails/pic1.jpg",
      "./img/servicedetails/civil4.png",
      "./img/servicedetails/pic5.jpg",
      "./img/servicedetails/pic2.jpg",
    ],
  },
  {
    id: "02",
    name: "Electrical Systems",
    arabic: "الأنظمة الكهربائية والأتمتة",
    text: "Delivering mission-critical electrical distribution and smart building ecosystems. Our solutions integrate high-voltage engineering with zero-downtime reliability across industrial and commercial facilities.",
    extraText: "By leveraging IoT-enabled automation and renewable energy synchronisation, we help clients reduce operational costs while ensuring future-proof scalability aligned with Saudi Arabia's clean energy ambitions.",
    tags: ["HV Systems", "Automation", "Grid Safety", "Smart Power", "Solar Integration"],
    image: "./img/services/service1.jpg",
    gallery: [
      "./img/servicedetails/e1.jpg",
      "./img/servicedetails/e2.jpg",
      "./img/servicedetails/e3.jpg",
      "./img/servicedetails/e4.png",
      "./img/servicedetails/e1.jpg",
      "./img/servicedetails/e2.jpg",
    ],
  },
  {
    id: "03",
    name: "Mechanical Systems",
    arabic: "الأنظمة الميكانيكية والأنابيب الصناعية",
    text: "Engineering sophisticated HVAC and life-safety systems for complex environments. Focused on district cooling, industrial piping, and fire suppression for large-scale industrial plants.",
    extraText: "Our expertise lies in optimising thermal performance and airflow dynamics, delivering world-class mechanical infrastructure that meets NFPA standards, Civil Defence requirements, and Saudi sustainability goals.",
    tags: ["HVAC", "Piping", "Fire Safety", "Cooling Plants", "Life Safety"],
    image: "./img/services/service2.jpg",
    gallery: [
      "./img/servicedetails/m1.jpg",
      "./img/servicedetails/m2.jpg",
      "./img/servicedetails/m3.jpg",
      "./img/servicedetails/m5.jpg",
      "./img/servicedetails/m1.jpg",
      "./img/servicedetails/m2.jpg",
    ],
  },
];

/* ── Fast Image: eager for first, lazy + blur-up for rest ── */
const FastImg = memo(({ src, alt, eager = false }) => {
  const imgRef = useRef(null);

  const handleLoad = useCallback(() => {
    if (imgRef.current) {
      imgRef.current.style.filter = "blur(0px)";
      imgRef.current.style.transform = "scale(1)";
    }
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) handleLoad();
  }, [handleLoad]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchpriority={eager ? "high" : "low"}
      onLoad={handleLoad}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        filter: eager ? "blur(0px)" : "blur(5px)",
        transform: eager ? "scale(1)" : "scale(1.03)",
        transition: "filter 0.4s ease, transform 0.4s ease",
        willChange: "filter, transform",
      }}
    />
  );
});

/* ── Vertical Slider — RAF based, memoized ── */
const VerticalSlider = memo(({ images, name }) => {
  const trackRef  = useRef(null);
  const rafRef    = useRef(null);
  const posRef    = useRef(0);
  const pausedRef = useRef(false);

  const onEnter = useCallback(() => { pausedRef.current = true;  }, []);
  const onLeave = useCallback(() => { pausedRef.current = false; }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tick = () => {
      if (!pausedRef.current) {
        const halfH = track.scrollHeight / 2;
        posRef.current = (posRef.current + 0.4) % halfH;
        track.style.transform = `translate3d(0,-${posRef.current}px,0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const t = setTimeout(() => { rafRef.current = requestAnimationFrame(tick); }, 100);
    return () => { clearTimeout(t); cancelAnimationFrame(rafRef.current); };
  }, []);

  const loopImages = [...images, ...images, ...images];

  return (
    <div className="vsld-root">
      <div className="vsld-label">
        <span className="vsld-label-txt">PROJECT SHOWCASE</span>
        <div className="vsld-label-line" />
      </div>
      <div
        className="vsld-window"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div className="vsld-track" ref={trackRef}>
          {loopImages.map((img, i) => (
            <div className="vsld-card" key={i}>
              <FastImg src={img} alt={`${name} ${(i % images.length) + 1}`} />
              <div className="vsld-overlay">
                <span className="vsld-num">
                  {String((i % images.length) + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

/* ── Horizontal Slider — RAF based, memoized ── */
const HorizontalSlider = memo(({ images, name }) => {
  const trackRef  = useRef(null);
  const rafRef    = useRef(null);
  const posRef    = useRef(0);
  const pausedRef = useRef(false);

  const onEnter = useCallback(() => { pausedRef.current = true;  }, []);
  const onLeave = useCallback(() => { pausedRef.current = false; }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tick = () => {
      if (!pausedRef.current) {
        const halfW = track.scrollWidth / 2;
        posRef.current = (posRef.current + 0.5) % halfW;
        track.style.transform = `translate3d(-${posRef.current}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const t = setTimeout(() => { rafRef.current = requestAnimationFrame(tick); }, 100);
    return () => { clearTimeout(t); cancelAnimationFrame(rafRef.current); };
  }, []);

  const loopImages = [...images, ...images, ...images];

  return (
    <div className="hsld-root">
      <div className="hsld-label">
        <span className="hsld-label-txt">PROJECT SHOWCASE</span>
        <div className="hsld-label-line" />
      </div>
      <div
        className="hsld-window"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div className="hsld-track" ref={trackRef}>
          {loopImages.map((img, i) => (
            <div className="hsld-card" key={i}>
              <FastImg src={img} alt={`${name} ${(i % images.length) + 1}`} />
              <div className="hsld-overlay">
                <span className="hsld-num">
                  {String((i % images.length) + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

/* ── Single Service Card — memoized ── */
const ServiceCard = memo(({ service, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="service-item-slow" ref={cardRef}>

      {/* COL 1 — Image */}
      <div className="srv-col-image">
        <div className="srv-img-frame">
          <div className="srv-number-overlay">{service.id}</div>
          <FastImg
            src={service.image}
            alt={service.name}
            eager={index === 0}
          />
          <div className="srv-img-badge">{service.id}</div>
        </div>
      </div>

      {/* COL 2 — Content */}
      <div className="srv-col-content">
        <span className="srv-arabic-sub">{service.arabic}</span>
        <h3 className="srv-title">{service.name}</h3>
        <div className="srv-accent-bar" />
        <p className="srv-desc">{service.text}</p>
        <p className="srv-desc srv-desc-extra">{service.extraText}</p>
        <div className="srv-tags">
          {service.tags.map((tag, t) => (
            <span key={t} className="srv-tag">#{tag}</span>
          ))}
        </div>
        <div className="srv-signature">
          <div className="srv-sig-line" />
          <span className="srv-sig-text">EXCELLENCE — ٢٠٣٠</span>
        </div>
      </div>

      {/* COL 3 — Vertical Slider desktop */}
      <div className="srv-col-slider srv-col-slider--desktop">
        <VerticalSlider images={service.gallery} name={service.name} />
      </div>

      {/* Mobile horizontal slider */}
      <div className="srv-col-slider--mobile">
        <HorizontalSlider images={service.gallery} name={service.name} />
      </div>

    </div>
  );
});

/* ── Main Component ── */
export const Services = () => (
  <section id="services-section">
    <div className="services-inner">

      <div className="srv-header-group">
        <span className="srv-arabic-label">خدماتنا — دقة في التنفيذ</span>
        <h2 className="srv-main-title">
          Our <span>Specialized</span> Services
        </h2>
      </div>

      <div className="services-stack-wrapper">
        {servicesData.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

    </div>
  </section>
);