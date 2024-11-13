// src/App.jsx

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import AboutSection from './Components/AboutSection';
import CategoriesSection from './Components/CategoriesSection';
import ContactSection from './Components/ContactSection';
import Footer from './Components/Footer';
import PromptBox from './navify/PromptBox';

function App() {
  

  return (
    <Router>
      <div className="bg-white">
        {/* Navbar */}
        <Navbar />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/categories" element={<CategoriesSection />} />
          <Route path="/contact" element={<ContactSection />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>

      <PromptBox />

      </Router>
  );
}

export default App;
