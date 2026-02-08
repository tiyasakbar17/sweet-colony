import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check, Home } from "lucide-react";

export default function Success() {
  return (
    <div className="app-container flex flex-col items-center justify-center bg-green-500 text-white p-8 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/20 rounded-full"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl"
      >
        <Check className="w-12 h-12 text-green-500 stroke-[3]" />
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold mb-4 text-center font-display"
      >
        Order Sent!
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-green-100 text-lg mb-12 max-w-xs"
      >
        Thank you for ordering. We are preparing your delicious snacks right now!
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link href="/">
          <button className="bg-white text-green-600 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
