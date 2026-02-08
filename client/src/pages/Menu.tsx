import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ShoppingCart, ChefHat, IceCream, ArrowLeft, Minus, Plus, ChevronLeftCircleIcon } from 'lucide-react';
import { SplitBackground } from '@/components/SplitBackground';
import { ProductCard } from '@/components/ProductCard';
import { BlackboardModal } from '@/components/BlackboardModal';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

// Product Data
const MENU_ITEMS = [
  {
    id: 'ice-1',
    type: 'icecream' as const,
    title: 'Vanilla Cloud',
    price: 15000,
    image: 'https://www.nestleprofessional.in/sites/default/files/2024-10/Coconut-Ice-cream-756x471_5_11zon.jpg',
    description: 'Classic creamy vanilla with sprinkles',
  },
  {
    id: 'ice-2',
    type: 'icecream' as const,
    title: 'Choco Blast',
    price: 18000,
    image:
      'https://www.tasteofhome.com/wp-content/uploads/2018/01/Easy-Chocolate-Ice-Cream_EXPS_TOHVP24_4798_MF_06_06_1.jpg',
    description: 'Rich dark chocolate with chips',
  },
  {
    id: 'fry-1',
    type: 'fries' as const,
    title: 'Golden Fries',
    price: 12000,
    image: 'https://thecozycook.com/wp-content/uploads/2020/02/Copycat-McDonalds-French-Fries-.jpg',
    description: 'Crispy straight cut fries',
  },
  {
    id: 'fry-2',
    type: 'fries' as const,
    title: 'Curly Twist',
    price: 15000,
    image: 'https://chefjar.com/wp-content/uploads/2022/04/air-fryer-frozen-curly-fries-8.jpg',
    description: 'Seasoned curly fries',
  },
];

const ADDONS = {
  icecream: ['Oreo Crumbles', 'Rainbow Sprinkles', 'Choco Sauce', 'Strawberry Sauce'],
  fries: ['BBQ Powder', 'Cheese Sauce', 'Balado Spicy', 'Sea Salt'],
};

const SIZES = {
  icecream: [
    { label: 'Cone', price: 0 },
    { label: 'Cup', price: 2000 },
  ],
  fries: [
    { label: 'Small', price: 0 },
    { label: 'Medium', price: 3000 },
    { label: 'Large', price: 5000 },
  ],
};

export default function Menu() {
  const [selectedItem, setSelectedItem] = useState<(typeof MENU_ITEMS)[0] | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const { addItem, items } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleOpenModal = (item: (typeof MENU_ITEMS)[0]) => {
    setSelectedItem(item);
    // Set default size
    const defaultSize = SIZES[item.type][0].label;
    setSelectedSize(defaultSize);
    setSelectedAddons([]);
    setQuantity(1); // Reset quantity to 1
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;

    // Calculate extra price from size
    const sizeObj = SIZES[selectedItem.type].find((s) => s.label === selectedSize);
    const sizePrice = sizeObj ? sizeObj.price : 0;

    addItem({
      name: selectedItem.title,
      type: selectedItem.type,
      variant: selectedSize,
      addons: selectedAddons,
      price: selectedItem.price + sizePrice,
      quantity: quantity,
    });

    toast({
      title: 'Added to Cart! 🛒',
      description: `${quantity}x ${selectedItem.title} (${selectedSize}) added.`,
      duration: 2000,
    });

    setSelectedItem(null);
  };

  const toggleAddon = (addon: string) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons((prev) => prev.filter((a) => a !== addon));
    } else {
      setSelectedAddons((prev) => [...prev, addon]);
    }
  };

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container flex flex-col h-full bg-slate-50 relative">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <SplitBackground />

        <section className="p-4 mb-4 z-20 flex items-center gap-4 relative top-0">
          <button
            onClick={() => setLocation('/welcome')}
            className="flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeftCircleIcon className="text-[#f2c552] w-10 h-10" />
          </button>
          <h1 className="text-[#f2c552] text-4xl font-display font-bold text-chalk flex-1 text-center">Pre-Order</h1>
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <ChefHat className="text-blue-500 w-6 h-6" />
          </div>
        </section>
        <div className="space-y-8 relative z-10 pb-20">
          {/* Ice Cream Section */}
          <section>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border-2 border-blue-200 mb-4">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                <IceCream className="w-6 h-6" /> Creamy Selection
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {MENU_ITEMS.filter((i) => i.type === 'icecream').map((item) => (
                  <ProductCard key={item.id} {...item} onClick={() => handleOpenModal(item)} />
                ))}
              </div>
            </div>
          </section>

          {/* Fries Section */}
          <section>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border-2 border-red-200">
              <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
                <span className="text-2xl">🍟</span> Crunchy Corner
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {MENU_ITEMS.filter((i) => i.type === 'fries').map((item) => (
                  <ProductCard key={item.id} {...item} onClick={() => handleOpenModal(item)} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Floating Cart Button */}
      <div className="absolute bottom-6 right-6 z-30">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setLocation('/cart')}
          className="bg-yellow-400 text-black p-4 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] border-4 border-white relative"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* Customization Modal */}
      <BlackboardModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title || ''}
        action={
          <button
            onClick={handleAddToCart}
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl shadow-lg hover:bg-yellow-300 transition-colors"
          >
            Add to Order
          </button>
        }
      >
        {selectedItem && (
          <div className="space-y-6 text-chalk">
            {/* Size Selection */}
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3 font-semibold">Choose Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {SIZES[selectedItem.type].map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size.label)}
                    className={`
                      py-2 px-3 rounded-lg border text-sm font-medium transition-all
                      ${
                        selectedSize === size.label
                          ? 'bg-white text-black border-white'
                          : 'bg-transparent text-gray-400 border-gray-600 hover:border-gray-400'
                      }
                    `}
                  >
                    {size.label}
                    {size.price > 0 && <span className="block text-xs opacity-70">+{size.price / 1000}k</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Addons Selection */}
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3 font-semibold">
                {selectedItem.type === 'icecream' ? 'Toppings' : 'Seasoning'}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {ADDONS[selectedItem.type].map((addon) => (
                  <button
                    key={addon}
                    onClick={() => toggleAddon(addon)}
                    className={`
                      py-2 px-3 rounded-lg border text-sm text-left transition-all flex items-center gap-2
                      ${
                        selectedAddons.includes(addon)
                          ? 'bg-white/10 border-yellow-400 text-yellow-400'
                          : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500'
                      }
                    `}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border ${
                        selectedAddons.includes(addon) ? 'bg-yellow-400 border-yellow-400' : 'border-gray-500'
                      }`}
                    />
                    {addon}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3 font-semibold">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-lg bg-white/10 border border-gray-600 hover:border-yellow-400 hover:bg-white/20 transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-5 h-5 text-white" />
                </button>
                <div className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-center">
                  <span className="text-2xl font-bold text-yellow-400">{quantity}</span>
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-lg bg-white/10 border border-gray-600 hover:border-yellow-400 hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Price Preview */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Unit Price</span>
                <span className="text-white font-medium">
                  Rp{' '}
                  {(
                    selectedItem.price + (SIZES[selectedItem.type].find((s) => s.label === selectedSize)?.price || 0)
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-gray-300 font-semibold">Total Price</span>
                <span className="text-2xl font-bold text-yellow-400">
                  Rp{' '}
                  {(
                    (selectedItem.price +
                      (SIZES[selectedItem.type].find((s) => s.label === selectedSize)?.price || 0)) *
                    quantity
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </BlackboardModal>
    </div>
  );
}
