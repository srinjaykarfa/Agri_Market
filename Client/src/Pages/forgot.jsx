import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';

const inputVariants = {
  initial: { opacity: 0, y: 22 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.5, ease: 'easeOut' },
  }),
};

const buttonVariants = {
  hover: { scale: 1.04, boxShadow: '0 6px 28px rgba(34,197,94,0.16)' },
  tap: { scale: 0.97 },
};

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Enter your email address.');
      return;
    }
    // Simulate API send
    setTimeout(() => {
      setSent(true);
      setError('');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-green-50 to-lime-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(34,197,94,0.06)_0%,transparent_80%)]"></div>
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
            Forgot Password
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22, duration: 0.65 }}
            className="w-9 mx-auto h-1 rounded bg-gradient-to-r from-green-500 via-emerald-400 to-lime-400 mb-2"
          />
          <p className="text-xs text-gray-500">
            Enter your email and we'll send a reset link.
          </p>
        </motion.div>
        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="text-green-600 text-4xl mb-2">✓</div>
            <div className="text-green-700 mb-1 font-semibold text-sm">
              Check your inbox!
            </div>
            <div className="text-xs text-gray-500 mb-5">
              If an account exists, a password reset link was sent to: <br />
              <span className="text-green-700">{email}</span>
            </div>
            <Link to="/login" className="text-green-700 font-semibold text-xs hover:underline">
              Back to Login
            </Link>
          </motion.div>
        ) : (
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none text-gray-700 placeholder-gray-400 text-xs bg-white/70 hover:bg-green-50 focus:bg-white transition"
                placeholder="Email address"
                aria-label="Email"
              />
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
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-green-600 via-emerald-600 to-lime-500 text-white font-semibold text-base shadow-lg transition focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2"
              style={{ fontSize: '0.97rem' }}
            >
              Send Reset Link
            </motion.button>
          </motion.form>
        )}

        {!sent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
            className="text-center mt-3"
          >
            <span className="text-gray-400 text-xs">Remembered? </span>
            <Link to="/login" className="text-green-700 font-semibold text-xs hover:underline">Back to Login</Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Forgot;