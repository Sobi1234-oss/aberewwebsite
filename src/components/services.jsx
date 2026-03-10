import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/services.css";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });

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

/* ─────────────────────────────────────────────
   Vertical Auto-Sliding Gallery (desktop 3rd column)
───────────────────────────────────────────── */
const VerticalSlider = ({ images, name }) => {
  const loopImages = [...images, ...images, ...images];
  return (
    <div className="vsld-root">
      <div className="vsld-label">
        <span className="vsld-label-txt">PROJECT SHOWCASE</span>
        <div className="vsld-label-line" />
      </div>
      <div className="vsld-window">
        <div className="vsld-track">
          {loopImages.map((img, i) => (
            <div className="vsld-card" key={i}>
              <img src={img} alt={`${name} ${(i % images.length) + 1}`} loading="lazy" />
              <div className="vsld-overlay">
                <span className="vsld-num">{String((i % images.length) + 1).padStart(2, "0")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Horizontal Auto-Sliding Gallery (mobile only)
───────────────────────────────────────────── */
const HorizontalSlider = ({ images, name }) => {
  const loopImages = [...images, ...images, ...images];
  return (
    <div className="hsld-root">
      <div className="hsld-label">
        <span className="hsld-label-txt">PROJECT SHOWCASE</span>
        <div className="hsld-label-line" />
      </div>
      <div className="hsld-window">
        <div className="hsld-track">
          {loopImages.map((img, i) => (
            <div className="hsld-card" key={i}>
              <img src={img} alt={`${name} ${(i % images.length) + 1}`} loading="lazy" />
              <div className="hsld-overlay">
                <span className="hsld-num">{String((i % images.length) + 1).padStart(2, "0")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Services Section
───────────────────────────────────────────── */
export const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".service-item-slow");
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      cards.forEach((card) => {
        gsap.set(card, { autoAlpha: 1 });
      });
      return;
    }

    gsap.set(cards, { autoAlpha: 0 });

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3600",
          scrub: 1,
          pin: true,
          anticipatePin: 0,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      tl.from(".srv-header-group", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      cards.forEach((card, i) => {
        const col1 = card.querySelector(".srv-col-image");
        const col2 = card.querySelector(".srv-col-content");
        const col3 = card.querySelector(".srv-col-slider");

        tl.to(card, { autoAlpha: 1, duration: 0.1 }, "+=0.1");

        tl.fromTo(
          col1,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 3, ease: "power2.out" },
          "<"
        );

        tl.fromTo(
          col2,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 3, ease: "power2.out" },
          "<0.2"
        );

        tl.fromTo(
          col3,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 3, ease: "power2.out" },
          "<0.2"
        );

        tl.to({}, { duration: 3 });

        if (i !== cards.length - 1) {
          tl.to(card, {
            autoAlpha: 0,
            y: -25,
            duration: 2,
            ease: "power2.in",
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services-section" ref={containerRef}>
      <div className="services-inner">

        {/* Heading */}
        <div className="srv-header-group">
          <span className="srv-arabic-label">خدماتنا — دقة في التنفيذ</span>
          <h2 className="srv-main-title">
            Our <span>Specialized</span> Services
          </h2>
        </div>

        {/* Cards Stack */}
        <div className="services-stack-wrapper">
          {servicesData.map((service, index) => (
            <div className="service-item-slow" key={index}>

              {/* COL 1 — Main Image */}
              <div className="srv-col-image">
                <div className="srv-img-frame">
                  <div className="srv-number-overlay">{service.id}</div>
                  <img src={service.image} alt={service.name} />
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

              {/* COL 3 — Vertical Slider (desktop) / Horizontal Slider (mobile) */}
              <div className="srv-col-slider srv-col-slider--desktop">
                <VerticalSlider images={service.gallery} name={service.name} />
              </div>
              <div className="srv-col-slider--mobile">
                <HorizontalSlider images={service.gallery} name={service.name} />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
