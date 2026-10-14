import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Cake } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPKR } from '@/lib/formatting';
import { siteConfig, DEMO_MODE } from '@/data/siteConfig';

export default function OrderBasket() {
  const {
    items,
    itemCount,
    subtotal,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-chocolate/40 backdrop-blur-sm z-50 animate-fade-in"
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />
      <aside
        className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-cream z-50 shadow-2xl flex flex-col animate-slide-down"
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between p-5 border-b border-beige">
          <h2 className="font-heading font-bold text-chocolate text-lg flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-caramel" />
            Cart ({itemCount})
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 rounded-lg text-chocolate hover:bg-beige/50 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <div className="w-20 h-20 rounded-full bg-beige/50 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-beige" />
              </div>
              <p className="font-heading text-chocolate text-lg">Your cart is empty</p>
              <p className="text-chocolate/60 text-sm">
                Browse our products and add your favorites.
              </p>
              <Link
                to="/products"
                onClick={() => setCartOpen(false)}
                className="btn-caramel mt-2 text-sm"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const unitPrice = item.customPrice ?? item.product.price;
                return (
                  <div
                    key={item.lineId}
                    className="bg-white rounded-xl-card p-3 border border-beige/50"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.alt}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-chocolate text-sm truncate">
                          {item.product.name}
                        </h3>
                        {item.customConfig && (
                          <p className="text-xs text-caramel flex items-center gap-1 mt-0.5">
                            <Cake className="w-3 h-3" />
                            Custom Cake
                          </p>
                        )}
                        <p className="text-caramel font-semibold text-sm mt-0.5">
                          {unitPrice > 0 ? formatPKR(unitPrice) : 'Price on Request'}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.lineId)}
                        className="self-start p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                        aria-label={`Remove ${item.product.name} from cart`}
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
                        {item.customConfig.deliveryMethod && <p>Delivery: {item.customConfig.deliveryMethod}</p>}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-beige/50 text-chocolate flex items-center justify-center hover:bg-beige transition-colors"
                        aria-label={`Decrease quantity of ${item.product.name}`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-medium text-chocolate w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-beige/50 text-chocolate flex items-center justify-center hover:bg-beige transition-colors"
                        aria-label={`Increase quantity of ${item.product.name}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <span className="ml-auto text-chocolate/70 text-sm font-medium">
                        {unitPrice > 0 ? formatPKR(unitPrice * item.quantity) : 'On Request'}
                      </span>
                    </div>
                  </div>
                );
              })}
              <button
                onClick={clearCart}
                className="text-sm text-chocolate/50 hover:text-red-500 transition-colors mx-auto block"
              >
                Clear all items
              </button>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-beige p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-heading font-semibold text-chocolate text-lg">Subtotal</span>
              <span className="font-heading font-bold text-chocolate text-lg">
                {subtotal > 0 ? formatPKR(subtotal) : 'Price on Request'}
              </span>
            </div>
            <p className="text-xs text-chocolate/50 text-center">
              {DEMO_MODE
                ? 'Demo mode — orders are simulated and no real payment will be processed.'
                : 'Final order confirmation will be handled by the bakery.'}
              {!siteConfig.isContactInfoVerified && ' Contact details are placeholders.'}
            </p>
            <Link
              to="/checkout"
              onClick={() => setCartOpen(false)}
              className="w-full flex items-center justify-center gap-2 btn-caramel"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/cart"
              onClick={() => setCartOpen(false)}
              className="w-full text-center text-sm text-chocolate/60 hover:text-caramel transition-colors block"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
