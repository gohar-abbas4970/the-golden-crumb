import { Link } from 'react-router-dom';
import { Plus, Check } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { formatPKR } from '@/lib/formatting';
import StarRating from '@/components/StarRating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const availabilityColor: Record<string, string> = {
    'In Stock': 'bg-green-100 text-green-700',
    'Made to Order': 'bg-amber-100 text-amber-700',
    Limited: 'bg-red-100 text-red-700',
  };

  const isCustomOrder = product.category === 'Custom Orders';

  return (
    <Link to={`/products/${product.slug}`} className="block group">
      <div className="card-base hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.availability && (
            <span
              className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
                availabilityColor[product.availability] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {product.availability}
            </span>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <span className="text-xs text-caramel font-medium uppercase tracking-wide mb-1">
            {product.category}
          </span>
          <h3 className="font-heading font-semibold text-chocolate text-lg mb-1">
            {product.name}
          </h3>
          <div className="mb-2">
            <StarRating rating={product.rating} size="sm" showValue reviewCount={product.reviewCount} />
          </div>
          <p className="text-chocolate/70 text-sm leading-relaxed mb-4 flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between gap-3 mt-auto">
            <div className="flex flex-col">
              {product.price > 0 ? (
                <span className="font-heading font-bold text-chocolate text-lg">
                  {formatPKR(product.price)}
                </span>
              ) : null}
              {product.priceNote && (
                <span className="text-xs text-chocolate/50">{product.priceNote}</span>
              )}
            </div>
            {isCustomOrder ? (
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl-card text-sm font-medium bg-caramel text-white">
                Customize
              </span>
            ) : (
              <button
                onClick={handleAdd}
                disabled={justAdded}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl-card text-sm font-medium transition-all duration-300 active:scale-95 ${
                  justAdded
                    ? 'bg-green-500 text-white'
                    : 'bg-caramel text-white hover:bg-caramel-dark hover:shadow-md'
                }`}
                aria-label={`Add ${product.name} to order`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
