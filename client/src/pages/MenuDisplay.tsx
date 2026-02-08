import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, ChefHat, ChevronLeftCircleIcon } from 'lucide-react';
import { SplitBackground } from '@/components/SplitBackground';

export default function MenuDisplay() {
  const [, setLocation] = useLocation();

  return (
    <div className="app-container flex flex-col h-full bg-slate-50 relative">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 z-10 relative">
        <SplitBackground />
        {/* Header with Back Button */}
        <section className="p-4 mb-4 z-20 flex items-center gap-4 sticky top-0">
          <button
            onClick={() => setLocation('/welcome')}
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
              <div className="bg-black/20 rounded-2xl p-4 border-2 border-white/10">
                <img
                  src="https://img.pikbest.com/templates/20240711/food-menu-card-template-design-for-restaurants-design_10662181.jpg!w700wp"
                  alt="Menu Board"
                  className="w-full h-auto rounded-xl"
                  onError={(e) => {
                    // Fallback placeholder if image doesn't load
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect fill='%23374151' width='400' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23fff' font-size='20' font-family='Arial'%3EMenu Image%3C/text%3E%3C/svg%3E";
                  }}
                />
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
              For ordering, please use the Pre-order button
            </motion.p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
