import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/about.css";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const containerRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  // Removed headerRef from animations

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 993px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // HEADING ANIMATION REMOVED FROM HERE

      // Animate both images
      tl.fromTo([image1Ref.current, image2Ref.current], 
        { rotationY: -50, rotationX: 10, scale: 0.8, opacity: 0, z: -500 },
        { rotationY: 0, rotationX: 0, scale: 1, opacity: 1, z: 0, duration: 4, stagger: 0.2 }
      );

      tl.fromTo(".ab-x-content > *", 
        { y: 80, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.4, duration: 3 },
        "-=2"
      );
    });

    mm.add("(max-width: 992px)", () => {
      // Image and content animations remain for mobile, header animation removed
      gsap.from([image1Ref.current, image2Ref.current], {
        scale: 0.9, opacity: 0, duration: 1.2, stagger: 0.2,
        scrollTrigger: { trigger: ".ab-x-image-box", start: "top 80%" }
      });

      gsap.from(".ab-x-content > *", {
        y: 30, opacity: 0, stagger: 0.2, duration: 1,
        scrollTrigger: { trigger: ".ab-x-content", start: "top 80%" }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="ab-x-section" ref={containerRef}>
      <div className="ab-x-container">
        
        {/* Main Header - Ref removed, now stays static */}
        <div className="ab-x-header">
          <span className="ab-x-arabic-sub">من نحن — قصة التميز والريادة</span>
          <h1 className="ab-x-title">
            Engineering <span>Beyond</span> <br />Boundaries
          </h1>
        </div>

        <div className="ab-x-hero-grid">
          <div className="ab-x-image-box">
            <img ref={image1Ref} src="./img/about2.jpg" alt="Engineering Excellence" className="ab-img-main" />
            <img ref={image2Ref} src="./img/services/service3.1.jpg" alt="Construction Site" className="ab-img-sub" />
          </div>

          <div className="ab-x-content">
            <h2>Building the Future of the <span>Kingdom</span></h2>
            <div className="ab-x-body">
              <p>Founded in 2010, Aber Al-Khayal has evolved from a specialized local firm into a powerhouse of Saudi Arabia’s construction landscape, mastering the complexities of Electrical, Mechanical, and Civil Engineering. With over 15 years of operational excellence, we have built a reputation for transforming ambitious blueprints into high-performance infrastructures. Our multi-disciplinary approach ensures that every project, from industrial power plants to luxury commercial hubs, is executed with surgical precision.</p>
              <p>Our journey is linked to <strong>Saudi Vision 2030</strong>...</p>
              <p className="ab-x-arabic-quote">نحن نلتزم بأعلى معايير الجودة والسلامة...</p>
            </div>
            <div className="ab-x-footer">
              <div className="ab-x-line"></div>
              <span className="ab-x-sig">رؤية وطنية بأبعاد عالمية — ٢٠٣٠</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};