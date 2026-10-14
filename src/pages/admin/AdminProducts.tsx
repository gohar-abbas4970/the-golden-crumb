import { useState } from 'react';
import { Edit3, Check, X } from 'lucide-react';
import { products, categories, priceDisclaimer } from '@/data/products';
import { formatPKR } from '@/lib/formatting';
import { DEMO_MODE } from '@/data/siteConfig';
import type { Product } from '@/types';

export default function AdminProducts() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState(0);
  const [editAvail, setEditAvail] = useState<string>('');

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setEditPrice(p.price);
    setEditAvail(p.availability || '');
  };

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-heading font-bold text-chocolate text-3xl mb-2">Products</h1>
      <p className="text-chocolate/60 text-sm mb-6">View and manage product catalog. {DEMO_MODE && 'In demo mode, price edits are local and not persisted to the database.'}</p>

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl-card border border-beige/50 p-4 flex items-center gap-4">
            <img src={p.image} alt={p.alt} className="w-16 h-16 rounded-xl-card object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-chocolate text-sm truncate">{p.name}</p>
              <p className="text-xs text-chocolate/50">{p.category}</p>
              {editingId === p.id ? (
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(Number(e.target.value))}
                    className="w-28 px-2 py-1 text-sm border border-beige rounded-lg focus:outline-none focus:border-caramel"
                    placeholder="Price"
                  />
                  <select
                    value={editAvail}
                    onChange={(e) => setEditAvail(e.target.value)}
                    className="px-2 py-1 text-sm border border-beige rounded-lg focus:outline-none focus:border-caramel"
                  >
                    <option value="">No status</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Made to Order">Made to Order</option>
                    <option value="Limited">Limited</option>
                  </select>
                  <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg bg-caramel text-white">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg bg-beige/50 text-chocolate">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-caramel font-semibold text-sm">{p.price > 0 ? formatPKR(p.price) : 'On Request'}</span>
                  {p.availability && <span className="text-xs text-chocolate/50">{p.availability}</span>}
                </div>
              )}
            </div>
            {editingId !== p.id && (
              <button
                onClick={() => startEdit(p)}
                className="p-2 rounded-lg text-chocolate/60 hover:bg-beige/50 transition-colors"
                aria-label="Edit product"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-chocolate/40 mt-6">{priceDisclaimer}</p>
    </div>
  );
}
