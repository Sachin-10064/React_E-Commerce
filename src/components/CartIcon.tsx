import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cart';
import { formatPrice } from '../lib/utils';

export function CartIcon() {
  const { itemCount, total } = useCartStore();

  return (
    <Link
      to="/cart"
      className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50 flex items-center gap-2"
    >
      <ShoppingCart className="w-6 h-6" />
      <div className="flex flex-col items-end">
        <span className="text-sm font-medium">{itemCount} items</span>
        <span className="text-xs">{formatPrice(total)}</span>
      </div>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}