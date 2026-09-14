import React, { useState } from 'react';
import { 
  Settings, 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  Truck, 
  CreditCard, 
  Save, 
  CheckCircle2,
  ShieldCheck,
  Globe
} from 'lucide-react';

interface SettingsViewProps {
  lang: 'bn' | 'en';
}

export const SettingsView: React.FC<SettingsViewProps> = ({ lang }) => {
  const isBn = lang === 'bn';

  const [storeName, setStoreName] = useState('MANOVA HOROLOGY');
  const [tagline, setTagline] = useState('Timeless Bangladeshi Horology');
  const [showroomAddress, setShowroomAddress] = useState('House 42, Road 11, Block D, Gulshan-2, Dhaka-1212, Bangladesh');
  const [phone, setPhone] = useState('+880 1711-892341');
  const [email, setEmail] = useState('concierge@manovawatches.com');
  const [insideDhakaFee, setInsideDhakaFee] = useState(80);
  const [outsideDhakaFee, setOutsideDhakaFee] = useState(130);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(50000);
  const [enableCod, setEnableCod] = useState(true);
  const [enableBkash, setEnableBkash] = useState(true);
  const [bkashNumber, setBkashNumber] = useState('01711892341');
  const [enableNagad, setEnableNagad] = useState(true);
  const [nagadNumber, setNagadNumber] = useState('01811982731');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Settings className="w-3.5 h-3.5" />
            {isBn ? 'স্টোর কনফিগারেশন' : 'General Configuration'}
          </div>
          <h2 className="text-lg font-bold text-stone-900">
            {isBn ? 'মার্চেন্ট ও শোরুম সেটিংস' : 'Merchant & Atelier Store Settings'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn 
              ? 'শোরুম ঠিকানা, কনসিয়ার্জ হটলাইন, ডেলিভারি চার্জ ও পেমেন্ট গেটওয়ে কনফিগারেশন।' 
              : 'Configure Gulshan atelier coordinates, delivery fee logic, and mobile payment numbers.'}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{isBn ? 'পরিবর্তন সংরক্ষণ করুন' : 'Save Changes'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{isBn ? 'স্টোর সেটিংস সফলভাবে আপডেট হয়েছে!' : 'Store settings updated successfully!'}</span>
        </div>
      )}

      {/* Form sections */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand & Atelier Coordinates */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <Store className="w-4 h-4 text-emerald-700" />
            <h3 className="font-semibold text-stone-900 text-sm">
              {isBn ? 'ব্র্যান্ড ও শোরুম পরিচিতি' : 'Brand Identity & Gulshan Atelier Coordinates'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Brand Legal Entity</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 border border-stone-200 rounded-lg font-medium"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Brand Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 border border-stone-200 rounded-lg"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="font-semibold text-stone-700 block mb-1">Showroom / Flagship Atelier Address</label>
            <input
              type="text"
              value={showroomAddress}
              onChange={(e) => setShowroomAddress(e.target.value)}
              className="w-full px-3 py-2 border border-stone-200 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Concierge Hotline (BD)</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Customer Support Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-stone-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Delivery Rates */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <Truck className="w-4 h-4 text-emerald-700" />
            <h3 className="font-semibold text-stone-900 text-sm">
              {isBn ? 'ডেলিভারি চার্জ ও ফ্রি শিপিং থ্রেশহোল্ড' : 'Nationwide Courier Delivery Rates'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Inside Dhaka Courier (৳)</label>
              <input
                type="number"
                value={insideDhakaFee}
                onChange={(e) => setInsideDhakaFee(Number(e.target.value))}
                className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono font-bold"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Outside Dhaka Courier (৳)</label>
              <input
                type="number"
                value={outsideDhakaFee}
                onChange={(e) => setOutsideDhakaFee(Number(e.target.value))}
                className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono font-bold"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Complimentary Delivery Above (৳)</label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <CreditCard className="w-4 h-4 text-emerald-700" />
            <h3 className="font-semibold text-stone-900 text-sm">
              {isBn ? 'পেমেন্ট গেটওয়ে সেটিংস' : 'Bangladeshi Payment Gateways'}
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            {/* COD */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-stone-900">Cash on Delivery (COD)</p>
                <p className="text-[11px] text-stone-500">Enable cash payment upon watch receipt</p>
              </div>
              <input
                type="checkbox"
                checked={enableCod}
                onChange={(e) => setEnableCod(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
              />
            </div>

            {/* bKash */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-[#D12053]">bKash Merchant Payment</p>
                <p className="text-[11px] text-stone-500">Direct wallet payment with TrxID validation</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={bkashNumber}
                  onChange={(e) => setBkashNumber(e.target.value)}
                  className="px-2.5 py-1 bg-white border border-stone-200 rounded font-mono text-xs w-32"
                  placeholder="Merchant No."
                />
                <input
                  type="checkbox"
                  checked={enableBkash}
                  onChange={(e) => setEnableBkash(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Nagad */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-[#F7941D]">Nagad Merchant Payment</p>
                <p className="text-[11px] text-stone-500">Direct wallet payment with TrxID validation</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={nagadNumber}
                  onChange={(e) => setNagadNumber(e.target.value)}
                  className="px-2.5 py-1 bg-white border border-stone-200 rounded font-mono text-xs w-32"
                  placeholder="Merchant No."
                />
                <input
                  type="checkbox"
                  checked={enableNagad}
                  onChange={(e) => setEnableNagad(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Admin Account & Security Settings */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <h3 className="font-semibold text-stone-900 text-sm">
                {isBn ? 'অ্যাডমিন সিকিউরিটি ও ফিক্সড অ্যাকাউন্ট' : 'Fixed Admin Security & Credentials'}
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold">
              PROTECTED
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-bold text-stone-900">অ্যাডমিন নির্ধারিত ইমেইল (Fixed Email)</p>
                <p className="text-[11px] text-stone-500">
                  অ্যাডমিন প্যানেল শুধুমাত্র এই নির্ধারিত ইমেইল দ্বারা সুরক্ষিত
                </p>
              </div>
              <div className="font-mono font-bold text-stone-900 bg-white border border-stone-300 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Obaidullah1168@gmail.com</span>
              </div>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-stone-900">অ্যাডমিন পাসওয়ার্ড (Admin Password)</p>
                  <p className="text-[11px] text-stone-500">
                    নির্ধারিত ডিফল্ট পাসওয়ার্ড: <strong className="text-emerald-700 font-mono">Obaidullah1168@gmail.com</strong>
                  </p>
                </div>
                <span className="text-[10px] font-mono bg-stone-200 text-stone-700 px-2 py-0.5 rounded font-semibold self-start sm:self-auto">
                  MATCHES FIXED EMAIL
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
