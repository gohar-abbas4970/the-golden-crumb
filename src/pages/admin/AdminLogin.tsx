import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Loader2 } from 'lucide-react';
import Seo from '@/components/Seo';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLogin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      setError(signInError);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <>
      <Seo title="Admin Login | The Golden Crumb" description="Admin login" path="/admin/login" />
      <div className="section-container py-16 lg:py-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-caramel flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-heading font-bold text-chocolate text-3xl">Admin Login</h1>
            <p className="text-chocolate/60 text-sm mt-2">Sign in to access the admin dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl-card border border-beige/50 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-chocolate mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="admin@thegoldencrumb.pk"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-chocolate mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" disabled={loading} className="btn-caramel w-full disabled:opacity-60">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <p className="text-xs text-chocolate/40 text-center mt-4">
            Admin access requires an authorized account. Contact your system administrator if you need access.
          </p>
          <div className="text-center mt-4">
            <Link to="/" className="text-sm text-caramel hover:underline">Back to Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
