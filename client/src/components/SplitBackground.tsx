import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SplitBackground() {
  const [iceCubes, setIceCubes] = useState<number[]>([]);
  const [drips, setDrips] = useState<number[]>([]);

  useEffect(() => {
    // Generate random IDs for animation elements
    setIceCubes(Array.from({ length: 12 }, (_, i) => i));
    setDrips(Array.from({ length: 8 }, (_, i) => i));
  }, []);

  return (
    <div className="absolute inset-0 flex z-0 pointer-events-none">
      {/* Left Side - Blue/Ice */}
      <div className="w-1/2 h-full bg-blue-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 opacity-90" />
        
        {/* Falling Ice Cubes */}
        {iceCubes.map((i) => (
          <motion.div
            key={`ice-${i}`}
            className="absolute w-8 h-8 bg-white/20 border border-white/40 rounded-sm backdrop-blur-sm"
            initial={{ y: -50, x: Math.random() * 200, rotate: 0, opacity: 0 }}
            animate={{ 
              y: ["0vh", "100vh"], 
              rotate: 360,
              opacity: [0, 0.8, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* Right Side - Red/Crunch */}
      <div className="w-1/2 h-full bg-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500 to-red-700 opacity-90" />
        
        {/* Dripping Sauce */}
        {drips.map((i) => (
          <motion.div
            key={`drip-${i}`}
            className="absolute top-0 w-3 bg-red-900/40 rounded-b-full"
            initial={{ height: 0, opacity: 0.8 }}
            animate={{ 
              height: [0, 100 + Math.random() * 100],
              opacity: [0.8, 0] 
            }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              repeat: Infinity, 
              delay: Math.random() * 3,
              ease: "easeIn"
            }}
            style={{ left: `${10 + Math.random() * 80}%` }}
          />
        ))}
        
        {/* Floating Fries/Chips particles */}
        {drips.slice(0, 5).map((i) => (
           <motion.div
            key={`fry-${i}`}
            className="absolute w-6 h-2 bg-yellow-400/30 rounded-full"
            initial={{ y: -20, x: Math.random() * 100, rotate: 0 }}
            animate={{ 
              y: ["0vh", "100vh"],
              rotate: 180,
            }}
            transition={{ 
              duration: 4 + Math.random() * 4, 
              repeat: Infinity, 
              delay: Math.random() * 2,
              ease: "linear"
            }}
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>
      
      {/* Central Divider Shadow */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/10 shadow-[0_0_20px_10px_rgba(0,0,0,0.2)]" />
    </div>
  );
}
