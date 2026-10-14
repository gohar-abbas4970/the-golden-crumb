import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Minus,
  Plus,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react';
import Seo from '@/components/Seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductImageGallery from '@/components/ProductImageGallery';
import StarRating from '@/components/StarRating';
import ReviewSection from '@/components/ReviewSection';
import { getProductBySlug, priceDisclaimer } from '@/data/products';

import { useCart } from '@/hooks/useCart';
import { formatPKR } from '@/lib/formatting';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addItem, setCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!product) {
    return (
      <div className="section-container py-20 text-center">
        <h1 className="font-heading font-bold text-chocolate text-3xl mb-4">
          Product Not Found
        </h1>
        <p className="text-chocolate/60 mb-6">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link to="/products" className="btn-caramel">
          Back to Products
        </Link>
      </div>
    );
  }

  const isCustomOrder = product.category === 'Custom Orders';
  const variant = product.variants?.[selectedVariant];
  const unitPrice = variant?.price ?? product.price;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    if (isCustomOrder) {
      navigate('/custom-cake');
      return;
    }
    const productWithVariant = variant
      ? { ...product, price: variant.price, variants: undefined }
      : product;
    addItem(productWithVariant, quantity);
  };

  const handleBuyNow = () => {
    if (isCustomOrder) {
      navigate('/custom-cake');
      return;
    }
    const productWithVariant = variant
      ? { ...product, price: variant.price, variants: undefined }
      : product;
    addItem(productWithVariant, quantity);
    setCartOpen(true);
  };

  return (
    <>
      <Seo
        title={`${product.name} | The Golden Crumb`}
        description={product.description}
        path={`/products/${product.slug}`}
        image={product.image}
      />

      <div className="section-container pt-6 pb-4">
        <Breadcrumbs
          items={[
            { label: 'Products', path: '/products' },
            { label: product.category, path: `/products?category=${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      {/* Product main section */}
      <section className="section-container pb-12 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="animate-fade-in">
            <ProductImageGallery gallery={product.gallery} />
          </div>

          {/* Product info */}
          <div className="animate-fade-in-up">
            <span className="text-xs text-caramel font-medium uppercase tracking-wide">
              {product.category}
            </span>
            <h1 className="font-heading font-bold text-chocolate text-3xl sm:text-4xl mt-2 mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <StarRating
                rating={product.rating}
                size="md"
                showValue
                reviewCount={product.reviewCount}
              />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-5">
              {unitPrice > 0 ? (
                <span className="font-heading font-bold text-chocolate text-2xl">
                  {formatPKR(unitPrice)}
                </span>
              ) : (
                <span className="font-heading font-bold text-chocolate text-2xl">
                  Price on Request
                </span>
              )}
              {product.priceNote && unitPrice === product.price && (
                <span className="text-chocolate/50 text-sm">{product.priceNote}</span>
              )}
            </div>

            {/* Short description */}
            <p className="text-chocolate/70 leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Full description */}
            <div className="bg-beige/20 rounded-xl-card p-4 mb-5">
              <p className="text-chocolate/70 text-sm leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-5">
                <span className="block text-sm font-medium text-chocolate mb-2">
                  Size
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.label}
                      onClick={() => setSelectedVariant(idx)}
                      className={`px-4 py-2 rounded-xl-card text-sm font-medium border-2 transition-all ${
                        selectedVariant === idx
                          ? 'border-caramel bg-caramel text-white'
                          : 'border-beige text-chocolate hover:border-caramel/50'
                      }`}
                    >
                      {v.label}
                      <span className="ml-1.5 opacity-70">{formatPKR(v.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Product details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 text-sm">
              {product.flavorInfo && (
                <div className="bg-white rounded-lg p-3 border border-beige/50">
                  <span className="text-chocolate/50 text-xs block mb-0.5">Flavor</span>
                  <span className="text-chocolate font-medium">{product.flavorInfo}</span>
                </div>
              )}
              {product.servingInfo && (
                <div className="bg-white rounded-lg p-3 border border-beige/50">
                  <span className="text-chocolate/50 text-xs block mb-0.5">Serving</span>
                  <span className="text-chocolate font-medium">{product.servingInfo}</span>
                </div>
              )}
              {product.prepTime && (
                <div className="bg-white rounded-lg p-3 border border-beige/50">
                  <span className="text-chocolate/50 text-xs block mb-0.5">Preparation</span>
                  <span className="text-chocolate font-medium text-xs">{product.prepTime}</span>
                </div>
              )}
              {product.availability && (
                <div className="bg-white rounded-lg p-3 border border-beige/50">
                  <span className="text-chocolate/50 text-xs block mb-0.5">Availability</span>
                  <span className="text-chocolate font-medium">{product.availability}</span>
                </div>
              )}
            </div>

            {/* Ingredients and allergens */}
            {(product.ingredients || product.allergens) && (
              <div className="space-y-2 mb-5">
                {product.ingredients && (
                  <div className="text-sm">
                    <span className="font-medium text-chocolate">Ingredients: </span>
                    <span className="text-chocolate/60">{product.ingredients}</span>
                  </div>
                )}
                {product.allergens && (
                  <div className="flex items-start gap-2 text-sm bg-amber-50 rounded-lg p-3 border border-amber-200">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="text-amber-800">{product.allergens}</span>
                  </div>
                )}
              </div>
            )}

            {/* Quantity + actions */}
            {!isCustomOrder && (
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium text-chocolate">Quantity</span>
                <div className="flex items-center gap-2 bg-white border border-beige rounded-xl-card p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg text-chocolate hover:bg-beige/50 flex items-center justify-center transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-medium text-chocolate w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg text-chocolate hover:bg-beige/50 flex items-center justify-center transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {unitPrice > 0 && (
                  <span className="text-chocolate/60 text-sm ml-auto">
                    Total: <span className="font-heading font-bold text-chocolate">{formatPKR(totalPrice)}</span>
                  </span>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleAddToCart} className="btn-caramel flex-1">
                <ShoppingCart className="w-5 h-5" />
                {isCustomOrder ? 'Start Customizing' : 'Add to Cart'}
              </button>
              {!isCustomOrder && (
                <button onClick={handleBuyNow} className="btn-outline flex-1">
                  Buy Now
                </button>
              )}

            </div>

            <p className="text-xs text-chocolate/40 mt-4">
              {priceDisclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {product.faqs && product.faqs.length > 0 && (
        <section className="section-container pb-12 lg:pb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-chocolate text-2xl mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {product.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl-card border border-beige/50 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left"
                    aria-expanded={openFaqIndex === idx}
                  >
                    <span className="font-medium text-chocolate text-sm">{faq.question}</span>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-4 h-4 text-caramel flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-caramel flex-shrink-0 ml-2" />
                    )}
                  </button>
                  {openFaqIndex === idx && (
                    <div className="px-4 pb-4 text-chocolate/70 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link to="/contact" className="text-caramel text-sm font-medium hover:underline">
                Have another question? Contact us →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className="section-container pb-16 lg:pb-20">
        <div className="max-w-3xl mx-auto">
          <ReviewSection
            productSlug={product.slug}
            productRating={product.rating}
            productReviewCount={product.reviewCount}
          />
        </div>
      </section>

      {/* Related products / custom cake CTA */}
      {isCustomOrder && (
        <section className="section-container pb-16 lg:pb-20">
          <div className="bg-chocolate text-cream rounded-2xl-card p-8 text-center">
            <h2 className="font-heading font-bold text-2xl mb-3">
              Ready to Design Your Cake?
            </h2>
            <p className="text-cream/80 mb-6 max-w-xl mx-auto">
              Use our step-by-step customizer to choose every detail — from flavor to frosting.
            </p>
            <Link to="/custom-cake" className="btn-caramel">
              Open Custom Cake Designer
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
