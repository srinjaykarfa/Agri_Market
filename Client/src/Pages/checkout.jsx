import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, CreditCard, MapPin, Phone, User, LocateFixed
} from "lucide-react";

// Google Places Autocomplete (optional, remove if not needed)
const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"; // Replace with your key
const loadGoogleScript = (callback) => {
  if (window.google && window.google.maps) {
    callback();
    return;
  }
  const existingScript = document.getElementById("googlePlacesScript");
  if (existingScript) {
    existingScript.onload = callback;
    return;
  }
  const script = document.createElement("script");
  script.id = "googlePlacesScript";
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
  script.async = true;
  script.onload = callback;
  document.body.appendChild(script);
};

const AddressAutocomplete = ({ value, onChange, onSelect, placeholder }) => {
  const inputRef = useRef();

  useEffect(() => {
    loadGoogleScript(() => {
      if (!inputRef.current) return;
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        { types: ["geocode"] }
      );
      autocomplete.setFields(["formatted_address"]);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          onSelect(place.formatted_address);
        }
      });
    });
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-400 bg-green-50 transition text-gray-800 placeholder-gray-400"
      placeholder={placeholder}
      autoComplete="off"
    />
  );
};

const formVariants = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 32 }
};

const inputClass =
  "w-full px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-400 bg-green-50 transition text-gray-800 placeholder-gray-400";

const Checkout = ({
  cartItems = [],
  clearCart = () => {},
  className = ""
}) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: ""
  });
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState("");
  const [deliveryEstimate, setDeliveryEstimate] = useState("");
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const min = 3, max = 5;
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + min);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + max);
    setDeliveryEstimate(
      `${minDate.toLocaleDateString()} - ${maxDate.toLocaleDateString()}`
    );
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Use Geolocation API and reverse geocode to get the address
  const handleUseCurrentLocation = async () => {
    setLocError("");
    setLocLoading(true);
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser");
      setLocLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data && data.display_name) {
            setForm((prev) => ({
              ...prev,
              address: data.display_name
            }));
          } else {
            setLocError("Unable to fetch address from location.");
          }
        } catch (err) {
          setLocError("Failed to get address from location.");
        }
        setLocLoading(false);
      },
      (error) => {
        setLocError("Failed to get your location.");
        setLocLoading(false);
      }
    );
  };

  // On form submit, navigate to /payment
  const handleOrder = (e) => {
    e.preventDefault();
    // Optionally validate form
    // clearCart(); // If you want to clear cart here
    navigate("/payment");
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={formVariants}
      className={`max-w-5xl mx-auto mt-10 px-2 md:px-6 py-8 ${className}`}
      style={{ minHeight: "70vh" }}
    >
      <h1 className="text-4xl font-extrabold text-green-800 mb-10 text-center tracking-tight">Checkout</h1>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Checkout Form */}
        <motion.form
          onSubmit={handleOrder}
          className="flex-1 bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-green-100"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-green-700 font-semibold flex items-center gap-2">
                <User className="w-4 h-4" /> Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block mb-1 text-green-700 font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Address
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <AddressAutocomplete
                    value={form.address}
                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    onSelect={address => setForm(f => ({ ...f, address }))}
                    placeholder="Start typing your address..."
                  />
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 font-semibold rounded-lg shadow transition whitespace-nowrap disabled:opacity-60"
                  disabled={locLoading}
                  onClick={handleUseCurrentLocation}
                  title="Use my current location"
                >
                  <LocateFixed className="w-5 h-5" />
                  {locLoading ? "Locating..." : "Use my location"}
                </button>
              </div>
              {locError && (
                <div className="text-xs text-red-500 mt-1">{locError}</div>
              )}
            </div>
            <div>
              <label className="block mb-1 text-green-700 font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4" /> Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="e.g. 9876543210"
              />
            </div>
            <div>
              <label className="block mb-1 text-green-700 font-semibold flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="you@email.com"
              />
            </div>
          </div>
          {/* Delivery estimate */}
          {deliveryEstimate && (
            <div className="flex items-center gap-2 text-sm mt-3 text-green-600">
              <MapPin className="w-4 h-4" />
              Estimated Delivery: <span className="font-semibold">{deliveryEstimate}</span>
            </div>
          )}
          <div className="flex items-center justify-between pt-6 mt-4 border-t">
            <Link
              to="/cart"
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cart
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="px-7 py-2 rounded-lg bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold shadow hover:from-green-700 transition"
            >
              Place Order ({cartItems.length} items, ₹{total.toFixed(2)})
            </motion.button>
          </div>
        </motion.form>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 64 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-96 w-full bg-white rounded-2xl shadow-xl border border-green-100 p-7 flex flex-col gap-4 self-start"
        >
          <h3 className="text-2xl font-bold text-green-700 mb-3">Order Summary</h3>
          <ul className="divide-y divide-green-50 mb-3">
            {cartItems.map((item, idx) => (
              <li key={item.id || item.title} className="py-2 flex justify-between items-center text-gray-700">
                <span>
                  {item.title}
                  <span className="text-xs text-gray-400 ml-1">x{item.quantity}</span>
                </span>
                <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-xl font-bold py-2 border-t border-green-100">
            <span>Total</span>
            <span className="text-green-700">₹{total.toFixed(2)}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Checkout;