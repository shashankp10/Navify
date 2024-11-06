import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-orange-500 flex justify-between items-center p-5">
      <div className="text-3xl font-bold text-white">StockSeeker</div>
      <ul className="hidden md:flex space-x-8 text-white font-semibold">
        <li>Home</li>
        <li>About</li>
        <li>Categories</li>
        <li>Contact Us</li>
      </ul>
      <button className="hidden md:block bg-white text-orange-500 font-bold py-2 px-4 rounded-lg">Login</button>
    </nav>
  );
};

export default Navbar;
