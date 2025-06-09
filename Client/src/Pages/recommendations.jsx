import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Droplet, Thermometer, Sun, Leaf, ChevronLeft, Info
} from 'lucide-react';

const AnimatedBar = ({ value, max, color, label }) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center mb-1">
      <span className="text-gray-600 font-medium">{label}</span>
      <motion.span
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-green-800 font-bold"
      >
        {value}
        {label === "Moisture" ? "%" : label === "Temperature" ? "°C" : ""}
      </motion.span>
    </div>
    <div className="w-full h-3 bg-green-200/60 rounded-full overflow-hidden shadow-inner">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 1.1, type: "spring" }}
        className={`h-full rounded-full ${color} shadow-md`}
      />
    </div>
  </div>
);

const sectionFadeVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, type: "spring" } }
};

const Recommendations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { soilData, recommendedCrops } = location.state || {};

  const getSuitabilityColor = (suitability) => {
    switch (suitability.toLowerCase()) {
      case 'high':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const cropVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.93 },
    visible: i => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.25 + i * 0.13, type: "spring", stiffness: 100 }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-lime-50 to-green-200 py-8 px-4">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={sectionFadeVariant}
      >
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.07, backgroundColor: "#dcfce7", x: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors mb-10 px-3 py-2 rounded-lg bg-green-100/40 shadow-sm"
        >
          <ChevronLeft size={20} />
          <span className="font-medium">Back</span>
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-4xl font-extrabold text-green-900 drop-shadow-2xl tracking-tight mb-10 text-center"
        >
          Recommendations & Analysis
        </motion.h1>

        {/* Soil Parameters */}
        {soilData && (
          <motion.div
            className="bg-gradient-to-br from-white via-green-50 to-lime-100 rounded-3xl shadow-xl p-8 border border-green-100 mb-10"
            initial="hidden"
            animate="visible"
            variants={sectionFadeVariant}
            layout
          >
            <div className="flex items-center gap-4 mb-7">
              <motion.div
                className="p-3 bg-gradient-to-tr from-green-100 via-lime-200 to-green-300 rounded-xl shadow"
                initial={{ scale: 0.8, opacity: 0.9 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.18 }}
              >
                <Info className="w-8 h-8 text-green-700" />
              </motion.div>
              <h2 className="text-2xl font-bold text-green-900">Soil Parameters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              <motion.div
                className="bg-white/95 rounded-2xl p-5 shadow-sm border border-green-100"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 32px rgba(34,197,94,0.15)",
                  y: -4
                }}
                transition={{ type: "spring" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Droplet className="w-6 h-6 text-green-500" />
                </div>
                <AnimatedBar label="Moisture" value={soilData.moisture} max={100} color="bg-green-400" />
              </motion.div>
              <motion.div
                className="bg-white/95 rounded-2xl p-5 shadow-sm border border-green-100"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 32px rgba(251,191,36,0.13)",
                  y: -4
                }}
                transition={{ type: "spring" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-6 h-6 text-orange-500" />
                </div>
                <AnimatedBar label="Temperature" value={soilData.temperature} max={50} color="bg-orange-300" />
              </motion.div>
              <motion.div
                className="bg-white/95 rounded-2xl p-5 shadow-sm border border-green-100"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 32px rgba(253,224,71,0.13)",
                  y: -4
                }}
                transition={{ type: "spring" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-6 h-6 text-yellow-500" />
                </div>
                <AnimatedBar label="pH Level" value={soilData.ph} max={14} color="bg-yellow-300" />
              </motion.div>
              <motion.div
                className="bg-white/95 rounded-2xl p-5 shadow-sm border border-green-100"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 32px rgba(20,184,166,0.13)",
                  y: -4
                }}
                transition={{ type: "spring" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-6 h-6 text-teal-500" />
                  <span className="text-gray-600 font-medium">Nutrients</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm">N: <span className="font-medium">{soilData.nutrients.nitrogen}</span></p>
                  <p className="text-sm">P: <span className="font-medium">{soilData.nutrients.phosphorus}</span></p>
                  <p className="text-sm">K: <span className="font-medium">{soilData.nutrients.potassium}</span></p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Recommended Crops */}
        {recommendedCrops && (
          <motion.div
            className="bg-gradient-to-br from-white via-green-50 to-lime-100 rounded-3xl shadow-xl p-8 border border-green-100"
            initial="hidden"
            animate="visible"
            variants={sectionFadeVariant}
            layout
          >
            <div className="flex items-center gap-4 mb-7">
              <motion.div
                className="p-3 bg-gradient-to-tr from-green-100 via-lime-200 to-green-300 rounded-xl shadow"
                initial={{ scale: 0.8, opacity: 0.9 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Leaf className="w-8 h-8 text-green-700" />
              </motion.div>
              <h2 className="text-2xl font-bold text-green-900">Recommended Crops</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {recommendedCrops.map((crop, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cropVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    scale: 1.045,
                    boxShadow: "0 8px 32px rgba(34,197,94,0.13)",
                    y: -3
                  }}
                  transition={{ type: "spring" }}
                  className="bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl overflow-hidden shadow-lg border border-green-100 transition-all flex flex-col"
                >
                  <motion.div
                    className="h-40 bg-gray-200"
                    style={{
                      backgroundImage: `url('${crop.image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                    initial={{ scale: 0.94 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.07 }}
                  />
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <h3 className="font-semibold text-gray-800 mb-1 text-lg">{crop.name}</h3>
                    <p className="text-sm">
                      Suitability: <span className={`font-medium ${getSuitabilityColor(crop.suitability)}`}>
                        {crop.suitability}
                      </span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Recommendations;