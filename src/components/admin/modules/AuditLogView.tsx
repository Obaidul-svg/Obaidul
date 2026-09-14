import React, { useState } from 'react';
import { AuditLog } from '../../../types';
import { MANOVA_AUDIT_LOGS } from '../../../data/manovaData';
import { 
  ShieldCheck, 
  Search, 
  UserCheck, 
  Clock, 
  Lock, 
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AuditLogViewProps {
  lang: 'bn' | 'en';
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ lang }) => {
  const isBn = lang === 'bn';

  const [logs, setLogs] = useState<AuditLog[]>(MANOVA_AUDIT_LOGS);
  const [search, setSearch] = useState('');

  const filtered = logs.filter(l => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return l.action.toLowerCase().includes(q) || l.user.toLowerCase().includes(q) || l.details.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            {isBn ? 'নিরাপত্তা ও অ্যাক্টিভিটি ট্র্যাকিং' : 'Security & Governance Audit'}
          </div>
          <h2 className="text-lg font-bold text-stone-900">
            {isBn ? 'অডিট লগ ও সিকিউরিটি হিস্ট্রি' : 'Audit Log & Merchant Access History'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn 
              ? 'অ্যাডমিন এবং ইনভেন্টরি ম্যানেজারের সকল কার্যক্রমের সুরক্ষিত অপরিবর্তনযোগ্য লগ।' 
              : 'Immutable record of price changes, stock adjustments, order confirmations, and IP logins.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 bg-emerald-50 text-emerald-800 font-semibold rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit Encrypted Audit</span>
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3 rounded-xl border border-stone-200">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isBn ? 'অ্যাকশন, ইউজার বা বিবরণ দিয়ে খুঁজুন...' : 'Search action, staff member, or details...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3.5">{isBn ? 'কার্যক্রম (Action)' : 'Action'}</th>
                <th className="p-3.5">{isBn ? 'ব্যবহারকারী' : 'Staff Member'}</th>
                <th className="p-3.5">{isBn ? 'রোল' : 'Role'}</th>
                <th className="p-3.5">{isBn ? 'আইপি ও সময়' : 'IP & Timestamp'}</th>
                <th className="p-3.5">{isBn ? 'বিস্তারিত' : 'Event Details'}</th>
                <th className="p-3.5 text-right">{isBn ? 'স্ট্যাটাস' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-stone-900 font-mono">
                    {log.action}
                  </td>

                  <td className="p-3.5 font-medium text-stone-800">
                    {log.user}
                  </td>

                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded text-[10px] font-semibold">
                      {log.role}
                    </span>
                  </td>

                  <td className="p-3.5 text-stone-500 font-mono">
                    <div>{log.timestamp}</div>
                    <span className="text-[10px] text-stone-400">{log.ipAddress}</span>
                  </td>

                  <td className="p-3.5 text-stone-700 max-w-sm truncate">
                    {log.details}
                  </td>

                  <td className="p-3.5 text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-semibold text-[10px]">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Success</span>
                    </span>
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
