import React, { useState } from 'react';
import { ShoppingCart, Info } from 'lucide-react';

const ProductCard = ({ image, title, description, price, onAddToCart }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);

    if (onAddToCart) {
      onAddToCart({ image, title, description, price });
    }
  };

  return (
    <div 
      className="bg-white/90 backdrop-blur-md rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] hover:shadow-lg transition duration-300 flex flex-col relative w-full max-w-sm mx-auto"
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-40 sm:h-48 object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-green-700 line-clamp-1">{title}</h2>
          <p className="text-green-800 font-bold mt-1 sm:mt-2">₹{price}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
          <button 
            onClick={() => setShowDetails(true)}
            className="flex items-center gap-1 sm:gap-2 bg-blue-100 text-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-blue-200 transition text-sm sm:text-base"
          >
            <Info size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">Details</span>
          </button>
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1 sm:gap-2 bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-transform duration-200 hover:bg-green-700 text-sm sm:text-base ${
              isClicked ? 'scale-110' : ''
            }`}
          >
            <ShoppingCart size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Details Overlay */}
      <div 
        className={`absolute inset-0 bg-white/95 backdrop-blur-sm p-3 sm:p-4 transition-all duration-300 ease-in-out ${
          showDetails 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <img
              src={image}
              alt={title}
              className={`w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg transition-transform duration-300 ${
                showDetails ? 'scale-100' : 'scale-95'
              }`}
            />
            <div className={`transition-all duration-300 delay-100 ${
              showDetails ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}>
              <h3 className="text-lg sm:text-xl font-semibold text-green-700 line-clamp-1">{title}</h3>
              <p className="text-green-800 font-bold mt-1">₹{price}</p>
            </div>
          </div>
          <div className={`mt-3 sm:mt-4 flex-grow transition-all duration-300 delay-200 ${
            showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h4 className="font-semibold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Description</h4>
            <p className="text-gray-600 text-sm sm:text-base line-clamp-4 sm:line-clamp-none">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
