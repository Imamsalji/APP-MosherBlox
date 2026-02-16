import { useNotifStore } from "./../store/appStore";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalConfirm() {
  const { open, title, message, onConfirm, onCancel } = useNotifStore();

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="
              relative w-[90%] max-w-md
              rounded-xl
              border border-cyan-400/50
              bg-[#0b0f1a]
              p-6
              shadow-[0_0_40px_rgba(0,255,255,0.35)]
            "
          >
            {/* Neon Glow */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-cyan-500 blur opacity-30" />

            <div className="relative z-10">
              {/* Title */}
              <h2 className="mb-3 text-xl font-bold uppercase tracking-widest text-cyan-400">
                {title}
              </h2>

              {/* Message */}
              <p className="mb-6 text-sm text-cyan-100/80">{message}</p>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={onCancel}
                  className="
                    px-4 py-2
                    rounded-md
                    border border-cyan-500/40
                    text-cyan-300
                    hover:bg-cyan-500/10
                    transition
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={onConfirm}
                  className="
                    px-4 py-2
                    rounded-md
                    bg-cyan-500
                    text-black
                    font-semibold
                    shadow-[0_0_20px_rgba(0,255,255,0.7)]
                    hover:shadow-[0_0_30px_rgba(0,255,255,1)]
                    transition
                  "
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
