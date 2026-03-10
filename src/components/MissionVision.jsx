import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/missionvision.css";

gsap.registerPlugin(ScrollTrigger);

export const MissionVision = () => {
  const mvSectionRef = useRef(null);
  const mvLeftRef = useRef(null);
  const mvBgRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mvSectionRef.current,
          start: "top top",
          end: "+=2500", 
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Background Zoom Effect
      tl.fromTo(mvBgRef.current, 
        { scale: 1.4 },
        { scale: 1, duration: 10, ease: "none" }
      );

      // Left Content 3D Entrance
      tl.fromTo(mvLeftRef.current, 
        { 
          rotationY: isMobile ? 30 : 50, 
          x: isMobile ? 0 : 100, 
          opacity: 0, 
          filter: "blur(10px)",
          transformOrigin: "right center"
        },
        { rotationY: 0, x: 0, opacity: 1, filter: "blur(0px)", duration: 4 },
        "-=8"
      );

      // 4 Pillars staggered entrance
      tl.fromTo(".mv-pillar-card", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.8, duration: 3 },
        "-=4"
      );

    }, mvSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="mv-unique-section" ref={mvSectionRef}>
      <div className="mv-main-container">
        
        {/* CONFINED BACKGROUND FRAME */}
        <div className="mv-visual-engine">
          <div className="mv-frame-box" ref={mvBgRef}>
            <div className="mv-light-overlay"></div>
            <img 
              src="./img/hseq-bg3.jpg" 
              alt="Mission Background" 
              className="mv-actual-img"
            />
          </div>
        </div>

        <div className="mv-content-grid">
          {/* LEFT CONTENT AREA */}
          <div className="mv-left-column" ref={mvLeftRef}>
            <div className="mv-text-header">
                <span className="mv-tagline">Corporate Core</span>
                <h3 className="mv-main-heading">Commitment to <br />Saudi Excellence.</h3>
                <p className="mv-description-text">
                  Our journey is defined by more than just structures; it is defined by the values we uphold. 
                  <strong> Aber Al-Khayal</strong> operates at the intersection of innovation and safety, 
                  fueling Vision 2030 through sustainable growth.
                </p>
            </div>

            {/* 4 BOXES IN GRID ON LEFT */}
            <div className="mv-pillars-horizontal-stack">
              <div className="mv-pillar-card">
                <div className="mv-card-head">
                  <span className="mv-card-num">01</span>
                  <h4>Eco-Engineering</h4>
                </div>
                <p>Deploying smart waste systems and carbon-reduction protocols to respect the natural terrain.</p>
              </div>

              <div className="mv-pillar-card">
                <div className="mv-card-head">
                  <span className="mv-card-num">02</span>
                  <h4>Human Capital</h4>
                </div>
                <p>Investing in workforce wellness through advanced onsite support and wellness programs.</p>
              </div>

              <div className="mv-pillar-card">
                <div className="mv-card-head">
                  <span className="mv-card-num">03</span>
                  <h4>Precision Safety</h4>
                </div>
                <p>Utilizing AI-driven risk assessment to maintain a flawless safety record across mega-projects.</p>
              </div>

              <div className="mv-pillar-card">
                <div className="mv-card-head">
                  <span className="mv-card-num">04</span>
                  <h4>Global Quality</h4>
                </div>
                <p>Integrating ISO-certified methodologies with local craftsmanship for lasting infrastructure.</p>
              </div>
            </div>
          </div>

          {/* EMPTY RIGHT SIDE FOR BACKGROUND VISIBILITY */}
          <div className="mv-right-space"></div>
        </div>
      </div>
    </section>
  );
};