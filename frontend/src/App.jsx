import './App.css'
import React from "react";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import AboutSection from "./Components/AboutSection";
import CategoriesSection from "./Components/CategoriesSection";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CategoriesSection />
      <Footer />
    </div>
  );
}

export default App;
