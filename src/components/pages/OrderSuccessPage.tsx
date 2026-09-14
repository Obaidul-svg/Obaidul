import React from 'react';
import { Order, ButtonStyle, TypographyPreset } from '../../types';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, ShieldCheck, Phone, MapPin } from 'lucide-react';

interface OrderSuccessPageProps {
  order: Order;
  primaryColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: TypographyPreset;
  onContinueShopping: () => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({
  order,
  primaryColor,
  buttonStyle,
  fontFamily,
  onContinueShopping,
}) => {
  const fontClass = fontFamily === 'serif' 
    ? 'font-serif-luxury' 
    : fontFamily === 'display' 
    ? 'font-display-luxury' 
    : 'font-sans-luxury';

  const buttonRadiusClass = buttonStyle === 'pill' 
    ? 'rounded-full' 
    : buttonStyle === 'sharp' 
    ? 'rounded-none' 
    : 'rounded-lg';

  const handlePrint = () => {
    window.print();
  };

  const isDhaka = order.deliveryZone === 'inside_dhaka';

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-stone-900 py-12 md:py-20 px-6 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Success Banner */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200/90 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-amber-800 block">
            CHRONOVA ATELIER ALLOCATION CONFIRMED
          </span>

          <h1 className={`${fontClass} text-3xl sm:text-4xl font-normal text-stone-900`}>
            Thank You, {order.customerName}
          </h1>

          <p className="text-stone-600 text-sm font-sans-luxury max-w-lg mx-auto font-light leading-relaxed">
            Your horological acquisition has been securely logged. An official authentication certificate and 5-year warranty document are being prepared at our Dhaka atelier.
          </p>

          <div className="inline-flex items-center gap-3 px-4 py-2 bg-stone-50 border border-stone-200 rounded-full font-mono text-xs text-stone-800">
            <span className="text-stone-400">Order Reference:</span>
            <span className="font-bold text-stone-900">{order.orderNumber}</span>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm text-left space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <h2 className="text-base font-semibold text-stone-900 font-sans-luxury flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-stone-900" />
              <span>Shipment &amp; Verification Details</span>
            </h2>
            <button
              onClick={handlePrint}
              className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1.5 cursor-pointer underline print:hidden"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {/* Delivery address */}
            <div className="space-y-1.5">
              <span className="font-semibold uppercase tracking-wider text-stone-400 block font-mono text-[10px]">
                Armored Courier Destination
              </span>
              <p className="font-semibold text-stone-900 text-sm">{order.shippingAddress.fullName}</p>
              <div className="flex items-start gap-1.5 text-stone-600">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-stone-400" />
                <p>{order.shippingAddress.fullAddress}, {order.shippingAddress.area}, {order.shippingAddress.district}</p>
              </div>
              <div className="flex items-center gap-1.5 text-stone-600">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Payment & Estimated arrival */}
            <div className="space-y-1.5">
              <span className="font-semibold uppercase tracking-wider text-stone-400 block font-mono text-[10px]">
                Payment &amp; Delivery Window
              </span>
              <p className="text-stone-900 font-medium capitalize">
                Method: <strong className="uppercase">{order.paymentMethod}</strong> {order.trxId ? `(TrxID: ${order.trxId})` : ''}
              </p>
              <p className="text-stone-600">
                Delivery Schedule: <strong className="text-stone-900">{isDhaka ? 'Within 24 to 48 Hours' : 'Within 48 to 72 Hours'}</strong>
              </p>
              <p className="text-emerald-700 font-medium">
                Parcel Status: Allocated &amp; Prepared for Dispatch
              </p>
            </div>
          </div>

          {/* Purchased watches */}
          <div className="border-t border-stone-100 pt-4 space-y-3">
            <span className="font-semibold uppercase tracking-wider text-stone-400 block font-mono text-[10px]">
              Allocated Timepieces
            </span>

            <div className="divide-y divide-stone-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-stone-50 border p-1 shrink-0 flex items-center justify-center">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-stone-900">{item.title}</p>
                      <p className="text-[11px] text-stone-400">Qty: {item.quantity} {item.variant ? `• ${item.variant}` : ''}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-stone-900">
                    ৳ {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-stone-200 pt-3 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono">৳ {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Courier Delivery ({isDhaka ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                <span className="font-mono">৳ {order.deliveryFee}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Privilege Voucher</span>
                  <span className="font-mono">-৳ {order.discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-100">
                <span>Total Settled (BDT)</span>
                <span className="font-serif-luxury text-base">৳ {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assurance and Next Steps */}
        <div className="bg-amber-50/70 border border-amber-200/80 p-5 rounded-2xl flex items-start gap-3.5 text-xs text-stone-800 text-left">
          <ShieldCheck className="w-5 h-5 text-amber-900 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-stone-900">5-Year Official Chronova Guarantee Included</p>
            <p className="text-stone-600 font-light leading-relaxed">
              Your parcel includes an NFC-authenticated warranty card and certificate of origin signed by our Master Horologist at the Gulshan-2 Dhaka Atelier. For any inquiries, call our VIP concierge directly at +880 1711-892341.
            </p>
          </div>
        </div>

        {/* Continue Shopping CTA */}
        <div className="text-center pt-4 print:hidden">
          <button
            onClick={onContinueShopping}
            className={`${buttonRadiusClass} px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:scale-[1.02] transition-all inline-flex items-center gap-2 cursor-pointer`}
            style={{ backgroundColor: primaryColor || '#0A192F' }}
          >
            <span>Continue Horology Exploration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
