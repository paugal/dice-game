import { motion } from "framer-motion";

const MotionWrapper = ({ children, delay = 0, duration = 0.8 }) => (
  <motion.div
    initial={{ opacity: 0, y: -40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration }}
  >
    {children}
  </motion.div>
);

export default MotionWrapper;
