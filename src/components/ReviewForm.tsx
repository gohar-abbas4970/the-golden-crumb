import { useState, type FormEvent } from 'react';
import { Star, Loader2, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ReviewFormProps {
  productId: string;
  onSubmitted: () => void;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ReviewForm({ productId, onSubmitted }: ReviewFormProps) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<{ name?: string; rating?: string; body?: string }>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = (): boolean => {
    const newErrors: { name?: string; rating?: string; body?: string } = {};
    if (!name.trim()) newErrors.name = 'Your name is required.';
    if (rating < 1 || rating > 5) newErrors.rating = 'Please select a star rating.';
    if (!body.trim()) newErrors.body = 'Please write your review.';
    if (body.length > 1000) newErrors.body = 'Review must be under 1000 characters.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      const { error } = await supabase.from('reviews').insert({
        product_id: productId,
        customer_name: name.trim(),
        rating,
        title: title.trim() || null,
        body: body.trim(),
        is_verified: false,
      });

      if (error) throw error;

      setStatus('success');
      setName('');
      setRating(0);
      setTitle('');
      setBody('');
      setTimeout(() => {
        onSubmitted();
        setStatus('idle');
      }, 2000);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl-card p-5 flex items-start gap-3" role="alert">
        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-green-800 font-medium text-sm">Thank you! Your review has been submitted.</p>
          <p className="text-green-600 text-xs mt-1">Loading updated reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl-card p-4 flex items-start gap-3" role="alert">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 text-sm">
            Could not submit your review. Please try again later.
          </p>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="review-name" className="block text-sm font-medium text-chocolate mb-1.5">
          Your Name <span className="text-caramel">*</span>
        </label>
        <input
          id="review-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`input-field ${errors.name ? 'border-red-300' : ''}`}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
      </div>

      {/* Rating */}
      <div>
        <span className="block text-sm font-medium text-chocolate mb-1.5">
          Rating <span className="text-caramel">*</span>
        </span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1"
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
            >
              <Star
                className={`w-7 h-7 transition-colors ${
                  (hoverRating || rating) >= star
                    ? 'fill-caramel text-caramel'
                    : 'text-beige'
                }`}
              />
            </button>
          ))}
        </div>
        {errors.rating && <p className="text-red-500 text-xs mt-1.5">{errors.rating}</p>}
      </div>

      {/* Title */}
      <div>
        <label htmlFor="review-title" className="block text-sm font-medium text-chocolate mb-1.5">
          Title <span className="text-chocolate/40 text-xs">(optional)</span>
        </label>
        <input
          id="review-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
      </div>

      {/* Body */}
      <div>
        <label htmlFor="review-body" className="block text-sm font-medium text-chocolate mb-1.5">
          Review <span className="text-caramel">*</span>
        </label>
        <textarea
          id="review-body"
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={1000}
          className={`input-field resize-none ${errors.body ? 'border-red-300' : ''}`}
          aria-invalid={!!errors.body}
        />
        <div className="flex justify-between mt-1">
          {errors.body ? (
            <p className="text-red-500 text-xs">{errors.body}</p>
          ) : (
            <span />
          )}
          <p className="text-chocolate/40 text-xs">{body.length}/1000</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-caramel disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Submit Review
          </>
        )}
      </button>
    </form>
  );
}
