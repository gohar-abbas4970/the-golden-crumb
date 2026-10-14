import { useState } from 'react';
import { Search, CheckCircle, Package } from 'lucide-react';
import Seo from '@/components/Seo';
import { supabase } from '@/lib/supabase';
import { formatPKR, validatePakistaniPhone } from '@/lib/formatting';
import { DEMO_MODE } from '@/data/siteConfig';
import type { Order, OrderItem, OrderStatus } from '@/types';

const statusLabels: Record<OrderStatus, string> = {
  confirmed: 'Confirmed',
  done: 'Done',
};

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setError(null);
    if (!orderNumber.trim()) {
      setError('Please enter your order number.');
      return;
    }
    const phoneErr = validatePakistaniPhone(phone);
    if (phoneErr) {
      setError(phoneErr);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const { data: orderData, error: queryError } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber.trim())
        .maybeSingle();

      if (queryError || !orderData) {
        setOrder(null);
        setItems([]);
        setError('No order found with this order number and phone number. Please check and try again.');
        setLoading(false);
        return;
      }

      const phoneDigits = phone.replace(/[\s-]/g, '').replace(/^\+92/, '0');
      const orderPhoneDigits = (orderData as { customer_phone: string }).customer_phone.replace(/[\s-]/g, '').replace(/^\+92/, '0');
      if (phoneDigits !== orderPhoneDigits) {
        setOrder(null);
        setItems([]);
        setError('The phone number does not match this order. Please verify and try again.');
        setLoading(false);
        return;
      }

      setOrder(orderData as unknown as Order);
      const { data: itemData } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderData.id);
      setItems((itemData || []) as unknown as OrderItem[]);
    } catch {
      setError('Something went wrong. Please try again.');
      setOrder(null);
    }
    setLoading(false);
  };

  return (
    <>
      <Seo title="Track Order | The Golden Crumb" description="Track your order status" path="/track-order" />
      <div className="section-container pt-8 pb-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-heading font-bold text-chocolate text-3xl mb-3 text-center">Track Your Order</h1>
          <p className="text-chocolate/60 text-center mb-8">Enter your order number and phone number to check your order status.</p>

          {/* Search form */}
          <div className="bg-white rounded-2xl-card border border-beige/50 p-6 mb-6">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-chocolate mb-1.5">Order Number</label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="input-field"
                  placeholder="e.g. GC-2026-1234"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-chocolate mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field"
                  placeholder="03001234567"
                />
              </div>
            </div>
            <button onClick={handleSearch} disabled={loading} className="btn-caramel w-full disabled:opacity-60">
              <Search className="w-5 h-5" />
              {loading ? 'Searching...' : 'Track Order'}
            </button>
            {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
          </div>

          {/* Results */}
          {order && (
            <div className="bg-white rounded-2xl-card border border-beige/50 p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-chocolate/50">Order</p>
                  <p className="font-heading font-bold text-chocolate text-xl">{order.order_number}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-chocolate/50">Status</p>
                  <div className="flex items-center gap-2 justify-end">
                    {order.order_status === 'done' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Package className="w-5 h-5 text-caramel" />
                    )}
                    <p className="font-medium text-caramel capitalize">{statusLabels[order.order_status]}</p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-chocolate">{item.quantity}x {item.product_name}</span>
                    <span className="text-chocolate font-medium">{item.unit_price > 0 ? formatPKR(item.unit_price * item.quantity) : 'On Request'}</span>
                  </div>
                ))}
              </div>

              {/* Details */}
              <div className="border-t border-beige/50 pt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-chocolate/50 text-xs">Payment Method</p>
                  <p className="text-chocolate font-medium">{order.payment_method}</p>
                </div>
                <div>
                  <p className="text-chocolate/50 text-xs">Payment Status</p>
                  <p className="text-chocolate font-medium capitalize">{order.payment_status}</p>
                </div>
                <div>
                  <p className="text-chocolate/50 text-xs">Delivery</p>
                  <p className="text-chocolate font-medium">{order.delivery_method}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-chocolate/50 text-xs">Total</p>
                  <p className="font-heading font-bold text-chocolate text-lg">{formatPKR(order.total)}</p>
                </div>
              </div>
            </div>
          )}

          {searched && !order && !loading && !error && (
            <div className="bg-white rounded-2xl-card border border-beige/50 p-8 text-center">
              <Package className="w-12 h-12 text-beige mx-auto mb-3" />
              <p className="text-chocolate/60">No order found. Please check your order number and phone number.</p>
            </div>
          )}

          {DEMO_MODE && (
            <p className="text-xs text-chocolate/40 text-center mt-6">
              Demo mode — order tracking uses the database. Sample orders may not exist until you place one.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
