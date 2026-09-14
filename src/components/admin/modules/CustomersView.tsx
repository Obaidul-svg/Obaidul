import React, { useState } from 'react';
import { Customer } from '../../../types';
import { MANOVA_CUSTOMERS } from '../../../data/manovaData';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Crown, 
  MessageCircle, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

interface CustomersViewProps {
  lang: 'bn' | 'en';
}

export const CustomersView: React.FC<CustomersViewProps> = ({ lang }) => {
  const isBn = lang === 'bn';

  const [customers, setCustomers] = useState<Customer[]>(MANOVA_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [filterVip, setFilterVip] = useState(false);

  const filtered = customers.filter(c => {
    if (filterVip && !c.isVip) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.district.toLowerCase().includes(q);
    }
    return true;
  });

  const totalClientSpend = customers.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" />
            {isBn ? 'গ্রাহক ও ভিআইপি রিলেশনশিপ' : 'Clientele & CRM Ledger'}
          </div>
          <h2 className="text-lg font-bold text-stone-900">
            {isBn ? 'গ্রাহক তালিকা ও ক্রয় ইতিহাস' : 'Customer Database & Lifetime Value'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn 
              ? 'হাই নেট-ওয়ার্থ ক্লায়েন্ট, মোট ক্রয়কৃত মূল্য এবং অর্ডার হিস্ট্রি।' 
              : 'Track horology collectors, VIP privileges, phone numbers, and repeat watch purchases.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-stone-400 block font-medium">TOTAL CLIENT SPEND</span>
            <span className="font-mono font-bold text-stone-900 text-sm">৳ {totalClientSpend.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-3 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isBn ? 'গ্রাহকের নাম, ফোন বা জেলা দিয়ে খুঁজুন...' : 'Search by customer name, phone, district...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
          />
        </div>

        <button
          onClick={() => setFilterVip(!filterVip)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            filterVip
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
          }`}
        >
          <Crown className="w-3.5 h-3.5" />
          <span>{isBn ? 'শুধুমাত্র ভিআইপি ক্লায়েন্ট' : 'VIP Collectors Only'}</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3.5">{isBn ? 'গ্রাহকের নাম' : 'Customer Name'}</th>
                <th className="p-3.5">{isBn ? 'মোবাইল ও ইমেইল' : 'Contact Details'}</th>
                <th className="p-3.5">{isBn ? 'জেলা ও ঠিকানা' : 'Location'}</th>
                <th className="p-3.5">{isBn ? 'অর্ডার সংখ্যা' : 'Total Orders'}</th>
                <th className="p-3.5">{isBn ? 'মোট ক্রয়মূল্য' : 'Lifetime Value'}</th>
                <th className="p-3.5">{isBn ? 'স্ট্যাটাস' : 'Tier'}</th>
                <th className="p-3.5 text-right">{isBn ? 'যোগাযোগ' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="p-3.5">
                    <p className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                      <span>{c.name}</span>
                      {c.isVip && <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                    </p>
                    <p className="text-[10px] text-stone-400">Last order: {c.lastOrderDate}</p>
                  </td>

                  <td className="p-3.5">
                    <a href={`tel:${c.phone}`} className="font-mono font-bold text-emerald-700 hover:underline block">
                      {c.phone}
                    </a>
                    <span className="text-[11px] text-stone-500">{c.email}</span>
                  </td>

                  <td className="p-3.5 text-stone-700">
                    <p className="font-medium">{c.district}</p>
                    <p className="text-[10px] text-stone-400 truncate max-w-xs">{c.address}</p>
                  </td>

                  <td className="p-3.5 font-mono">
                    <span className="px-2 py-0.5 bg-stone-100 rounded text-stone-800 font-bold">
                      {c.totalOrders} {isBn ? 'টি' : 'orders'}
                    </span>
                  </td>

                  <td className="p-3.5 font-mono font-bold text-stone-900 text-sm">
                    ৳ {c.totalSpent.toLocaleString()}
                  </td>

                  <td className="p-3.5">
                    {c.isVip ? (
                      <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full font-bold text-[10px] uppercase tracking-wider">
                        VIP Patron
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded text-[10px]">
                        Standard
                      </span>
                    )}
                  </td>

                  <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                    <a
                      href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg inline-block cursor-pointer transition-colors"
                      title="WhatsApp Chat"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={`tel:${c.phone}`}
                      className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg inline-block cursor-pointer transition-colors"
                      title="Call Customer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
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
