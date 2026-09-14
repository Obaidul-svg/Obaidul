import React, { useState } from 'react';
import { CartItem, Discount } from '../../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  availableDiscounts: Discount[];
  appliedDiscount: Discount | null;
  onApplyDiscount: (discount: Discount | null) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  availableDiscounts,
  appliedDiscount,
  onApplyDiscount,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.type === 'percentage') {
      discountAmount = (subtotal * appliedDiscount.value) / 100;
    } else {
      discountAmount = appliedDiscount.value;
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    const matched = availableDiscounts.find(
      (d) => d.code.toUpperCase() === code && d.isActive
    );

    if (matched) {
      if (matched.minSpend && subtotal < matched.minSpend) {
        setCouponError(`Minimum order of $${matched.minSpend.toLocaleString()} required for this code.`);
        return;
      }
      onApplyDiscount(matched);
      setCouponInput('');
    } else {
      setCouponError('Invalid or expired promotional code. Try MANOVA10 or VIP250.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-stone-900 shadow-2xl flex flex-col justify-between animate-slideLeft">
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-stone-900 font-sans-luxury">
                Your Atelier Bag
              </h2>
              <p className="text-xs text-stone-500 font-sans-luxury">
                {cartItems.length} {cartItems.length === 1 ? 'timepiece' : 'timepieces'} selected
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Complimentary shipping bar */}
            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 text-xs text-stone-700 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
              <div>
                <span className="font-semibold block text-stone-900">Complimentary Courier Logistics</span>
                <span className="text-[11px] text-stone-500">Fully insured delivery with signature required.</span>
              </div>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400">
                  <Tag className="w-7 h-7" />
                </div>
                <p className="text-stone-600 text-sm font-medium">Your shopping bag is currently empty.</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#0A192F] text-white text-xs font-semibold rounded-full uppercase tracking-wider"
                >
                  Explore Timepieces
                </button>
              </div>
            ) : (
              <div className="divide-y divide-stone-100 space-y-4">
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                    <div className="w-20 h-20 bg-stone-50 rounded-lg p-2 shrink-0 border border-stone-200/60 flex items-center justify-center">
                      <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between text-left">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-medium text-stone-900 font-sans-luxury">{product.title}</h4>
                          <span className="text-sm font-semibold text-stone-900 font-mono">
                            ৳ {(product.price * quantity).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 line-clamp-1">{product.subtitle}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                            className="p-1 hover:bg-stone-200 text-stone-600 rounded-l-lg transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold font-mono">{quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            className="p-1 hover:bg-stone-200 text-stone-600 rounded-r-lg transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-stone-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                          title="Remove Timepiece"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Promo Code Applicator */}
            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-stone-100">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. CHRONOVA10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-600 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-800 text-white text-xs font-medium rounded-lg hover:bg-black transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1.5">{couponError}</p>
                )}

                {appliedDiscount && (
                  <div className="mt-2 flex items-center justify-between bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg text-xs">
                    <span>
                      Code <strong>{appliedDiscount.code}</strong> applied ({appliedDiscount.type === 'percentage' ? `${appliedDiscount.value}% off` : `৳ ${appliedDiscount.value} off`})
                    </span>
                    <button
                      onClick={() => onApplyDiscount(null)}
                      className="text-emerald-900 font-bold hover:underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50/50 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600 font-sans-luxury">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-stone-900">৳ {subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Privilege Savings</span>
                    <span className="font-mono">-৳ {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Bangladesh Courier</span>
                  <span className="text-stone-700 font-medium font-mono">From ৳ 80</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="font-mono">৳ {finalTotal.toLocaleString()} BDT</span>
                </div>
              </div>

              <button
                id="cart-proceed-checkout-btn"
                onClick={onProceedToCheckout}
                className="w-full py-4 bg-[#0A192F] hover:bg-[#122744] text-white rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-[10px] text-stone-400 font-sans-luxury">
                Encrypted 256-Bit SSL Atelier Checkout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
