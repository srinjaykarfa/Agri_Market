import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, Search, User, X, ChevronDown } from "lucide-react";

const defaultFilters = {
  categories: { Fruits: false, Vegetables: false, Grains: false },
  priceRange: [0, 500],
  sort: "",
};

const Navbar = ({
  toggleSidebar,
  cartCount = 0,
  filters,
  setFilters,
  setIsBlurred,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const searchRef = useRef(null);
  const userMenuTimeout = useRef(null);
  const navigate = useNavigate();

  // Animation CSS injection
  useEffect(() => {
    if (document.getElementById('dropdown-animate-style')) return;
    const style = document.createElement("style");
    style.id = 'dropdown-animate-style';
    style.innerHTML = `
      @keyframes fadeInDropdown {
        0% { transform: translateY(-12px) scale(0.95); opacity: 0;}
        100% { transform: translateY(0) scale(1); opacity: 1;}
      }
      .dropdown-animate {
        animation: fadeInDropdown 0.22s cubic-bezier(.4,1.3,.6,1) forwards;
      }
      .dropdown-shadow {
        box-shadow: 0 10px 32px 0 rgba(16,30,54,0.09), 0 2px 4px 0 rgba(0,0,0,0.04);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.getElementById('dropdown-animate-style')?.remove();
    };
  }, []);

  // HOME click handler
  const handleHomeClick = (e) => {
    e.preventDefault();
    setFilters && setFilters(defaultFilters);
    setSearchQuery("");
    setIsBlurred && setIsBlurred(false);
    navigate("/");
  };

  // Search toggle
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    if (!searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 120);
    }
  };

  // Search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  // Dropdown closes on Escape
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

  // --- Dropdown hover with delay for robustness ---
  const handleUserMenuMouseEnter = () => {
    if (userMenuTimeout.current) clearTimeout(userMenuTimeout.current);
    setUserMenuOpen(true);
  };
  const handleUserMenuMouseLeave = () => {
    userMenuTimeout.current = setTimeout(() => setUserMenuOpen(false), 100);
  };

  return (
    <nav className="relative sticky top-0 z-50 h-16 shadow-md">
      {/* BG */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 to-lime-500 opacity-85" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        {/* Left: Brand & Sidebar */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              setMobileMenuOpen((v) => !v);
              toggleSidebar && toggleSidebar();
            }}
            className="p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors md:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} className="text-white" />
          </button>
          <a
            href="/"
            onClick={handleHomeClick}
            className="flex items-center space-x-2 group"
          >
            <span className="text-xl md:text-2xl font-bold text-white group-hover:text-white/90 transition">
              Farmnest
            </span>
          </a>
        </div>

        {/* Center: Searchbar (Desktop Only) */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative w-96" ref={searchRef}>
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  autoFocus={searchOpen}
                  style={{
                    background: "rgba(255,255,255,0.98)",
                    boxShadow: "0 2px 8px 0 rgba(16,30,54,0.04)",
                  }}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
                  aria-label="Go"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Nav links + icons */}
        <div className="flex items-center space-x-4 ml-auto">
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              onClick={handleHomeClick}
              className="text-white font-medium hover:text-white/90 transition"
            >
              Home
            </a>
            <Link
              to="/soilmonitoringsystem"
              className="text-white font-medium hover:text-white/90 transition"
            >
              Soil Monitoring
            </Link>
          </div>
          {/* Search (Mobile Only) */}
          <div className="md:hidden relative" ref={searchRef}>
            <button
              onClick={toggleSearch}
              className="p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition"
              aria-label="Search"
            >
              {searchOpen ? (
                <X size={20} className="text-white" />
              ) : (
                <Search size={20} className="text-white" />
              )}
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg ring-1 ring-black/5 dropdown-animate dropdown-shadow">
                <form onSubmit={handleSearch} className="p-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
                      aria-label="Go"
                    >
                      <Search size={18} />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition"
            aria-label="Cart"
          >
            <ShoppingCart size={20} className="text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold shadow animate-scale">
                {cartCount}
              </span>
            )}
          </Link>
          {/* User Dropdown with hover and delay fix */}
          <div
            className="relative"
            onMouseEnter={handleUserMenuMouseEnter}
            onMouseLeave={handleUserMenuMouseLeave}
            style={{ cursor: "pointer" }}
          >
            <button
              className="relative flex items-center p-2 rounded-lg user-menu-btn focus:outline-none hover:bg-white/10 active:bg-white/20 transition"
              aria-label="User Menu"
              type="button"
              tabIndex={0}
            >
              <User size={20} className="text-white" />
              <ChevronDown size={18} className="ml-1 text-white" />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg dropdown-animate dropdown-shadow py-2 z-30"
                style={{
                  minWidth: "10rem",
                  boxShadow:
                    "0 10px 32px 0 rgba(16,30,54,0.09), 0 2px 4px 0 rgba(0,0,0,0.04)",
                }}
              >
                <Link
                  to="/login"
                  className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-green-100 transition-all duration-150"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-green-100 transition-all duration-150"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/profile"
                  className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-green-100 transition-all duration-150"
                  onClick={() => setUserMenuOpen(false)}
                >
                  My Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-20 dropdown-animate">
          <div className="px-4 py-3 space-y-2">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleHomeClick(e);
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-gray-700 font-medium hover:text-green-600"
            >
              Home
            </a>
            <Link
              to="/soilmonitoringsystem"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 font-medium hover:text-green-600"
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