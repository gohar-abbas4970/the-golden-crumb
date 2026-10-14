import { Instagram, Facebook, MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import Seo from '@/components/Seo';
import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/data/siteConfig';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Us | The Golden Crumb — Bakery in DHA Raya, Lahore"
        description="Get in touch with The Golden Crumb for custom cakes, orders, or questions. Visit us in DHA Raya, Lahore, or send us a note through our contact form."
        path="/contact"
      />

      {/* Hero */}
      <section className="section-container pt-8 pb-12 lg:pt-16 lg:pb-12 text-center">
        <span className="text-caramel text-sm font-medium uppercase tracking-wide">
          Get in Touch
        </span>
        <h1 className="font-heading font-bold text-chocolate text-4xl sm:text-5xl mt-3 mb-4">
          We'd Love to Hear from You.
        </h1>
        <p className="text-chocolate/60 max-w-2xl mx-auto leading-relaxed">
          Have a question, need a custom cake, or planning something special? Get in
          touch with our team.
        </p>
      </section>

      {/* Contact info + form */}
      <section className="section-container pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Info column */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl-card p-6 border border-beige/50">
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-5">
                Business Information
              </h2>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-caramel flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-chocolate">Address</p>
                    <p className="text-chocolate/60">{siteConfig.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-caramel flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-chocolate">Phone</p>
                    <p className="text-chocolate/60">
                      {siteConfig.phone}
                      {!siteConfig.isContactInfoVerified && (
                        <span className="block text-xs text-chocolate/40 mt-0.5">
                          Placeholder — replace with verified number
                        </span>
                      )}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-caramel flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-chocolate">Email</p>
                    <p className="text-chocolate/60">
                      {siteConfig.email}
                      {!siteConfig.isContactInfoVerified && (
                        <span className="block text-xs text-chocolate/40 mt-0.5">
                          Placeholder — replace with verified email
                        </span>
                      )}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-caramel flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-chocolate">Opening Hours</p>
                    <p className="text-chocolate/60">
                      {siteConfig.openingHours}
                      {!siteConfig.isHoursVerified && (
                        <span className="block text-xs text-chocolate/40 mt-0.5">
                          Hours require confirmation
                        </span>
                      )}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl-card p-6 border border-beige/50">
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-4">
                Follow Us
              </h2>
              <div className="flex gap-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl-card bg-blush/30 text-chocolate hover:bg-blush/50 transition-colors"
                  aria-label="Visit our Instagram page"
                >
                  <Instagram className="w-5 h-5 text-caramel" />
                  <span className="text-sm font-medium">Instagram</span>
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl-card bg-blush/30 text-chocolate hover:bg-blush/50 transition-colors"
                  aria-label="Visit our Facebook page"
                >
                  <Facebook className="w-5 h-5 text-caramel" />
                  <span className="text-sm font-medium">Facebook</span>
                </a>
              </div>
              <p className="text-chocolate/40 text-xs mt-3">
                Social media links are placeholders until verified profiles are set up.
              </p>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl-card p-6 border border-beige/50">
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-4">
                Find Us
              </h2>
              <div className="rounded-xl-card overflow-hidden border border-beige">
                <iframe
                  src={siteConfig.mapsEmbedUrl}
                  title="Map showing The Golden Crumb bakery location in DHA Raya, Lahore"
                  className="w-full h-64"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={siteConfig.mapsLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-caramel text-sm font-medium mt-3 hover:underline"
              >
                Open in Google Maps
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Form column */}
          <div>
            <h2 className="font-heading font-semibold text-chocolate text-xl mb-5">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
