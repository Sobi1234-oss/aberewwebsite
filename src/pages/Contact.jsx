import React from "react";
import { Contact } from "../components/contact";
import { Footer } from "../components/Footer";

const ContactPage = ({ data }) => (
  <div style={{ paddingTop: '10px' }}>
    <Contact data={data} />
    <Footer/>
  </div>
);
export default ContactPage;