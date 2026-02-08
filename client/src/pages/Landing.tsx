import { motion } from "framer-motion";
import { Link } from "wouter";
import { SplitBackground } from "@/components/SplitBackground";
import { Store, UtensilsCrossed, ArrowRight } from "lucide-react";
// Static images: import from @assets/logo.png
import logoImg from "../../public/assets/logo_sc.png"; 

export default function Landing() {
  return (
    <div className="app-container relative flex flex-col items-center justify-center">
      <SplitBackground />
      
      <div className="relative z-10 flex flex-col items-center p-8 text-center space-y-12 w-full">
        
        {/* Logo Area */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
          className="relative"
        >
          <div className="w-48 h-48 bg-white/90 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center border-8 border-white">
             {/* Using Unsplash fallback if local asset fails, but prefer local logo if available */}
             <img 
               src="/assets/1_1770537696754.png" 
               alt="Sweet Colony Logo" 
               className="w-40 h-40 object-contain drop-shadow-xl"
               onError={(e) => {
                 // Fallback if image load fails
                 e.currentTarget.src = "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop";
               }}
             />
          </div>
          
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 bg-yellow-400 text-black font-bold px-4 py-2 rounded-full shadow-lg border-2 border-white transform rotate-12"
          >
            OPEN!
          </motion.div>
        </motion.div>

        {/* Title Text */}
        <div className="space-y-2">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-tight"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            Sweet Colony
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/90 text-lg font-medium drop-shadow-md"
          >
            Where Crunch meets Creamy
          </motion.p>
        </div>

        {/* CTA Button */}
        <Link href="/menu" className="w-full max-w-xs group">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              w-full bg-white text-gray-900 
              py-4 px-8 rounded-2xl 
              font-bold text-xl 
              shadow-[0_8px_0_rgb(209,213,219)] 
              active:shadow-none active:translate-y-[8px]
              transition-all duration-150
              flex items-center justify-center gap-3
              border-2 border-gray-100
            "
          >
            <span>Order Now</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-white/60 text-sm">
        <p>Open Daily 10:00 - 20:00</p>
      </div>
    </div>
  );
}
