import type { ProductCategory } from '@/types';

interface CategoryFilterProps {
  categories: ('All' | ProductCategory)[];
  selected: 'All' | ProductCategory;
  onSelect: (category: 'All' | ProductCategory) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center" role="tablist" aria-label="Product categories">
      {categories.map((category) => {
        const isActive = category === selected;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            role="tab"
            aria-selected={isActive}
            className={`px-5 py-2.5 rounded-xl-card text-sm font-medium transition-all duration-300 ${
              isActive
                ? 'bg-caramel text-white shadow-md'
                : 'bg-white text-chocolate border border-beige hover:border-caramel hover:text-caramel'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
