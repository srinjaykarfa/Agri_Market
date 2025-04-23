// Pages/success.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Success = () => {
  const { state } = useLocation();
  const { orderId, formData, total, cartItems } = state || {};

  if (!orderId) {
    return <p className="text-center mt-10">Order not found.</p>;
  }

  const orderDate = new Date().toLocaleString('en-IN');

  return (
    <div className="max-w-3xl mx-auto p-6 text-center bg-green-50 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Thank You! 🎉</h1>
      <p className="mb-2">Order ID: <strong>{orderId}</strong></p>
      <p className="mb-2">Order Date: <strong>{orderDate}</strong></p>
      <p className="mb-2">Confirmation sent to: <strong>{formData.email}</strong></p>
      <p className="mb-4">Total: ₹{total.toLocaleString('en-IN')}</p>

      <h2 className="text-xl font-semibold mb-2 mt-6">Items Ordered:</h2>
      <ul className="text-left mb-6 ml-6 list-disc">
        {cartItems.map((item, i) => (
          <li key={i} className="mb-1">
            <span className="font-medium">{item.title}</span> × {item.quantity} – ₹{item.price * item.quantity}
          </li>
        ))}
      </ul>

      {/* Optional: Placeholder for future invoice download */}
      <button
        className="bg-white text-green-700 border border-green-600 px-4 py-2 rounded hover:bg-green-100 mb-4"
        onClick={() => alert("Invoice download coming soon!")}
      >
        Download Invoice
      </button>

      <br />

      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default Success;
