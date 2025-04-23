import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, Filter, Search, User, X } from "lucide-react";
import { Slider } from "@mui/material";

const defaultFilters = {
  categories: { Fruits: false, Vegetables: false, Grains: false },
  priceRange: [0, 500],
  sort: "",
};

const Navbar = ({ toggleSidebar, cartCount, filters, setFilters, setIsBlurred }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    setFilters(defaultFilters);
    setSearchQuery("");
    setFilterOpen(false);
    setIsBlurred(false);
    navigate("/");
  };

  const toggleFilter = () => {
    setTempFilters(filters);
    const newOpenState = !filterOpen;
    setFilterOpen(newOpenState);
    setIsBlurred(newOpenState);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Here you can implement the search functionality
      console.log("Searching for:", searchQuery);
      // For now, just navigate to home with search query
      navigate(`/?search=${searchQuery}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilterOpen(false);
        setIsBlurred(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target) && searchOpen) {
        setSearchOpen(false);
      }
    };
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setFilterOpen(false);
        setIsBlurred(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [searchOpen]);

  const resetFilters = () => {
    setFilters(defaultFilters);
    navigate("/");
  };

  const handleCategoryChange = (category) => {
    setTempFilters((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category],
      },
    }));
  };

  const handleRangeChange = (e, newValue) => {
    setTempFilters((prev) => ({ ...prev, priceRange: newValue }));
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setFilterOpen(false);
    setIsBlurred(false);
  };

  const resetTempFilters = () => {
    setTempFilters(defaultFilters);
  };

  return (
    <nav className="relative sticky top-0 z-50 shadow-md h-16">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 to-lime-500 opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                toggleSidebar();
              }} 
              className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 md:hidden"
            >
              <Menu size={24} className="text-white" />
            </button>
            <a href="/" onClick={handleHomeClick} className="flex items-center space-x-2 group">
              <span className="text-xl md:text-2xl font-bold text-white group-hover:text-white/90 transition-colors duration-200">
                Farmnest
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" onClick={handleHomeClick} className="text-white hover:text-white/90 transition-colors duration-200 font-medium">
              Home
            </a>
            <Link to="/soilmonitoringsystem" className="text-white hover:text-white/90 transition-colors duration-200 font-medium">
              Soil Monitoring
            </Link>
            <button onClick={toggleFilter} className="flex items-center space-x-1 text-white hover:text-white/90 transition-colors duration-200">
              <Filter size={18} />
              <span className="font-medium">Filters</span>
            </button>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Button and Input */}
            <div className="relative" ref={searchRef}>
              <button 
                onClick={toggleSearch}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                {searchOpen ? (
                  <X size={20} className="text-white" />
                ) : (
                  <Search size={20} className="text-white" />
                )}
              </button>
              
              {/* Search Input */}
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg animate-slide-down">
                  <form onSubmit={handleSearch} className="p-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[var(--primary-color)]"
                      >
                        <Search size={18} />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-white/10 transition-colors duration-200">
              <ShoppingCart size={20} className="text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-scale">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/login" className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200">
              <User size={20} className="text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg animate-slide-down">
          <div className="px-4 py-2 space-y-2">
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                handleHomeClick(e);
                setMobileMenuOpen(false);
              }} 
              className="block py-2 text-gray-700 hover:text-[var(--primary-color)]"
            >
              Home
            </a>
            <Link 
              to="/soilmonitoringsystem" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-[var(--primary-color)]"
            >
              Soil Monitoring
            </Link>
            <button 
              onClick={() => {
                toggleFilter();
                setMobileMenuOpen(false);
              }} 
              className="flex items-center space-x-1 py-2 text-gray-700 hover:text-[var(--primary-color)] w-full"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter Dropdown */}
      {filterOpen && (
        <div ref={dropdownRef} className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg animate-slide-down">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[var(--primary-color)] mb-3">Categories</h3>
                <div className="space-y-2">
                  {Object.keys(tempFilters.categories).map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={tempFilters.categories[category]}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-[var(--primary-color)] focus:ring-[var(--primary-color)] border-gray-300 rounded"
                      />
                      <span className="text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--primary-color)] mb-3">Price Range</h3>
                <div className="px-4">
                  <Slider
                    value={tempFilters.priceRange}
                    onChange={handleRangeChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={500}
                    className="text-[var(--primary-color)]"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>₹{tempFilters.priceRange[0]}</span>
                    <span>₹{tempFilters.priceRange[1]}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-end space-y-2">
                <button
                  onClick={applyFilters}
                  className="btn-primary w-full"
                >
                  Apply Filters
                </button>
                <button
                  onClick={resetTempFilters}
                  className="btn-secondary w-full"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
