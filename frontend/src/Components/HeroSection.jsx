import React from "react";
import img1 from "../Img/Homebg.jpg"

const HeroSection = () => {
  return (
    <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url(${img1})`}}>
      <div className="absolute inset-0 bg-gray-400 opacity-50"></div>
      <div className="relative z-8 text-center flex flex-col items-center justify-center h-full text-black">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Everything you need, all in one place.</h1>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg">Get Started →</button>
      </div>
      
    </div>
  );
};

export default HeroSection;
