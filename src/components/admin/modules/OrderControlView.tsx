import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  PhoneCall, 
  Truck, 
  ShieldAlert, 
  MessageSquare, 
  Save, 
  CheckCircle2, 
  Bell,
  Clock,
  ExternalLink
} from 'lucide-react';

interface OrderControlViewProps {
  lang: 'bn' | 'en';
}

export const OrderControlView: React.FC<OrderControlViewProps> = ({ lang }) => {
  const isBn = lang === 'bn';

  const [requirePhoneVerification, setRequirePhoneVerification] = useState(true);
  const [maxCodQuantity, setMaxCodQuantity] = useState(2);
  const [autoCancelHours, setAutoCancelHours] = useState(48);
  const [steadfastApiActive, setSteadfastApiActive] = useState(true);
  const [smsNotificationActive, setSmsNotificationActive] = useState(true);
  const [whatsappTemplate, setWhatsappTemplate] = useState('Hello {name}, your MANOVA order {orderNumber} has been packed at our Gulshan Atelier and handed over to the courier.');
  const [blacklistedPhones, setBlacklistedPhones] = useState('01811990000, 01700112233');
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
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {isBn ? 'অপারেশনাল প্রোটোকল' : 'Operational Dispatch Protocol'}
          </div>
          <h2 className="text-lg font-bold text-stone-900">
            {isBn ? 'অর্ডার কন্ট্রোল ও কুরিয়ার রুলস' : 'Order Control & Fraud Prevention'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn 
              ? 'ক্যাশ অন ডেলিভারি (COD) যাচাইকরণ, কুরিয়ার পার্টনার ইন্টিগ্রেশন এবং স্বয়ংক্রিয় নোটিফিকেশন।' 
              : 'Configure phone call dispatch rules, fraud prevention limits, courier auto-booking and messaging.'}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{isBn ? 'সেটিংস সংরক্ষণ করুন' : 'Save Rules'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{isBn ? 'অর্ডার কন্ট্রোল প্রোটোকল সফলভাবে আপডেট হয়েছে!' : 'Order control rules saved and active!'}</span>
        </div>
      )}

      {/* Rules Config Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verification & Risk */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <PhoneCall className="w-4 h-4 text-emerald-700" />
            <h3 className="font-semibold text-stone-900 text-sm">
              {isBn ? 'কল ভেরিফিকেশন ও সিকিউরিটি' : 'Telephone Verification & COD Limits'}
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-stone-800 text-xs">
                {isBn ? 'শিপিংয়ের পূর্বে ফোন কল বাধ্যতামূলক' : 'Mandatory Phone Verification'}
              </p>
              <p className="text-[11px] text-stone-500">
                {isBn ? 'কল দিয়ে নিশ্চিত না করা পর্যন্ত স্ট্যাটাস পেন্ডিং থাকবে' : 'Hold order in pending queue until customer verbally confirms'}
              </p>
            </div>
            <input
              type="checkbox"
              checked={requirePhoneVerification}
              onChange={(e) => setRequirePhoneVerification(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="font-semibold text-stone-700 block text-xs mb-1">
              {isBn ? 'সর্বোচ্চ COD কোয়ান্টিটি প্রতি অর্ডার' : 'Max Watches Per COD Order'}
            </label>
            <input
              type="number"
              value={maxCodQuantity}
              onChange={(e) => setMaxCodQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs font-mono"
            />
            <p className="text-[10px] text-stone-400 mt-1">Orders exceeding this limit require 20% advance booking deposit.</p>
          </div>

          <div>
            <label className="font-semibold text-stone-700 block text-xs mb-1">
              {isBn ? 'কালোতালিকাভুক্ত ফোন নম্বর (কমা দিয়ে পৃথক)' : 'Blacklisted Phone Numbers'}
            </label>
            <input
              type="text"
              value={blacklistedPhones}
              onChange={(e) => setBlacklistedPhones(e.target.value)}
              className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs font-mono"
            />
          </div>
        </div>

        {/* Courier & Logistics Sync */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <Truck className="w-4 h-4 text-emerald-700" />
            <h3 className="font-semibold text-stone-900 text-sm">
              {isBn ? 'কুরিয়ার ইন্টিগ্রেশন (Steadfast / RedX)' : 'Courier API & Logistics Sync'}
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-stone-800 text-xs">Steadfast Courier API Auto-Booking</p>
              <p className="text-[11px] text-stone-500">Auto-create consignment slip when order is marked 'Confirmed'</p>
            </div>
            <input
              type="checkbox"
              checked={steadfastApiActive}
              onChange={(e) => setSteadfastApiActive(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-stone-800 text-xs">Automated SMS Dispatch Notification</p>
              <p className="text-[11px] text-stone-500">Send consignment tracking SMS to customer mobile</p>
            </div>
            <input
              type="checkbox"
              checked={smsNotificationActive}
              onChange={(e) => setSmsNotificationActive(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="font-semibold text-stone-700 block text-xs mb-1">
              Auto-Cancel Unresponsive Orders (Hours)
            </label>
            <select
              value={autoCancelHours}
              onChange={(e) => setAutoCancelHours(Number(e.target.value))}
              className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs"
            >
              <option value={24}>24 Hours</option>
              <option value={48}>48 Hours</option>
              <option value={72}>72 Hours</option>
            </select>
          </div>
        </div>
      </div>

      {/* WhatsApp Recovery Template */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-700" />
          <h3 className="font-semibold text-stone-900 text-sm">
            {isBn ? 'হোয়াটসঅ্যাপ মেসেজ টেমপ্লেট' : 'WhatsApp Client Notification Template'}
          </h3>
        </div>
        <textarea
          rows={3}
          value={whatsappTemplate}
          onChange={(e) => setWhatsappTemplate(e.target.value)}
          className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg font-mono focus:outline-none focus:border-emerald-500"
        />
        <p className="text-[10px] text-stone-400">Available merge tags: {"{name}"}, {"{orderNumber}"}, {"{total}"}, {"{courierTracking}"}</p>
      </div>
    </div>
  );
};
