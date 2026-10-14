import { useState, type FormEvent } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import {
  validateEmail,
  validatePakistaniPhone,
  validateRequired,
} from '@/lib/formatting';
import { siteConfig } from '@/data/siteConfig';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  message?: string | null;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    newErrors.name = validateRequired(form.name, 'Full name');
    newErrors.email = validateEmail(form.email);
    newErrors.phone = validatePakistaniPhone(form.phone);
    newErrors.subject = validateRequired(form.subject, 'Subject');
    newErrors.message = validateRequired(form.message, 'Message');
    setErrors(newErrors);
    return Object.values(newErrors).every((v) => v === null);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      // No backend configured — this is a demo submission
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-2xl-card p-6 sm:p-8 shadow-sm border border-beige/50">
      {status === 'success' && (
        <div
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl-card flex items-start gap-3"
          role="alert"
        >
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-green-800 font-medium text-sm">
              Thank you! Your message has been received.
            </p>
            <p className="text-green-600 text-xs mt-1">
              This is a demo form — no message was actually sent. Please contact us directly at{' '}
              {siteConfig.email} or {siteConfig.phone} until a form service is connected.
            </p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl-card flex items-start gap-3"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 font-medium text-sm">
            Something went wrong. Please try again or contact us directly.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-chocolate mb-1.5">
              Full Name <span className="text-caramel">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`input-field ${errors.name ? 'border-red-300' : ''}`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-red-500 text-xs mt-1.5">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-chocolate mb-1.5">
              Email Address <span className="text-caramel">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`input-field ${errors.email ? 'border-red-300' : ''}`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-xs mt-1.5">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-chocolate mb-1.5">
              Phone Number <span className="text-caramel">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="03001234567"
              className={`input-field ${errors.phone ? 'border-red-300' : ''}`}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="text-red-500 text-xs mt-1.5">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-chocolate mb-1.5">
              Subject <span className="text-caramel">*</span>
            </label>
            <input
              id="subject"
              type="text"
              value={form.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              className={`input-field ${errors.subject ? 'border-red-300' : ''}`}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
            />
            {errors.subject && (
              <p id="subject-error" className="text-red-500 text-xs mt-1.5">
                {errors.subject}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-chocolate mb-1.5">
            Message <span className="text-caramel">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            value={form.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className={`input-field resize-none ${errors.message ? 'border-red-300' : ''}`}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="text-red-500 text-xs mt-1.5">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-caramel w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
