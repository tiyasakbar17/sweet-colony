import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface ProductCardProps {
  type: 'icecream' | 'fries';
  title: string;
  price: number;
  image?: string;
  onClick: () => void;
}

export function ProductCard({ type, title, price, image, onClick }: ProductCardProps) {
  const isIce = type === 'icecream';
  const bgColor = isIce ? 'bg-blue-100' : 'bg-red-100';
  const borderColor = isIce ? 'border-blue-300' : 'border-red-300';
  const textColor = isIce ? 'text-blue-800' : 'text-red-800';

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl cursor-pointer
        ${bgColor} border-2 ${borderColor}
        shadow-[0_8px_0_0_rgba(0,0,0,0.15)]
        transition-colors duration-200
        group
      `}
    >
      <div className="p-4 flex flex-col items-center text-center space-y-3">
        {/* Image Placeholder or Actual Image */}
        <div className="w-24 h-24 rounded-full bg-white/80 shadow-inner flex items-center justify-center text-4xl mb-2 relative z-10">
          {image ? (
            <img src={image} alt={title} className="w-20 h-20 object-contain drop-shadow-md" />
          ) : (
            <span>{isIce ? '🍦' : '🍟'}</span>
          )}
        </div>

        <div>
          <h3 className={`font-bold text-xl ${textColor} leading-tight`}>{title}</h3>
          <p className="text-gray-600 font-medium mt-1">Rp {price.toLocaleString()}</p>
        </div>
        
        <div className={`
          absolute bottom-0 right-0 p-3 
          ${isIce ? 'bg-blue-500' : 'bg-red-500'} 
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
}
