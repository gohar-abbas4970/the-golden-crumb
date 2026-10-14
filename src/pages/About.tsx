import { Link } from 'react-router-dom';
import { Target, Eye, Heart, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import Seo from '@/components/Seo';
import { teamMembers, siteConfig } from '@/data/siteConfig';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'Make everyday moments and celebrations sweeter through thoughtfully prepared baked goods.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'Become a trusted neighborhood bakery known for quality, creativity, and warm hospitality.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description:
      'Freshness, craftsmanship, quality ingredients, hygiene, and genuine customer care in everything we bake.',
  },
];

const qualityPromises = [
  'Fresh daily preparation of breads and pastries where applicable',
  'Carefully selected ingredients for every recipe',
  'Clean and hygienic food-handling practices',
  'Thoughtful packaging to preserve quality',
  'Careful handling and attention to every custom order',
];

export default function About() {
  return (
    <>
      <Seo
        title="About Us | The Golden Crumb — Artisan Bakery in DHA Raya, Lahore"
        description="Meet The Golden Crumb, an artisan bakery serving the DHA Raya community in Lahore. Our mission, values, and the people behind the fresh, handcrafted baked goods we love to share."
        path="/about"
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="section-container pt-8 pb-16 lg:pt-16 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="animate-fade-in-up">
              <span className="text-caramel text-sm font-medium uppercase tracking-wide">
                About The Golden Crumb
              </span>
              <h1 className="font-heading font-bold text-chocolate text-4xl sm:text-5xl lg:text-6xl leading-tight mt-3 mb-5">
                Baked with Love.
                <br />
                <span className="text-caramel">Made for Sharing.</span>
              </h1>
              <p className="text-chocolate/70 text-lg leading-relaxed max-w-md">
                The Golden Crumb is an artisan bakery serving the DHA Raya community in
                Lahore — a place where fresh ingredients, careful hands, and warm
                hospitality come together in every bake.
              </p>
            </div>
            <div className="animate-fade-in">
              <div className="relative">
                <div className="absolute -inset-4 bg-blush/30 rounded-3xl rotate-3" />
                <img
                  src="https://images.pexels.com/photos/33249098/pexels-photo-33249098.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="A cozy bakery adorned with lights and freshly baked goods on display"
                  className="relative rounded-2xl-card shadow-xl w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-12 bg-gradient-to-b from-transparent to-beige/20" />
      </section>

      {/* Our story */}
      <section className="section-container py-16 lg:py-20">
        <div className="max-w-3xl mx-auto">
          <span className="text-caramel text-sm font-medium uppercase tracking-wide block text-center mb-3">
            Our Story
          </span>
          <h2 className="font-heading font-bold text-chocolate text-3xl sm:text-4xl text-center mb-8">
            The Joy of Freshly Baked Goodness
          </h2>
          <div className="space-y-5 text-chocolate/70 leading-relaxed text-center">
            <p>
              There is something special about the aroma of fresh bread filling the air —
              a warmth that makes any place feel like home. That is the feeling we set out
              to share when we opened The Golden Crumb.
            </p>
            <p>
              We believe in the simple pleasure of a buttery croissant in the morning, the
              comfort of a soft loaf for lunch, and the delight of a beautifully crafted
              cake for a celebration. Every item we bake is prepared with attention to
              detail — from choosing ingredients to shaping each pastry by hand.
            </p>
            <p>
              More than a bakery, we want to be a part of the moments that bring people
              together in DHA Raya. Whether it is a quick treat or a custom cake for a
              milestone worth celebrating, we are honored to be a small part of it.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, vision, values */}
      <section className="bg-beige/20 py-16 lg:py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-chocolate text-3xl sm:text-4xl">
              What Drives Us
            </h2>
            <p className="text-chocolate/60 mt-3 max-w-2xl mx-auto">
              The principles behind every bake at The Golden Crumb.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl-card p-8 border border-beige/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-blush/40 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-8 h-8 text-caramel" />
                </div>
                <h3 className="font-heading font-semibold text-chocolate text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-chocolate/60 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-container py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-chocolate text-3xl sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="text-chocolate/60 mt-3 max-w-2xl mx-auto">
            The people who make the magic happen — names will be added as our team grows.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.role}
              className="bg-white rounded-2xl-card border border-beige/50 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-heading font-semibold text-chocolate text-lg">
                  {member.role}
                </h3>
                <p className="text-chocolate/50 text-sm mt-1">
                  {member.isPlaceholder
                    ? 'Name to be confirmed'
                    : member.name}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-chocolate/40 text-xs mt-6 max-w-xl mx-auto">
          Team profiles use illustrative imagery and placeholder names. They will be
          updated with verified team information before launch.
        </p>
      </section>

      {/* Quality promise */}
      <section className="bg-beige/20 py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-full bg-blush/40 flex items-center justify-center mx-auto mb-5">
                <ShieldCheck className="w-8 h-8 text-caramel" />
              </div>
              <h2 className="font-heading font-bold text-chocolate text-3xl sm:text-4xl mb-3">
                Our Quality Promise
              </h2>
              <p className="text-chocolate/60 leading-relaxed">
                These are the standards we are committed to upholding. Only practices we
                can verify will be claimed as part of our process.
              </p>
            </div>
            <ul className="space-y-3">
              {qualityPromises.map((promise) => (
                <li
                  key={promise}
                  className="flex items-start gap-3 bg-white rounded-xl-card p-4 border border-beige/50"
                >
                  <CheckCircle className="w-5 h-5 text-caramel flex-shrink-0 mt-0.5" />
                  <span className="text-chocolate/70 text-sm">{promise}</span>
                </li>
              ))}
            </ul>
            <div className="text-center mt-10">
              <Link to="/products" className="btn-caramel">
                Explore Our Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
