import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface BlackboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

export function BlackboardModal({ isOpen, onClose, title, children, action }: BlackboardModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm bg-blackboard p-6 blackboard-scroll max-h-[80vh] overflow-y-auto"
        >
          <div className="flex items-start justify-between mb-6 border-b border-white/20 pb-4">
            <h2 className="text-2xl font-bold text-chalk font-display tracking-wide">{title}</h2>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-full transition-colors text-chalk"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-6">
            {children}
          </div>
          
          {action && (
            <div className="mt-8 pt-4 border-t border-white/20">
              {action}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
