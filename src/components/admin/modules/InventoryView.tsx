import React, { useState } from 'react';
import { Product } from '../../../types';
import { 
  Boxes, 
  Search, 
  Filter, 
  AlertTriangle, 
  Plus, 
  Minus, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface InventoryViewProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  lang: 'bn' | 'en';
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  products,
  onUpdateProduct,
  lang,
}) => {
  const isBn = lang === 'bn';

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'low' | 'instock' | 'out'>('all');

  const handleAdjustStock = (product: Product, delta: number) => {
    const newStock = Math.max(0, product.inventory + delta);
    onUpdateProduct({
      ...product,
      inventory: newStock,
    });
  };

  const handleSetStock = (product: Product, exact: number) => {
    const val = Math.max(0, isNaN(exact) ? 0 : exact);
    onUpdateProduct({
      ...product,
      inventory: val,
    });
  };

  const filtered = products.filter(p => {
    if (filter === 'low' && p.inventory >= 12) return false;
    if (filter === 'out' && p.inventory > 0) return false;
    if (filter === 'instock' && p.inventory === 0) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q));
    }
    return true;
  });

  const lowStockCount = products.filter(p => p.inventory < 12).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <Boxes className="w-3.5 h-3.5" />
            {isBn ? 'আটেলিয়ার ভল্ট ও স্টক ট্র্যাকার' : 'Atelier Stock & Warehousing'}
          </div>
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <span>{isBn ? 'ইনভেন্টরি ও স্টক লেভেল' : 'Inventory Management'}</span>
            <span className="px-2 py-0.5 bg-amber-500 text-white rounded-full text-xs font-mono font-bold">
              {products.length} {isBn ? 'মডেল' : 'items'}
            </span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn 
              ? 'প্রতিটি ঘড়ির ইনভেন্টরি পর্যবেক্ষণ ও দ্রুত পরিবর্তন করুন। ১২টির কম স্টকে স্বয়ংক্রিয় সতর্কতা।'
              : 'Real-time stock auditing with fast one-click adjustment and threshold alerts.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 bg-amber-50 text-amber-800 rounded-xl border border-amber-200">
            {lowStockCount} {isBn ? 'টি ঘড়ি লো স্টক' : 'models low in stock'}
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-3 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isBn ? 'ঘড়ির নাম বা SKU খুঁজুন...' : 'Search watch title or SKU...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              filter === 'all' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            {isBn ? 'সব' : 'All'} ({products.length})
          </button>
          <button
            onClick={() => setFilter('low')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              filter === 'low' ? 'bg-amber-600 text-white' : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
            }`}
          >
            {isBn ? 'লো স্টক' : 'Low Stock'} ({lowStockCount})
          </button>
          <button
            onClick={() => setFilter('instock')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              filter === 'instock' ? 'bg-emerald-700 text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            {isBn ? 'পর্যাপ্ত স্টক' : 'In Stock'}
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3.5">{isBn ? 'ছবি' : 'Image'}</th>
                <th className="p-3.5">{isBn ? 'ঘড়ি ও SKU' : 'Watch & SKU'}</th>
                <th className="p-3.5">{isBn ? 'বর্তমান স্টক' : 'Current Units'}</th>
                <th className="p-3.5">{isBn ? 'স্ট্যাটাস' : 'Threshold Status'}</th>
                <th className="p-3.5">{isBn ? 'মূল্য' : 'Price'}</th>
                <th className="p-3.5 text-right">{isBn ? 'দ্রুত স্টক পরিবর্তন' : 'Quick Adjustment'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((p) => {
                const isLow = p.inventory < 12;
                const isOut = p.inventory === 0;

                return (
                  <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="p-3.5">
                      <img src={p.image} alt={p.title} className="w-11 h-11 object-cover rounded-lg border border-stone-200" />
                    </td>

                    <td className="p-3.5">
                      <p className="font-bold text-stone-900 text-sm">{p.title}</p>
                      <p className="text-stone-500 text-[11px] font-mono">{p.sku}</p>
                    </td>

                    <td className="p-3.5 font-mono">
                      <input
                        type="number"
                        value={p.inventory}
                        onChange={(e) => handleSetStock(p, parseInt(e.target.value))}
                        className="w-16 px-2 py-1 border border-stone-300 rounded font-bold text-stone-900 text-center"
                      />
                      <span className="text-stone-400 text-[11px] ml-1.5">{isBn ? 'টি' : 'units'}</span>
                    </td>

                    <td className="p-3.5">
                      {isOut ? (
                        <span className="px-2.5 py-1 bg-rose-100 text-rose-800 rounded-full font-semibold text-[10px]">
                          Out of Stock
                        </span>
                      ) : isLow ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full font-semibold text-[10px]">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          <span>Low Stock Alert</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-semibold text-[10px]">
                          Healthy Stock
                        </span>
                      )}
                    </td>

                    <td className="p-3.5 font-mono font-bold text-stone-900">
                      ৳ {p.price.toLocaleString()}
                    </td>

                    <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => handleAdjustStock(p, -1)}
                        className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg cursor-pointer transition-colors inline-block"
                        title="Deduct 1"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleAdjustStock(p, 1)}
                        className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg cursor-pointer transition-colors inline-block"
                        title="Add 1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleAdjustStock(p, 5)}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#15803D] font-bold rounded-lg text-xs cursor-pointer transition-colors inline-block"
                        title="Restock 5 units"
                      >
                        +5 Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
