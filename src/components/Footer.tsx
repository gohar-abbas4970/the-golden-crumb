import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { siteConfig, footerLinks } from '@/data/siteConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-chocolate text-cream mt-16">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-caramel flex items-center justify-center">
                <span className="font-heading font-bold text-white text-lg">GC</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">
                The Golden Crumb
              </span>
            </div>
            <p className="text-cream/80 text-sm leading-relaxed max-w-xs">
              {siteConfig.tagline}. Artisan cakes, pastries, breads, and cookies —
              handcrafted with love in DHA Raya, Lahore.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-chocolate-light flex items-center justify-center hover:bg-caramel transition-colors"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-chocolate-light flex items-center justify-center hover:bg-caramel transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer link groups */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-heading font-semibold text-white mb-4 text-base">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-cream/80 hover:text-caramel text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-chocolate-light">
          <div className="flex items-start gap-2 text-sm text-cream/80">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-caramel" />
            <span>{siteConfig.address}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-cream/80">
            <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-caramel" />
            <span>{siteConfig.phone}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-cream/80">
            <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-caramel" />
            <span>{siteConfig.openingHours}</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-chocolate-light">
        <div className="section-container py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream/60 text-sm">
            {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-cream/50 text-xs">
            Freshly baked in DHA Raya, Lahore, Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
