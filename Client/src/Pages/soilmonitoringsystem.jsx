import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plus, Edit2, Trash2, Leaf } from 'lucide-react';

const SoilMonitoringSystem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [address, setAddress] = useState(location.state?.address || null);

  // Dummy soil data and crops
  const soilData = {
    moisture: 65,
    temperature: 28,
    ph: 6.8,
    nutrients: {
      nitrogen: 'Medium',
      phosphorus: 'High',
      potassium: 'Low'
    }
  };

  const recommendedCrops = [
    { name: 'Rice', suitability: 'High', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=400&q=80' },
    { name: 'Wheat', suitability: 'Medium', image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' },
    { name: 'Maize', suitability: 'High', image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&q=80' }
  ];

  const handleEdit = () => {
    navigate('/add-address', { state: { address } });
  };

  const handleDelete = () => {
    setAddress(null);
  };

  const handleGetRecommendation = () => {
    navigate('/recommendations', {
      state: { address, soilData, recommendedCrops }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-green-100 py-10 px-4">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <div className="flex items-center justify-between mb-10">
          <motion.h1
            className="text-4xl font-extrabold text-green-800 drop-shadow-xl tracking-tight"
            initial={{ scale: 0.95, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Soil Monitoring System
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 4px 16px rgba(34,197,94,0.12)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/add-address')}
            className="flex items-center gap-2 bg-gradient-to-tr from-green-500 via-green-600 to-lime-500 hover:from-green-600 hover:to-green-700 text-white px-5 py-3 rounded-xl transition-all font-semibold shadow-lg"
          >
            <Plus size={22} />
            <span>Add Address</span>
          </motion.button>
        </div>
        {/* Styled Farm Location Card */}
        <AnimatePresence>
        {address && (
          <motion.div
            className="bg-gradient-to-br from-green-50 via-white to-lime-50 rounded-2xl shadow-xl p-6 mb-7 border-2 border-green-200/80 max-w-lg mx-auto relative overflow-hidden"
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45 }}
            layout
          >
            {/* Decorative badge or icon */}
            <div className="absolute -top-3 -left-3 bg-green-600 rounded-full p-2 shadow-lg">
              <MapPin className="w-6 h-6 text-white drop-shadow-sm" />
            </div>
            <div className="pl-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-green-700 tracking-wide">Farm Location</span>
              </div>
              <div className="text-sm text-gray-700 mb-2 font-medium">
                {address.addressLine1}
                {address.addressLine2 && <>, {address.addressLine2}</>}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 mb-4 text-xs">
                <span className="bg-green-100 px-2 py-1 rounded font-medium text-green-700">
                  City: <span className="font-bold">{address.city}</span>
                </span>
                <span className="bg-green-100 px-2 py-1 rounded font-medium text-green-700">
                  State: <span className="font-bold">{address.state}</span>
                </span>
                <span className="bg-green-100 px-2 py-1 rounded font-medium text-green-700">
                  PIN: <span className="font-bold">{address.pincode}</span>
                </span>
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-1 text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1.5 rounded-lg font-semibold shadow transition"
                >
                  <span className="bg-yellow-300/70 rounded-full p-1 mr-1"><Edit2 size={13} /></span> Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1 text-xs bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1.5 rounded-lg font-semibold shadow transition"
                >
                  <span className="bg-red-300/70 rounded-full p-1 mr-1"><Trash2 size={13} /></span> Delete
                </button>
                <button
                  onClick={handleGetRecommendation}
                  className="flex items-center gap-1 text-xs bg-gradient-to-tr from-green-500 to-lime-500 hover:from-green-600 hover:to-green-600 text-white px-3 py-1.5 rounded-lg font-semibold shadow-lg transition"
                >
                  <span className="bg-white/20 rounded-full p-1 mr-1"><Leaf size={13} /></span> Get Recommended Crops
                </button>
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SoilMonitoringSystem;