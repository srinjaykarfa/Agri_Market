import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, Filter, Search, User, X } from "lucide-react";
import { Slider } from "@mui/material";

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
    setSearchOpen((prev) => !prev);
    if (!searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 120);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setFilterOpen(false);
        setIsBlurred(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        searchOpen
      ) {
        setSearchOpen(false);
      }
    };
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setFilterOpen(false);
        setIsBlurred(false);
        setSearchOpen(false);
        setMobileMenuOpen(false);
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

  const handleRangeChange = (_, newValue) => {
    setTempFilters((prev) => ({ ...prev, priceRange: newValue }));
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setFilterOpen(false);
    setIsBlurred(false);
  };

  const resetTempFilters = () => setTempFilters(defaultFilters);

  return (
    <nav className="relative sticky top-0 z-50 h-16 shadow-md">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 to-lime-500 opacity-85" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Brand & Sidebar */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setMobileMenuOpen((v) => !v);
                toggleSidebar();
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

          {/* Desktop Nav */}
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
            <button
              onClick={toggleFilter}
              className="flex items-center space-x-1 text-white font-medium hover:text-white/90 transition"
              aria-label="Open filters"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>

          {/* Right: Search, Cart, User */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
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
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg animate-slide-down ring-1 ring-black/5">
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
            {/* User */}
            <Link
              to="/login"
              className="p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition"
              aria-label="User"
            >
              <User size={20} className="text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg animate-slide-down z-20">
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
            <button
              onClick={() => {
                toggleFilter();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 py-2 text-gray-700 font-medium hover:text-green-600 w-full"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter Dropdown (horizontal layout) */}
      {filterOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg animate-slide-down z-30 border-t border-gray-200"
        >
          <div className="w-full px-6 py-8 flex flex-col lg:flex-row lg:items-end lg:justify-center gap-8">
            {/* Categories */}
            <div className="w-full max-w-xs">
              <h3 className="text-base font-semibold text-green-700 mb-2">
                Categories
              </h3>
              <div className="space-y-1">
                {Object.keys(tempFilters.categories).map((category) => (
                  <label
                    key={category}
                    className="flex items-center space-x-2 cursor-pointer select-none text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={tempFilters.categories[category]}
                      onChange={() => handleCategoryChange(category)}
                      className="h-4 w-4 accent-green-600 border-gray-300 rounded transition"
                    />
                    <span className="text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Price Range */}
            <div className="w-full max-w-md">
              <h3 className="text-base font-semibold text-green-700 mb-2">
                Price Range
              </h3>
              <Slider
                value={tempFilters.priceRange}
                onChange={handleRangeChange}
                valueLabelDisplay="auto"
                min={0}
                max={500}
                sx={{
                  color: "#16a34a",
                  height: 3,
                  '& .MuiSlider-thumb': {
                    borderRadius: '50%',
                    width: 16,
                    height: 16,
                    backgroundColor: '#16a34a',
                  }
                }}
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1 font-medium px-1">
                <span>₹{tempFilters.priceRange[0]}</span>
                <span>₹{tempFilters.priceRange[1]}</span>
              </div>
            </div>
            {/* Actions */}
            <div className="w-full max-w-xs flex flex-col gap-2 items-stretch">
              <button
                onClick={applyFilters}
                className="rounded bg-green-600 text-white px-4 py-2 font-semibold shadow hover:bg-green-700 transition text-sm"
              >
                Apply Filters
              </button>
              <button
                onClick={resetTempFilters}
                className="rounded border border-green-600 text-green-700 px-4 py-2 font-semibold hover:bg-green-50 transition text-sm"
                type="button"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;