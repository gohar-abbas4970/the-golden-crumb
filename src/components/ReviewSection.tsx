import { useState, useEffect, useCallback } from 'react';
import { MessageSquare, PenLine, ChevronDown } from 'lucide-react';
import StarRating from '@/components/StarRating';
import ReviewCard from '@/components/ReviewCard';
import ReviewForm from '@/components/ReviewForm';
import { getSampleReviews } from '@/data/products';
import { supabase } from '@/lib/supabase';
import type { Review } from '@/types';

interface ReviewSectionProps {
  productSlug: string;
  productRating: number;
  productReviewCount: number;
}

type SortOption = 'recent' | 'highest' | 'lowest';
type FilterOption = 0 | 1 | 2 | 3 | 4 | 5;

export default function ReviewSection({
  productSlug,
  productRating,
  productReviewCount,
}: ReviewSectionProps) {
  const [dbReviews, setDbReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [sort, setSort] = useState<SortOption>('recent');
  const [filter, setFilter] = useState<FilterOption>(0);
  const [visibleCount, setVisibleCount] = useState(5);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productSlug)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDbReviews((data || []) as Review[]);
    } catch {
      setDbReviews([]);
    } finally {
      setLoading(false);
    }
  }, [productSlug]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const sampleReviews = getSampleReviews(productSlug);
  const allReviews: Review[] = [...dbReviews, ...sampleReviews];

  // Rating distribution
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: allReviews.filter((r) => r.rating === stars).length,
  }));

  const totalReviews = allReviews.length;
  const avgRating =
    totalReviews > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : productRating;

  // Filter and sort
  let displayReviews = allReviews;
  if (filter > 0) {
    displayReviews = displayReviews.filter((r) => r.rating === filter);
  }
  displayReviews = [...displayReviews].sort((a, b) => {
    if (sort === 'recent') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (sort === 'highest') return b.rating - a.rating;
    return a.rating - b.rating;
  });

  const visibleReviews = displayReviews.slice(0, visibleCount);

  return (
    <div className="bg-cream rounded-2xl-card p-6 sm:p-8 border border-beige/50">
      <h2 className="font-heading font-bold text-chocolate text-2xl mb-6 flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-caramel" />
        Customer Reviews
      </h2>

      {/* Summary */}
      <div className="grid sm:grid-cols-2 gap-6 mb-6 pb-6 border-b border-beige/50">
        <div className="text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="font-heading font-bold text-chocolate text-4xl">
              {avgRating.toFixed(1)}
            </span>
            <div>
              <StarRating rating={avgRating} size="md" />
              <p className="text-chocolate/50 text-xs mt-1">
                {totalReviews > 0
                  ? `${totalReviews} review${totalReviews !== 1 ? 's' : ''}`
                  : `${productReviewCount} sample review${productReviewCount !== 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-outline mt-4 text-sm"
          >
            <PenLine className="w-4 h-4" />
            Write a Review
          </button>
        </div>

        {/* Distribution */}
        <div className="space-y-1.5">
          {distribution.map(({ stars, count }) => {
            const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <button
                key={stars}
                onClick={() => setFilter(filter === stars ? 0 : stars as FilterOption)}
                className={`flex items-center gap-2 w-full text-sm hover:opacity-80 transition-opacity ${
                  filter === stars ? 'opacity-100 font-medium' : ''
                }`}
              >
                <span className="text-chocolate/60 w-8 text-right">{stars}★</span>
                <div className="flex-1 h-2 bg-beige/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-caramel rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-chocolate/40 w-8 text-left">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Review form */}
      {showForm && (
        <div className="mb-6 bg-white rounded-xl-card p-5 border border-beige/50">
          <h3 className="font-heading font-semibold text-chocolate text-lg mb-4">Share Your Experience</h3>
          <ReviewForm productId={productSlug} onSubmitted={loadReviews} />
        </div>
      )}

      {/* Sort controls */}
      {displayReviews.length > 0 && (
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-chocolate/60">Sort by:</span>
          {(['recent', 'highest', 'lowest'] as SortOption[]).map((opt) => (
            <button
              key={opt}
              onClick={() => { setSort(opt); setVisibleCount(5); }}
              className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                sort === opt
                  ? 'bg-caramel text-white'
                  : 'text-chocolate/60 hover:bg-beige/50'
              }`}
            >
              {opt === 'recent' ? 'Most Recent' : opt === 'highest' ? 'Highest Rated' : 'Lowest Rated'}
            </button>
          ))}
          {filter > 0 && (
            <button
              onClick={() => setFilter(0)}
              className="text-sm text-caramel hover:underline ml-auto"
            >
              Clear filter ({filter}★)
            </button>
          )}
        </div>
      )}

      {/* Reviews list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl-card p-5 border border-beige/50 animate-pulse">
              <div className="h-4 bg-beige/50 rounded w-1/4 mb-2" />
              <div className="h-3 bg-beige/50 rounded w-full mb-1" />
              <div className="h-3 bg-beige/50 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : visibleReviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-chocolate/50 text-sm">
            {filter > 0
              ? `No ${filter}-star reviews yet.`
              : 'No reviews yet. Be the first to share your experience!'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {visibleCount < displayReviews.length && (
            <button
              onClick={() => setVisibleCount(visibleCount + 5)}
              className="w-full flex items-center justify-center gap-1.5 py-3 text-caramel font-medium text-sm hover:bg-beige/30 rounded-xl-card transition-colors"
            >
              Load More Reviews
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {totalReviews === 0 && sampleReviews.length === 0 && !loading && (
        <p className="text-center text-chocolate/30 text-xs mt-4 italic">
          Reviews submitted through this form are saved to our database. Sample reviews are shown where available for demonstration.
        </p>
      )}
    </div>
  );
}
