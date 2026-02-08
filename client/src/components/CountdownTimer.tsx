import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer = memo(({ targetDate }: CountdownTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance > 0) {
        setTimeRemaining({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.9 }}
      className="w-full max-w-md"
    >
      <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border-2 border-white/20 shadow-xl">
        <p className="text-[#f2c552] text-sm font-semibold uppercase tracking-wider mb-4">
          Pre-Order Opens In
        </p>
        <div className="grid grid-cols-4 gap-3">
          {/* Days */}
          <CountdownBox value={timeRemaining.days} label="Days" />
          
          {/* Hours */}
          <CountdownBox value={timeRemaining.hours} label="Hours" />
          
          {/* Minutes */}
          <CountdownBox value={timeRemaining.minutes} label="Mins" />
          
          {/* Seconds */}
          <CountdownBox value={timeRemaining.seconds} label="Secs" />
        </div>
      </div>
    </motion.div>
  );
});

CountdownTimer.displayName = 'CountdownTimer';

// Separate component for each countdown box with memo
const CountdownBox = memo(({ value, label }: { value: number; label: string }) => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="bg-[#f2c552] rounded-xl px-3 py-4 min-w-[60px] shadow-lg"
      >
        <p className="text-3xl font-bold text-gray-900">
          {String(value).padStart(2, '0')}
        </p>
      </motion.div>
      <p className="text-white text-xs font-medium mt-2 uppercase">{label}</p>
    </div>
  );
});

CountdownBox.displayName = 'CountdownBox';

export default CountdownTimer;
