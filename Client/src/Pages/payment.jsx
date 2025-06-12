import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, Smartphone, Landmark, Truck } from "lucide-react"; // Bank replaced by Landmark

const paymentMethods = [
  {
    key: "card",
    label: "Card",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    key: "upi",
    label: "UPI",
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    key: "netbanking",
    label: "Net Banking",
    icon: <Landmark className="w-5 h-5" />, // Use Landmark icon instead of Bank
  },
  {
    key: "cod",
    label: "Cash on Delivery",
    icon: <Truck className="w-5 h-5" />,
  },
];

const banks = [
  "SBI", "HDFC", "ICICI", "Axis", "PNB", "Kotak", "BOB", "IndusInd", "Yes Bank", "Other"
];

const Payment = () => {
  const [method, setMethod] = useState("card");
  const [payment, setPayment] = useState({
    card: "",
    expiry: "",
    cvc: "",
    name: "",
    upi: "",
    bank: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Integrate with payment gateway if needed
    navigate("/success");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg"
    >
      <h2 className="text-3xl font-bold text-green-800 mb-7 text-center flex items-center gap-2 justify-center">
        <CreditCard className="w-7 h-7" /> Payment
      </h2>

      <div className="flex gap-2 mb-7 justify-center">
        {paymentMethods.map(pm => (
          <button
            type="button"
            key={pm.key}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition
              ${method === pm.key
                ? "bg-green-50 border-green-400 text-green-800 shadow"
                : "bg-white border-green-100 text-gray-600 hover:border-green-300"}
            `}
            onClick={() => setMethod(pm.key)}
          >
            {pm.icon} {pm.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {method === "card" && (
          <>
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
          </>
        )}

        {method === "upi" && (
          <div>
            <label className="block text-green-700 font-semibold mb-1">UPI ID</label>
            <input
              type="text"
              name="upi"
              value={payment.upi}
              onChange={handleChange}
              pattern="^[\w.\-]+@[\w.\-]+$"
              required
              className="w-full px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-400 bg-green-50"
              placeholder="yourname@upi"
            />
            <div className="text-xs text-gray-500 mt-1">Ex: mobilenumber@upi or name@bank</div>
          </div>
        )}

        {method === "netbanking" && (
          <div>
            <label className="block text-green-700 font-semibold mb-1">Select Bank</label>
            <select
              name="bank"
              value={payment.bank}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-400 bg-green-50"
            >
              <option value="">Choose a bank</option>
              {banks.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <div className="text-xs text-gray-500 mt-1">You will be redirected to bank's website.</div>
          </div>
        )}

        {method === "cod" && (
          <div className="text-green-700 font-semibold text-lg px-2 py-3 rounded bg-green-50 text-center">
            You will pay in cash when your order is delivered.
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-full px-7 py-2 mt-4 rounded-lg bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold shadow hover:from-green-700 transition"
        >
          {method === "cod" ? "Place Order" : "Pay Now"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Payment;