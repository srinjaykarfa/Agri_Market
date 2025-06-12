import React from 'react';
import { Link } from 'react-router-dom';

// Agriculture-style logo for footer (matches Navbar)
const AgricultureLogo = ({ size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    className="mr-2"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <circle cx="20" cy="20" r="20" fill="url(#agri-logo-bg)" />
    {/* Leaf */}
    <path
      d="M23 12c-4 2-7 7-7 14 4-2 7-7 7-14z"
      fill="url(#agri-leaf)"
      stroke="#fff"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Sprout */}
    <ellipse
      cx="25.6"
      cy="19.6"
      rx="3"
      ry="6"
      transform="rotate(-20 25.6 19.6)"
      fill="url(#agri-sprout)"
      stroke="#fff"
      strokeWidth="1"
    />
    {/* Soil */}
    <ellipse
      cx="20"
      cy="28"
      rx="8"
      ry="3"
      fill="#b7e59e"
      fillOpacity={0.85}
      stroke="#fff"
      strokeWidth="1"
    />
    <defs>
      <linearGradient id="agri-logo-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a8ff78" />
        <stop offset="1" stopColor="#78ffd6" />
      </linearGradient>
      <linearGradient id="agri-leaf" x1="18" y1="12" x2="23" y2="26" gradientUnits="userSpaceOnUse">
        <stop stopColor="#43e97b" />
        <stop offset="1" stopColor="#38f9d7" />
      </linearGradient>
      <linearGradient id="agri-sprout" x1="22" y1="13" x2="29" y2="26" gradientUnits="userSpaceOnUse">
        <stop stopColor="#b0f2c2" />
        <stop offset="1" stopColor="#62d06d" />
      </linearGradient>
    </defs>
  </svg>
);

const Footer = () => {
  return (
    <footer className="relative z-40 w-full overflow-hidden border-t border-[#b0e043]/40"
      style={{
        background: "linear-gradient(90deg, #68cb7a 0%, #60bb6b 60%, #b0e043 100%)",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        boxShadow: "0 -2px 8px 0 rgba(100,200,100,0.04)",
      }}
      
    >
      <div className="absolute inset-0 h-full w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-[#568727] via-[#60bb6b] to-[#b0e043] opacity-95" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      {/* Overlay blur for matching navbar style */}
      <div className="absolute inset-0 backdrop-blur-sm pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="flex flex-col items-center sm:items-start mb-6 sm:mb-0">
            <div className="flex items-center mb-2">
              <AgricultureLogo size={34} />
              <span
                className="text-2xl font-extrabold font-[Poppins] tracking-wider bg-gradient-to-r from-[#a8ff78] via-[#43e97b] to-[#38f9d7] bg-clip-text text-transparent drop-shadow group-hover:brightness-110 transition"
                style={{
                  WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                padding: 0,
                border: "none",
                }}
              >
                Farmnest
              </span>
            </div>
            <p className="text-sm text-green-50/90 max-w-xs mt-1 text-center sm:text-left" style={{ lineHeight: 1.6 }}>
              A smart agriculture platform integrating nature and technology.
            </p>
          </div>
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white/95">Quick Links</h3>
            <ul className="space-y-2 text-base text-green-50/90">
              <li><Link to="/" className="hover:text-white transition-colors duration-150">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors duration-150">About</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors duration-150">Services</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors duration-150">Contact</Link></li>
            </ul>
          </div>
          {/* Legal links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white/95">Legal</h3>
            <ul className="space-y-2 text-base text-green-50/90">
              <li><Link to="/privacy" className="hover:text-white transition-colors duration-150">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors duration-150">Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-white transition-colors duration-150">Cookie Policy</Link></li>
            </ul>
          </div>
          {/* Social icons */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-3 text-white/95">Connect</h3>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="#" className="text-green-50 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              {/* Twitter */}
              <a href="#" className="text-green-50 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-green-50 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
                  <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
                  <circle cx="18.406" cy="5.594" r="1.44" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-[#b0e043]/30 text-base text-green-50/90 text-center tracking-wide">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Farmnest</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;