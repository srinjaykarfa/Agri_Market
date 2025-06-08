import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

const Payment = () => {
  const [payment, setPayment] = useState({
    card: "",
    expiry: "",
    cvc: "",
    name: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you should integrate with your payment gateway (Stripe, Razorpay, etc.)
    // For demo we just navigate to success page
    navigate("/success");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg"
    >
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center flex items-center gap-2 justify-center">
        <CreditCard className="w-7 h-7" /> Payment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-green-700 font-semibold mb-1">Card Number</label>
          <input
            type="text"
            name="card"
            value={payment.card}
            onChange={handleChange}
            maxLength={19}
            required
            className="w-full px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-400 bg-green-50"
            placeholder="1234 5678 9012 3456"
            inputMode="numeric"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-green-700 font-semibold mb-1">Expiry</label>
            <input
              type="text"
              name="expiry"
              value={payment.expiry}
              onChange={handleChange}
              maxLength={5}
              required
              className="w-full px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-400 bg-green-50"
              placeholder="MM/YY"
            />
          </div>
          <div className="flex-1">
            <label className="block text-green-700 font-semibold mb-1">CVC</label>
            <input
              type="text"
              name="cvc"
              value={payment.cvc}
              onChange={handleChange}
              maxLength={4}
              required
              className="w-full px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-400 bg-green-50"
              placeholder="CVC"
            />
          </div>
        </div>
        <div>
          <label className="block text-green-700 font-semibold mb-1">Name on Card</label>
          <input
            type="text"
            name="name"
            value={payment.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-400 bg-green-50"
            placeholder="Full Name"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-full px-7 py-2 mt-4 rounded-lg bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold shadow hover:from-green-700 transition"
        >
          Pay Now
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Payment;