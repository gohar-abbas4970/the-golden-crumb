import { Link } from 'react-router-dom';
import { Star, ArrowRight, Cake, Wheat, Crown, Truck, Quote } from 'lucide-react';
import Seo from '@/components/Seo';
import ProductCard from '@/components/ProductCard';
import NewsletterForm from '@/components/NewsletterForm';
import { featuredProducts } from '@/data/products';
import { testimonials, testimonialDisclaimer, siteConfig } from '@/data/siteConfig';

const whyChooseUs = [
  {
    icon: Wheat,
    title: 'Freshly Baked Daily',
    description: 'Small batches prepared throughout the day for maximum freshness.',
  },
  {
    icon: Crown,
    title: 'Premium Ingredients',
    description: 'Quality ingredients and carefully crafted recipes in every bite.',
  },
  {
    icon: Cake,
    title: 'Custom Celebration Cakes',
    description: 'Personalized cakes for birthdays, weddings, and special occasions.',
  },
  {
    icon: Truck,
    title: 'DHA Lahore Delivery',
    description: 'Delivery options for DHA Raya and nearby DHA Lahore areas (subject to availability).',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'fill-caramel text-caramel' : 'text-beige'
          }`}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="The Golden Crumb | Best Bakery in DHA Raya, Lahore"
        description="Freshly Baked Happiness in the Heart of DHA Raya. Handcrafted cakes, golden pastries, artisan breads, and sweet treats. Order online or visit our bakery in DHA Raya, Lahore."
        path="/"
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="section-container pt-8 pb-16 lg:pt-16 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 animate-fade-in-up">
              <span className="inline-block bg-blush/50 text-chocolate text-sm font-medium px-4 py-1.5 rounded-full mb-5">
                {siteConfig.tagline}
              </span>
              <h1 className="font-heading font-bold text-chocolate text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5">
                Little Moments.
                <br />
                <span className="text-caramel">Freshly Baked.</span>
              </h1>
              <p className="text-chocolate/70 text-lg leading-relaxed mb-8 max-w-md">
                From handcrafted cakes to golden, buttery pastries, discover freshly
                baked happiness in the heart of DHA Raya.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/products" className="btn-caramel">
                  Order Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/products" className="btn-outline">
                  Explore Our Menu
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 animate-fade-in">
              <div className="relative">
                <div className="absolute -inset-4 bg-blush/30 rounded-3xl rotate-3" />
                <img
                  src="https://images.pexels.com/photos/29380155/pexels-photo-29380155.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Display of freshly baked bread and pastries in a cozy artisan bakery interior"
                  className="relative rounded-2xl-card shadow-xl w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Decorative wave */}
        <div className="h-12 bg-gradient-to-b from-transparent to-beige/20" />
      </section>

      {/* Featured products */}
      <section className="section-container py-16 lg:py-20">
        <div className="text-center mb-10">
          <span className="text-caramel text-sm font-medium uppercase tracking-wide">
            Customer Favorites
          </span>
          <h2 className="font-heading font-bold text-chocolate text-3xl sm:text-4xl mt-2">
            Featured Treats
          </h2>
          <p className="text-chocolate/60 mt-3 max-w-2xl mx-auto">
            A taste of what is baking in our oven today — from rich cakes to flaky pastries.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/products" className="btn-outline">
            View Full Menu
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-beige/20 py-16 lg:py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-chocolate text-3xl sm:text-4xl">
              Why Choose The Golden Crumb?
            </h2>
            <p className="text-chocolate/60 mt-3 max-w-2xl mx-auto">
              We pour our heart into every bake — here is what sets us apart.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl-card p-6 border border-beige/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-blush/40 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-caramel" />
                </div>
                <h3 className="font-heading font-semibold text-chocolate text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-chocolate/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand story preview */}
      <section className="section-container py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-blush/30 rounded-3xl -rotate-3" />
            <img
              src="https://images.pexels.com/photos/38455659/pexels-photo-38455659.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Baker working by hand with flour and dough, creating artisanal bread"
              className="relative rounded-2xl-card shadow-xl w-full aspect-[4/3] object-cover"
            />
          </div>
          <div>
            <span className="text-caramel text-sm font-medium uppercase tracking-wide">
              Our Story
            </span>
            <h2 className="font-heading font-bold text-chocolate text-3xl sm:text-4xl mt-2 mb-5">
              Baked with Care, Shared with Love
            </h2>
            <p className="text-chocolate/70 leading-relaxed mb-4">
              At The Golden Crumb, we believe that every loaf of bread and every cake
              tells a story. Our small bakery in DHA Raya is built on a simple passion —
              bringing people together through the joy of freshly baked food.
            </p>
            <p className="text-chocolate/70 leading-relaxed mb-6">
              From carefully selecting our ingredients to handcrafting each pastry, we
              treat every order as if it were for our own family. Whether it is a loaf of
              sourdough for your morning or a custom cake for a celebration, we are here
              to make it special.
            </p>
            <Link to="/about" className="btn-caramel">
              Read Our Story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-beige/20 py-16 lg:py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-chocolate text-3xl sm:text-4xl">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-2xl-card p-6 border border-beige/50 hover:shadow-lg transition-shadow"
              >
                <Quote className="w-8 h-8 text-blush mb-3" />
                <StarRating rating={testimonial.rating} />
                <p className="text-chocolate/70 leading-relaxed mt-3 mb-5 text-sm">
                  "{testimonial.text}"
                </p>
                <p className="font-heading font-semibold text-chocolate">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-chocolate/40 text-xs mt-6 max-w-xl mx-auto">
            {testimonialDisclaimer}
          </p>
        </div>
      </section>

      {/* Promotional banner */}
      <section className="section-container py-16 lg:py-20">
        <div className="relative overflow-hidden rounded-2xl-card bg-chocolate text-cream">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.pexels.com/photos/5691261/pexels-photo-5691261.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative p-8 sm:p-12 lg:p-16 text-center">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">
              Make Every Celebration Sweeter.
            </h2>
            <p className="text-cream/80 max-w-2xl mx-auto leading-relaxed mb-8">
              From intimate birthdays to unforgettable celebrations, let us create
              something special for your table.
            </p>
            <Link to="/custom-cake" className="btn-caramel">
              Request a Custom Cake
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blush/20 py-16 lg:py-20">
        <div className="section-container text-center">
          <h2 className="font-heading font-bold text-chocolate text-3xl sm:text-4xl mb-3">
            Fresh from Our Oven
          </h2>
          <p className="text-chocolate/60 max-w-2xl mx-auto mb-8">
            Get bakery updates, seasonal treats, and special announcements delivered to
            your inbox.
          </p>
          <div className="flex justify-center">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
