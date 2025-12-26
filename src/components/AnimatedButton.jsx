import { motion } from "framer-motion"

export default function AnimatedButton({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{
        scale: 1.06,
        boxShadow: "0 0 30px rgba(126,255,197,0.4)",
      }}
      whileTap={{ scale: 0.94 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 20,
      }}
      className={`
        relative overflow-hidden
        px-6 py-3 rounded-lg font-semibold
        bg-primary text-primary-foreground
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
