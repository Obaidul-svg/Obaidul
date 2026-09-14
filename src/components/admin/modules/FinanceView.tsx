import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  Landmark, 
  Download, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Receipt
} from 'lucide-react';

interface FinanceViewProps {
  totalRevenue: number;
  lang: 'bn' | 'en';
}

export const FinanceView: React.FC<FinanceViewProps> = ({ totalRevenue, lang }) => {
  const isBn = lang === 'bn';

  const codInTransit = 84500;
  const settledThisMonth = totalRevenue - codInTransit;
  const bkashBalance = 42800;
  const nagadBalance = 18500;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <DollarSign className="w-3.5 h-3.5" />
            {isBn ? 'আর্থিক হিসাব ও সেটেলমেন্ট' : 'Settlement & Merchant Ledger'}
          </div>
          <h2 className="text-lg font-bold text-stone-900">
            {isBn ? 'ফাইন্যান্স, রেভিনিউ ও ব্যাংক পে-আউট' : 'Financial Reconciliation & COD Payouts'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn 
              ? 'ক্যাশ অন ডেলিভারি (COD) কুরিয়ার পাওনা, বিকাশ/নগদ মার্চেন্ট ওয়ালেট এবং ব্যাংকিং হিসেব।' 
              : 'Reconciliation of Steadfast/RedX courier remittance, mobile financial wallets, and bank transfers.'}
          </p>
        </div>

        <button
          onClick={() => alert('Downloading March 2026 Financial Reconciliation Statement (CSV)...')}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-all"
        >
          <Download className="w-4 h-4" />
          <span>{isBn ? 'স্টেটমেন্ট ডাউনলোড করুন' : 'Export Statement (CSV)'}</span>
        </button>
      </div>

      {/* KPI 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Sales */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-xs text-stone-500 font-medium">{isBn ? 'মোট বিক্রয় (Gross)' : 'Gross Booked Sales'}</span>
          <div className="mt-2">
            <span className="text-2xl font-bold text-stone-900 font-mono">
              ৳ {totalRevenue.toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+14.2% MoM growth</span>
          </p>
        </div>

        {/* Settled Funds */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-xs text-stone-500 font-medium">{isBn ? 'সেটেল্ড তহবিল (Bank)' : 'Settled to Bank'}</span>
          <div className="mt-2">
            <span className="text-2xl font-bold text-emerald-700 font-mono">
              ৳ {settledThisMonth.toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-stone-400 mt-1">
            Standard Chartered Bank Gulshan
          </p>
        </div>

        {/* COD In Transit */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-xs text-stone-500 font-medium">{isBn ? 'কুরিয়ার সিওডি পাওনা' : 'Courier COD Remittance'}</span>
          <div className="mt-2">
            <span className="text-2xl font-bold text-amber-700 font-mono">
              ৳ {codInTransit.toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-amber-600 mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Next payout Tuesday</span>
          </p>
        </div>

        {/* Mobile Wallets */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-xs text-stone-500 font-medium">{isBn ? 'মার্চেন্ট ওয়ালেট ব্যালেন্স' : 'bKash + Nagad Wallets'}</span>
          <div className="mt-2">
            <span className="text-2xl font-bold text-stone-900 font-mono">
              ৳ {(bkashBalance + nagadBalance).toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-stone-400 mt-1">
            bKash ৳42.8k • Nagad ৳18.5k
          </p>
        </div>
      </div>

      {/* Breakdown & Banking details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Linked Bank Account */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 border-b pb-3">
            <Landmark className="w-4 h-4 text-emerald-700" />
            <h3 className="font-semibold text-stone-900 text-sm">
              {isBn ? 'সংযুক্ত ব্যাংক অ্যাকাউন্ট' : 'Primary Settlement Bank'}
            </h3>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-stone-500">Account Name:</span>
              <span className="font-bold text-stone-900">MANOVA HOROLOGY ATELIER LTD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Bank & Branch:</span>
              <span className="font-bold text-stone-900">Standard Chartered Bank, Gulshan-2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Account Number:</span>
              <span className="font-bold text-stone-900">01-8492041-01</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Routing Number:</span>
              <span className="font-bold text-stone-900">215261892</span>
            </div>
          </div>
        </div>

        {/* Courier Settlement Schedule */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 border-b pb-3">
            <Receipt className="w-4 h-4 text-emerald-700" />
            <h3 className="font-semibold text-stone-900 text-sm">
              {isBn ? 'কুরিয়ার সিওডি পেমেন্ট সিডিউল' : 'Courier Settlement Schedule'}
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-stone-900">Steadfast Courier Dispatch</p>
                <p className="text-[11px] text-stone-500">Cycle: Bi-weekly auto-deposit</p>
              </div>
              <span className="font-mono font-bold text-emerald-700">৳ 58,200 pending</span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-stone-900">RedX Logistics</p>
                <p className="text-[11px] text-stone-500">Cycle: Weekly Friday transfer</p>
              </div>
              <span className="font-mono font-bold text-emerald-700">৳ 26,300 pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
