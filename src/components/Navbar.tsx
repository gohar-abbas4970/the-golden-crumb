import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { navLinks, siteConfig } from '@/data/siteConfig';
import { useCart } from '@/hooks/useCart';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { itemCount, setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 relative py-1 ${
      isActive
        ? 'text-caramel'
        : 'text-chocolate hover:text-caramel'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-md'
          : 'bg-cream/80 backdrop-blur-sm'
      }`}
    >
      <nav className="section-container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="The Golden Crumb — Home">
          <div className="w-10 h-10 rounded-full bg-caramel flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="font-heading font-bold text-white text-lg">GC</span>
          </div>
          <span className="font-heading font-bold text-chocolate text-xl hidden sm:inline">
            The Golden Crumb
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={navLinkClass} end={link.path === '/'}>
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-caramel rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-lg text-chocolate hover:bg-beige/50 transition-colors"
            aria-label={`View order basket (${itemCount} items)`}
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-caramel text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <Link to="/products" className="btn-caramel hidden sm:inline-flex text-sm">
            Order Now
          </Link>
          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-chocolate hover:bg-beige/50 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-cream z-40 animate-slide-down">
          <div className="section-container py-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-lg font-heading font-semibold py-4 px-4 rounded-xl-card transition-colors ${
                    isActive
                      ? 'bg-caramel text-white'
                      : 'text-chocolate hover:bg-beige/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/products" className="btn-caramel mt-4 text-base">
              Order Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
