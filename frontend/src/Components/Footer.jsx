import React from "react";

const Footer = () => {
  return (
    <footer className="bg-orange-500 py-10 px-8 text-white text-center">
      <div className="text-2xl font-bold mb-5">StockSeeker</div>
      <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0">
        <div>
          <p>Home</p>
          <p>About</p>
          <p>Categories</p>
        </div>
        <div>
          <h3 className="font-semibold">Contact Us</h3>
          <div className="flex space-x-4 justify-center mt-2">
            <a href="#" className="text-xl">📧</a>
            <a href="#" className="text-xl">📸</a>
            <a href="#" className="text-xl">✖️</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
