import { useMemo } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ChevronLeft, ArrowRight, ReceiptText } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [, setLocation] = useLocation();

  // Memoize total price calculation
  const totalPrice = useMemo(() => total(), [total]);

  return (
    <div className="app-container flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm z-20 flex items-center gap-4 sticky top-0">
        <Link href="/menu">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Your Order</h1>
      </header>

      {/* Cart Items */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400 space-y-4">
            <ReceiptText className="w-16 h-16 opacity-50" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <Link href="/menu">
              <button className="text-blue-500 font-semibold hover:underline">Browse Menu</button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4 pb-24">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4"
                >
                  {/* Thumbnail */}
                  <div className={`w-20 h-20 rounded-lg flex items-center justify-center text-2xl shrink-0 ${item.type === 'icecream' ? 'bg-blue-50 text-blue-500' : 'bg-red-50 text-red-500'}`}>
                    {item.type === 'icecream' ? '🍦' : '🍟'}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-500 font-medium">{item.variant}</p>
                    {item.addons.length > 0 && (
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        + {item.addons.join(", ")}
                      </p>
                    )}

                    <div className="flex justify-between items-center mt-3">
                      <p className="font-bold text-gray-900">Rp {(item.price * item.quantity).toLocaleString()}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-gray-500 hover:text-black"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-gray-500 hover:text-black"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Footer Checkout */}
      {items.length > 0 && (
        <div className="bg-white border-t border-gray-200 p-6 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 font-medium">Total Total</span>
            <span className="text-2xl font-bold text-gray-900">Rp {totalPrice.toLocaleString()}</span>
          </div>
          <Link href="/checkout">
            <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group">
              Proceed to Checkout
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
