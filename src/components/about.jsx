import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/about.css";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const imageColRef = useRef(null);
  const contentRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(imageColRef.current,
        { opacity: 0, x: -60, rotationY: -20, transformOrigin: "right center" },
        {
          opacity: 1, x: 0, rotationY: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageColRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(contentRef.current.children,
        { opacity: 0, x: 50, y: 20 },
        {
          opacity: 1, x: 0, y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 82%",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about-unique-section" ref={sectionRef}>
      <div className="ab-main-container">

        <div ref={headingRef}>
          <span className="ab-tagline">من نحن — About Us</span>
          <h2 className="ab-main-heading">
            Engineering <span>Beyond</span><br />Boundaries
          </h2>
        </div>

        <div className="ab-two-col">

          {/* LEFT — overlapping images */}
          <div className="ab-image-col" ref={imageColRef}>
            <div className="ab-img-main-wrap">
              <img src="./img/about2.jpg" alt="Aber Al-Khayal Engineering" />
            </div>
            <div className="ab-img-sub-wrap">
              <img src="./img/services/service3.1.jpg" alt="Construction Site" />
            </div>
          </div>

          {/* RIGHT — trimmed content, matches image height */}
          <div className="ab-content-col" ref={contentRef}>

            <h3>Saudi Arabia's Trusted <span>Engineering Partner</span></h3>

            <div className="ab-divider"></div>

            <p>
              Founded in 2010, Aber Al-Khayal has grown into a fully integrated contracting
              powerhouse — delivering Civil, Mechanical, and Electrical engineering projects
              across the Kingdom with precision, safety, and zero compromise for over 15 years.
            </p>

            <p>
              From high-voltage power networks and industrial HVAC systems to large-scale civil
              structures, we execute Saudi Arabia's most demanding infrastructure projects aligned
              with <strong>Vision 2030</strong> — on time, every time.
            </p>

            <div className="ab-services-tags">
              <span className="ab-tag">Civil Construction</span>
              <span className="ab-tag">Mechanical Engineering</span>
              <span className="ab-tag">Electrical Systems</span>
              <span className="ab-tag">MEP Integration</span>
              <span className="ab-tag">Vision 2030</span>
              <span className="ab-tag">Industrial Works</span>
            </div>

            <p className="ab-arabic-quote">
              نحن نلتزم بأعلى معايير الجودة والسلامة — لأن التميز أساس مستقبل المملكة.
            </p>

            <div className="ab-footer-sig">
              <div className="ab-sig-line"></div>
              <span className="ab-sig-text">رؤية وطنية بأبعاد عالمية — ٢٠٣٠</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};