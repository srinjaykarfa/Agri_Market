import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronLeft, CheckCircle, Crosshair } from 'lucide-react';

const AddressInput = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address Line 1 is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'PIN code is required';
    else if (!/^[0-9]{6}$/.test(formData.pincode)) newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          // Directly go to soil monitoring page with address
          navigate('/soilmonitoringsystem', { state: { address: formData } });
        }, 1100);
      }, 1200);
    }
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (!navigator.geolocation) {
      setErrors(prev => ({ 
        ...prev, 
        addressLine1: 'Geolocation is not supported by your browser'
      }));
      setIsLoadingLocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_OPENCAGE_API_KEY`
          );
          const data = await response.json();
          if (data.results && data.results[0]) {
            const result = data.results[0].components;
            setFormData(prev => ({
              ...prev,
              addressLine1: `${result.road || ''} ${result.suburb || ''}`.trim(),
              city: result.city || result.town || result.village || '',
              state: result.state || '',
              pincode: result.postcode || '',
            }));
          }
        } catch (err) {
          setErrors(prev => ({
            ...prev,
            addressLine1: 'Failed to fetch location details. Please enter manually.'
          }));
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (err) => {
        setErrors(prev => ({
          ...prev,
          addressLine1: 'Failed to get your location. Please allow location access or enter manually.'
        }));
        setIsLoadingLocation(false);
      }
    );
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8">
      <motion.div 
        className="max-w-xl mx-auto px-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors mb-8"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6 justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Enter Address</h1>
            </div>
            <motion.button
              type="button"
              onClick={getCurrentLocation}
              disabled={isLoadingLocation}
              whileHover={{ scale: isLoadingLocation ? 1 : 1.05 }}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
            >
              {isLoadingLocation ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-green-600 border-t-transparent" />
              ) : (
                <Crosshair size={18} />
              )}
              <span className="text-sm">{isLoadingLocation ? "Detecting..." : "Use My Location"}</span>
            </motion.button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 1
              </label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.addressLine1 ? 'border-red-300' : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                placeholder="House/Flat number, Street, Locality"
              />
              {errors.addressLine1 && (
                <p className="mt-1 text-sm text-red-500">{errors.addressLine1}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Landmark, Area (optional)"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.city ? 'border-red-300' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.state ? 'border-red-300' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                >
                  <option value="">Select State</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && (
                  <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PIN Code
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.pincode ? 'border-red-300' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                  placeholder="6-digit PIN code"
                  maxLength="6"
                />
                {errors.pincode && (
                  <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>
                )}
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting || showSuccess}
              whileHover={{ scale: isSubmitting || showSuccess ? 1 : 1.03 }}
              whileTap={{ scale: isSubmitting || showSuccess ? 1 : 0.98 }}
              className={`w-full py-4 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                isSubmitting || showSuccess
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {showSuccess ? (
                  <motion.span
                    key="done"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle size={22} className="animate-bounceIn text-white" />
                    Address Saved!
                  </motion.span>
                ) : isSubmitting ? (
                  <motion.span
                    key="saving"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Saving...
                  </motion.span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle size={20} />
                    Save Address
                  </span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddressInput;