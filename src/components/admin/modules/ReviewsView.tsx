import React, { useState } from 'react';
import { Review } from '../../../types';
import { MANOVA_REVIEWS } from '../../../data/manovaData';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  X, 
  Trash2, 
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';

interface ReviewsViewProps {
  lang: 'bn' | 'en';
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ lang }) => {
  const isBn = lang === 'bn';

  const [reviews, setReviews] = useState<Review[]>(MANOVA_REVIEWS);
  const [filterApproved, setFilterApproved] = useState<'all' | 'approved' | 'pending'>('all');

  const handleToggleApprove = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, isApproved: !r.isApproved } : r));
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this review?')) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  const filtered = reviews.filter(r => {
    if (filterApproved === 'approved' && !r.isApproved) return false;
    if (filterApproved === 'pending' && r.isApproved) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            {isBn ? 'গ্রাহক পর্যালোচনা ও রেটিং' : 'Customer Feedback & Social Proof'}
          </div>
          <h2 className="text-lg font-bold text-stone-900">
            {isBn ? 'রিভিউ ও টেস্টমোনিয়াল কন্ট্রোল' : 'Reviews & Testimonials Management'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn 
              ? 'ভেরিফাইড ক্রেতাদের রিভিউ অনুমোদন করুন যা সরাসরি স্টোরফ্রন্টের প্রোডাক্ট পেজে দৃশ্যমান হবে।' 
              : 'Moderate customer ratings and verified buyer testimonials across watch detail views.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterApproved('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              filterApproved === 'all' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            All ({reviews.length})
          </button>
          <button
            onClick={() => setFilterApproved('approved')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              filterApproved === 'approved' ? 'bg-emerald-700 text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Approved ({reviews.filter(r => r.isApproved).length})
          </button>
        </div>
      </div>

      {/* Reviews Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((r) => (
          <div key={r.id} className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm">{r.userName}</span>
                  {r.isVerified && (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-semibold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleToggleApprove(r.id)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-colors cursor-pointer ${
                    r.isApproved
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {r.isApproved ? 'Approved' : 'Pending Review'}
                </button>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-200'
                    }`}
                  />
                ))}
                <span className="font-mono text-xs font-bold text-stone-700 ml-1.5">{r.rating}.0</span>
              </div>

              <p className="text-xs text-stone-700 italic">"{r.comment}"</p>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-stone-800">{r.productTitle}</span>
              <div className="flex items-center gap-2 text-stone-400">
                <span>{r.date}</span>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="hover:text-rose-600 transition-colors p-1"
                  title="Delete Review"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
