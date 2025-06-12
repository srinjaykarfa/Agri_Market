import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, Search, User, X, ChevronDown, LogOut } from "lucide-react";

// Modern, agriculture-inspired logo (SVG)
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

// ---- Animation Styles ----
const animationCSS = `
@keyframes fadeInDropdown {
  0% { transform: translateY(-14px) scale(0.93); opacity: 0;}
  100% { transform: translateY(0) scale(1); opacity: 1;}
}
@keyframes navBarDropIn {
  0% { transform: translateY(-64px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes scaleSpring {
  0% { transform: scale(0.7); opacity: 0;}
  80% { transform: scale(1.1);}
  100% { transform: scale(1); opacity: 1;}
}
.dropdown-animate {
  animation: fadeInDropdown 0.22s cubic-bezier(.4,1.3,.6,1) forwards;
}
.dropdown-shadow {
  box-shadow: 0 10px 32px 0 rgba(16,30,54,0.11), 0 2px 8px 0 rgba(60,140,60,0.08);
}
.animate-navbar {
  animation: navBarDropIn 0.48s cubic-bezier(.45,1.3,.45,1) forwards;
}
.animate-scale {
  animation: scaleSpring 0.35s cubic-bezier(.4,1.3,.6,1) forwards;
}
`;

const defaultFilters = {
  categories: { Fruits: false, Vegetables: false, Grains: false },
  priceRange: [0, 500],
  sort: "",
};

