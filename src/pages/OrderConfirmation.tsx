import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Home, Copy, AlertCircle } from 'lucide-react';
import Seo from '@/components/Seo';
import { supabase } from '@/lib/supabase';
import { formatPKR } from '@/lib/formatting';
import { DEMO_MODE } from '@/data/siteConfig';
import type { Order, OrderItem } from '@/types';

export default function OrderConfirmation() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!orderNumber) return;
    async function loadOrder() {
      try {
        const { data: orderData } = await supabase
          .from('orders')
          .select('*')
          .eq('order_number', orderNumber)
          .maybeSingle();

        if (orderData) {
          setOrder(orderData as unknown as Order);
          const { data: items } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', orderData.id);
          setOrderItems((items || []) as unknown as OrderItem[]);
        }
      } catch {
        // order not found in DB
      }
      setLoading(false);
    }
    loadOrder();
  }, [orderNumber]);

  const handleCopy = () => {
    if (orderNumber) {
      navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const orderSaved = !loading && order !== null;

  return (
    <>
      <Seo title="Order Confirmation | The Golden Crumb" description="Your order has been placed" path="/order-confirmation" />
      <div className="section-container pt-8 pb-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Saved status banner */}
          {orderSaved ? (
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-fade-in">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          ) : loading ? (
            <div className="w-20 h-20 rounded-full bg-beige/50 flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 border-4 border-caramel border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-amber-600" />
            </div>
          )}

          <h1 className="font-heading font-bold text-chocolate text-3xl sm:text-4xl mb-3">
            {orderSaved ? 'Order Confirmed!' : 'Order Submitted'}
          </h1>
          <p className="text-chocolate/60 mb-6">
            {orderSaved
              ? 'Your order has been confirmed. We will prepare it with care.'
              : 'We could not confirm your order in our system. Please save your order number and contact us.'}
          </p>

          {/* Saved/unsaved status */}
          <div className={`rounded-xl-card p-4 mb-6 ${orderSaved ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
            <div className="flex items-center justify-center gap-2">
              {orderSaved ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800 font-medium">Order saved in database</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <span className="text-sm text-amber-800 font-medium">Order not found in database — please contact us</span>
                </>
              )}
            </div>
          </div>

          {/* Order number */}
          <div className="bg-white rounded-2xl-card border border-beige/50 p-6 mb-6">
            <p className="text-sm text-chocolate/50 mb-2">Your Order Number</p>
            <div className="flex items-center justify-center gap-3">
              <span className="font-heading font-bold text-chocolate text-2xl">{orderNumber}</span>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg text-caramel hover:bg-beige/50 transition-colors"
                aria-label="Copy order number"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-chocolate/40 mt-2">
              Save this number to track your order. You can use it on our Track Order page.
            </p>
          </div>

          {/* Order details */}
          {orderSaved && order && (
            <div className="bg-white rounded-2xl-card border border-beige/50 p-6 mb-6 text-left">
              <h2 className="font-heading font-semibold text-chocolate text-lg mb-4">Order Summary</h2>
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-chocolate">{item.quantity}x {item.product_name}</span>
                    <span className="text-chocolate font-medium">{item.unit_price > 0 ? formatPKR(item.unit_price * item.quantity) : 'On Request'}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-beige/50 mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-chocolate/60">Subtotal</span>
                  <span className="font-medium">{formatPKR(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-chocolate/60">Delivery Fee</span>
                  <span className="font-medium">{formatPKR(order.delivery_fee)}</span>
                </div>
                <div className="flex justify-between border-t border-beige/30 pt-2">
                  <span className="font-heading font-semibold">Total</span>
                  <span className="font-heading font-bold text-lg">{formatPKR(order.total)}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-beige/50 text-sm space-y-1">
                <p><span className="text-chocolate/50">Delivery:</span> <span className="text-chocolate font-medium">{order.delivery_method}</span></p>
                <p><span className="text-chocolate/50">Payment:</span> <span className="text-chocolate font-medium">{order.payment_method}</span></p>
                <p><span className="text-chocolate/50">Order Status:</span> <span className="text-caramel font-medium capitalize">{order.order_status}</span></p>
              </div>
            </div>
          )}

          {DEMO_MODE && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl-card p-4 mb-6 text-left">
              <p className="text-sm text-amber-800">
                <strong>Demo Notice:</strong> This is a simulated order. No real payment has been processed, and no real delivery will occur. Order data is stored in the database for demonstration purposes.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/track-order" className="btn-outline">
              <Package className="w-5 h-5" /> Track Order
            </Link>
            <Link to="/products" className="btn-caramel">
              <Home className="w-5 h-5" /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
