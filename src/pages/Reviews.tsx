import { useState, useMemo } from 'react';
import Seo from '@/components/Seo';
import StarRating from '@/components/StarRating';
import ReviewCard from '@/components/ReviewCard';
import { supabase } from '@/lib/supabase';
import { getSampleReviews, products } from '@/data/products';
import type { Review } from '@/types';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest'>('recent');

  useEffect(() => {
    async function loadReviews() {
      try {
        const { data } = await supabase
          .from('reviews')
          .select('*')
          .eq('is_verified', true)
          .order('created_at', { ascending: false })
          .limit(50);

        const dbReviews: Review[] = (data || []).map((r) => ({
          id: r.id,
          product_id: r.product_id,
          customer_name: r.customer_name,
          rating: r.rating,
          title: r.title,
          body: r.body,
          image_url: r.image_url,
          created_at: r.created_at,
          is_verified: r.is_verified,
        }));

        const allSample = products.flatMap((p) => getSampleReviews(p.id));
        setReviews([...dbReviews, ...allSample]);
      } catch {
        const allSample = products.flatMap((p) => getSampleReviews(p.id));
        setReviews(allSample);
      }
      setLoading(false);
    }
    loadReviews();
  }, []);

  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];
    if (sortBy === 'highest') sorted.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'lowest') sorted.sort((a, b) => a.rating - b.rating);
    else sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return sorted;
  }, [reviews, sortBy]);

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <>
      <Seo title="Customer Reviews | The Golden Crumb" description="Read what customers say about The Golden Crumb bakery." path="/reviews" />
      <div className="section-container pt-8 pb-12 lg:pt-16 text-center">
        <span className="text-caramel text-sm font-medium uppercase tracking-wide">Customer Feedback</span>
        <h1 className="font-heading font-bold text-chocolate text-4xl sm:text-5xl mt-3 mb-4">Reviews &amp; Ratings</h1>
        <p className="text-chocolate/60 max-w-2xl mx-auto leading-relaxed">
          See what our customers have to say about our cakes, pastries, breads, and cookies.
        </p>
      </div>

      <section className="section-container pb-16 lg:pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Summary */}
          <div className="bg-white rounded-2xl-card border border-beige/50 p-6 mb-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center">
              <div className="font-heading font-bold text-chocolate text-5xl">{avgRating.toFixed(1)}</div>
              <StarRating rating={avgRating} size="md" />
              <p className="text-sm text-chocolate/50 mt-1">{reviews.length} reviews</p>
            </div>
            <div className="flex-1 w-full">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter((r) => r.rating === star).length;
                  const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2 text-sm">
                      <span className="text-chocolate/60 w-4">{star}</span>
                      <div className="flex-1 bg-beige/30 rounded-full h-2 overflow-hidden">
                        <div className="bg-caramel h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-chocolate/50 w-8 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-semibold text-chocolate text-lg">All Reviews</h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 bg-white border border-beige rounded-xl-card text-sm text-chocolate focus:outline-none focus:border-caramel"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-12 text-chocolate/50">Loading reviews...</div>
          ) : sortedReviews.length === 0 ? (
            <div className="text-center py-12 text-chocolate/50">No reviews yet. Be the first to leave one!</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {sortedReviews.map((review) => {
                const product = products.find((p) => p.id === review.product_id);
                return (
                  <div key={review.id}>
                    {product && (
                      <Link to={`/products/${product.slug}`} className="text-xs text-caramel hover:underline mb-1 inline-block">
                        {product.name}
                      </Link>
                    )}
                    <ReviewCard review={review} />
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-center text-xs text-chocolate/40 mt-8">
            Reviews labeled "Sample" are demo content and have not been verified as real customer feedback.
          </p>
        </div>
      </section>
    </>
  );
}
