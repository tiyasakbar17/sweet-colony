import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { ChefHat, ChevronLeftCircleIcon, X, ZoomIn } from 'lucide-react';
import { SplitBackground } from '@/components/SplitBackground';

export default function MenuDisplay() {
  const [, setLocation] = useLocation();
  const [isZoomed, setIsZoomed] = useState(false);
  const menuImageUrl = 'https://img.pikbest.com/templates/20240711/food-menu-card-template-design-for-restaurants-design_10662181.jpg!w700wp';
  
  const handleNavigateBack = useCallback(() => {
    setLocation('/welcome');
  }, [setLocation]);
  
  const handleOpenZoom = useCallback(() => {
    setIsZoomed(true);
  }, []);
  
  const handleCloseZoom = useCallback(() => {
    setIsZoomed(false);
  }, []);

  return (
    <div className="app-container flex flex-col h-full bg-slate-50 relative">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <SplitBackground />
        {/* Header with Back Button */}
        <section className="p-4 mb-4 z-20 flex items-center gap-4 sticky top-0">
          <button
            onClick={handleNavigateBack}
            className="flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeftCircleIcon className="text-[#f2c552] w-10 h-10" />
          </button>
          <h1 className="text-[#f2c552] text-5xl font-display font-bold text-chalk flex-1 text-center">MENU</h1>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <ChefHat className="text-white w-6 h-6" />
          </div>
        </section>

        <div className="relative z-10 flex items-center justify-center min-h-full p-4">
          {/* Blackboard Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
            className="w-full max-w-2xl"
          >
            <div className="bg-blackboard rounded-3xl p-8 shadow-2xl border-8 border-[#8B4513] relative">
              {/* Blackboard Wood Frame Effect */}
              <div className="absolute inset-0 rounded-3xl shadow-inner pointer-events-none"></div>

              {/* Menu Image Container */}
              <div 
                className="bg-black/20 rounded-2xl p-4 border-2 border-white/10 cursor-pointer hover:bg-black/30 transition-all group relative"
                onClick={handleOpenZoom}
              >
                <img
                  src={menuImageUrl}
                  alt="Menu Board"
                  className="w-full h-auto rounded-xl transition-transform group-hover:scale-[1.02]"
                  onError={(e) => {
                    // Fallback placeholder if image doesn't load
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect fill='%23374151' width='400' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23fff' font-size='20' font-family='Arial'%3EMenu Image%3C/text%3E%3C/svg%3E";
                  }}
                />
                {/* Zoom Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-2xl">
                  <div className="bg-white/90 rounded-full p-4 shadow-xl">
                    <ZoomIn className="w-8 h-8 text-gray-900" />
                  </div>
                </div>
              </div>

              {/* Chalk Border Decoration */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-white/30 rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-white/30 rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-white/30 rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-white/30 rounded-br-lg"></div>
            </div>

            {/* Info Text */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-6 text-white text-sm"
            >
              Click image to zoom • For ordering, please use the Pre-order button
            </motion.p>
          </motion.div>
        </div>
      </main>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={handleCloseZoom}
          >
            {/* Close Button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ delay: 0.1 }}
              onClick={handleCloseZoom}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Zoomed Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.2 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={menuImageUrl}
                alt="Menu Board - Zoomed"
                className="w-full h-auto rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect fill='%23374151' width='400' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23fff' font-size='20' font-family='Arial'%3EMenu Image%3C/text%3E%3C/svg%3E";
                }}
              />
              
              {/* Close hint */}
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center mt-4 text-white/70 text-sm"
              >
                Click anywhere outside the image to close
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
