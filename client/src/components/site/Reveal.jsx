import { motion } from "framer-motion";

/**
 * Scroll-reveal wrapper. Animation preferences are handled globally by
 * MotionConfig (reducedMotion="user") so server and client markup match.
 */
export default function Reveal({ children, className, delay = 0, y = 22 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}