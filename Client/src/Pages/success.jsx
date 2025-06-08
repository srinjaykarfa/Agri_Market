import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const Success = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center min-h-[60vh] p-6"
  >
    <div className="bg-white rounded-2xl shadow-xl px-10 py-12 max-w-md w-full flex flex-col items-center">
      <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
      <h2 className="text-3xl font-extrabold text-green-800 mb-2">Order Placed!</h2>
      <p className="text-gray-600 mb-6 text-center">
        Thank you for your purchase. Your order has been placed and will be delivered soon.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold hover:from-green-700 transition"
      >
        Back to Home
      </Link>
    </div>
  </motion.div>
);

export default Success;