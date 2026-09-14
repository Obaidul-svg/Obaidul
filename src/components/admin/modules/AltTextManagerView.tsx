import React, { useState } from 'react';
import { AltTextRecord } from '../../../types';
import { MANOVA_ALT_TEXT_ITEMS } from '../../../data/manovaData';
import { 
  FileText, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Save, 
  ExternalLink,
  Edit2
} from 'lucide-react';

interface AltTextManagerViewProps {
  lang: 'bn' | 'en';
}

export const AltTextManagerView: React.FC<AltTextManagerViewProps> = ({ lang }) => {
  const isBn = lang === 'bn';

  const [items, setItems] = useState<AltTextRecord[]>(MANOVA_ALT_TEXT_ITEMS);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleStartEdit = (item: AltTextRecord) => {
    setEditingId(item.id);
    setEditText(item.altText);
  };

  const handleSaveEdit = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          altText: editText,
          status: editText.trim().length > 20 ? 'optimized' : 'needs_review',
          lastUpdated: 'Just now'
        };
      }
      return item;
    }));
    setEditingId(null);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleAutoSuggest = (id: string, productTitle: string) => {
    const suggested = `MANOVA ${productTitle} premium luxury wristwatch with sapphire crystal and hand-finished dial, Bangladesh horology collection`;
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          altText: suggested,
          status: 'optimized',
          lastUpdated: 'Just now'
        };
      }
      return item;
    }));
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const filteredItems = items.filter(item => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return item.productTitle.toLowerCase().includes(q) || item.altText.toLowerCase().includes(q);
    }
    return true;
  });

  const optimizedCount = items.filter(i => i.status === 'optimized').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
            <FileText className="w-3.5 h-3.5" />
            {isBn ? 'গুগল ইমেজ এসইও ও অ্যাক্সেসিবিলিটি' : 'Image SEO & Accessibility Engine'}
          </div>
          <h2 className="text-lg font-bold text-stone-900">
            Alt Text Manager (অল্টারনেটিভ টেক্সট কন্ট্রোল)
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn 
              ? 'সব পণ্যের ছবির জন্য এসইও সমৃদ্ধ অল্ট-টেক্সট কনফিগার করুন যাতে গুগলে ঘড়ি সার্চে প্রথম পেজে র‍্যাংক করে।'
              : 'Audit and optimize alt text descriptions across watch imagery for Google Search and screen readers.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 bg-emerald-50 text-emerald-800 font-semibold rounded-xl border border-emerald-200">
            {optimizedCount} / {items.length} {isBn ? 'ছবি অপ্টিমাইজড' : 'Optimized'}
          </span>
        </div>
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{isBn ? 'অল্ট টেক্সট সফলভাবে আপডেট হয়েছে!' : 'Alt text successfully updated and synced!'}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isBn ? 'ঘড়ির নাম বা অল্ট টেক্সট খুঁজুন...' : 'Search by product or alt text...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
          />
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3.5">{isBn ? 'ছবির প্রিভিউ' : 'Preview'}</th>
                <th className="p-3.5">{isBn ? 'পণ্যের নাম' : 'Product'}</th>
                <th className="p-3.5">{isBn ? 'বর্তমান অল্ট টেক্সট (Alt Text)' : 'Current Alt Text'}</th>
                <th className="p-3.5">{isBn ? 'এসইও স্ট্যাটাস' : 'SEO Status'}</th>
                <th className="p-3.5 text-right">{isBn ? 'অ্যাকশন' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="p-3.5">
                    <img src={item.imageUrl} alt={item.altText} className="w-12 h-12 object-cover rounded-lg border border-stone-200" />
                  </td>

                  <td className="p-3.5 font-semibold text-stone-900">
                    {item.productTitle}
                    <p className="text-[10px] text-stone-400 font-mono mt-0.5">Updated: {item.lastUpdated}</p>
                  </td>

                  <td className="p-3.5 max-w-md">
                    {editingId === item.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-stone-300 rounded text-xs focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          onClick={() => handleSaveEdit(item.id)}
                          className="p-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-700 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-stone-700 text-xs">
                        {item.altText}
                        <span className="text-[10px] text-stone-400 block mt-0.5">
                          {item.altText.length} characters
                        </span>
                      </div>
                    )}
                  </td>

                  <td className="p-3.5">
                    {item.status === 'optimized' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-semibold text-[10px]">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Optimized</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-700 rounded-full font-semibold text-[10px]">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Needs Review</span>
                      </span>
                    )}
                  </td>

                  <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => handleAutoSuggest(item.id, item.productTitle)}
                      className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-xs font-medium cursor-pointer transition-colors inline-flex items-center gap-1"
                      title="AI Auto-Generate Alt Text"
                    >
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>{isBn ? 'AI সাজেস্ট' : 'AI Suggest'}</span>
                    </button>

                    <button
                      onClick={() => handleStartEdit(item)}
                      className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs cursor-pointer transition-colors inline-block"
                      title="Edit Manually"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
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
