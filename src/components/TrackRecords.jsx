import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/trackrecord.css";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { count: 50, suffix: "+", label: "Projects Completed", desc: "Successfully delivered across the Kingdom" },
  { count: 99, suffix: "%", label: "Client Satisfaction", desc: "Based on post-delivery quality assessments" },
  { count: 15, suffix: "+", label: "Years Experience", desc: "Operating with excellence since 2010" },
  { count: 100, suffix: "%", label: "Safety Record", desc: "Committed to zero-incident environments" },
];

const useCounter = (target, started) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const duration = 2000; // Slightly slower for a more premium feel
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target]);
  return count;
};

const StatItem = ({ stat, started }) => {
  const count = useCounter(stat.count, started);
  return (
    <div className="stat-item">
      <div className="stat-line"></div>
      <div className="stat-number">
        <span className="stat-count">{count}</span>
        <span className="stat-suffix">{stat.suffix}</span>
      </div>
      <div className="stat-label">{stat.label}</div>
      <p className="stat-desc">{stat.desc}</p>
    </div>
  );
};

export const TrackRecords = () => {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. PINNED MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 2. HEADER: Recedes and Fades slightly (The "Decent" 3D effect)
      tl.fromTo(headerRef.current, 
        { 
          z: 0, 
          rotationX: 0, 
          opacity: 1,
          filter: "blur(0px)" 
        },
        { 
          z: -150, 
          rotationX: 15, 
          opacity: 0.4, 
          filter: "blur(4px)", 
          duration: 2 
        }
      );

      // 3. STATS: Float Up and Forward (Rising towards the user)
      tl.fromTo(".stat-item", 
        { 
          y: 200, 
          z: -100, 
          opacity: 0, 
          rotationX: -20 
        },
        { 
          y: 0, 
          z: 50, 
          opacity: 1, 
          rotationX: 0, 
          stagger: 0.5, 
          duration: 4,
          onStart: () => setStarted(true) 
        },
        "-=1.5"
      );

      // 4. STAT LINES: Animate width for a clean touch
      tl.fromTo(".stat-line", 
        { width: 0 }, 
        { width: 40, duration: 1, stagger: 0.2 }, 
        "-=2"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="track-records" ref={sectionRef}>
      <div className="track-inner">
        <div className="track-header" ref={headerRef}>
          <div className="header-bar"></div>
          <h2 className="track-heading">
            Our Track <span>Records</span>
          </h2>
        </div>

        <div className="track-stats">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
};