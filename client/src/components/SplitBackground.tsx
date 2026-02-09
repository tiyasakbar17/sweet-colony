import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';

// Pre-calculate max height once
const MAX_HEIGHT = typeof window !== 'undefined' ? window.innerHeight : 2000;

// Generate ice cube configs once
const generateIceCubeConfig = (index: number) => ({
  id: index,
  size: 32 + Math.random() * 24,
  left: Math.random() * 100,
  duration: 6 + Math.random() * 6,
  delay: Math.random() * 5,
});

// Generate drip configs once
const generateDripConfig = (index: number) => ({
  id: index,
  left: 0 + Math.random() * 0,
  size: 200 + Math.random() * 200,
  delay: Math.random() * 5,
  duration: 5 + Math.random() * 5,
  fromTop: Math.random() > 0.5,
});

const SplitBackground = memo(() => {
  // Memoize animation configs to prevent recalculation
  const iceCubeConfigs = useMemo(() => Array.from({ length: 12 }, (_, i) => generateIceCubeConfig(i)), []);

  const dripConfigs = useMemo(() => Array.from({ length: 2 }, (_, i) => generateDripConfig(i)), []);

  return (
    <div className="absolute inset-0 flex z-0 pointer-events-none opacity-90">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20 z-[5]" />
      {/* Left Side - Blue/Ice */}
      <div className="w-1/2 h-full bg-blue-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 opacity-90" />

        {/* Falling Ice Cubes */}
        {iceCubeConfigs.map((config) => (
          <motion.img
            key={`ice-${config.id}`}
            src="/assets/ice-cube.svg"
            alt="ice cube"
            className="absolute"
            style={{
              width: `${config.size}px`,
              height: `${config.size}px`,
              left: `${config.left}%`,
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))',
            }}
            initial={{ y: -50, rotate: 0, opacity: 0 }}
            animate={{
              y: ['0vh', '110vh'],
              rotate: [0, 360],
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{
              duration: config.duration,
              repeat: Infinity,
              delay: config.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Right Side - Red/Crunch */}
      <div className="w-1/2 h-full bg-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500 to-red-700 opacity-90" />

        {/* Sauce Dispensing Animation */}
        {dripConfigs.map((config, index) => (
          <div
            key={`sauce-${config.id}`}
            className="absolute"
            style={{
              left: `${config.left}%`,
              top: index % 2 === 0 ? 0 : 'auto',
              bottom: index % 2 === 0 ? 'auto' : 0,
            }}
          >
            {/* Sauce being squeezed out */}
            <motion.div
              className="relative"
              style={{
                width: `400px`,
              }}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: [0, MAX_HEIGHT, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: config.duration,
                repeat: Infinity,
                delay: config.delay,
                ease: 'easeOut',
                times: [0, 0.7, 1],
              }}
            >
              <motion.img
                src="/assets/sauce.svg"
                alt="sauce"
                className="absolute left-0 w-full"
                style={{
                  filter: 'drop-shadow(0 6px 12px rgba(139, 0, 0, 0.7))',
                  height: MAX_HEIGHT,
                  objectFit: 'cover',
                  top: index % 2 === 0 ? 0 : 'auto',
                  bottom: index % 2 === 0 ? 'auto' : 0,
                  transform: index % 2 === 0 ? 'none' : 'scaleY(-1)',
                }}
                initial={{ y: index % 2 === 0 ? -MAX_HEIGHT : MAX_HEIGHT, opacity: 0 }}
                animate={{
                  y: index % 2 === 0 ? [-MAX_HEIGHT, 0, 0] : [MAX_HEIGHT, 0, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: config.duration * 0.6,
                  repeat: Infinity,
                  delay: config.delay,
                  ease: 'easeOut',
                  times: [0, 0.5, 1],
                }}
              />
            </motion.div>

            {/* Dripping effect at the end */}
            <motion.div
              className="absolute w-8 bg-red-900/70"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: index % 2 === 0 ? '0 0 999px 999px' : '999px 999px 0 0',
              }}
              initial={{ height: 0, [index % 2 === 0 ? 'top' : 'bottom']: 0, opacity: 0 }}
              animate={{
                height: [0, 0, 60, 0],
                [index % 2 === 0 ? 'top' : 'bottom']: [0, MAX_HEIGHT, MAX_HEIGHT, MAX_HEIGHT + 50],
                opacity: [0, 0, 1, 0],
              }}
              transition={{
                duration: config.duration,
                repeat: Infinity,
                delay: config.delay,
                ease: "easeIn",
                times: [0, 0.65, 0.85, 1],
              }}
            />
          </div>
        ))}
      </div>

      {/* Central Divider Shadow */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/10 shadow-[0_0_20px_10px_rgba(0,0,0,0.2)]" />
    </div>
  );
});

SplitBackground.displayName = 'SplitBackground';

export { SplitBackground };
