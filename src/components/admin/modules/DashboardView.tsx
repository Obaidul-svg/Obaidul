import React from 'react';
import { Product, Order } from '../../../types';
import { 
  TrendingUp, 
  ShoppingBag, 
  Boxes, 
  AlertCircle, 
  Plus, 
  Sparkles, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface DashboardViewProps {
  products: Product[];
  orders: Order[];
  onSelectTab: (tab: any) => void;
  onOpenAddProduct: () => void;
  onOpenThemeEditor?: () => void;
  lang: 'bn' | 'en';
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  products,
  orders,
  onSelectTab,
  onOpenAddProduct,
  onOpenThemeEditor,
  lang,
}) => {
  const isBn = lang === 'bn';

  // Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.status !== 'Cancelled' ? ord.total : 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Confirmed');
  const lowStockProducts = products.filter(p => p.inventory < 12);
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.filter(o => o.status !== 'Cancelled').length) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner: Welcome & Quick Shortcuts */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-6 rounded-2xl shadow-sm border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            MANOVA Atelier Gulshan-2 • Admin Console
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif-luxury">
            {isBn ? 'স্বাগতম, মার্চেন্ট কন্ট্রোল সেন্টার' : 'Welcome to Merchant Command Center'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            {isBn 
              ? 'আজকের সেলস ভলিউম, কুরিয়ার ট্র্যাকিং এবং ইনকমপ্লিট অর্ডার রিকভারি স্ট্যাটাস।' 
              : 'Real-time sales performance, courier tracking, and incomplete checkout recovery.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenAddProduct}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white text-stone-900 hover:bg-stone-100 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isBn ? 'নতুন ঘড়ি যোগ করুন' : 'Add Watch'}</span>
          </button>

          {onOpenThemeEditor && (
            <button
              onClick={onOpenThemeEditor}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isBn ? 'থিম এডিটর' : 'Theme Editor'}</span>
            </button>
          )}

          <button
            onClick={() => onSelectTab('orders-pending')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl text-xs font-medium transition-all cursor-pointer"
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{isBn ? 'পেন্ডিং অর্ডার (১)' : 'Pending (1)'}</span>
          </button>
        </div>
      </div>

      {/* 4 Hero KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>{isBn ? 'মোট বিক্রয় (রেভিনিউ)' : 'Total Revenue'}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-stone-900 font-mono">
              ৳ {totalRevenue.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% {isBn ? 'গত সপ্তাহের তুলনায়' : 'vs last week'}</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>{isBn ? 'অর্ডার সংখ্যা' : 'Total Orders'}</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-stone-900 font-mono">
              {orders.length}
            </span>
            <span className="text-xs text-stone-500 ml-1">
              ({pendingOrders.length} {isBn ? 'প্রসেসিং' : 'processing'})
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-stone-500">
            <span>{isBn ? '১০০% ভেরিফাইড ফোন কল' : '100% verified calls'}</span>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>{isBn ? 'গড় অর্ডার মূল্য (AOV)' : 'Avg Order Value'}</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-stone-900 font-mono">
              ৳ {avgOrderValue.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-stone-500">
            <span>{isBn ? 'প্রিমিয়াম লাক্সারি ক্যাটাগরি' : 'Premium luxury horology'}</span>
          </div>
        </div>

        {/* Incomplete / Abandoned Alert */}
        <div 
          onClick={() => onSelectTab('orders-incomplete')}
          className="bg-rose-50/70 hover:bg-rose-50 p-5 rounded-xl border border-rose-200 shadow-2xs cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between text-rose-700 text-xs font-medium">
            <span>{isBn ? 'ইনকমপ্লিট অর্ডার' : 'Incomplete Checkouts'}</span>
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-2xl font-bold text-rose-700 font-mono">
              18
            </span>
            <span className="text-xs bg-rose-600 text-white font-semibold px-2 py-0.5 rounded-full">
              {isBn ? 'রিকভার করুন' : 'Recover'}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-rose-600 font-medium flex items-center justify-between">
            <span>{isBn ? 'সম্ভাব্য ৳ ৭,১২,০০০ সেলস' : 'Potential ৳ 7,12,000'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Graphical Sales Visual & Low Stock Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Visual Overview */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
            <div>
              <h3 className="font-semibold text-stone-900 text-sm">
                {isBn ? 'সাপ্তাহিক সেলস ট্র্যাকার (৳ BDT)' : 'Weekly Sales Velocity (৳ BDT)'}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {isBn ? 'গত ৭ দিনের ডেলিভারি ও সেলস ভলিউম' : 'Last 7 days fulfilled vs pending'}
              </p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg">
              {isBn ? 'গ্রোথ +২৩%' : 'Growth +23%'}
            </span>
          </div>

          {/* Bar representation */}
          <div className="space-y-3 pt-2">
            {[
              { day: isBn ? 'শনিবার (Sat)' : 'Saturday', amount: 96000, pct: 85, count: '2 orders' },
              { day: isBn ? 'রবিবার (Sun)' : 'Sunday', amount: 32500, pct: 35, count: '1 order' },
              { day: isBn ? 'সোমবার (Mon)' : 'Monday', amount: 77800, pct: 70, count: '2 orders' },
              { day: isBn ? 'মঙ্গলবার (Tue)' : 'Tuesday', amount: 48000, pct: 45, count: '1 order' },
              { day: isBn ? 'বুধবার (Wed)' : 'Wednesday', amount: 112000, pct: 95, count: '3 orders' },
              { day: isBn ? 'বৃহস্পতিবার (Thu)' : 'Thursday', amount: 52000, pct: 50, count: '1 order' },
              { day: isBn ? 'শুক্রবার (Fri)' : 'Friday (Today)', amount: 84900, pct: 78, count: '2 orders' },
            ].map((bar, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs">
                <span className="w-28 text-stone-600 font-medium shrink-0 truncate">{bar.day}</span>
                <div className="flex-1 bg-stone-100 h-6 rounded-md overflow-hidden relative flex items-center px-2">
                  <div 
                    className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-md transition-all duration-500"
                    style={{ width: `${bar.pct}%` }}
                  />
                  <span className="relative z-10 text-[11px] font-mono font-semibold text-stone-900 drop-shadow-2xs">
                    ৳ {bar.amount.toLocaleString()} ({bar.count})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert List */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Boxes className="w-4 h-4 text-amber-600" />
                <h3 className="font-semibold text-stone-900 text-sm">
                  {isBn ? 'ইনভেন্টরি সতর্কতা' : 'Stock Threshold Alert'}
                </h3>
              </div>
              <span className="text-xs text-amber-700 bg-amber-50 font-semibold px-2 py-0.5 rounded">
                &lt; 12 {isBn ? 'পিস' : 'units'}
              </span>
            </div>

            <div className="space-y-3">
              {lowStockProducts.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <img src={p.image} alt={p.title} className="w-9 h-9 object-cover rounded-md border border-stone-200" />
                    <div>
                      <p className="text-xs font-semibold text-stone-900 truncate max-w-[130px]">{p.title}</p>
                      <p className="text-[10px] text-stone-500 font-mono">{p.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full font-mono">
                      {p.inventory} {isBn ? 'টি বাকি' : 'left'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSelectTab('inventory')}
            className="w-full mt-4 py-2 px-3 border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-xl transition-colors text-center cursor-pointer"
          >
            {isBn ? 'সম্পূর্ণ ইনভেন্টরি ম্যানেজ করুন [২০]' : 'Manage Full Inventory [20]'}
          </button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-stone-900 text-sm">
              {isBn ? 'সাম্প্রতিক অর্ডারসমূহ' : 'Recent Customer Orders'}
            </h3>
            <p className="text-xs text-stone-500">
              {isBn ? 'ঢাকার ভিতরে ২৪ ঘণ্টা ও ঢাকার বাইরে নিশ্চিত ডেলিভারি' : 'Inside Dhaka 24h & nationwide tracked courier'}
            </p>
          </div>
          <button
            onClick={() => onSelectTab('orders-all')}
            className="text-xs font-semibold text-[#15803D] hover:underline cursor-pointer"
          >
            {isBn ? 'সব অর্ডার দেখুন →' : 'View All Orders →'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-200">
              <tr>
                <th className="p-3.5">{isBn ? 'অর্ডার #' : 'Order #'}</th>
                <th className="p-3.5">{isBn ? 'গ্রাহক' : 'Customer'}</th>
                <th className="p-3.5">{isBn ? 'ঘড়ির মডেল' : 'Watch Model'}</th>
                <th className="p-3.5">{isBn ? 'মূল্য' : 'Amount'}</th>
                <th className="p-3.5">{isBn ? 'পেমেন্ট' : 'Payment'}</th>
                <th className="p-3.5">{isBn ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="p-3.5 text-right">{isBn ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-stone-900">
                    {order.orderNumber}
                  </td>
                  <td className="p-3.5">
                    <p className="font-semibold text-stone-900">{order.customerName}</p>
                    <p className="text-[11px] text-stone-500">{order.phone}</p>
                  </td>
                  <td className="p-3.5 text-stone-700">
                    {order.items.map(i => i.title).join(', ')}
                  </td>
                  <td className="p-3.5 font-mono font-semibold text-stone-900">
                    ৳ {order.total.toLocaleString()}
                  </td>
                  <td className="p-3.5">
                    <span className="capitalize px-2 py-0.5 bg-stone-100 text-stone-700 rounded text-[11px] font-mono">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Confirmed'
                        ? 'bg-purple-100 text-purple-800'
                        : order.status === 'Processing'
                        ? 'bg-indigo-100 text-indigo-800'
                        : order.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => onSelectTab('orders-all')}
                      className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-medium cursor-pointer transition-colors"
                    >
                      {isBn ? 'বিস্তারিত' : 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
