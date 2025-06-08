import React, { useState } from 'react';
import { ShoppingCart, Info } from 'lucide-react';

const ProductCard = ({ image, title, description, price, onAddToCart }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    if (onAddToCart) onAddToCart({ image, title, description, price });
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-[0_2px_16px_0_rgba(60,120,40,0.07)] hover:shadow-[0_4px_32px_0_rgba(60,120,40,0.12)] hover:-translate-y-1 transition-all duration-200 flex flex-col w-full max-w-[220px] mx-auto overflow-hidden"
      onMouseLeave={() => setShowDetails(false)}
      style={{ minHeight: 250, cursor: 'pointer' }}
    >
      <div className="relative w-full h-36 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
          style={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
        />
        {price < 100 && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-[11px] px-2 py-0.5 rounded font-semibold shadow">Deal</span>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between p-4">
        <div>
          <h2 className="text-base font-bold text-gray-800 truncate">{title}</h2>
          <p className="text-green-700 font-bold text-base">{`₹${price}`}</p>
        </div>
        {/* BUTTONS: Remove flex-grow/mt-auto here, just a small margin-top */}
        <div className="flex items-center gap-2 mt-3">
          <button 
            onClick={() => setShowDetails(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 transition"
          >
            <Info size={14} /> Details
          </button>
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border border-green-600 text-white
              bg-green-600 hover:bg-green-700 transition ${isClicked ? 'scale-105' : ''}`}
          >
            <ShoppingCart size={14} /> Add
          </button>
        </div>
      </div>
      {showDetails && (
        <div className="absolute inset-0 bg-white/95 p-5 flex flex-col justify-center z-20 rounded-2xl shadow-2xl">
          <h3 className="text-xl font-bold text-green-700 mb-2">{title}</h3>
          <p className="text-gray-700 text-sm mb-4">{description}</p>
          <button
            onClick={() => setShowDetails(false)}
            className="self-end text-sm text-blue-600 hover:underline font-medium"
          >Close</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;