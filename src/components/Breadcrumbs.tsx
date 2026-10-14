import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Breadcrumb {
  label: string;
  path?: string;
}

export default function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-sm">
      <Link
        to="/"
        className="text-chocolate/50 hover:text-caramel transition-colors flex items-center gap-1"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1">
          <ChevronRight className="w-3.5 h-3.5 text-chocolate/30" />
          {item.path ? (
            <Link
              to={item.path}
              className="text-chocolate/50 hover:text-caramel transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-chocolate font-medium" aria-current="page">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
