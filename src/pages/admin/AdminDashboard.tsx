import { useState, useEffect } from 'react';
import { Package, TrendingUp, CheckCircle, DollarSign } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatPKR } from '@/lib/formatting';
import { DEMO_MODE } from '@/data/siteConfig';
import type { Order } from '@/types';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);
        setOrders((data || []) as unknown as Order[]);
      } catch {
        // empty
      }
      setLoading(false);
    }
    loadOrders();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const confirmedCount = orders.filter((o) => o.order_status === 'confirmed').length;
  const doneCount = orders.filter((o) => o.order_status === 'done').length;

  const statusCounts = orders.reduce((acc, o) => {
    acc[o.order_status] = (acc[o.order_status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-heading font-bold text-chocolate text-3xl mb-2">Dashboard</h1>
      <p className="text-chocolate/60 text-sm mb-8">Overview of orders and key metrics.</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl-card border border-beige/50 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-caramel" />
            <span className="text-sm text-chocolate/60">Total Orders</span>
          </div>
          <p className="font-heading font-bold text-chocolate text-2xl">{orders.length}</p>
        </div>
        <div className="bg-white rounded-2xl-card border border-beige/50 p-5">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-caramel" />
            <span className="text-sm text-chocolate/60">Revenue</span>
          </div>
          <p className="font-heading font-bold text-chocolate text-2xl">{formatPKR(totalRevenue)}</p>
        </div>
        <div className="bg-white rounded-2xl-card border border-beige/50 p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-caramel" />
            <span className="text-sm text-chocolate/60">Confirmed</span>
          </div>
          <p className="font-heading font-bold text-chocolate text-2xl">{confirmedCount}</p>
        </div>
        <div className="bg-white rounded-2xl-card border border-beige/50 p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-caramel" />
            <span className="text-sm text-chocolate/60">Done</span>
          </div>
          <p className="font-heading font-bold text-chocolate text-2xl">{doneCount}</p>
        </div>
      </div>

      {/* Status breakdown */}
      <div className="bg-white rounded-2xl-card border border-beige/50 p-6 mb-8">
        <h2 className="font-heading font-semibold text-chocolate text-lg mb-4">Order Status Breakdown</h2>
        {loading ? (
          <p className="text-chocolate/50 text-sm">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-chocolate/50 text-sm">No orders yet. Orders will appear here once customers place them.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['confirmed', 'done'].map((status) => (
              <div key={status} className="bg-beige/20 rounded-xl-card p-3 text-center">
                <p className="font-heading font-bold text-chocolate text-xl">{statusCounts[status] || 0}</p>
                <p className="text-xs text-chocolate/50 capitalize">{status}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl-card border border-beige/50 p-6">
        <h2 className="font-heading font-semibold text-chocolate text-lg mb-4">Recent Orders</h2>
        {loading ? (
          <p className="text-chocolate/50 text-sm">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-chocolate/50 text-sm">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-chocolate/50 border-b border-beige/50">
                  <th className="py-2 pr-4">Order #</th>
                  <th className="py-2 pr-4">Customer</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Total</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((o) => (
                  <tr key={o.id} className="border-b border-beige/30">
                    <td className="py-3 pr-4 font-medium text-chocolate">{o.order_number}</td>
                    <td className="py-3 pr-4 text-chocolate/70">{o.customer_name}</td>
                    <td className="py-3 pr-4">
                      <span className="text-caramel font-medium capitalize text-xs">{o.order_status}</span>
                    </td>
                    <td className="py-3 pr-4 font-medium text-chocolate">{formatPKR(o.total)}</td>
                    <td className="py-3 text-chocolate/50 text-xs">{new Date(o.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {DEMO_MODE && (
        <p className="text-xs text-chocolate/40 mt-4">
          Demo mode — all data shown is for demonstration. No real transactions have occurred.
        </p>
      )}
    </div>
  );
}
