import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CartItem, Product } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          const updatedItems = items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set({
            items: updatedItems,
            total: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
            itemCount: updatedItems.length,
          });
        } else {
          const updatedItems = [...items, { ...product, quantity: 1 }];
          set({
            items: updatedItems,
            total: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
            itemCount: updatedItems.length,
          });
        }
      },
      removeItem: (productId) => {
        const updatedItems = get().items.filter((item) => item.id !== productId);
        set({
          items: updatedItems,
          total: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
          itemCount: updatedItems.length,
        });
      },
      updateQuantity: (productId, quantity) => {
        const updatedItems = get().items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );
        set({
          items: updatedItems,
          total: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
          itemCount: updatedItems.length,
        });
      },
      clearCart: () => set({ items: [], total: 0, itemCount: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);