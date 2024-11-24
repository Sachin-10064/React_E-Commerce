import { AlertCircle, ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { cn, formatPrice } from '../lib/utils';
import { useCartStore } from '../store/cart';
import { useProductStore } from '../store/useProduct';
import { Product } from '../types';

export function ProductDetail() {
  const { id } = useParams();
  // const [product, setProduct] = useState<Product | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const { product,loading,getProductById } = useProductStore();
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    getProductById(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  //       <div className="max-w-7xl mx-auto">
  //         <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2 text-red-700">
  //           <AlertCircle className="w-5 h-5" />
  //           <p>{error}</p>
  //         </div>
  //         <Link
  //           to="/"
  //           className="inline-flex items-center text-blue-600 hover:underline"
  //         >
  //           <ArrowLeft className="w-5 h-5 mr-2" />
  //           Return to home
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to products
        </Link>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={product?.image}
                alt={product?.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mb-2">
                  {product?.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product?.title}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "w-5 h-5",
                          star <= product?.rating.rate
                            ? "text-yellow-400"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product?.rating.count} reviews)
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900 mb-4">
                  {formatPrice(product?.price)}
                </p>
                <p className="text-gray-600 mb-8">{product?.description}</p>
              </div>
              <button
                onClick={() => addItem(product)}
                className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}