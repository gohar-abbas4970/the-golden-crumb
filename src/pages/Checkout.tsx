import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import Seo from '@/components/Seo';
import { useCart } from '@/hooks/useCart';
import { supabase } from '@/lib/supabase';
import { formatPKR, generateOrderNumber, validatePakistaniPhone, validateRequired } from '@/lib/formatting';
import { siteConfig, DEMO_MODE } from '@/data/siteConfig';
import type { PaymentMethod } from '@/types';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    deliveryMethod: 'Pickup' as 'Delivery' | 'Pickup',
    address: '',
    area: '',
    notes: '',
    paymentMethod: 'COD' as PaymentMethod,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const deliveryFee = formData.deliveryMethod === 'Delivery' ? siteConfig.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <>
        <Seo title="Checkout | The Golden Crumb" description="Checkout" path="/checkout" />
        <div className="section-container py-20 text-center">
          <h1 className="font-heading font-bold text-chocolate text-3xl mb-4">Your Cart is Empty</h1>
          <p className="text-chocolate/60 mb-6">Add items to your cart before checking out.</p>
          <Link to="/products" className="btn-caramel">Browse Products</Link>
        </div>
      </>
    );
  }

  const setField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    const nameErr = validateRequired(formData.customerName, 'Name');
    if (nameErr) e.customerName = nameErr;
    const phoneErr = validatePakistaniPhone(formData.phone);
    if (phoneErr) e.phone = phoneErr;
    if (formData.deliveryMethod === 'Delivery') {
      const addrErr = validateRequired(formData.address, 'Delivery address');
      if (addrErr) e.address = addrErr;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const orderNumber = generateOrderNumber();

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_name: formData.customerName,
          customer_phone: formData.phone,
          customer_email: formData.email || null,
          delivery_method: formData.deliveryMethod,
          delivery_address: formData.deliveryMethod === 'Delivery' ? formData.address : null,
          delivery_area: formData.deliveryMethod === 'Delivery' ? formData.area : null,
          order_notes: formData.notes || null,
          payment_method: formData.paymentMethod,
          payment_status: 'pending',
          order_status: 'confirmed',
          subtotal,
          delivery_fee: deliveryFee,
          total,
        })
        .select('id')
        .single();

      if (orderError) throw new Error(orderError.message);

      const orderItems = items.map((item) => ({
        order_id: orderData.id,
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.customPrice ?? item.product.price,
        custom_config: item.customConfig ?? null,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw new Error(itemsError.message);

      await supabase.from('order_status_history').insert({
        order_id: orderData.id,
        status: 'confirmed',
      });

      clearCart();
      navigate(`/order-confirmation/${orderNumber}`);
    } catch (err) {
      setSubmitError(
        'We could not save your order. Please check your connection and try again. ' +
        'If the problem persists, contact us through our Contact page.',
      );
    }
    setSubmitting(false);
  };

  return (
    <>
      <Seo title="Checkout | The Golden Crumb" description="Complete your order" path="/checkout" />
      <div className="section-container pt-8 pb-16">
        <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-chocolate/60 hover:text-caramel mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>
        <h1 className="font-heading font-bold text-chocolate text-3xl mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-2xl-card border border-beige/50 p-6">
              <h2 className="font-heading font-semibold text-chocolate text-lg mb-4">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setField('customerName', e.target.value)}
                    className="input-field"
                    placeholder="Your full name"
                  />
                  {errors.customerName && <p className="text-xs text-red-500 mt-1">{errors.customerName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                    className="input-field"
                    placeholder="03001234567"
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-chocolate mb-1.5">Email (optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setField('email', e.target.value)}
                    className="input-field"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-white rounded-2xl-card border border-beige/50 p-6">
              <h2 className="font-heading font-semibold text-chocolate text-lg mb-4">Delivery or Pickup</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {(['Pickup', 'Delivery'] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setField('deliveryMethod', method)}
                    className={`p-4 rounded-xl-card border-2 transition-all ${
                      formData.deliveryMethod === method
                        ? 'border-caramel bg-blush/10'
                        : 'border-beige hover:border-caramel/50'
                    }`}
                  >
                    <span className="font-medium text-chocolate text-sm block">{method}</span>
                    <span className="text-xs text-chocolate/50">
                      {method === 'Pickup' ? 'Collect at our bakery' : `Rs. ${siteConfig.deliveryFee} fee`}
                    </span>
                  </button>
                ))}
              </div>
              {formData.deliveryMethod === 'Delivery' && (
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-chocolate mb-1.5">Delivery Address *</label>
                    <textarea
                      rows={2}
                      value={formData.address}
                      onChange={(e) => setField('address', e.target.value)}
                      className="input-field resize-none"
                      placeholder="House number, street, block..."
                    />
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-chocolate mb-1.5">DHA Area</label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => setField('area', e.target.value)}
                      className="input-field"
                      placeholder="e.g. DHA Raya, DHA Phase 6..."
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl-card border border-beige/50 p-6">
              <h2 className="font-heading font-semibold text-chocolate text-lg mb-4">Payment Method</h2>
              <div className="space-y-3">
                {([
                  { value: 'COD', label: 'Cash on Delivery', desc: 'Pay with cash when your order arrives' },
                  { value: 'Cash on Pickup', label: 'Cash on Pickup', desc: 'Pay at our bakery when you collect' },
                  { value: 'Online', label: 'Online Payment', desc: 'Pay online (simulated in demo mode)' },
                ] as { value: PaymentMethod; label: string; desc: string }[]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setField('paymentMethod', opt.value)}
                    className={`w-full p-4 rounded-xl-card border-2 text-left transition-all ${
                      formData.paymentMethod === opt.value
                        ? 'border-caramel bg-blush/10'
                        : 'border-beige hover:border-caramel/50'
                    }`}
                  >
                    <span className="font-medium text-chocolate text-sm block">{opt.label}</span>
                    <span className="text-xs text-chocolate/50">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-2xl-card border border-beige/50 p-6">
              <label className="block text-sm font-medium text-chocolate mb-1.5">Order Notes (optional)</label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setField('notes', e.target.value)}
                className="input-field resize-none"
                placeholder="Any special requests or instructions..."
              />
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl-card border border-beige/50 p-6 space-y-4">
              <h2 className="font-heading font-bold text-chocolate text-lg">Order Summary</h2>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.lineId} className="flex gap-3 text-sm">
                    <img src={item.product.image} alt={item.product.alt} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-chocolate truncate">{item.product.name}</p>
                      <p className="text-xs text-chocolate/50">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-chocolate font-medium text-sm flex-shrink-0">
                      {(item.customPrice ?? item.product.price) > 0
                        ? formatPKR((item.customPrice ?? item.product.price) * item.quantity)
                        : 'On Request'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-beige/50 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-chocolate/60">Subtotal</span>
                  <span className="font-medium">{subtotal > 0 ? formatPKR(subtotal) : 'On Request'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-chocolate/60">Delivery</span>
                  <span className="font-medium">{formatPKR(deliveryFee)}</span>
                </div>
                <div className="border-t border-beige/30 pt-2 flex justify-between">
                  <span className="font-heading font-semibold text-chocolate">Total</span>
                  <span className="font-heading font-bold text-chocolate text-lg">{total > 0 ? formatPKR(total) : 'On Request'}</span>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-caramel w-full disabled:opacity-60"
              >
                {submitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Placing Order...</>
                ) : (
                  <><Check className="w-5 h-5" /> Place Order</>
                )}
              </button>
              {DEMO_MODE && (
                <p className="text-xs text-chocolate/40 text-center">
                  Demo mode — orders are simulated. No real payment will be processed.
                </p>
              )}
              {submitError && (
                <p className="text-sm text-red-500 text-center bg-red-50 rounded-xl-card p-3">
                  {submitError}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
