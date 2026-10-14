import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
}

export default function StarRating({
  rating,
  size = 'sm',
  showValue = false,
  reviewCount,
}: StarRatingProps) {
  const dimensions = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  const starSize = dimensions[size];

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const fillRatio = Math.max(0, Math.min(1, rating - i));
          return (
            <div key={i} className="relative">
              <Star className={`${starSize} text-beige`} />
              {fillRatio > 0 && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fillRatio * 100}%` }}
                >
                  <Star className={`${starSize} fill-caramel text-caramel`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showValue && (
        <span className="font-medium text-chocolate text-sm">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-chocolate/50 text-sm">({reviewCount})</span>
      )}
    </div>
  );
}
