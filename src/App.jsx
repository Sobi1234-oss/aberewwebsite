import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/navigation";
import JsonData from "./data/data.json";

// Import Page Components
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import ClientsPage from "./pages/OurClients";
import ContactPage from "./pages/Contact";

import "./App.css";

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router basename="/mywebsite">
      <Navigation />
      <div className="page-content-wrapper">
        <Routes >
          <Route path="/" element={<Home data={landingPageData} />} />
          <Route path="/about" element={<AboutPage data={landingPageData.About} />} />
          <Route path="/services" element={<ServicesPage data={landingPageData.Services} />} />
          <Route path="/clients" element={<ClientsPage data={landingPageData.Testimonials} />} />
          <Route path="/contact" element={<ContactPage data={landingPageData.Contact} />} />
        </Routes>
      </div>
      {/* Global Footer */}
     
    </Router>
  );
};

export default App;