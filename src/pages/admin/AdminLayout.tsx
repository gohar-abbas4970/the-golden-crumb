import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Star, Settings, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { DEMO_MODE } from '@/data/siteConfig';

export default function AdminLayout() {
  const { session, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="section-container py-20 text-center text-chocolate/50">Loading...</div>
    );
  }

  if (!session || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/orders', label: 'Orders', icon: Package, end: false },
    { to: '/admin/reviews', label: 'Reviews', icon: Star, end: false },
    { to: '/admin/settings', label: 'Settings', icon: Settings, end: false },
  ];

  return (
    <div className="min-h-screen bg-cream flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-64 bg-chocolate text-cream lg:min-h-screen flex flex-col">
        <div className="p-5 border-b border-chocolate-light">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-caramel flex items-center justify-center">
              <span className="font-heading font-bold text-white text-sm">GC</span>
            </div>
            <div>
              <p className="font-heading font-bold text-white text-sm">Admin Panel</p>
              <p className="text-cream/50 text-xs">The Golden Crumb</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-x-auto lg:overflow-x-visible">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl-card text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive ? 'bg-caramel text-white' : 'text-cream/80 hover:bg-chocolate-light'
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-chocolate-light space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl-card text-sm font-medium text-cream/80 hover:bg-chocolate-light transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            View Website
          </a>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl-card text-sm font-medium text-cream/80 hover:bg-chocolate-light transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-x-auto">
        {DEMO_MODE && (
          <div className="bg-amber-100 border-b border-amber-200 px-6 py-2 text-center">
            <span className="text-amber-800 text-xs font-medium">
              Demo Mode Active — All data is for demonstration purposes only.
            </span>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}
