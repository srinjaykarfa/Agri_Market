import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement login logic
    if (!formData.email || !formData.password) {
      setError('Please enter email and password.');
      return;
    }
    setError('');
    alert('Login submitted!');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-green-50 to-lime-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(34,197,94,0.06)_0%,transparent_80%)]"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
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
            Login
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22, duration: 0.65 }}
            className="w-9 mx-auto h-1 rounded bg-gradient-to-r from-green-500 via-emerald-400 to-lime-400 mb-2"
          />
          <p className="text-xs text-gray-500">Access your account</p>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          initial="initial"
          animate="animate"
          className="space-y-3"
        >
          {/* Email */}
          <motion.div custom={0} variants={inputVariants} className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 w-4 h-4" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoFocus
              className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none text-gray-700 placeholder-gray-400 text-xs bg-white/70 hover:bg-green-50 focus:bg-white transition"
              placeholder="Email address"
              aria-label="Email"
            />
          </motion.div>
          {/* Password */}
          <motion.div custom={1} variants={inputVariants} className="relative group">
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
          {/* Remember Me & Forgot */}
          <motion.div custom={2} variants={inputVariants} className="flex items-center justify-between pt-1 pb-2">
            <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer select-none">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="accent-green-600 w-3.5 h-3.5"
              />
              Remember me
            </label>
            <Link to="/forgot" className="text-green-600 hover:underline text-xs font-medium">
              Forgot?
            </Link>
          </motion.div>
          {/* Error */}
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
          {/* Login Button */}
          <motion.button
            type="submit"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full mb-0.5 py-2.5 rounded-xl bg-gradient-to-r from-green-600 via-emerald-600 to-lime-500 text-white font-semibold text-base shadow-lg transition focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2"
            style={{ fontSize: '0.97rem' }}
          >
            Login
          </motion.button>
        </motion.form>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.55, ease: 'easeOut' }}
          className="text-center mt-3"
        >
          <span className="text-gray-400 text-xs">Don't have an account? </span>
          <Link to="/signup" className="text-green-700 font-semibold text-xs hover:underline">Sign up</Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;