import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const nav_links = [
  { path: "/", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/categories", display: "Categories" },
  { path: "/contact", display: "Contact Us" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle the mobile menu open/close
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close the mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className=" z-20 bg-orange-500 flex justify-between items-center p-5 relative ">
      <div
        className="text-5xl font-bold text-white"
        style={{ fontFamily: "'Island Moments', cursive" }}
      >
        {" "}
        <a href="/">InfoLocator </a>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8 text-white font-semibold gap-10">
        {nav_links.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "text-yellow-300" : "")}
            >
              {item.display}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button) */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Drawer (Menu) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 w-full pt-20 flex flex-col justify-center items-center lg:hidden  "
          onClick={closeMobileMenu} // Close the drawer when clicking outside
        >
          <div
            className="backdrop-blur-lg p-6 w-full h-full relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the drawer
          >
            <ul className="space-y-6 text-white text-xl">
              {nav_links.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      isActive ? "text-yellow-300" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
