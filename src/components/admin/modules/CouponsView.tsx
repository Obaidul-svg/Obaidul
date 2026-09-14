import React, { useState } from 'react';
import { Discount } from '../../../types';
import { 
  Ticket, 
  Plus, 
  Search, 
  CheckCircle2, 
  X, 
  Copy, 
  Check, 
  Percent, 
  Sparkles,
  Calendar
} from 'lucide-react';

interface CouponsViewProps {
  discounts: Discount[];
  onAddDiscount: (discount: Discount) => void;
  onToggleDiscount: (discountId: string) => void;
  lang: 'bn' | 'en';
}

export const CouponsView: React.FC<CouponsViewProps> = ({
  discounts,
  onAddDiscount,
  onToggleDiscount,
  lang,
}) => {
  const isBn = lang === 'bn';

  const [showAddModal, setShowAddModal] = useState(false);
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percentage' | 'fixed'>('percentage');
  const [value, setValue] = useState<number>(10);
  const [minSpend, setMinSpend] = useState<number>(30000);
  const [description, setDescription] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const newDisc: Discount = {
      id: `disc-${Date.now()}`,
      code: code.toUpperCase().trim(),
      type,
      value: Number(value),
      isActive: true,
      usageCount: 0,
      minSpend: Number(minSpend) || 0,
      description,
      expiresAt: '2026-12-31'
    };

    onAddDiscount(newDisc);
    setShowAddModal(false);
    setCode('');
    setDescription('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Ticket className="w-3.5 h-3.5" />
            {isBn ? 'মার্কেটিং ও প্রিভিলেজ ডিসকাউন্ট' : 'Privilege Vouchers & Campaigns'}
          </div>
          <h2 className="text-lg font-bold text-stone-900">
            {isBn ? 'কুপন ও প্রমো কোড ম্যানেজার' : 'Coupon Code Management'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn 
              ? 'গ্রাহকদের জন্য ফিক্সড ৳ এবং পারসেন্টেজ % ডিসকাউন্ট কোড তৈরি ও নিয়ন্ত্রণ করুন।'
              : 'Create percentage or fixed taka vouchers for campaigns and VIP clientele.'}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{isBn ? 'নতুন কুপন তৈরি করুন' : 'Create Coupon'}</span>
        </button>
      </div>

      {/* Coupons Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {discounts.map((d) => (
          <div key={d.id} className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded-lg tracking-wider border border-stone-200">
                    {d.code}
                  </span>
                  <button
                    onClick={() => copyToClipboard(d.code)}
                    className="p-1 hover:bg-stone-100 rounded text-stone-400 hover:text-stone-700 transition-colors"
                    title="Copy Code"
                  >
                    {copiedCode === d.code ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-stone-500 mt-2">{d.description}</p>
              </div>

              <button
                onClick={() => onToggleDiscount(d.id)}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-colors cursor-pointer shrink-0 ${
                  d.isActive
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                {d.isActive ? 'Active' : 'Disabled'}
              </button>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-stone-400 block font-medium">DISCOUNT VALUE</span>
                <span className="font-mono font-bold text-stone-900 text-sm">
                  {d.type === 'percentage' ? `${d.value}% Off` : `৳ ${d.value.toLocaleString()} Off`}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-stone-400 block font-medium">TOTAL USES</span>
                <span className="font-mono font-bold text-emerald-700">
                  {d.usageCount || 0} times
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-stone-900 text-sm">Create New Discount Voucher</h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Voucher Code</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. DHAKAVIP"
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono font-bold uppercase tracking-wider"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Taka (৳)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    {type === 'percentage' ? 'Percentage (%)' : 'Amount (৳)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Minimum Spend (৳ BDT)</label>
                <input
                  type="number"
                  value={minSpend}
                  onChange={(e) => setMinSpend(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Campaign Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. ৳ 2,000 credit on orders exceeding ৳ 30,000"
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 border border-stone-200 text-stone-600 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#15803D] hover:bg-[#166534] text-white rounded-lg font-semibold"
                >
                  Save Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
