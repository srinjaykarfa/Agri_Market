import React, { useState } from 'react';
import { ShoppingCart, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.04, boxShadow: "0 4px 32px 0 rgba(60,120,40,0.14)" }
};

const ProductCard = ({ image, title, description, price, onAddToCart }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      className="group relative bg-white rounded-2xl border border-gray-100 shadow hover:shadow-lg transition-all flex flex-col w-full max-w-[220px] mx-auto overflow-hidden"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onMouseLeave={() => setShowDetails(false)}
      style={{ minHeight: 250, cursor: 'pointer' }}
    >
      <div className="relative w-full h-36 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
        />
        {price < 100 && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded font-semibold shadow">Deal</span>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between p-4">
        <div>
          <h2 className="text-base font-bold text-gray-800 truncate">{title}</h2>
          <p className="text-green-700 font-bold text-base">{`\u20b9${price}`}</p>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => setShowDetails(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 transition"
          >
            <Info size={14} /> Details
          </button>
          <motion.button
            onClick={() => onAddToCart && onAddToCart({ image, title, description, price })}
            whileTap={{ scale: 1.1 }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border border-green-600 text-white bg-green-600 hover:bg-green-700 transition"
          >
            <ShoppingCart size={14} /> Add
          </motion.button>
        </div>
      </div>
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          className="absolute inset-0 bg-white/95 p-5 flex flex-col justify-center z-20 rounded-2xl shadow-2xl"
        >
          <h3 className="text-xl font-bold text-green-700 mb-2">{title}</h3>
          <p className="text-gray-700 text-sm mb-4">{description}</p>
          <button
            onClick={() => setShowDetails(false)}
            className="self-end text-sm text-blue-600 hover:underline font-medium"
          >Close</button>
        </motion.div>
      )}
    </motion.div>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func
};

export default ProductCard;