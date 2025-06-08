import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

const green = "#13b94f";
const greenLight = "#eafff1";
const greenGradient = "linear-gradient(90deg, #13b94f 0%, #8be94f 100%)";
const dangerText = "#e53935";

const Cart = ({
  cartItems,
  updateQuantity,
  removeItem,
  clearCart,
  className = "",
  gstPercent = 18,
  deliveryCharge = 40
}) => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const gst = parseFloat(((subtotal * gstPercent) / 100).toFixed(2));
  const total = subtotal + gst + (cartItems.length > 0 ? deliveryCharge : 0);

  return (
    <div
      className={`relative max-w-7xl mx-auto px-4 py-10 min-h-[70vh] bg-[#f4faef] ${className}`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <h1 className="text-4xl md:text-4xl font-extrabold text-[#118a3b] mb-8 text-center tracking-tight flex items-center justify-center gap-3">
        <ShoppingBag style={{ color: green, width: 34, height: 34 }} />
        Your Cart
      </h1>
      
      <div className="flex flex-col gap-8 items-center">
        {/* Cart Items */}
        <div className="w-full flex flex-col gap-6 max-w-3xl mx-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-80 rounded-2xl bg-white/80 shadow-md border border-green-100">
              <ShoppingBag className="w-12 h-12 mb-4 text-green-300" />
              <p className="text-base text-gray-500 mb-2">Your cart is empty.</p>
              <Link
                to="/"
                className="mt-4 inline-block px-6 py-2 rounded-lg"
                style={{
                  background: greenGradient,
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  boxShadow: "0 2px 8px 0 #0001"
                }}
              >
                Go Shopping
              </Link>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={item.id || item.title}
                className="flex items-center gap-6 bg-white rounded-2xl shadow-xl border border-[#e0f5e7] px-6 py-5"
                style={{
                  boxShadow:
                    "0 2px 12px 0 rgba(19,185,79,0.07), 0 1.5px 5px 0 rgba(19,185,79,0.03)"
                }}
              >
                <img
                  src={item.image || "/default-product.png"}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-xl border-2 border-[#eafff1] shadow"
                  style={{
                    boxShadow: "0 1px 8px 0 #13b94f22"
                  }}
                />
                <div className="flex-1 flex flex-col gap-2">
                  <span className="font-bold text-base md:text-base text-[#13b94f]">{item.title}</span>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 bg-[#eafff1] px-3 py-1.5 rounded-lg border border-[#cdfadb]">
                      <button
                        onClick={() => updateQuantity(idx, item.quantity - 1)}
                        disabled={item.quantity === 1}
                        className="p-1 rounded hover:bg-[#e0f5e7] disabled:opacity-60 transition"
                        style={{ color: green, fontSize: "1rem" }}
                      >
                        <Minus />
                      </button>
                      <span className="px-3 text-base">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(idx, item.quantity + 1)}
                        className="p-1 rounded hover:bg-[#e0f5e7] transition"
                        style={{ color: green, fontSize: "1rem" }}
                      >
                        <Plus />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(idx)}
                      className="ml-1.5 p-2 rounded-full"
                      style={{
                        background: "#ffeaea",
                        color: dangerText,
                        border: "none"
                      }}
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="text-[#13b94f] font-bold text-lg min-w-[64px] text-right">
                  ₹{item.price}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary at the bottom */}
        {cartItems.length > 0 && (
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#e0f5e7] p-7 flex flex-col gap-3 self-center"
            style={{
              boxShadow:
                "0 4px 24px 0 rgba(19,185,79,0.09), 0 1.5px 5px 0 rgba(19,185,79,0.03)"
            }}
          >
            <h2 className="text-xl font-bold text-[#13b94f] mb-2">Order Summary</h2>
            <ul className="divide-y divide-[#f1f8f2] mb-2">
              {cartItems.map((item, idx) => (
                <li
                  key={item.id || item.title}
                  className="py-2 flex justify-between items-center text-[#222]"
                  style={{ fontWeight: 500, fontSize: "0.98rem" }}
                >
                  <span>
                    {item.title}
                    <span className="text-xs text-gray-400 ml-1">x{item.quantity}</span>
                  </span>
                  <span style={{ fontWeight: 600 }}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between text-sm py-1">
              <span style={{ color: "#222" }}>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm py-1">
              <span style={{ color: "#13b94f" }}>GST ({gstPercent}%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm py-1">
              <span style={{ color: "#13b94f" }}>Delivery Charge</span>
              <span>₹{cartItems.length > 0 ? deliveryCharge.toFixed(2) : "0.00"}</span>
            </div>
            <hr className="my-2 border-[#cdfadb]" />
            <div className="flex items-center justify-between text-lg font-bold py-2">
              <span style={{ color: "#13b94f" }}>Total</span>
              <span style={{ color: "#13b94f" }}>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <button
                onClick={clearCart}
                className="px-5 py-2.5 rounded-lg font-semibold text-base"
                style={{
                  background: "#ffeaea",
                  color: dangerText,
                  border: "none"
                }}
              >
                Clear Cart
              </button>
              <Link
                to="/checkout"
                className="px-6 py-2.5 rounded-lg font-bold text-base text-white text-center"
                style={{
                  background: greenGradient,
                  boxShadow: "0 2px 8px 0 #13b94f33"
                }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;