import { useState, useEffect } from 'react';
import { Check, X, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { products } from '@/data/products';
import type { Review } from '@/types';

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        const { data } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });
        setReviews((data || []) as unknown as Review[]);
      } catch {
        // empty
      }
      setLoading(false);
    }
    loadReviews();
  }, []);

  const toggleVerified = async (id: string, current: boolean) => {
    await supabase.from('reviews').update({ is_verified: !current }).eq('id', id);
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, is_verified: !current } : r)));
  };

  const deleteReview = async (id: string) => {
    await supabase.from('reviews').delete().eq('id', id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-heading font-bold text-chocolate text-3xl mb-2">Review Moderation</h1>
      <p className="text-chocolate/60 text-sm mb-6">Verify or remove customer reviews. Verified reviews appear on product pages.</p>

      {loading ? (
        <p className="text-chocolate/50 text-sm">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-2xl-card border border-beige/50 p-8 text-center">
          <Star className="w-12 h-12 text-beige mx-auto mb-3" />
          <p className="text-chocolate/50">No reviews submitted yet. Customer reviews will appear here for moderation.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => {
            const product = products.find((p) => p.id === review.product_id);
            return (
              <div key={review.id} className="bg-white rounded-2xl-card border border-beige/50 p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="font-medium text-chocolate text-sm">{review.customer_name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${s <= review.rating ? 'text-caramel fill-caramel' : 'text-beige'}`}
                        />
                      ))}
                    </div>
                    {product && <p className="text-xs text-caramel mt-1">{product.name}</p>}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${review.is_verified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {review.is_verified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
                {review.title && <p className="font-medium text-chocolate text-sm mb-1">{review.title}</p>}
                <p className="text-sm text-chocolate/70 mb-3">{review.body}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleVerified(review.id, review.is_verified)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    {review.is_verified ? 'Unverify' : 'Verify'}
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
