import { useSearchParams } from 'react-router-dom';

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
}

export function CategoryFilter({ categories, selectedCategories }: CategoryFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    if (newCategories.length > 0) {
      searchParams.set('categories', newCategories.join(','));
    } else {
      searchParams.delete('categories');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategories.includes(category)
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}