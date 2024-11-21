import React from "react";

const Footer = () => {
  return (
    <footer className="bg-orange-500 py-10 px-8 md:px-16 text-white text-center">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-4">
        {/* logo section */}
        <div className="text-center">
          <div className="text-5xl font-bold mb-2"style={{ fontFamily: "'Island Moments', cursive" }} >InfoLocator</div>
          <h3 className="font-semibold">Connect On</h3>
          <div className="flex space-x-4 justify-center mt-2">
            <a href="#" className="text-xl"><i className="ri-youtube-line"></i></a>
            <a href="#" className="text-xl"><i className="ri-github-fill"></i></a>
            <a href="#" className="text-xl"><i className="ri-instagram-line"></i></a>
          </div>
        </div>

        {/* links section */}
        <div className="text-white text-center">
        <h5 className="footer_link-title text-2xl font-semibold mb-4">Quick Links</h5>
        <div className="font-semibold mb-0 flex flex-col items-center gap-3">
          <p>Home</p>
          <p>About</p>
          <p>Categories</p>
        </div>
        </div>

        {/* links section */}
        <div className="text-white text-center">
        <h5 className="footer_link-title text-2xl font-semibold mb-4">Quick Links</h5>
        <div className="font-semibold mb-0 flex flex-col items-center gap-3">
          <p>FAQ</p>
          <p>Privacy</p>
          <p>Terms</p>
        </div>
        </div>

        {/* contact section */}
        <div className="text-white text-center">
          <h5 className="footer_link-title text-2xl font-semibold mb-4">Contact</h5>
          
          {/* Address Section */}
          <div className="footer_quick-links mb-4">
            <div className="flex items-center gap-3">
              <span><i className="ri-map-pin-line"></i></span>
              <h6 className="font-semibold mb-0">Address:</h6><span><p className="mb-0">Delhi, India</p></span>
            </div>
          </div>

          {/* Email Section */}
          <div className="footer_quick-links mb-4">
            <div className="flex items-center gap-3">
              <span><i className="ri-mail-line"></i></span>
              <h6 className="font-semibold mb-0">Email:</h6><span><p className="mb-0">example@gmail.com</p></span>
            </div>
          </div>

          {/* Phone Section */}
          <div className="footer_quick-links mb-4">
            <div className="flex items-center gap-3">
              <span><i className="ri-phone-fill"></i></span>
              <h6 className="font-semibold mb-0">Phone:</h6><span><p className="mb-0">+91-XXXXXXXXXX</p></span>
            </div>
          </div>
        </div>
      </div>
        
    </footer>
  );
};

export default Footer;
