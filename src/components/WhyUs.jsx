import React from "react";
import "../styles/whyus.css";

const features = [
  {
    id: "01",
    title: "Vision 2030 Aligned",
    arabic: "متوافق مع رؤية ٢٠٣٠",
    desc: "Every project we deliver is engineered in full compliance with Saudi Arabia's Vision 2030 — from green building standards to sustainable infrastructure targets.",
    icon: "◈",
  },
  {
    id: "02",
    title: "Multi-Discipline Expertise",
    arabic: "كفاءة متعددة التخصصات",
    desc: "Civil, electrical, and mechanical under one roof. No hand-off delays, no miscommunication — seamless execution across all engineering disciplines.",
    icon: "◈",
  },
  {
    id: "03",
    title: "Proven Track Record",
    arabic: "سجل حافل بالإنجازات",
    desc: "Over 480 successfully delivered projects across the Kingdom — from commercial towers and industrial plants to critical infrastructure and smart facilities.",
    icon: "◈",
  },
  {
    id: "04",
    title: "Zero-Compromise Quality",
    arabic: "جودة بلا تنازل",
    desc: "Rigorous QA/QC protocols under international standards — SBC, NFPA, ISO — ensuring every bolt, cable, and beam meets the highest benchmarks.",
    icon: "◈",
  },
  {
    id: "05",
    title: "On-Time Delivery",
    arabic: "التسليم في الوقت المحدد",
    desc: "We respect your timeline as much as your budget. Our project management framework ensures milestones are hit and handovers happen on schedule.",
    icon: "◈",
  },
  {
    id: "06",
    title: "Kingdom-Wide Presence",
    arabic: "حضور في جميع أنحاء المملكة",
    desc: "With active operations across major Saudi cities and regions, we bring local expertise and national reach to every project we undertake.",
    icon: "◈",
  },
];

const stats = [
  { value: "50+", label: "Projects Completed", arabic: "مشروع منجز" },
  { value: "15+",  label: "Years Experience",   arabic: "سنة خبرة" },
  { value: "120+", label: "Expert Engineers",   arabic: "مهندس متخصص" },
  { value: "99%",  label: "Client Satisfaction",arabic: "رضا العملاء" },
];

export const WhyUs = () => (
  <section className="wu-section">
    <div className="wu-inner">

      {/* ── Header ── */}
      <div className="wu-header">
        <div className="wu-header-left">
          <span className="wu-arabic-label">لماذا تختارنا — التميز في كل تفصيل</span>
          <h2 className="wu-title">
            Why Choose <span>Abdul Kahyal</span><br />Engineering?
          </h2>
        </div>
        <p className="wu-header-desc">
          We don't just build structures — we engineer trust. Two decades of excellence
          across civil, electrical and mechanical disciplines, delivering projects that
          stand the test of time across the Kingdom of Saudi Arabia.
        </p>
      </div>

      {/* ── Stats Row ── */}
      <div className="wu-stats-row">
        {stats.map((s, i) => (
          <div className="wu-stat" key={i}>
            <div className="wu-stat-value">{s.value}</div>
            <div className="wu-stat-label">{s.label}</div>
            <div className="wu-stat-arabic">{s.arabic}</div>
          </div>
        ))}
      </div>

      {/* ── Features Grid ── */}
      <div className="wu-grid">
        {features.map((f, i) => (
          <div className="wu-card" key={i}>
            <div className="wu-card-num">{f.id}</div>
            <span className="wu-card-arabic">{f.arabic}</span>
            <h3 className="wu-card-title">{f.title}</h3>
            <div className="wu-card-bar" />
            <p className="wu-card-desc">{f.desc}</p>
            <div className="wu-card-hover-line" />
          </div>
        ))}
      </div>

    </div>
  </section>
);
