import { useState, type FormEvent } from 'react';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { validateEmail } from '@/lib/formatting';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }
    setError(null);
    setStatus('loading');
    try {
      // Demo submission — no backend connected
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl-card p-4"
        role="alert"
      >
        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
        <div>
          <p className="text-green-800 font-medium text-sm">
            You are subscribed!
          </p>
          <p className="text-green-600 text-xs mt-0.5">
            This is a demo form — no newsletter service is connected yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-chocolate/30" />
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
              if (status !== 'idle') setStatus('idle');
            }}
            placeholder="Enter your email"
            className={`input-field pl-11 ${error ? 'border-red-300' : ''}`}
            aria-label="Email address for newsletter signup"
            aria-invalid={!!error}
            aria-describedby={error ? 'newsletter-error' : undefined}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-caramel whitespace-nowrap disabled:opacity-60"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </div>
      {error && (
        <p id="newsletter-error" className="text-red-500 text-xs mt-2">
          {error}
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-500 text-xs mt-2">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
