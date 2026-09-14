import React, { useState } from 'react';
import { CartItem, Discount, Order, DeliveryZone, PaymentMethod, BangladeshShippingAddress } from '../../types';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { ManovaLogo } from '../ManovaLogo';
import { BANGLADESH_DISTRICTS } from '../../data/mockData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedDiscount: Discount | null;
  onOrderCompleted: (order: Order) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedDiscount,
  onOrderCompleted,
  onClearCart,
}) => {
  const [formData, setFormData] = useState<BangladeshShippingAddress>({
    fullName: '',
    phone: '',
    email: '',
    district: 'Dhaka',
    area: '',
    fullAddress: '',
  });

  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>('inside_dhaka');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [trxId, setTrxId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.type === 'percentage') {
      discountAmount = Math.round((subtotal * appliedDiscount.value) / 100);
    } else {
      discountAmount = appliedDiscount.value;
    }
  }

  const deliveryFee = deliveryZone === 'inside_dhaka' ? 80 : 130;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discountAmount);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.area || !formData.fullAddress) {
      alert('Please fill out all required delivery fields.');
      return;
    }

    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !trxId.trim()) {
      alert(`Please provide the ${paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} Transaction ID (TrxID)`);
      return;
    }

    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 600));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `CN-${Math.floor(1000 + Math.random() * 9000)}`,
      customerEmail: formData.email || 'customer@chronovawatches.com.bd',
      customerName: formData.fullName,
      phone: formData.phone,
      items: cartItems.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
        variant: item.selectedVariant
      })),
      subtotal,
      deliveryFee,
      deliveryZone,
      discountCode: appliedDiscount?.code,
      discountAmount,
      total: grandTotal,
      paymentMethod,
      trxId: trxId.trim() || undefined,
      status: paymentMethod === 'cod' ? 'Processing' : 'Paid',
      createdAt: new Date().toISOString(),
      shippingAddress: formData,
    };

    onOrderCompleted(newOrder);
    onClearCart();
    setCompletedOrder(newOrder);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white text-stone-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/80">
          <div className="flex items-center gap-3">
            <ManovaLogo variant="screenshotMatch" />
            <span className="hidden sm:inline text-xs text-stone-400 font-mono">| Bangladesh Atelier Checkout</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 text-left">
          {completedOrder ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif-luxury font-medium text-stone-900">
                Order {completedOrder.orderNumber} Registered
              </h2>
              <p className="text-sm text-stone-600 max-w-md mx-auto font-light">
                Thank you, {completedOrder.customerName}. Your allocation has been secured. Our armored courier will dispatch your parcel to {completedOrder.shippingAddress.district} ({completedOrder.deliveryZone === 'inside_dhaka' ? 'Inside Dhaka 24-48h' : 'Outside Dhaka 48-72h'}).
              </p>
              <div className="p-4 bg-stone-50 rounded-xl max-w-sm mx-auto text-xs font-mono text-stone-700 space-y-1 text-left">
                <p><strong>Total Payable:</strong> ৳ {completedOrder.total.toLocaleString()} BDT</p>
                <p><strong>Payment Mode:</strong> <span className="uppercase">{completedOrder.paymentMethod}</span></p>
                {completedOrder.trxId && <p><strong>TrxID:</strong> {completedOrder.trxId}</p>}
                <p><strong>Official Warranty:</strong> 5 Years Included</p>
              </div>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-3 bg-[#0A192F] text-white rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Close &amp; Return to Boutique
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Form Details */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-3 font-mono">
                    1. Recipient Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-medium text-stone-500 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Asif Mahmud"
                        className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-stone-500 mb-1">Mobile Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="017XXXXXXXX"
                        className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-stone-500 mb-1">Email (Optional)</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="asif@example.com"
                        className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-600"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-3 font-mono">
                    2. Bangladesh Delivery Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Delivery Zone selection */}
                    <div className="sm:col-span-2 grid grid-cols-2 gap-2 mb-1">
                      <button
                        type="button"
                        onClick={() => setDeliveryZone('inside_dhaka')}
                        className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                          deliveryZone === 'inside_dhaka' ? 'border-stone-900 bg-stone-50 font-semibold' : 'border-stone-200'
                        }`}
                      >
                        <span className="block font-medium">Inside Dhaka</span>
                        <span className="text-[10px] text-stone-500">৳80 • 24-48h</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryZone('outside_dhaka')}
                        className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                          deliveryZone === 'outside_dhaka' ? 'border-stone-900 bg-stone-50 font-semibold' : 'border-stone-200'
                        }`}
                      >
                        <span className="block font-medium">Outside Dhaka</span>
                        <span className="text-[10px] text-stone-500">৳130 • 48-72h</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-stone-500 mb-1">District *</label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-600 cursor-pointer"
                      >
                        {BANGLADESH_DISTRICTS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-stone-500 mb-1">Area / Thana *</label>
                      <input
                        type="text"
                        required
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        placeholder="e.g. Banani, Dhanmondi, Uttara"
                        className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-600"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-medium text-stone-500 mb-1">Full Street Address *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullAddress}
                        onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                        placeholder="House No, Road, Flat, Landmark"
                        className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-600"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-3 font-mono">
                    3. Payment Method
                  </h3>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-lg border text-center text-xs transition-all cursor-pointer ${
                        paymentMethod === 'cod' ? 'border-stone-900 bg-stone-50 font-semibold' : 'border-stone-200'
                      }`}
                    >
                      <Banknote className="w-4 h-4 mx-auto mb-1 text-emerald-700" />
                      <span>COD</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bkash')}
                      className={`p-2.5 rounded-lg border text-center text-xs transition-all cursor-pointer ${
                        paymentMethod === 'bkash' ? 'border-pink-600 bg-pink-50 font-semibold' : 'border-stone-200'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 mx-auto mb-1 text-pink-600" />
                      <span>bKash</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('nagad')}
                      className={`p-2.5 rounded-lg border text-center text-xs transition-all cursor-pointer ${
                        paymentMethod === 'nagad' ? 'border-orange-600 bg-orange-50 font-semibold' : 'border-stone-200'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 mx-auto mb-1 text-orange-600" />
                      <span>Nagad</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-lg border text-center text-xs transition-all cursor-pointer ${
                        paymentMethod === 'card' ? 'border-blue-900 bg-blue-50 font-semibold' : 'border-stone-200'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mx-auto mb-1 text-blue-900" />
                      <span>Card</span>
                    </button>
                  </div>

                  {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
                    <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs space-y-1.5">
                      <p className="font-semibold text-stone-900">
                        {paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} Merchant Wallet: <span className="font-mono text-amber-800">01711-892341</span>
                      </p>
                      <p className="text-stone-500 text-[11px]">
                        Pay <strong>৳ {grandTotal.toLocaleString()}</strong> with reference <strong>MANOVA</strong> and provide Transaction ID:
                      </p>
                      <input
                        type="text"
                        required
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        placeholder="Enter Transaction ID (TrxID)"
                        className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded font-mono text-xs uppercase"
                      />
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-600">
                      <span>You can inspect the timepiece presentation box before making cash payment to the courier.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="md:col-span-5 bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 font-mono border-b border-stone-200 pb-2">
                  Summary ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} Items)
                </h3>

                <div className="space-y-3 max-h-56 overflow-y-auto">
                  {cartItems.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center gap-3 text-xs">
                      <div className="w-12 h-12 bg-white rounded p-1 border border-stone-200 shrink-0">
                        <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 truncate">
                        <p className="font-medium text-stone-900 truncate">{product.title}</p>
                        <p className="text-stone-400 text-[10px]">Qty: {quantity}</p>
                      </div>
                      <span className="font-mono font-medium">৳ {(product.price * quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-200 pt-3 space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-stone-900">৳ {subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Privilege Code ({appliedDiscount?.code})</span>
                      <span className="font-mono">-৳ {discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Courier ({deliveryZone === 'inside_dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                    <span className="font-mono text-stone-900">৳ {deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                    <span>Grand Total</span>
                    <span className="font-mono">৳ {grandTotal.toLocaleString()} BDT</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#0A192F] hover:bg-[#122744] text-white rounded-xl font-medium text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Registering Order...' : `Confirm Order (৳ ${grandTotal.toLocaleString()})`}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500">
                  <Lock className="w-3 h-3 text-emerald-700" />
                  <span>256-Bit Encrypted Atelier Ingress</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
