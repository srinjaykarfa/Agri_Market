import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../Components/Productcard.jsx";
import HeroSlider from "../Components/HeroSlider.jsx";
import CategoryBar from "../Components/CategoryBar.jsx";
import guava from "../assets/guava.webp";
import sugarcane from "../assets/sugarcane.webp";
import carrot from "../assets/carrot.webp";
import cauliflower from "../assets/cauliflower.webp";
import rice from "../assets/rice.webp";
import onion from "../assets/onion.webp";

const allProducts = [
  {
    title: "Guava",
    description: "Enjoy the crisp texture and subtly sweet flavor of our farm-fresh guavas.",
    price: 100,
    image: guava,
    category: "Fruits",
  },
  {
    title: "Sugarcane",
    description: "Fresh, high-quality sugarcane straight from the farm.",
    price: 200,
    image: sugarcane,
    category: "Grains",
  },
  {
    title: "Carrot",
    description: "A crunchy, sweet root vegetable rich in vitamin A.",
    price: 100,
    image: carrot,
    category: "Vegetables",
  },
  {
    title: "Cauliflower",
    description: "Fresh cauliflower perfect for curries and stir-fry dishes.",
    price: 80,
    image: cauliflower,
    category: "Vegetables",
  },
  {
    title: "Rice",
    description: "Organic white rice straight from the paddy fields.",
    price: 60,
    image: rice,
    category: "Grains",
  },
  {
    title: "Onion",
    description: "Red onions with great flavor, harvested locally.",
    price: 90,
    image: onion,
    category: "Vegetables",
  },
];

const Home = ({ onAddToCart, filters, isBlurred }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 100);
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("search") || "");
    return () => clearTimeout(timeout);
  }, [location.search, location.pathname]);

  const filteredProducts = allProducts
    .filter((product) => {
      const categoryMatch =
        Object.values(filters.categories).every((val) => !val) || filters.categories[product.category];
      const priceMatch =
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const searchMatch =
        !searchQuery ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && priceMatch && searchMatch;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "nameAsc":
          return a.title.localeCompare(b.title);
        case "nameDesc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 transition duration-500">
      {isBlurred && (
        <div className="fixed inset-0 bg-black/30 z-40 pointer-events-none backdrop-blur-sm transition-all duration-500" />
      )}

      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 transition-all duration-300 ${
          isBlurred ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <div className="mb-6">
          <CategoryBar />
        </div>

        <div className="mb-8">
          <HeroSlider />
        </div>

        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-700 transform ${
            animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="inline-block text-4xl sm:text-5xl font-extrabold text-green-800 drop-shadow-lg tracking-tight select-none relative animate-bounce-slow">
            Fresh From the Farm
            <span className="block mx-auto h-1 mt-1 w-1/3 rounded-full bg-gradient-to-r from-green-500 to-green-300 opacity-80 animate-underline" />
          </h1>
          <p className="text-gray-700 mt-2 sm:mt-3 text-base sm:text-lg font-medium animate-fadeIn">
            Get your favorite farm produce delivered{" "}
            <span className="text-green-600 font-semibold animate-gradient">fresh</span> and{" "}
            <span className="text-green-400 font-semibold">fast</span>!
          </p>
          {searchQuery && (
            <p className="text-gray-500 mt-2 text-sm sm:text-base animate-fadeIn">
              Showing results for:{" "}
              <span className="font-bold text-green-700">{searchQuery}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-7">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.title}
                {...product}
                onAddToCart={onAddToCart}
              />
            ))
          ) : (
            <div
              className={`col-span-full text-center py-10 transition-all duration-500 transform ${
                animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <p className="text-gray-600 text-lg sm:text-xl font-semibold flex flex-col items-center gap-2">
                <span>
                  {searchQuery
                    ? `No products found matching "${searchQuery}"`
                    : "No products found matching your filters"}
                </span>
                <span className="text-2xl animate-bounce-slow">🥕🥦🍚🥭🧅</span>
              </p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes underline {
          0% { width: 0; opacity: 0.4;}
          60% { width: 90%; opacity: 1;}
          100% { width: 100%; opacity: 1;}
        }
        .animate-underline {
          animation: underline 1.2s cubic-bezier(.25,.46,.45,.94) both;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-8px);}
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.5s infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0;}
          to { opacity: 1;}
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s both;
        }
        @media (max-width: 480px) {
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default Home;