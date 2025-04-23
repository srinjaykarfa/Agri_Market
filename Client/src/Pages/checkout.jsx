// Pages/checkout.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  ArrowLeft, 
  Shield, 
  Truck, 
  Clock,
  CheckCircle,
  Crosshair
} from 'lucide-react';

const Checkout = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const [error, setError] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user starts typing
  };

  const handleProceedToPayment = () => {
    const { name, email, phone, address, city, pincode } = formData;

    if (!name || !email || !phone || !address || !city || !pincode) {
      setError('Please fill all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(pincode)) {
      setError('Please enter a valid 6-digit pincode.');
      return;
    }

    setError('');
    setIsPlacingOrder(true);

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subtotal < 500 ? 50 : 0;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;

    navigate('/payment', {
      state: {
        formData,
        cartItems,
        subtotal,
        shipping,
        tax,
        total,
      },
    });
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
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
              address: `${result.road || ''} ${result.suburb || ''}`.trim(),
              city: result.city || result.town || result.village || '',
              pincode: result.postcode || '',
            }));
          }
        } catch (errorMsg) {
          setError('Failed to fetch location details. Please enter manually.');
          console.error('Location fetch error:', errorMsg);
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (errorMsg) => {
        setError('Failed to get your location. Please allow location access or enter manually.');
        console.error('Geolocation error:', errorMsg);
        setIsLoadingLocation(false);
      }
    );
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal < 500 ? 50 : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-10">
      <motion.div 
        className="max-w-3xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-2 mb-8">
          <Link 
            to="/cart" 
            className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Cart</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-green-800 mb-8">Checkout</h1>

        <div className="space-y-6">
          {/* Shipping Information */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            variants={itemVariants}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Shipping Information</h2>
              <button
                onClick={getCurrentLocation}
                disabled={isLoadingLocation}
                className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              >
                {isLoadingLocation ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-green-600 border-t-transparent" />
                ) : (
                  <Crosshair size={18} />
                )}
                <span className="text-sm">Use My Location</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="relative md:col-span-2">
                <MapPin className="absolute left-3 top-4 text-gray-400" size={18} />
                <textarea
                  name="address"
                  placeholder="Delivery Address *"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode *"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>
            </div>
            {error && (
              <motion.p 
                className="text-red-600 mt-4 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="text-xl">⚠</span> {error}
              </motion.p>
            )}
          </motion.div>

          {/* Order Benefits */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <Truck className="text-green-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-medium text-gray-800">Fast Delivery</h3>
                  <p className="text-sm text-gray-600">2-3 business days delivery</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <Shield className="text-green-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-medium text-gray-800">Secure Payment</h3>
                  <p className="text-sm text-gray-600">100% secure checkout</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </motion.div>
              ))}
            </div>

            <div className="space-y-3 py-4 bg-gray-50 px-4 rounded-lg">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                {shipping > 0 ? (
                  <div className="text-right">
                    <span className="text-red-500">₹{shipping}</span>
                    <p className="text-xs text-gray-500">Add ₹{500 - subtotal} more for free shipping</p>
                  </div>
                ) : (
                  <span className="text-green-600">Free</span>
                )}
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-800 pt-4 border-t border-gray-200">
                <span>Total Amount</span>
                <span className="text-green-600">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              disabled={isPlacingOrder}
              onClick={handleProceedToPayment}
              className={`mt-6 w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all ${
                isPlacingOrder
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
              }`}
            >
              {isPlacingOrder ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  Proceed to Payment
                </>
              )}
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield size={16} />
              <span>Your payment information is secure</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;



