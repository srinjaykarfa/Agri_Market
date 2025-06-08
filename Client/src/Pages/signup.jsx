import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, User, Lock } from 'lucide-react';

const inputVariants = {
  initial: { opacity: 0, y: 24 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.09 * i, duration: 0.5, ease: 'easeOut' },
  }),
};

const buttonVariants = {
  hover: { scale: 1.04, boxShadow: '0 6px 28px rgba(34,197,94,0.16)' },
  tap: { scale: 0.97 },
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    alert('Signup successful!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-green-50 to-lime-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.07)_0%,transparent_80%)]"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="w-full max-w-xs sm:max-w-sm mx-auto rounded-2xl bg-white/60 shadow-[0_8px_40px_0_rgba(34,197,94,0.12)] px-7 py-8 backdrop-blur-[6px] border border-green-100"
        style={{ fontSize: '0.96rem' }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6 text-center"
        >
          <h2 className="text-2xl font-bold text-green-800 tracking-tight mb-1.5">
            Sign Up
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22, duration: 0.65 }}
            className="w-9 mx-auto h-1 rounded bg-gradient-to-r from-green-500 via-emerald-400 to-lime-400 mb-2"
          />
          <p className="text-xs text-gray-500">Create a free account</p>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          initial="initial"
          animate="animate"
          className="space-y-3"
        >
          {/* Name */}
          <motion.div custom={0} variants={inputVariants} className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 w-4 h-4" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              autoFocus
              className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none text-gray-700 placeholder-gray-400 text-xs bg-white/70 hover:bg-green-50 focus:bg-white transition"
              placeholder="Full name"
              aria-label="Full name"
            />
          </motion.div>
          {/* Email */}
          <motion.div custom={1} variants={inputVariants} className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 w-4 h-4" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none text-gray-700 placeholder-gray-400 text-xs bg-white/70 hover:bg-green-50 focus:bg-white transition"
              placeholder="Email address"
              aria-label="Email"
            />
          </motion.div>
          {/* Password */}
          <motion.div custom={2} variants={inputVariants} className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 w-4 h-4" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none text-gray-700 placeholder-gray-400 text-xs bg-white/70 hover:bg-green-50 focus:bg-white transition"
              placeholder="Password"
              aria-label="Password"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-green-500 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </motion.div>
          {/* Confirm Password */}
          <motion.div custom={3} variants={inputVariants} className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 w-4 h-4" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="block w-full pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none text-gray-700 placeholder-gray-400 text-xs bg-white/70 hover:bg-green-50 focus:bg-white transition"
              placeholder="Confirm password"
              aria-label="Confirm password"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-green-500 transition-colors"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </motion.div>
          {/* Terms */}
          <motion.div custom={4} variants={inputVariants} className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="accent-green-600 w-3.5 h-3.5"
            />
            <span>
              I agree to the
              <a href="/terms" className="text-green-700 font-semibold hover:underline ml-1" target="_blank" rel="noopener noreferrer">terms & conditions</a>
            </span>
          </motion.div>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 7 }}
                className="text-red-600 text-xs text-center mb-1"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          {/* Signup Button */}
          <motion.button
            type="submit"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-green-600 via-emerald-600 to-lime-500 text-white font-semibold text-base shadow-lg transition focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2"
            style={{ fontSize: '0.97rem' }}
          >
            Sign Up
          </motion.button>
        </motion.form>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.55, ease: 'easeOut' }}
          className="text-center mt-3"
        >
          <span className="text-gray-400 text-xs">Already have an account? </span>
          <Link to="/login" className="text-green-700 font-semibold text-xs hover:underline">Login</Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;