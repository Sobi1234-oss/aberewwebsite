import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/expertise.css";

gsap.registerPlugin(ScrollTrigger);

export const Expertise = () => {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2500",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Background Zoom (Inside the frame)
      tl.fromTo(bgRef.current, 
        { scale: 1.4 },
        { scale: 1, duration: 10, ease: "none" }
      );

      // Content Entrance
      tl.fromTo(leftContentRef.current, 
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

      // Division Cards staggered entrance
      tl.fromTo(".exp-division-card", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.8, duration: 3 },
        "-=4"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="expertise-unique-section" ref={sectionRef}>
      <div className="exp-main-container">
        
        {/* CONFINED BACKGROUND FRAME */}
        <div className="exp-visual-engine">
          <div className="exp-frame-box" ref={bgRef}>
            <div className="exp-light-overlay"></div>
            <img 
              src="./img/trackrecordbg.png" 
              alt="Expertise Background" 
              className="exp-actual-img"
            />
          </div>
        </div>

        <div className="exp-content-grid">
          {/* LEFT CONTENT AREA */}
          <div className="exp-left-column" ref={leftContentRef}>
            <div className="exp-text-header">
                <span className="exp-tagline">Our Expertise</span>
                <h3 className="exp-main-heading">Integrated Solutions for <br />Strategic Projects.</h3>
                <p className="exp-description-text">
                  Our portfolio spans core engineering disciplines, offering fully integrated 
                  <strong> MEP</strong> and <strong>Civil Construction</strong> solutions tailored for the Kingdom's growth.
                </p>
            </div>

            {/* DIVISIONS SHIFTED INTO BOXES */}
            <div className="exp-divisions-horizontal-stack">
              <div className="exp-division-card">
                <div className="exp-card-head">
                  <span className="exp-card-num">01</span>
                  <h4>Electrical Engineering</h4>
                </div>
                <p>Power distribution, industrial automation, and smart grid integration for modern infrastructure.</p>
              </div>

              <div className="exp-division-card">
                <div className="exp-card-head">
                  <span className="exp-card-num">02</span>
                  <h4>Mechanical Systems</h4>
                </div>
                <p>Advanced HVAC solutions, industrial piping, and precision thermal management systems.</p>
              </div>

              <div className="exp-division-card">
                <div className="exp-card-head">
                  <span className="exp-card-num">03</span>
                  <h4>Civil Construction</h4>
                </div>
                <p>Mega-structures, site development, and earthworks executed with engineering precision.</p>
              </div>
            </div>
          </div>

          {/* EMPTY RIGHT SIDE FOR BACKGROUND VISIBILITY */}
          <div className="exp-right-space"></div>
        </div>
      </div>
    </section>
  );
};