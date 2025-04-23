// Pages/payment.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Wallet, 
  ArrowLeft,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, cartItems, total } = location.state || {};

  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formattedValue);
    setError('');
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      const formattedValue = value.replace(/(\d{2})(\d{0,2})/, '$1/$2').trim();
      setExpiryDate(formattedValue);
      setError('');
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
      setError('');
    }
  };

  const validatePaymentDetails = () => {
    if (selectedMethod === 'card') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
        setError('Please enter a valid 16-digit card number');
        return false;
      }
      if (!expiryDate || expiryDate.length !== 5) {
        setError('Please enter a valid expiry date (MM/YY)');
        return false;
      }
      if (!cvv || cvv.length !== 3) {
        setError('Please enter a valid 3-digit CVV');
        return false;
      }
    }
    return true;
  };

  const handlePayment = () => {
    if (!validatePaymentDetails()) return;

    setIsProcessing(true);
    setError('');

    // Simulate payment processing
    setTimeout(() => {
      const orderId = 'ORD-' + Date.now();
      localStorage.removeItem('cart');

      navigate('/success', {
        state: {
          orderId,
          formData,
          total,
          cartItems,
        },
      });
    }, 2000);
  };

  if (!formData || !cartItems) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-800 font-medium">Missing payment information</p>
          <Link to="/cart" className="text-green-600 hover:text-green-700 mt-4 inline-block">
            Return to Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-10">
      <motion.div 
        className="max-w-md mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-8">
          <Link 
            to="/checkout" 
            className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Checkout</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-green-800 mb-8">Payment</h1>

        <div className="space-y-6">
          {/* Payment Methods */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Payment Details</h2>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Secure Payment</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-6">
                <p className="text-sm font-medium text-gray-600 mb-4">Amount to Pay</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">₹{total.toLocaleString('en-IN')}</span>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Clock size={16} />
                    <span>Processing time: ~2 mins</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600 mb-4">Select Payment Method</p>
                <div className="grid gap-3">
                  <div
                    className={`relative flex items-center gap-4 p-4 rounded-lg cursor-pointer border-2 transition-all ${
                      selectedMethod === 'card'
                        ? 'border-green-500 bg-green-50/50'
                        : 'border-gray-200 hover:border-green-200'
                    }`}
                    onClick={() => setSelectedMethod('card')}
                  >
                    <div className={`p-2 rounded-full ${
                      selectedMethod === 'card' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <CreditCard className={`w-6 h-6 ${
                        selectedMethod === 'card' ? 'text-green-600' : 'text-gray-500'
                      }`} />
                    </div>
                    <div>
                      <p className={`font-medium ${
                        selectedMethod === 'card' ? 'text-green-700' : 'text-gray-700'
                      }`}>Credit / Debit Card</p>
                      <p className="text-sm text-gray-500">All major cards accepted</p>
                    </div>
                    {selectedMethod === 'card' && (
                      <div className="absolute right-4">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                  </div>

                  <div
                    className="relative flex items-center gap-4 p-4 rounded-lg border-2 border-gray-200 opacity-60 cursor-not-allowed"
                  >
                    <div className="p-2 rounded-full bg-gray-100">
                      <Wallet className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">UPI Payment</p>
                      <p className="text-sm text-gray-500">Coming soon</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedMethod === 'card' && (
                <motion.div 
                  className="space-y-4 pt-4 border-t border-gray-100"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength="3"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={cvv}
                        onChange={handleCvvChange}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.p 
                  className="mt-4 text-red-600 flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <AlertCircle size={16} />
                  {error}
                </motion.p>
              )}

              <button
                disabled={isProcessing}
                onClick={handlePayment}
                className={`w-full py-4 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all ${
                  isProcessing
                    ? 'bg-green-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    Pay ₹{total.toLocaleString('en-IN')}
                  </>
                )}
              </button>
            </div>
          </motion.div>

          <div className="flex items-center justify-between text-sm text-gray-500 px-2">
            <div className="flex items-center gap-2">
              <Shield size={16} />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Estimated delivery: 2-3 business days</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Payment;


// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Payment = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { formData, cartItems, total } = location.state || {};

//   const [isProcessing, setIsProcessing] = useState(false);

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async () => {
//     setIsProcessing(true);

//     const res = await loadRazorpayScript();
//     if (!res) {
//       alert('Razorpay SDK failed to load. Are you online?');
//       setIsProcessing(false);
//       return;
//     }

//     const orderId = 'ORD-' + Date.now();

//     const options = {
//       key: 'rzp_test_YourKeyHere', // Replace with your Razorpay Test Key
//       amount: total * 100, // Amount is in paise (₹1 = 100 paise)
//       currency: 'INR',
//       name: 'Farma Produce',
//       description: 'Farm product purchase',
//       handler: function (response) {
//         localStorage.removeItem('cart');
//         navigate('/success', {
//           state: {
//             orderId,
//             formData,
//             total,
//             cartItems,
//             paymentId: response.razorpay_payment_id,
//           },
//         });
//       },
//       prefill: {
//         name: formData.name,
//         email: formData.email,
//         contact: formData.phone,
//       },
//       notes: {
//         address: formData.address,
//       },
//       theme: {
//         color: '#0f9d58',
//       },
//     };

//     setIsProcessing(false); // Stop spinner
//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   if (!formData || !cartItems) {
//     return <p className="text-center mt-10">Missing payment info.</p>;
//   }

//   return (
//     <div className="max-w-xl mx-auto p-6 text-center">
//       <h1 className="text-2xl font-bold text-green-700 mb-4">Payment</h1>
//       <p className="mb-4">
//         Total Amount: <strong>₹{total.toLocaleString('en-IN')}</strong>
//       </p>

//       {isProcessing ? (
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-blue-700 font-semibold">Processing...</p>
//         </div>
//       ) : (
//         <button
//           onClick={handlePayment}
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           Pay Now
//         </button>
//       )}
//     </div>
//   );
// };

// export default Payment;
