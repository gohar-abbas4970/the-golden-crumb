import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Copy, Check, MessageSquare, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatPKR } from '@/lib/formatting';
import { siteConfig } from '@/data/siteConfig';
import { formatOrderForWhatsApp, buildWhatsAppLink } from '@/lib/whatsapp';
import type { Order, OrderItem, OrderStatus } from '@/types';

const allStatuses: OrderStatus[] = ['confirmed', 'done'];

const statusLabels: Record<string, string> = {
  confirmed: 'Confirmed',
  done: 'Done',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [orderItemsMap, setOrderItemsMap] = useState<Record<string, OrderItem[]>>({});
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);
  const [notifiedOrders, setNotifiedOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      setOrders((data || []) as unknown as Order[]);
    } catch {
      // empty
    }
    setLoading(false);
  }

  async function loadOrderItems(orderId: string) {
    if (orderItemsMap[orderId]) return;
    const { data } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);
    setOrderItemsMap((prev) => ({ ...prev, [orderId]: (data || []) as unknown as OrderItem[] }));
  }

  async function updateStatus(orderId: string, status: OrderStatus) {
    await supabase.from('orders').update({ order_status: status }).eq('id', orderId);
    await supabase.from('order_status_history').insert({ order_id: orderId, status });
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, order_status: status } : o)));
  }

  function handleCopyMessage(orderId: string, message: string) {
    navigator.clipboard.writeText(message);
    setCopiedOrderId(orderId);
    setTimeout(() => setCopiedOrderId(null), 2000);
  }

  function markNotified(orderId: string) {
    setNotifiedOrders((prev) => new Set(prev).add(orderId));
  }

  const filtered = orders.filter((o) => {
    const matchesSearch =
      !search ||
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_phone.includes(search);
    const matchesStatus = statusFilter === 'all' || o.order_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const ownerNumber = siteConfig.ownerWhatsappNumber;

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-heading font-bold text-chocolate text-3xl mb-2">Orders</h1>
      <p className="text-chocolate/60 text-sm mb-6">Manage orders, update statuses, and send WhatsApp notifications to the owner.</p>

      {/* Owner WhatsApp status */}
      <div className={`rounded-xl-card p-3 mb-6 text-sm flex items-center gap-2 ${ownerNumber ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
        <MessageSquare className={`w-4 h-4 flex-shrink-0 ${ownerNumber ? 'text-green-600' : 'text-amber-600'}`} />
        <span className={ownerNumber ? 'text-green-800' : 'text-amber-800'}>
          {ownerNumber
            ? `Owner WhatsApp number configured (${ownerNumber}). You can open WhatsApp with the order message pre-filled.`
            : 'Owner WhatsApp number not configured. Set ownerWhatsappNumber in site config to enable the open-in-WhatsApp link. You can still copy the message.'}
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-chocolate/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order number, name, or phone..."
            className="input-field pl-11"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-white border border-beige rounded-xl-card text-sm text-chocolate focus:outline-none focus:border-caramel"
        >
          <option value="all">All Statuses</option>
          {allStatuses.map((s) => (
            <option key={s} value={s}>{statusLabels[s]}</option>
          ))}
        </select>
      </div>

      {/* Orders list */}
      {loading ? (
        <p className="text-chocolate/50 text-sm">Loading orders...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl-card border border-beige/50 p-8 text-center">
          <p className="text-chocolate/50">No orders found. {orders.length === 0 && 'Orders will appear here once customers place them.'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const items = orderItemsMap[order.id] || [];
            const whatsappMessage = items.length > 0 ? formatOrderForWhatsApp(order, items) : '';
            const whatsappLink = ownerNumber ? buildWhatsAppLink(ownerNumber, whatsappMessage) : '';
            const isNotified = notifiedOrders.has(order.id);

            return (
              <div key={order.id} className="bg-white rounded-2xl-card border border-beige/50 overflow-hidden">
                <button
                  onClick={() => {
                    if (expandedId === order.id) {
                      setExpandedId(null);
                    } else {
                      setExpandedId(order.id);
                      loadOrderItems(order.id);
                    }
                  }}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-beige/10 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="min-w-0">
                      <p className="font-medium text-chocolate text-sm">{order.order_number}</p>
                      <p className="text-xs text-chocolate/50">{order.customer_name} • {order.customer_phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    {isNotified && (
                      <span className="text-xs text-green-600 font-medium hidden sm:inline">Notified</span>
                    )}
                    <span className="text-caramel font-medium text-xs capitalize">{order.order_status}</span>
                    <span className="font-medium text-chocolate text-sm hidden sm:inline">{formatPKR(order.total)}</span>
                    {expandedId === order.id ? <ChevronUp className="w-5 h-5 text-chocolate/40" /> : <ChevronDown className="w-5 h-5 text-chocolate/40" />}
                  </div>
                </button>

                {expandedId === order.id && (
                  <div className="p-4 border-t border-beige/50 bg-cream/50">
                    <div className="grid sm:grid-cols-2 gap-4 mb-4 text-sm">
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
                      {order.delivery_address && (
                        <div className="sm:col-span-2">
                          <p className="text-chocolate/50 text-xs">Address</p>
                          <p className="text-chocolate font-medium">{order.delivery_address}, {order.delivery_area}</p>
                        </div>
                      )}
                      {order.order_notes && (
                        <div className="sm:col-span-2">
                          <p className="text-chocolate/50 text-xs">Notes</p>
                          <p className="text-chocolate font-medium">{order.order_notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Items */}
                    <div className="mb-4">
                      <p className="text-chocolate/50 text-xs mb-2">Items</p>
                      <div className="space-y-1">
                        {items.map((item) => (
                          <div key={item.id} className="text-sm flex justify-between">
                            <span className="text-chocolate">{item.quantity}x {item.product_name}</span>
                            <span className="text-chocolate font-medium">{item.unit_price > 0 ? formatPKR(item.unit_price * item.quantity) : 'On Request'}</span>
                          </div>
                        ))}
                        {!items.length && <p className="text-chocolate/50 text-xs">Loading items...</p>}
                      </div>
                    </div>

                    {/* WhatsApp notification panel */}
                    {items.length > 0 && (
                      <div className="mb-4 bg-white rounded-xl-card border border-beige/50 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-chocolate/50 text-xs font-medium">Owner WhatsApp Message</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            isNotified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {isNotified ? 'Message sent (marked by owner)' : 'Not sent yet'}
                          </span>
                        </div>

                        {/* Message preview */}
                        <pre className="text-xs text-chocolate/70 bg-cream rounded-lg p-3 mb-3 whitespace-pre-wrap font-sans max-h-48 overflow-y-auto border border-beige/30">
                          {whatsappMessage}
                        </pre>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleCopyMessage(order.id, whatsappMessage)}
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl-card bg-beige/40 text-chocolate text-sm font-medium hover:bg-beige/60 transition-colors"
                          >
                            {copiedOrderId === order.id ? (
                              <><Check className="w-4 h-4 text-green-600" /> Copied!</>
                            ) : (
                              <><Copy className="w-4 h-4" /> Copy Message</>
                            )}
                          </button>

                          {ownerNumber ? (
                            <a
                              href={whatsappLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => markNotified(order.id)}
                              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl-card bg-[#25D366] text-white text-sm font-medium hover:bg-[#1da851] transition-colors"
                            >
                              <MessageSquare className="w-4 h-4" />
                              Open in WhatsApp
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl-card bg-beige/20 text-chocolate/40 text-sm">
                              Owner number not configured
                            </span>
                          )}

                          {!isNotified && ownerNumber && (
                            <button
                              onClick={() => markNotified(order.id)}
                              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl-card border border-beige text-chocolate text-sm font-medium hover:bg-beige/30 transition-colors"
                            >
                              <Check className="w-4 h-4" />
                              Mark as Sent
                            </button>
                          )}
                        </div>

                        <p className="text-xs text-chocolate/40 mt-2">
                          The link opens WhatsApp with this message pre-filled. You must review and manually press send.
                          The order is saved in the database regardless of whether the message is sent.
                        </p>
                      </div>
                    )}

                    {/* Status update */}
                    <div>
                      <p className="text-chocolate/50 text-xs mb-2">Update Status</p>
                      <div className="flex flex-wrap gap-2">
                        {allStatuses.map((status) => (
                          <button
                            key={status}
                            onClick={() => updateStatus(order.id, status)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              order.order_status === status
                                ? 'bg-caramel text-white border-caramel'
                                : 'bg-white text-chocolate border-beige hover:border-caramel/50'
                            }`}
                          >
                            {statusLabels[status]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
