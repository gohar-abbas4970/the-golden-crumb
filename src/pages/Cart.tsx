import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Cake } from 'lucide-react';
import Seo from '@/components/Seo';
import { useCart } from '@/hooks/useCart';
import { formatPKR } from '@/lib/formatting';
import { siteConfig } from '@/data/siteConfig';

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  const hasDeliveryItems = items.some((i) => !i.customConfig);
  const deliveryFee = subtotal > 0 ? siteConfig.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <>
        <Seo title="Shopping Cart | The Golden Crumb" description="Your shopping cart" path="/cart" />
        <div className="section-container py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 rounded-full bg-beige/50 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-beige" />
            </div>
            <h1 className="font-heading font-bold text-chocolate text-3xl mb-3">Your Cart is Empty</h1>
            <p className="text-chocolate/60 mb-8">Browse our delicious products and add your favorites to the cart.</p>
            <Link to="/products" className="btn-caramel">Explore Products</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo title="Shopping Cart | The Golden Crumb" description="Your shopping cart" path="/cart" />
      <div className="section-container pt-8 pb-16">
        <h1 className="font-heading font-bold text-chocolate text-3xl mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const unitPrice = item.customPrice ?? item.product.price;
              return (
                <div key={item.lineId} className="bg-white rounded-2xl-card border border-beige/50 p-4 sm:p-5">
                  <div className="flex gap-4">
                    <img src={item.product.image} alt={item.product.alt} className="w-20 h-20 rounded-xl-card object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link to={`/products/${item.product.slug}`} className="font-medium text-chocolate hover:text-caramel transition-colors">
                            {item.product.name}
                          </Link>
                          {item.customConfig && (
                            <p className="text-xs text-caramel flex items-center gap-1 mt-0.5">
                              <Cake className="w-3 h-3" /> Custom Cake
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.lineId)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.customConfig && (
                        <div className="mt-2 pt-2 border-t border-beige/30 text-xs text-chocolate/60 space-y-0.5">
                          {item.customConfig.cakeType && <p>Type: {item.customConfig.cakeType}</p>}
                          {item.customConfig.size && <p>Size: {item.customConfig.size}</p>}
                          {item.customConfig.flavor && <p>Flavor: {item.customConfig.flavor}</p>}
                          {item.customConfig.frosting && <p>Frosting: {item.customConfig.frosting}</p>}
                          {item.customConfig.inscription && <p>Inscription: "{item.customConfig.inscription}"</p>}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-beige/30 rounded-xl-card p-1">
                          <button
                            onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-white text-chocolate flex items-center justify-center hover:bg-beige transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium text-chocolate w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-white text-chocolate flex items-center justify-center hover:bg-beige transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-caramel font-semibold">{unitPrice > 0 ? formatPKR(unitPrice * item.quantity) : 'On Request'}</p>
                          {unitPrice > 0 && <p className="text-xs text-chocolate/40">{formatPKR(unitPrice)} each</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex items-center justify-between pt-2">
              <Link to="/products" className="text-sm text-caramel font-medium hover:underline">Continue Shopping</Link>
              <button onClick={clearCart} className="text-sm text-chocolate/50 hover:text-red-500 transition-colors">Clear Cart</button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl-card border border-beige/50 p-6 space-y-4">
              <h2 className="font-heading font-bold text-chocolate text-lg">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-chocolate/60">Subtotal</span>
                  <span className="font-medium text-chocolate">{subtotal > 0 ? formatPKR(subtotal) : 'On Request'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-chocolate/60">Delivery Fee</span>
                  <span className="font-medium text-chocolate">{formatPKR(deliveryFee)}</span>
                </div>
                <div className="border-t border-beige/50 pt-2 flex justify-between">
                  <span className="font-heading font-semibold text-chocolate">Total</span>
                  <span className="font-heading font-bold text-chocolate text-lg">{total > 0 ? formatPKR(total) : 'On Request'}</span>
                </div>
              </div>
              <Link to="/checkout" className="btn-caramel w-full">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-xs text-chocolate/40 text-center">
                Demo mode — no real payment will be processed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
