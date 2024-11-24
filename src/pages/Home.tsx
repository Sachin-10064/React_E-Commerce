import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CategoryFilter } from '../components/CategoryFilter';
import { ProductCard } from '../components/ProductCard';
import { useProductStore } from '../store/useProduct';
import { Product } from '../types';

export function Home() {
  const { categories, products, loading, getAllProducts, getCategory, getProductByCategory } = useProductStore();

  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('default');
  const selectedCategories = useMemo(() => {
    const categories = searchParams.get('categories');
    return categories ? categories.split(',') : [];
  }, [searchParams]);

  const sortingProducts = useMemo(() => {  
    const sortedBy = searchParams.get('sort');
    console.log(sortedBy);
    setSortBy(sortedBy || 'default');
    let newProducts = products;
    if (sortedBy === 'default') {
      newProducts = products;
    } else if (sortedBy === 'asc') {
      newProducts = [...products].sort((a, b) => a.price - b.price);
    } else if (sortedBy === 'desc') {
      newProducts = [...products].sort((a, b) => b.price - a.price);
    } 
    setSortedProducts(newProducts);   
  }, [products, sortBy]);

  useEffect(() => {
    getAllProducts();
    getCategory();
  }, []);

  useEffect(() => {

    if (selectedCategories.length > 0) {
      console.log(selectedCategories);
      getProductByCategory(selectedCategories);
    } else {
      getAllProducts();
    }
  }, [selectedCategories]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    setSortBy(event.target.value);
    if (event.target.value === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', event.target.value);
    }
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
        />
        <div className="mb-4">
          <label htmlFor="sort" className="mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="border rounded px-2 py-1"
          >
            <option value="default"> Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>

          </select>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}