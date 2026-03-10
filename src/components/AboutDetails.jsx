import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/aboutdetails.css";

gsap.registerPlugin(ScrollTrigger);

export const AboutDetails = () => {
    const containerRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Entrance Animation for Title
            gsap.fromTo(headerRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
            );

            // 2. Alternating Row Animations
            const rows = gsap.utils.toArray(".about-alternating-row");
            rows.forEach((row, i) => {
                const img = row.querySelector(".row-img-box");
                const txt = row.querySelector(".row-text-box");

                gsap.from(img, {
                    x: i % 2 === 0 ? -50 : 50,
                    opacity: 0,
                    duration: 1.2,
                    scrollTrigger: {
                        trigger: row,
                        start: "top 80%",
                    }
                });

                gsap.from(txt, {
                    x: i % 2 === 0 ? 50 : -50,
                    opacity: 0,
                    duration: 1.2,
                    scrollTrigger: {
                        trigger: row,
                        start: "top 80%",
                    }
                });
            });

            // 3. General Section Reveals
            [".mission-vision-section", ".why-choose-section", ".values-grid"].forEach(sec => {
                gsap.from(sec, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sec,
                        start: "top 85%",
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className="about-details-wrapper" ref={containerRef}>

            {/* SECTION 1: ALTERNATING ABOUT CONTENT */}
            <section id="about-detail-section">
                <div className="about-page-container">
                    <div className="about-header-group" ref={headerRef}>
                        <span className="about-arabic-top">من نحن — قصة التميز والريادة</span>
                        <h1 className="about-page-title">Engineering <span>Beyond</span> <br />Boundaries</h1>
                    </div>

                    {/* Row 1: Image Left, Content Right */}
                    <div className="about-alternating-row">
                        <div className="row-img-box">
                            <img src="./img/about.jpg" alt="Engineering Excellence" />
                        </div>
                        <div className="row-text-box">
                            <h2>Building the Future of the <span>Kingdom</span></h2>
                            <p>
                                <strong>Aber Al-Khayal General Contracting Company</strong> has established itself as a premier name
                                in Saudi Arabia's construction landscape. With over a decade of dedicated service,
                                we deliver exceptional quality across commercial, residential, and infrastructure sectors.
                            </p>
                            <p>
                                Our multidisciplinary expertise spans <strong>Electrical, Mechanical, and Civil Engineering</strong>,
                                providing complete turnkey solutions that streamline the construction process from site preparation
                                to final commissioning.
                            </p>
                            <p>
                                We prioritize safety and excellence, adhering strictly to the **Saudi Building Code (SBC)** and international standards.
                                By blending technical innovation with local expertise, we deliver high-performance projects that exceed the
                                demands of the Saudi market.
                            </p>
                        </div>
                    </div>

                    {/* Row 2: Content Left, Image Right */}
                    <div className="about-alternating-row reverse">
                        <div className="row-text-box">
                            <h2>Innovation Meets <span>Reliability</span></h2>
                            <p>
                                We combine technical innovation with local market knowledge to deliver projects that not only meet
                                but exceed expectations. Our team of certified professionals ensures strict compliance with
                                <strong> Saudi Building Codes</strong>, utilizing advanced project management methodologies to
                                maintain cost-efficiency and transparency throughout the construction lifecycle.
                            </p>
                            <p>
                                By fostering a culture of <strong>safety and precision</strong>, we contribute to the Kingdom's
                                transformation under Vision 2030, one landmark project at a time. Beyond construction, we are committed
                                to sustainable engineering practices and the development of local talent, ensuring our legacy supports
                                the community we serve.
                            </p>
                            <div className="signature-block">
                                <div className="sig-line"></div>
                                <span className="sig-text">رؤية وطنية بأبعاد عالمية — ٢٠٣٠</span>
                            </div>
                        </div>
                        <div className="row-img-box">
                            <img src="./img/about2.jpg" alt="Industrial Innovation" />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: CORE VALUES */}
            <section className="values-section">
                <div className="about-page-container">
                    <div className="values-grid">
                        <div className="value-item">
                            <span>01</span>
                            <h4>Innovation</h4>
                            <p>Utilizing BIM and modern construction tech to optimize project timelines.</p>
                        </div>
                        <div className="value-item">
                            <span>02</span>
                            <h4>Integrity</h4>
                            <p>Transparent communication and ethical practices in every contract.</p>
                        </div>
                        <div className="value-item">
                            <span>03</span>
                            <h4>Quality</h4>
                            <p>Rigorous QA/QC protocols from foundation to finishing.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: MISSION & VISION */}
            <section className="mission-vision-section">
                <div className="about-page-container">
                    <div className="mv-flex-container">
                        <div className="mv-split-content left">
                            <span className="mv-tag">Our Vision</span>
                            <h3>Setting the Benchmark for <span>Excellence</span></h3>
                            <p>
                                To be the leading force in Saudi Arabia’s transformation, recognized for
                                engineering landmarks that blend cultural heritage with futuristic sustainability.
                                We envision a future where our innovative structural solutions set the global standard
                                for excellence, fostering an environment where technology and tradition coexist.
                            </p>
                        </div>
                        <div className="mv-divider-line"></div>
                        <div className="mv-split-content right">
                            <span className="mv-tag">Our Mission</span>
                            <h3>Engineering <span>Turnkey</span> Solutions</h3>
                            <p>
                                To deliver high-performance infrastructure by integrating multidisciplinary engineering
                                that empowers our clients and the Kingdom’s growing economy. Our mission is rooted
                                in operational excellence, ensuring we provide cost-effective, safe, and innovative
                                turnkey services while nurturing local talent. We are dedicated to building long-term
                                partnerships through transparency, ensuring every project contributes to a sustainable
                                future for the communities we serve.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: WHY CHOOSE US */}
            <section className="why-choose-section">
                <div className="about-page-container">
                    <div className="why-header">
                        <span className="about-arabic-top">لماذا نحن؟</span>
                        <h2 className="section-title">Why Partner with <span>Aber Al-Khayal?</span></h2>
                    </div>
                    <div className="why-grid">
                        <div className="why-card">
                            <div className="why-number">01</div>
                            <h4>Multidisciplinary Expertise</h4>
                            <p>Complete turnkey solutions across Electrical, Mechanical, and Civil Engineering under one roof.</p>
                        </div>
                        <div className="why-card">
                            <div className="why-number">02</div>
                            <h4>Vision 2030 Alignment</h4>
                            <p>Deep understanding of Saudi building codes and local market dynamics integrated with global standards.</p>
                        </div>
                        <div className="why-card">
                            <div className="why-number">03</div>
                            <h4>Uncompromising Safety</h4>
                            <p>A "Safety First" culture that ensures every site meets rigorous international health and safety protocols.</p>
                        </div>
                        <div className="why-card">
                            <div className="why-number">04</div>
                            <h4>Cost-Effective Delivery</h4>
                            <p>We leverage strong local supply chain relationships to maintain competitive pricing.</p>
                        </div>
                        <div className="why-card">
                            <div className="why-number">05</div>
                            <h4>Certified Professionals</h4>
                            <p>Our team consists of highly trained engineers and project managers who are masters of modern standards.</p>
                        </div>
                        <div className="why-card">
                            <div className="why-number">06</div>
                            <h4>Proven Reliability</h4>
                            <p>A solid track record of over 10 years delivering complex projects on time and within budget.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};