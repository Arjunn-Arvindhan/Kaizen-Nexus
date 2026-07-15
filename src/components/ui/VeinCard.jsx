// VeinCard.jsx — Card with vein-line border aesthetic
import { motion } from 'framer-motion';

export function VeinCard({ children, status = 'stable', className = '', style = {}, onClick, animate = true }) {
  const animClass = animate ? (
    status === 'emergence' ? 'pulse-alert' :
    status === 'critical'  ? 'pulse-critical' :
    status === 'watch'     ? '' :
    'pulse-stable'
  ) : '';

  return (
    <motion.div
      layout
      className={`vein-card status-${status} ${animClass} ${className}`}
      style={style}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.01 } : undefined}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
