import { CheckCircle, Calendar } from 'lucide-react';
import StarRating from '@/components/StarRating';
import type { Review } from '@/types';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-xl-card p-5 border border-beige/50">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-heading font-semibold text-chocolate">{review.customer_name}</p>
            {review.is_verified && (
              <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={review.rating} size="sm" />
            <span className="text-chocolate/40 text-xs flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(review.created_at)}
            </span>
          </div>
        </div>
      </div>
      {review.title && (
        <h4 className="font-medium text-chocolate text-sm mb-1.5">{review.title}</h4>
      )}
      <p className="text-chocolate/70 text-sm leading-relaxed">{review.body}</p>
      {review.image_url && (
        <div className="mt-3 rounded-lg overflow-hidden">
          <img
            src={review.image_url}
            alt={`Review photo by ${review.customer_name}`}
            className="w-full max-h-48 object-cover"
          />
        </div>
      )}
      {review.is_sample && (
        <p className="text-xs text-chocolate/30 mt-2 italic">Sample review — not from a verified customer</p>
      )}
    </div>
  );
}
