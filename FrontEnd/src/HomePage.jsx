import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import CallToAction from "./CallToAction";

function HomePage() {
  return (
    <>
      {/* 🧭 Navbar */}
      <Navbar />

    

      {/* ✅ Rest of your homepage sections */}
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </>
  );
}

export default HomePage;
