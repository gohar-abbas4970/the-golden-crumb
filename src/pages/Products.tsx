import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowRight, Cake, Search, X } from 'lucide-react';
import Seo from '@/components/Seo';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { products, categories, priceDisclaimer } from '@/data/products';
import type { ProductCategory } from '@/types';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'name';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selected, setSelected] = useState<'All' | ProductCategory>(
    (categoryParam as ProductCategory) || 'All',
  );
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam as 'All' | ProductCategory)) {
      setSelected(categoryParam as 'All' | ProductCategory);
    } else {
      setSelected('All');
    }
  }, [categoryParam]);

  const handleSelect = (cat: 'All' | ProductCategory) => {
    setSelected(cat);
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filtered = useMemo(() => {
    let result = selected === 'All' ? products : products.filter((p) => p.category === selected);

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.flavorInfo || '').toLowerCase().includes(q),
      );
    }

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [selected, search, sortBy]);

  return (
    <>
      <Seo
        title="Our Products | Cakes, Pastries, Breads & Cookies — The Golden Crumb"
        description="Browse our full menu of handcrafted cakes, delicate pastries, fresh breads, and sweet cookies. Custom celebration cakes available. Order from The Golden Crumb in DHA Raya, Lahore."
        path="/products"
      />

      {/* Intro */}
      <section className="section-container pt-8 pb-12 lg:pt-16 lg:pb-12 text-center">
        <span className="text-caramel text-sm font-medium uppercase tracking-wide">
          Our Menu
        </span>
        <h1 className="font-heading font-bold text-chocolate text-4xl sm:text-5xl mt-3 mb-4">
          Find Your New Favorite Treat.
        </h1>
        <p className="text-chocolate/60 max-w-2xl mx-auto leading-relaxed">
          Explore handcrafted cakes, delicate pastries, fresh breads, and sweet treats
          made for every occasion.
        </p>
      </section>

      {/* Filters + grid */}
      <section className="section-container pb-16 lg:pb-20">
        <div className="mb-6">
          <CategoryFilter
            categories={categories}
            selected={selected}
            onSelect={handleSelect}
          />
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-chocolate/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="input-field pl-11"
              aria-label="Search products"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-chocolate/40 hover:text-chocolate"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-3 bg-white border border-beige rounded-xl-card text-sm text-chocolate focus:outline-none focus:border-caramel"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        <p className="text-sm text-chocolate/50 mb-4">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-chocolate/50 text-lg">
              {search ? `No products match "${search}".` : 'No products found in this category.'}
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-caramel text-sm font-medium hover:underline mt-2"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        <p className="text-center text-chocolate/40 text-xs mt-8 max-w-xl mx-auto">
          {priceDisclaimer}
        </p>
      </section>

      {/* Custom cake CTA */}
      <section className="section-container pb-16 lg:pb-20">
        <div className="relative overflow-hidden rounded-2xl-card bg-chocolate text-cream">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.pexels.com/photos/10455239/pexels-photo-10455239.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative p-8 sm:p-12 lg:p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-caramel/20 flex items-center justify-center mx-auto mb-5">
              <Cake className="w-8 h-8 text-caramel-light" />
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">
              Have a Cake in Mind?
            </h2>
            <p className="text-cream/80 max-w-2xl mx-auto leading-relaxed mb-8">
              Tell us about your celebration, preferred flavors, design, and serving size.
              We would love to create something special just for you.
            </p>
            <Link to="/custom-cake" className="btn-caramel">
              Design Your Custom Cake
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
