import React from 'react'
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import CategoriesSection from ".//CategoriesSection";

const HomePage = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <AboutSection />
      <CategoriesSection />
    </div>
  )
}

export default HomePage