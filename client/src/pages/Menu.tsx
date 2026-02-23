import { useState, useMemo, useCallback, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ShoppingCart, ChefHat, IceCream, Minus, Plus, ChevronLeftCircleIcon, Camera } from 'lucide-react';
import { SplitBackground } from '@/components/SplitBackground';
import { ProductCard } from '@/components/ProductCard';
import { BlackboardModal } from '@/components/BlackboardModal';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: number;
  type: 'icecream' | 'fries' | 'photobooth' | 'coming-soon';
  title: string;
  price: number;
  image: string;
  description: string;
}

interface MenuData {
  menu: MenuItem[];
  addons: Record<string, string[]>;
  sizes: Record<string, { id: number; label: string; price: number }[]>;
}

export default function Menu() {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const { addItem, items } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    fetch('https://n8ntiyas.tiyasakbar.my.id/webhook/sweet-colony/menu', {
      headers: { 'x-server-key': 'tiyasganteng' },
    })
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setMenuData(json.data);
        else setFetchError('Failed to load menu data.');
      })
      .catch(() => setFetchError('Failed to connect to menu service.'))
      .finally(() => setIsLoading(false));
  }, []);

  // Memoize filtered menu items to prevent recalculation
  const iceCreamItems = useMemo(() => menuData?.menu.filter((i) => i.type === 'icecream') ?? [], [menuData]);
  const friesItems = useMemo(() => menuData?.menu.filter((i) => i.type === 'fries') ?? [], [menuData]);
  const photoboothItems = useMemo(() => menuData?.menu.filter((i) => i.type === 'photobooth') ?? [], [menuData]);
  const comingSoonItems = useMemo(() => menuData?.menu.filter((i) => i.type === 'coming-soon') ?? [], [menuData]);

  // Memoize cart count calculation
  const cartCount = useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items]);

  const handleOpenModal = useCallback(
    (item: MenuItem) => {
      setSelectedItem(item);
      // Set default size
      const sizes = menuData?.sizes[item.type] ?? [];
      const defaultSize = sizes[0]?.label ?? '';
      setSelectedSize(defaultSize);
      setSelectedAddons([]);
      setQuantity(1); // Reset quantity to 1
    },
    [menuData],
  );

  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!selectedItem) return;

    // Calculate extra price from size
    const sizeObj = (menuData?.sizes[selectedItem.type] ?? []).find((s) => s.label === selectedSize);
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
  }, [selectedItem, selectedSize, selectedAddons, quantity, addItem, toast, menuData]);

  const toggleAddon = useCallback(
    (addon: string) => {
      if (selectedAddons.includes(addon)) {
        setSelectedAddons([]);
      } else {
        setSelectedAddons([addon]);
      }
    },
    [selectedAddons],
  );

  const handleNavigateToWelcome = useCallback(() => {
    setLocation('/welcome');
  }, [setLocation]);

  const handleNavigateToCart = useCallback(() => {
    setLocation('/cart');
  }, [setLocation]);

  if (isLoading) {
    return (
      <div className="app-container flex flex-col h-full bg-slate-50 relative">
        <main className="flex-1 overflow-y-auto p-4">
          <SplitBackground />
          {/* Header skeleton */}
          <section className="p-4 mb-4 z-20 flex items-center gap-4 relative top-0">
            <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse" />
            <div className="flex-1 h-8 rounded-lg bg-white/20 animate-pulse mx-4" />
            <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse" />
          </section>
          <div className="space-y-8 relative z-10 pb-20">
            {/* Ice cream section skeleton */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border-2 border-blue-200">
              <div className="h-7 w-40 rounded-lg bg-blue-100 animate-pulse mb-4" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                    <div className="h-28 bg-gray-200 animate-pulse" />
                    <div className="p-3 space-y-2">
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                      <div className="h-3 w-1/2 bg-gray-100 animate-pulse rounded" />
                      <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Fries section skeleton */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border-2 border-red-200">
              <div className="h-7 w-40 rounded-lg bg-red-100 animate-pulse mb-4" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                    <div className="h-28 bg-gray-200 animate-pulse" />
                    <div className="p-3 space-y-2">
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                      <div className="h-3 w-1/2 bg-gray-100 animate-pulse rounded" />
                      <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="app-container flex flex-col h-full bg-slate-50 items-center justify-center">
        <p className="text-red-500 text-lg">{fetchError}</p>
      </div>
    );
  }

  return (
    <div className="app-container flex flex-col h-full bg-slate-50 relative">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <SplitBackground />

        <section className="p-4 mb-4 z-20 flex items-center gap-4 relative top-0">
          <button
            onClick={handleNavigateToWelcome}
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
                {iceCreamItems.map((item) => (
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
                {friesItems.map((item) => (
                  <ProductCard key={item.id} {...item} onClick={() => handleOpenModal(item)} />
                ))}
              </div>
            </div>
          </section>

          {/* Photobooth Section */}
          {photoboothItems.length > 0 && (
            <section>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border-2 border-purple-200">
                <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                  <Camera className="w-6 h-6" /> Photobooth
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {photoboothItems.map((item) => (
                    <ProductCard key={item.id} {...item} onClick={() => handleOpenModal(item)} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Coming Soon Section */}
          {comingSoonItems.length > 0 && (
            <section>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border-2 border-gray-300">
                <h2 className="text-2xl font-bold text-gray-500 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔜</span> Coming Soon
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {comingSoonItems.map((item) => (
                    <ProductCard key={item.id} {...item} onClick={() => {}} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Floating Cart Button */}
      <div className="absolute bottom-6 right-6 z-30">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNavigateToCart}
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
        onClose={handleCloseModal}
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
            {(menuData?.sizes[selectedItem.type] ?? []).length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3 font-semibold">Choose Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {(menuData?.sizes[selectedItem.type] ?? []).map((size) => (
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
            )}

            {/* Addons Selection */}
            {(menuData?.addons[selectedItem.type] ?? []).length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3 font-semibold">
                  {selectedItem.type === 'icecream' ? 'Toppings' : 'Seasoning'}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {(menuData?.addons[selectedItem.type] ?? []).map((addon) => (
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
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedAddons.includes(addon) ? 'border-yellow-400' : 'border-gray-500'
                        }`}
                      >
                        {selectedAddons.includes(addon) && <div className="w-2 h-2 rounded-full bg-yellow-400" />}
                      </div>
                      {addon}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                    selectedItem.price +
                    ((menuData?.sizes[selectedItem.type] ?? []).find((s) => s.label === selectedSize)?.price || 0)
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-gray-300 font-semibold">Total Price</span>
                <span className="text-2xl font-bold text-yellow-400">
                  Rp{' '}
                  {(
                    (selectedItem.price +
                      ((menuData?.sizes[selectedItem.type] ?? []).find((s) => s.label === selectedSize)?.price || 0)) *
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
