import { motion } from "framer-motion";

export function Credits() {
  return (
    <motion.div
      className="credits"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p>Built and designed by Jessy Clarissa.</p>
      <p>&copy; All Rights Reserved.</p>
    </motion.div>
  );
}
