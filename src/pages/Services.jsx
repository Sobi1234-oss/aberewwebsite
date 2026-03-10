import React from "react";
import { ServicesDetails } from "../components/Services_details";
import {Contact} from "../components/contact";
import {Footer} from "../components/Footer";
const ServicesPage = ({ data }) => (
  <div style={{ paddingTop: '50px' }}>
    <ServicesDetails/>
    <Contact/>
    <Footer/>
  </div>
);
export default ServicesPage;