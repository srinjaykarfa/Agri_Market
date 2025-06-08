import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../Components/productcard.jsx';
import guava from '../assets/guava.webp';
import sugarcane from '../assets/sugarcane.webp';
import carrot from '../assets/carrot.webp';
import cauliflower from '../assets/cauliflower.webp';
import rice from '../assets/rice.webp';
import onion from '../assets/onion.webp';

const allProducts = [
  {
    title: 'Guava',
    description: 'Enjoy the crisp texture and subtly sweet flavor of our farm-fresh guavas.',
    price: 100,
    image: guava,
    category: 'Fruits',
  },
  {
    title: 'Sugarcane',
    description: 'Fresh, high-quality sugarcane straight from the farm.',
    price: 200,
    image: sugarcane,
    category: 'Grains',
  },
  {
    title: 'Carrot',
    description: 'A crunchy, sweet root vegetable rich in vitamin A.',
    price: 100,
    image: carrot,
    category: 'Vegetables',
  },
  {
    title: 'Cauliflower',
    description: 'Fresh cauliflower perfect for curries and stir-fry dishes.',
    price: 80,
    image: cauliflower,
    category: 'Vegetables',
  },
  {
    title: 'Rice',
    description: 'Organic white rice straight from the paddy fields.',
    price: 60,
    image: rice,
    category: 'Grains',
  },
  {
    title: 'Onion',
    description: 'Red onions with great flavor, harvested locally.',
    price: 90,
    image: onion,
    category: 'Vegetables',
  },
];

const Home = ({ onAddToCart, filters, isBlurred }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts or route changes
    setAnimate(false);
    setTimeout(() => setAnimate(true), 100);

    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    setSearchQuery(search || '');
  }, [location.search, location.pathname]);

  const filteredProducts = allProducts
    .filter((product) => {
      const categoryMatch =
        Object.values(filters.categories).every((val) => !val) ||
        filters.categories[product.category];
      const priceMatch =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      const searchMatch = !searchQuery || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && priceMatch && searchMatch;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case 'priceAsc':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        case 'nameAsc':
          return a.title.localeCompare(b.title);
        case 'nameDesc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  return (
    <div className="relative">
      {isBlurred && (
        <div className="fixed inset-0 bg-black opacity-30 z-40 pointer-events-none" />
      )}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 transition duration-300 ${
          isBlurred ? 'blur-sm pointer-events-none select-none' : ''
        }`}
      >
        {/* Hero */}
        <div className={`text-center mb-6 sm:mb-10 transition-all duration-500 transform ${
          animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <h1 className="text-3xl sm:text-4xl font-bold text-green-700">Fresh From the Farm</h1>
          <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base">
            Get your favorite farm produce delivered fresh and fast!
          </p>
          {searchQuery && (
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Showing results for: <span className="font-semibold">{searchQuery}</span>
            </p>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-7">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div
                key={index}
                className={`transition-all duration-500 transform ${
                  animate 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProductCard {...product} onAddToCart={onAddToCart} />
              </div>
            ))
          ) : (
            <div className={`col-span-full text-center py-6 sm:py-10 transition-all duration-500 transform ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <p className="text-gray-600 text-base sm:text-lg">
                {searchQuery
                  ? `No products found matching "${searchQuery}"`
                  : 'No products found matching your filters'}
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        
      </div>
    </div>
  );
};

export default Home;
