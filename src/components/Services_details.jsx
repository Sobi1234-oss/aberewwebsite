import React, { useEffect, useRef, useCallback, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/servicesdetails.css";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const detailedServices = [
  {
    id: "01",
    name: "Civil Engineering",
    arabic: "الهندسة المدنية والبنية التحتية",
    description: "High-durability structural development and urban infrastructure.",
    longText:
      "Our civil engineering experts focus on the lifecycle of the built environment. We handle everything from initial site surveys and soil testing to the implementation of complex structural systems.",
    moreContent:
      "In alignment with Saudi Vision 2030, we integrate sustainable engineering practices and advanced BIM to ensure every structure meets the highest safety standards. From harsh desert terrains to high-density urban centers, our projects are engineered for longevity and resilience.",
    strategyText:
      "We specialize in large-scale infrastructure, including commercial towers and residential complexes, ensuring full compliance with the Saudi Building Code (SBC). Our commitment to quality control and rigorous project management makes us a trusted partner for the Kingdom's most ambitious developments.",
    mainImage: "./img/services/service3.1.jpg",
    tags: ["Foundation", "Structural Design", "Urban Planning", "Soil Analysis", "Infrastructure"],
    gallery: [
      "./img/servicedetails/pic5.jpg",
      "./img/servicedetails/pic2.jpg",
      "./img/servicedetails/pic1.jpg",
      "./img/servicedetails/civil4.png",
    ],
  },
  {
    id: "02",
    name: "Electrical Systems",
    arabic: "الأنظمة الكهربائية والأتمتة",
    description: "Mission-critical electrical distribution and smart building ecosystems.",
    longText:
      "We design and install advanced electrical grids for industrial and commercial facilities. This includes high-voltage transformers, backup power systems, and fully integrated building automation.",
    moreContent:
      "Our electrical solutions handle the extreme climatic conditions of Saudi Arabia, focusing on energy efficiency and smart grid integration with zero-downtime reliability.",
    strategyText:
      "By leveraging IoT-enabled automation and renewable energy synchronization, we help clients reduce operational costs while ensuring future-proof scalability.",
    mainImage: "./img/services/service1.jpg",
    tags: ["HV Systems", "Automation", "Grid Safety", "Smart Power", "Solar Integration"],
    gallery: [
      "./img/servicedetails/e1.jpg",
      "./img/servicedetails/e2.jpg",
      "./img/servicedetails/e3.jpg",
      "./img/servicedetails/e4.png",
    ],
  },
  {
    id: "03",
    name: "Mechanical Systems",
    arabic: "الأنظمة الميكانيكية والأنابيب الصناعية",
    description: "Engineering sophisticated HVAC and life-safety systems.",
    longText:
      "Focused on district cooling, industrial piping, and fire suppression systems. We specialize in creating high-efficiency mechanical environments for large-scale industrial plants.",
    moreContent:
      "We deliver world-class HVAC and District Cooling solutions tailored for the Middle East's temperature demands, meeting global NFPA standards and Civil Defense requirements.",
    strategyText:
      "Our expertise lies in optimizing thermal performance and airflow dynamics, ensuring robust mechanical infrastructure aligned with Saudi sustainability goals.",
    mainImage: "./img/services/service2.jpg",
    tags: ["HVAC", "Piping", "Fire Safety", "Cooling Plants", "Life Safety"],
    gallery: [
      "./img/servicedetails/m1.jpg",
      "./img/servicedetails/m2.jpg",
      "./img/servicedetails/m3.jpg",
      "./img/servicedetails/m5.jpg",
    ],
  },
];

/* ─────────────────────────────────────────────
   Lazy Image with blur-up effect
───────────────────────────────────────────── */
const LazyImage = memo(({ src, alt, eager = false, className = "" }) => {
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
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchpriority={eager ? "high" : "low"}
      style={{
        filter: eager ? "blur(0px)" : "blur(6px)",
        transform: eager ? "scale(1)" : "scale(1.02)",
        transition: "filter 0.45s ease, transform 0.45s ease",
      }}
      onLoad={handleLoad}
    />
  );
});

