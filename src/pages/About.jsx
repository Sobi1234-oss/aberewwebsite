import React from "react";
import { About } from "../../src/components/about";
import { AboutDetails } from "../components/AboutDetails";
import { Footer } from "../components/Footer";

const AboutPage = ({ data }) => (
  <div className="section-padding" style={{ paddingTop: '50px' }}>
    <AboutDetails />
    <Footer/>
  </div>
);
export default AboutPage;