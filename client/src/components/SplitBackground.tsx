import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SplitBackground() {
  const [iceCubes, setIceCubes] = useState<number[]>([]);
  const [drips, setDrips] = useState<number[]>([]);

  useEffect(() => {
    // Generate random IDs for animation elements
    setIceCubes(Array.from({ length: 12 }, (_, i) => i));
    setDrips(Array.from({ length: 2 }, (_, i) => i));
  }, []);

  return (
    <div className="absolute inset-0 flex z-0 pointer-events-none opacity-90">
      {/* Left Side - Blue/Ice */}
      <div className="w-1/2 h-full bg-blue-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 opacity-90" />
        
        {/* Falling Ice Cubes */}
        {iceCubes.map((i) => {
          const randomSize = 32 + Math.random() * 24; // Random size between 32-56px
          return (
            <motion.img
              key={`ice-${i}`}
              src="/assets/ice-cube.svg"
              alt="ice cube"
              className="absolute"
              style={{ 
                width: `${randomSize}px`,
                height: `${randomSize}px`,
                left: `${Math.random() * 100}%`,
                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))'
              }}
              initial={{ y: -50, rotate: 0, opacity: 0 }}
              animate={{ 
                y: ["0vh", "110vh"], 
                rotate: [0, 360],
                opacity: [0, 0.9, 0.9, 0]
              }}
              transition={{ 
                duration: 6 + Math.random() * 6, 
                repeat: Infinity, 
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          );
        })}
      </div>

      {/* Right Side - Red/Crunch */}
      <div className="w-1/2 h-full bg-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500 to-red-700 opacity-90" />
        
        {/* Sauce Dispensing Animation */}
        {drips.map((i) => {
          const randomLeft = 0 + Math.random() * 0;
          const randomSize = 200 + Math.random() * 200; // Size between 200-400px (HUGE!)
          const randomDelay = Math.random() * 5;
          const randomDuration = 5 + Math.random() * 5; // Duration 5-10 seconds (slower)
          // Use window height to ensure it covers the full screen
          const maxHeight = typeof window !== 'undefined' ? window.innerHeight : 2000; // Full viewport height!
          
          // Randomly choose direction: true = top-to-bottom, false = bottom-to-top
          const fromTop = Math.random() > 0.5;
          
          return (
            <div
              key={`sauce-${i}`}
              className="absolute"
              style={{ 
                left: `${randomLeft}%`,
                top: fromTop ? 0 : 'auto',
                bottom: fromTop ? 'auto' : 0
              }}
            >
              {/* Sauce being squeezed out */}
              <motion.div
                className="relative"
                style={{ 
                  width: `${randomSize}px`,
                }}
                initial={{ height: 0 }}
                animate={{ 
                  height: [0, maxHeight, 0],
                }}
                transition={{ 
                  duration: randomDuration,
                  repeat: Infinity, 
                  delay: randomDelay,
                  ease: "easeOut",
                  times: [0, 0.7, 1]
                }}
              >
                <motion.img
                  src="/assets/sauce.svg"
                  alt="sauce"
                  className="absolute left-0 w-full"
                  style={{
                    filter: 'drop-shadow(0 6px 12px rgba(139, 0, 0, 0.7))',
                    height: maxHeight, // Ensure image fills the container height
                    objectFit: 'cover', // Cover the full area
                    top: fromTop ? 0 : 'auto',
                    bottom: fromTop ? 'auto' : 0,
                    transform: fromTop ? 'none' : 'scaleY(-1)', // Flip vertically if from bottom
                  }}
                  initial={{ y: fromTop ? -maxHeight : maxHeight }}
                  animate={{ 
                    y: fromTop ? [-maxHeight, 0] : [maxHeight, 0],
                  }}
                  transition={{ 
                    duration: randomDuration * 0.6,
                    repeat: Infinity, 
                    delay: randomDelay,
                    ease: "easeOut"
                  }}
                />
              </motion.div>
              
              {/* Dripping effect at the end */}
              <motion.div
                className="absolute w-8 bg-red-900/70"
                style={{ 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  borderRadius: fromTop ? '0 0 999px 999px' : '999px 999px 0 0' // Round bottom if from top, top if from bottom
                }}
                initial={{ height: 0, [fromTop ? 'top' : 'bottom']: 0 }}
                animate={{ 
                  height: [0, 0, 60, 0],
                  [fromTop ? 'top' : 'bottom']: [0, maxHeight, maxHeight, maxHeight + 50]
                }}
                transition={{ 
                  duration: randomDuration,
                  repeat: Infinity, 
                  delay: randomDelay,
                  ease: "easeIn",
                  times: [0, 0.65, 0.85, 1]
                }}
              />
            </div>
          );
        })}
      </div>
      
      {/* Central Divider Shadow */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/10 shadow-[0_0_20px_10px_rgba(0,0,0,0.2)]" />
    </div>
  );
}