/* ─────────────────────────────────────────────
   RAF Horizontal Slider — memoized
───────────────────────────────────────────── */
const AutoSliderGallery = memo(({ images, name }) => {
  const trackRef  = useRef(null);
  const rafRef    = useRef(null);
  const posRef    = useRef(0);
  const pausedRef = useRef(false);

  const handleMouseEnter = useCallback(() => { pausedRef.current = true;  }, []);
  const handleMouseLeave = useCallback(() => { pausedRef.current = false; }, []);

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

    // Small delay so layout is settled before measuring scrollWidth
    const t = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, 120);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const loopImages = [...images, ...images];

  return (
    <div className="hg-root">
      <div className="hg-label-row">
        <span className="hg-label-line" />
        <span className="hg-label-txt">PROJECT SHOWCASE</span>
        <span className="hg-label-line" />
      </div>
      <div
        className="hg-slider-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="hg-track" ref={trackRef}>
          {loopImages.map((img, i) => (
            <div className="hg-card" key={i}>
              <LazyImage
                src={img}
                alt={`${name} ${(i % images.length) + 1}`}
              />
              <div className="hg-card-overlay">
                <span className="hg-card-num">
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

/* ─────────────────────────────────────────────
   Service Block — memoized
───────────────────────────────────────────── */
const ServiceBlock = memo(({ item, index }) => {
  const blockRef   = useRef(null);
  const headingRef = useRef(null);
  const bodyRef    = useRef(null);
  const sliderRef  = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {

      // Pin heading until slider bottom reaches viewport top
      ScrollTrigger.create({
        trigger: blockRef.current,
        start: "top top",
        endTrigger: sliderRef.current,
        end: "bottom top",
        pin: headingRef.current,
        pinSpacing: false,
      });

      // Image slides in from right
      gsap.from(bodyRef.current?.querySelector(".det-main-visual"), {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bodyRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Text slides in from left
      gsap.from(bodyRef.current?.querySelector(".det-info-text"), {
        x: -60,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bodyRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

    }, blockRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className={`det-block-wrapper ${index > 0 ? "det-block-separator" : ""}`}
      ref={blockRef}
    >
      {/* STICKY HEADING */}
      <div className="det-sticky-heading" ref={headingRef}>
        <div className="det-sticky-inner">
          <div className="det-num-tag">{item.id}</div>
          <div className="det-title-box">
            <span className="det-arabic-top">{item.arabic}</span>
            <h2 className="det-main-name">{item.name}</h2>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="det-body" ref={bodyRef}>
        <div className="det-inner-limit">
          <div className="det-layout-grid">

            <div className="det-info-text">
              <p className="det-summary-bold">{item.description}</p>
              <div className="det-accent-line" />
              <p className="det-full-desc">{item.longText}</p>
              <p className="det-extra-para">{item.moreContent}</p>
              <p className="det-extra-para det-strategy">{item.strategyText}</p>
              <div className="det-tags-row">
                {item.tags.map((tag, i) => (
                  <span key={i} className="det-tag-small">#{tag}</span>
                ))}
              </div>
            </div>

            <div className="det-main-visual">
              <LazyImage
                src={item.mainImage}
                alt={item.name}
                className="main-service-img"
                eager={index === 0}
              />
            </div>

          </div>
        </div>
      </div>

      {/* SLIDER — end trigger for pin */}
      <div ref={sliderRef}>
        <AutoSliderGallery images={item.gallery} name={item.name} />
      </div>

    </section>
  );
});

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export const ServicesDetails = () => (
  <div className="det-page-container">
    {detailedServices.map((item, index) => (
      <ServiceBlock key={item.id} item={item} index={index} />
    ))}
  </div>
);