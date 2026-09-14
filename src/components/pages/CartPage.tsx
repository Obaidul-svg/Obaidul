import React, { useState } from 'react';
import { CartItem, ButtonStyle, TypographyPreset, DeliveryZone } from '../../types';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag, Check, Sparkles } from 'lucide-react';

interface CartPageProps {
  cartItems: CartItem[];
  primaryColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: TypographyPreset;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (deliveryZone: DeliveryZone, appliedDiscountCode?: string, discountAmount?: number) => void;
  onContinueShopping: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  primaryColor,
  buttonStyle,
  fontFamily,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>('inside_dhaka');
  const [promoInput, setPromoInput] = useState('');
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = deliveryZone === 'inside_dhaka' ? 80 : 130;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'CHRONOVA10') {
      const discount = Math.round(subtotal * 0.10);
      setDiscountCode(code);
      setDiscountAmount(discount);
      setPromoMessage({ type: 'success', text: `10% discount applied (-৳ ${discount.toLocaleString()})` });
    } else if (code === 'DHAKA2000') {
      if (subtotal >= 30000) {
        setDiscountCode(code);
        setDiscountAmount(2000);
        setPromoMessage({ type: 'success', text: '৳ 2,000 Dhaka VIP privilege applied' });
      } else {
        setPromoMessage({ type: 'error', text: 'DHAKA2000 requires minimum order of ৳ 30,000' });
      }
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid promo code. Try CHRONOVA10 or DHAKA2000' });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FBF9F6] px-6 py-20 text-center">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl border border-stone-200/80 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className={`${fontClass} text-2xl font-normal text-stone-900 mb-2`}>
            Your Horology Bag is Empty
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light mb-6 leading-relaxed">
            You have not added any timepieces from our atelier vault yet. Discover our signature automatic calibres and chronographs.
          </p>
          <button
            onClick={onContinueShopping}
            className={`${buttonRadiusClass} w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md cursor-pointer`}
            style={{ backgroundColor: primaryColor || '#0A192F' }}
          >
            Explore All Timepieces
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-stone-900 pb-24">
      {/* Page Header */}
      <div className="bg-[#FAF7F2] border-b border-stone-200/80 py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-stone-500 mb-1 block">
            CONFIDENTIAL ACQUISITION
          </span>
          <h1 className={`${fontClass} text-3xl sm:text-4xl font-normal text-stone-900`}>
            Horology Shopping Bag ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Items Column */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200/90 divide-y divide-stone-100 overflow-hidden shadow-sm">
              {cartItems.map((item) => (
                <div key={item.product.id} className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  {/* Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-stone-50 rounded-xl p-2 border border-stone-100 shrink-0 flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-grow text-left space-y-1">
                    <div className="flex items-start justify-between">
                      <h3 className="text-base font-medium text-stone-900 font-sans-luxury">
                        {item.product.title}
                      </h3>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                        title="Remove timepiece"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-stone-500 font-light">
                      {item.product.specs.movement}
                    </p>

                    {item.selectedVariant && (
                      <p className="text-[11px] text-amber-800 font-medium">
                        Option: {item.selectedVariant}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity control */}
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="px-2.5 py-1 text-xs text-stone-600 hover:bg-stone-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-semibold font-mono text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.min(item.product.inventory, item.quantity + 1))}
                          className="px-2.5 py-1 text-xs text-stone-600 hover:bg-stone-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Total for this line */}
                      <div className="text-right">
                        <span className="text-sm font-semibold text-stone-900 font-sans-luxury">
                          ৳ {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono ml-1">BDT</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery option in Cart */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 space-y-4 text-left shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800 flex items-center gap-2">
                <span>Select Bangladesh Delivery Zone</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setDeliveryZone('inside_dhaka')}
                  className={`p-4 rounded-xl border-2 flex items-start justify-between cursor-pointer transition-all ${
                    deliveryZone === 'inside_dhaka'
                      ? 'border-stone-900 bg-stone-50/70'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-stone-900">Inside Dhaka (Express)</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">24 to 48 Hours Delivery</p>
                  </div>
                  <span className="text-xs font-bold font-mono text-stone-900">৳ 80</span>
                </label>

                <label
                  onClick={() => setDeliveryZone('outside_dhaka')}
                  className={`p-4 rounded-xl border-2 flex items-start justify-between cursor-pointer transition-all ${
                    deliveryZone === 'outside_dhaka'
                      ? 'border-stone-900 bg-stone-50/70'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-stone-900">Outside Dhaka (All BD)</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">48 to 72 Hours Priority Courier</p>
                  </div>
                  <span className="text-xs font-bold font-mono text-stone-900">৳ 130</span>
                </label>
              </div>
            </div>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-5">
              <h2 className={`${fontClass} text-xl font-normal text-stone-900 border-b border-stone-100 pb-3`}>
                Order Summary
              </h2>

              {/* Promo code */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. CHRONOVA10)"
                      className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs uppercase font-mono text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium cursor-pointer hover:bg-black transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {promoMessage && (
                  <p className={`text-[11px] ${promoMessage.type === 'success' ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </form>

              {/* Cost breakdown */}
              <div className="space-y-2.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900 font-mono">৳ {subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Bangladesh Delivery ({deliveryZone === 'inside_dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                  <span className="font-semibold text-stone-900 font-mono">৳ {deliveryFee}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Privilege Discount ({discountCode})</span>
                    <span className="font-semibold font-mono">-৳ {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between pt-3 border-t border-stone-200 text-sm font-bold text-stone-900">
                  <span>Grand Total (BDT)</span>
                  <span className="text-base font-serif-luxury">৳ {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => onProceedToCheckout(deliveryZone, discountCode || undefined, discountAmount)}
                className={`${buttonRadiusClass} w-full py-4 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer`}
                style={{ backgroundColor: primaryColor || '#0A192F' }}
              >
                <span>Proceed to Bangladesh Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-[11px] text-stone-500 text-center space-y-1">
                <p>Cash on Delivery • bKash • Nagad • Card</p>
                <p className="text-stone-400">Includes 5-Year Official Chronova Warranty</p>
              </div>
            </div>

            {/* Assurance Card */}
            <div className="bg-amber-50/60 border border-amber-200/60 p-4 rounded-xl text-xs text-stone-700 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-stone-900">Inspect Parcel Before Payment</p>
                <p className="text-[11px] text-stone-600 font-light mt-0.5">
                  Our armored couriers allow parcel examination to verify the watch model and certificate of origin before completing Cash on Delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
