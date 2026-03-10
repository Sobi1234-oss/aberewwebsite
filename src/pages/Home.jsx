import React, { useLayoutEffect } from "react"; // Use useLayoutEffect for GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "../components/header";
import { About } from "../components/about";
import { Expertise } from "../components/Expertise";
import { TrackRecords } from "../components/TrackRecords";
import { Services } from "../components/services";
import { Clients } from "../components/Clients";
import { MissionVision } from "../components/MissionVision";
import { Testimonials } from "../components/testimonials";
import { Contact } from "../components/contact";
import { Footer } from "../components/Footer";
import { WhyUs } from "../components/WhyUs";

const Home = ({ data }) => {
  
  useLayoutEffect(() => {
    // This kills all active ScrollTriggers when switching pages
    // Prevents the "removeChild" error caused by pinned elements
    return () => {
      let allTriggers = ScrollTrigger.getAll();
      allTriggers.forEach(trigger => trigger.kill(true));
    };
  }, []);

  if (!data || Object.keys(data).length === 0) return null;

  return (
    // Wrapper div helps React maintain a stable root node
    <div className="home-page-wrapper">
      <Header data={data.Header} />
      <About data={data.About} /> 
      <Expertise/>
      <TrackRecords/>
      <Services/>
      <Clients/>
      <MissionVision/>
      <WhyUs/>
      <Testimonials data={data.Testimonials} />
      <Contact data={data.Contact} />
      <Footer/>
    </div>
  );
};

export default Home;