const Navbar = ({
  toggleSidebar,
  cartCount = 0,
  setFilters,
  setIsBlurred,
  onLogout,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const searchInputRef = useRef(null);
  const userMenuTimeout = useRef(null);
  const navigate = useNavigate();

  // ---- Inject Animation CSS Once ----
  useEffect(() => {
    if (!document.getElementById("navbar-animations")) {
      const style = document.createElement("style");
      style.id = "navbar-animations";
      style.innerHTML = animationCSS;
      document.head.appendChild(style);
    }
    return () => {
      document.getElementById("navbar-animations")?.remove();
    };
  }, []);

  // ---- HOME click handler ----
  const handleHomeClick = (e) => {
    e.preventDefault?.();
    setFilters && setFilters(defaultFilters);
    setSearchQuery("");
    setIsBlurred && setIsBlurred(false);
    navigate("/");
    setMobileMenuOpen(false);
  };

  // ---- Search toggle ----
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    setTimeout(() => searchInputRef.current?.focus(), 150);
  };

  // ---- Search submit ----
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  // ---- Dropdown closes on Escape ----
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  // ---- Dropdown hover with delay for robustness ----
  const handleUserMenuMouseEnter = () => {
    if (userMenuTimeout.current) clearTimeout(userMenuTimeout.current);
    setUserMenuOpen(true);
  };
  const handleUserMenuMouseLeave = () => {
    userMenuTimeout.current = setTimeout(() => setUserMenuOpen(false), 115);
  };

  return (
    <nav className="relative sticky top-0 z-50 h-16 animate-navbar select-none">
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 h-full w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-[#568727] via-[#60bb6b] to-[#b0e043] opacity-95" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      {/* --- CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        {/* --- Left: Logo & Brand (No BG, gradient text) --- */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setMobileMenuOpen((v) => !v);
              toggleSidebar && toggleSidebar();
            }}
            className="p-2 rounded-xl hover:bg-white/10 active:bg-white/25 transition-colors duration-150 focus:outline-none md:hidden"
            aria-label="Open menu"
          >
            <Menu size={25} className="text-white drop-shadow" />
          </button>
          <a
            href="/"
            onClick={handleHomeClick}
            className="flex items-center group px-0"
            style={{ background: "transparent" }}
          >
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
          </a>
        </div>
        {/* --- Center: Searchbar (Desktop Only) --- */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative w-96">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search fresh produce, grains, etc..."
                  className="w-full px-4 py-2 pr-10 rounded-xl border border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition text-gray-800 bg-white/90 font-[Inter] placeholder:text-gray-400"
                  autoFocus={searchOpen}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-lime-600 hover:text-emerald-700 transition drop-shadow"
                  aria-label="Go"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* --- Right: Nav links + icons --- */}
        <div className="flex items-center space-x-3 ml-auto">
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              onClick={handleHomeClick}
              className="text-white font-semibold text-lg hover:text-[#a8ff78] hover:scale-105 transition transform duration-150"
            >
              Home
            </a>
            <Link
              to="/soilmonitoringsystem"
              className="text-white font-semibold text-lg hover:text-[#a8ff78] hover:scale-105 transition transform duration-150"
            >
              Soil Monitoring
            </Link>
          </div>
          {/* --- Search (Mobile Only) --- */}
          <div className="md:hidden relative">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-lg hover:bg-white/10 active:bg-white/25 transition"
              aria-label="Search"
            >
              {searchOpen ? (
                <X size={22} className="text-white" />
              ) : (
                <Search size={22} className="text-white" />
              )}
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg ring-1 ring-lime-200 dropdown-animate dropdown-shadow z-20">
                <form onSubmit={handleSearch} className="p-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-400 font-[Inter]"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-lime-600 hover:text-emerald-700"
                      aria-label="Go"
                    >
                      <Search size={18} />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          {/* --- Cart --- */}
          <Link
            to="/cart"
            className="relative p-2 rounded-lg hover:bg-white/10 active:bg-white/25 transition"
            aria-label="Cart"
          >
            <ShoppingCart size={22} className="text-white drop-shadow" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold shadow animate-scale border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>
          {/* --- User Dropdown: hover + click + delay fix --- */}
          <div
            className="relative"
            onMouseEnter={handleUserMenuMouseEnter}
            onMouseLeave={handleUserMenuMouseLeave}
            style={{ cursor: "pointer" }}
          >
            <button
              className="relative flex items-center p-2 rounded-lg user-menu-btn focus:outline-none hover:bg-white/10 active:bg-white/25 transition"
              aria-label="User Menu"
              type="button"
              tabIndex={0}
            >
              <User size={22} className="text-white" />
              <ChevronDown size={18} className="ml-1 text-white" />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl dropdown-animate dropdown-shadow py-2 z-30 shadow-lg border border-gray-100"
                style={{
                  minWidth: "11rem",
                  boxShadow:
                    "0 10px 32px 0 rgba(16,30,54,0.12), 0 2px 8px 0 rgba(60,140,60,0.07)",
                }}
              >
                <Link
                  to="/login"
                  className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-[#a8ff78]/40 hover:text-lime-800 transition-all duration-150 rounded"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-[#a8ff78]/40 hover:text-lime-800 transition-all duration-150 rounded"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/profile"
                  className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-[#a8ff78]/40 hover:text-lime-800 transition-all duration-150 rounded"
                  onClick={() => setUserMenuOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  className="flex items-center w-full px-4 py-2 text-base text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-150 rounded mt-1"
                  style={{ display: onLogout ? undefined : "none" }}
                  onClick={() => {
                    setUserMenuOpen(false);
                    onLogout && onLogout();
                  }}
                >
                  <LogOut size={18} className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* --- Mobile Menu --- */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-30 dropdown-animate border-t border-lime-200 rounded-b-xl">
          <div className="px-4 py-3 space-y-2">
            <a
              href="/"
              onClick={handleHomeClick}
              className="block py-2 text-lg text-gray-700 font-semibold hover:text-[#a8ff78] hover:bg-[#a8ff78]/10 rounded transition"
            >
              Home
            </a>
            <Link
              to="/soilmonitoringsystem"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-lg text-gray-700 font-semibold hover:text-[#a8ff78] hover:bg-[#a8ff78]/10 rounded transition"
            >
              Soil Monitoring
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;