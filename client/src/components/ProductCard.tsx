import { memo } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface ProductCardProps {
  type: 'icecream' | 'fries' | 'photobooth' | 'coming-soon';
  title: string;
  price: number;
  image?: string;
  onClick: () => void;
}

export const ProductCard = memo(function ProductCard({ type, title, price, image, onClick }: ProductCardProps) {
  const isIce = type === 'icecream';
  const isPhotobooth = type === 'photobooth';
  const isComingSoon = type === 'coming-soon';
  const bgColor = isIce ? 'bg-blue-100' : isPhotobooth ? 'bg-purple-100' : isComingSoon ? 'bg-gray-100' : 'bg-red-100';
  const borderColor = isIce ? 'border-blue-300' : isPhotobooth ? 'border-purple-300' : isComingSoon ? 'border-gray-300' : 'border-red-300';
  const textColor = isIce ? 'text-blue-800' : isPhotobooth ? 'text-purple-800' : isComingSoon ? 'text-gray-400' : 'text-red-800';

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl
        ${isComingSoon ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${bgColor} border-2 ${borderColor}
        shadow-[0_8px_0_0_rgba(0,0,0,0.15)]
        transition-colors duration-200
        group
      `}
    >
      <div className="p-4 flex flex-col items-center text-center space-y-3">
        {/* Image Placeholder or Actual Image */}
        <div className="w-24 h-24 rounded-full bg-white/80 shadow-inner flex items-center justify-center text-4xl mb-2 relative z-10 overflow-hidden">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover drop-shadow-md" />
          ) : (
            <span>{isIce ? '🍦' : isPhotobooth ? '📸' : isComingSoon ? '🔜' : '🍟'}</span>
          )}
        </div>

        <div>
          <h3 className={`font-bold text-xl ${textColor} leading-tight`}>{title}</h3>
          <p className="text-gray-600 font-medium mt-1">Rp {price.toLocaleString()}</p>
        </div>
        
        <div className={`
          absolute bottom-0 right-0 p-3 
          ${isIce ? 'bg-blue-500' : isPhotobooth ? 'bg-purple-500' : isComingSoon ? 'bg-gray-400' : 'bg-red-500'} 
          rounded-tl-2xl text-white
          shadow-lg group-hover:scale-110 transition-transform
        `}>
          <Plus className="w-5 h-5" />
        </div>
      </div>
      
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent" />
    </motion.div>
  );
});
