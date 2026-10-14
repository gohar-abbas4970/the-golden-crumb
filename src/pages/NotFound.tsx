import { Link } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';
import Seo from '@/components/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found | The Golden Crumb" description="The page you are looking for does not exist." path="/404" />
      <div className="section-container py-20 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="font-heading font-bold text-chocolate text-6xl mb-4">404</h1>
          <p className="text-chocolate/60 text-lg mb-2">Oops! This page took a wrong turn.</p>
          <p className="text-chocolate/50 text-sm mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/" className="btn-caramel">
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
