import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { memo, useMemo } from 'react';
import { SplitBackground } from '@/components/SplitBackground';
import CountdownTimer from '@/components/CountdownTimer';
import { Instagram, MessageCircle } from 'lucide-react';

const Welcome = memo(function Welcome() {
  return (
    <div className="app-container relative flex flex-col items-center justify-center">
      <SplitBackground />

      <div className="relative z-10 flex flex-col items-center p-8 text-center space-y-8 w-full overflow-auto">
        {/* Title Text */}
        <div className="space-y-2 pt-3 ">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold text-[#f2c552] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-tight"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            <img src="/assets/sweet_colony.svg" alt="Sweet Colony" />
          </motion.div>
        </div>
        {/* Logo Area */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
          className="relative !mt-4"
        >
          <div className="w-64 h-64 flex items-center justify-center">
            <img
              src="/assets/main_icon.webp"
              alt="Sweet Colony Logo"
              className=""
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop';
              }}
            />
          </div>
        </motion.div>

        {/* Date and School Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-1 !mt-3"
        >
          <p className="text-[#f2c552] text-xl font-bold drop-shadow-md backdrop-blur-md rounded-[10px]">24 Februari 2026</p>
          <p className="text-[#f2c552]/90 text-lg font-medium drop-shadow-md backdrop-blur-md rounded-[10px]">SMAK 6 Penabur</p>
        </motion.div>

        {/* Social Media Icons */}
        <SocialIcons />

        {/* Action Buttons */}
        <div className="w-full max-w-xs space-y-3">
          {/* Menu Button */}
          <Link href="/menu-display" className="block w-full">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                w-full bg-white text-gray-900 
                py-4 px-8 rounded-2xl 
                font-bold text-xl 
                shadow-[0_8px_0_rgb(209,213,219)] 
                active:shadow-none active:translate-y-[8px]
                transition-all duration-150
                border-2 border-gray-100
              "
            >
              Menu
            </motion.button>
          </Link>

          {/* Pre-order Button */}
          <Link href="/menu" className="block w-full">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                w-full bg-yellow-400 text-gray-900 
                py-4 px-8 rounded-2xl 
                font-bold text-xl 
                shadow-[0_8px_0_rgb(217,119,6)] 
                active:shadow-none active:translate-y-[8px]
                transition-all duration-150
                border-2 border-yellow-300
              "
            >
              Pre-order
            </motion.button>
          </Link>
        </div>

        {/* Countdown Timer */}
        <CountdownTimer targetDate="2026-02-24T00:00:00" />
      </div>
    </div>
  );
});

Welcome.displayName = 'Welcome';

// Memoized social icons to prevent re-renders
const SocialIcons = memo(function SocialIcons() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="flex gap-4 !mt-3"
    >
      <a
        href="https://instagram.com/sweetcolony"
        target="_blank"
        rel="noopener noreferrer"
        className="backdrop-blur-md rounded-[10px] shadow-lg hover:scale-110 transition-transform"
      >
        <Instagram className="w-12 h-12 text-white" />
      </a>
      <a
        href="https://wa.me/6281513512116"
        target="_blank"
        rel="noopener noreferrer"
        className="backdrop-blur-md rounded-[10px] shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-12 h-12 text-white" />
      </a>
    </motion.div>
  );
});

export default Welcome;
