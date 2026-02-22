import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  type: 'icecream' | 'fries' | 'photobooth';
  variant: string; // Flavor or Size
  addons: string[]; // Toppings or Seasonings
  price: number;
  quantity: number;
};

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, delta: number) => void;
  total: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => set((state) => {
        const id = Math.random().toString(36).substring(7);
        return { items: [...state.items, { ...newItem, id }] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),
      clearCart: () => set({ items: [] }),
      updateQuantity: (id, delta) => set((state) => ({
        items: state.items.map((item) => {
          if (item.id === id) {
            const newQty = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        }),
      })),
      total: () => {
        return get().items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'sweet-colony-cart',
    }
  )
);
