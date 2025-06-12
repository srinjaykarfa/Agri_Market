import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const variants = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.4, 1.3, 0.6, 1] } },
  exit: { opacity: 0, y: -24, scale: 0.98, transition: { duration: 0.32, ease: [0.4, 1.3, 0.6, 1] } },
};

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen"
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}