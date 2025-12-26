import { motion, AnimatePresence } from "framer-motion"
import AnimatedButton from "./AnimatedButton"

export default function DeleteModal({ isOpen, onClose, onConfirm, movieTitle }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-card border border-border rounded-xl p-6 w-full max-w-md"
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 18 }}
          >
            <h3 className="text-xl font-bold mb-3">Delete Movie</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete <b>{movieTitle}</b>?
            </p>

            <div className="flex justify-end gap-3">
              <AnimatedButton
                className="btn-secondary"
                onClick={onClose}
              >
                Cancel
              </AnimatedButton>

              <AnimatedButton
                className="bg-destructive text-destructive-foreground"
                onClick={onConfirm}
              >
                Delete
              </AnimatedButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
