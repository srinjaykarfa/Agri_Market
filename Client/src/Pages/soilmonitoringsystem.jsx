import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Droplet, 
  Thermometer, 
  Sun, 
  Leaf, 
  Plus, 
  Edit2,
  ChevronRight,
  Info,
  AlertCircle
} from 'lucide-react';

const SoilMonitoringSystem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state?.address;
  const [soilData, setSoilData] = useState({
    moisture: 65,
    temperature: 28,
    ph: 6.8,
    nutrients: {
      nitrogen: 'Medium',
      phosphorus: 'High',
      potassium: 'Low'
    }
  });

  const [recommendedCrops, setRecommendedCrops] = useState([
    { name: 'Rice', suitability: 'High', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449' },
    { name: 'Wheat', suitability: 'Medium', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449' },
    { name: 'Maize', suitability: 'High', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449' }
  ]);

  const getSuitabilityColor = (suitability) => {
    switch (suitability.toLowerCase()) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-green-800">Soil Monitoring System</h1>
          {!address ? (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/add-address')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              <span>Add Address</span>
            </motion.button>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/add-address')}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-green-600 px-4 py-2 rounded-lg border border-green-200 transition-colors"
            >
              <Edit2 size={20} />
              <span>Edit Address</span>
            </motion.button>
          )}
        </div>

        {address ? (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Address Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Farm Location</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Full Name</p>
                  <p className="font-medium">{address.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Phone Number</p>
                  <p className="font-medium">{address.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-600 mb-1">Address</p>
                  <p className="font-medium">{address.addressLine1}</p>
                  {address.addressLine2 && (
                    <p className="font-medium">{address.addressLine2}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-600 mb-1">City</p>
                  <p className="font-medium">{address.city}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">State</p>
                  <p className="font-medium">{address.state}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">PIN Code</p>
                  <p className="font-medium">{address.pincode}</p>
                </div>
              </div>
            </div>

            {/* Soil Parameters */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Soil Parameters</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplet className="w-5 h-5 text-green-600" />
                    <span className="text-gray-600">Moisture</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">{soilData.moisture}%</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-5 h-5 text-green-600" />
                    <span className="text-gray-600">Temperature</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">{soilData.temperature}°C</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-5 h-5 text-green-600" />
                    <span className="text-gray-600">pH Level</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">{soilData.ph}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-5 h-5 text-green-600" />
                    <span className="text-gray-600">Nutrients</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">N: <span className="font-medium">{soilData.nutrients.nitrogen}</span></p>
                    <p className="text-sm">P: <span className="font-medium">{soilData.nutrients.phosphorus}</span></p>
                    <p className="text-sm">K: <span className="font-medium">{soilData.nutrients.potassium}</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Crops */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Recommended Crops</h2>
                </div>
                <button className="text-green-600 hover:text-green-700 flex items-center gap-1">
                  <span className="text-sm">View All</span>
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedCrops.map((crop, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-green-50 rounded-lg overflow-hidden"
                  >
                    <div className="h-32 bg-gray-200">
                      <img 
                        src={crop.image} 
                        alt={crop.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1">{crop.name}</h3>
                      <p className="text-sm">
                        Suitability: <span className={`font-medium ${getSuitabilityColor(crop.suitability)}`}>
                          {crop.suitability}
                        </span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Get Detailed Analysis
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-white hover:bg-gray-50 text-green-600 py-3 px-4 rounded-lg border border-green-200 font-medium transition-colors"
              >
                Download Report
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Address Added</h2>
            <p className="text-gray-600 mb-6">Please add your farm location to get soil monitoring data and crop recommendations.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/add-address')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add Farm Location
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SoilMonitoringSystem;
