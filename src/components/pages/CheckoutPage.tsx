import React, { useState } from 'react';
import { 
  CartItem, 
  DeliveryZone, 
  PaymentMethod, 
  BangladeshShippingAddress, 
  Order, 
  ButtonStyle, 
  TypographyPreset 
} from '../../types';
import { BANGLADESH_DISTRICTS } from '../../data/mockData';
import { 
  ShieldCheck, 
  Truck, 
  ArrowLeft, 
  Lock, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Banknote,
  AlertCircle
} from 'lucide-react';

interface CheckoutPageProps {
  cartItems: CartItem[];
  initialDeliveryZone?: DeliveryZone;
  initialDiscountCode?: string;
  initialDiscountAmount?: number;
  primaryColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: TypographyPreset;
  onPlaceOrder: (order: Order) => void;
  onBackToCart: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  initialDeliveryZone = 'inside_dhaka',
  initialDiscountCode,
  initialDiscountAmount = 0,
  primaryColor,
  buttonStyle,
  fontFamily,
  onPlaceOrder,
  onBackToCart,
}) => {
  // Customer & Address State
  const [formData, setFormData] = useState<BangladeshShippingAddress>({
    fullName: '',
    phone: '',
    email: '',
    district: 'Dhaka',
    area: '',
    fullAddress: '',
    orderNotes: ''
  });

  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>(initialDeliveryZone);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [trxId, setTrxId] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const grandTotal = Math.max(0, subtotal + deliveryFee - initialDiscountAmount);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Please enter a valid phone number (e.g. 017XXXXXXXX)';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Please enter a valid email address';
    if (!formData.district.trim()) errors.district = 'Please select your district';
    if (!formData.area.trim()) errors.area = 'Please specify your area / thana (e.g. Gulshan, Dhanmondi)';
    if (!formData.fullAddress.trim()) errors.fullAddress = 'Please enter your detailed street and house address';

    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !trxId.trim()) {
      errors.trxId = `Please provide the ${paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} Transaction ID (TrxID)`;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `CN-${randomNum}`,
      customerEmail: formData.email,
      customerName: formData.fullName,
      phone: formData.phone,
      items: cartItems.map(item => ({
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
      discountCode: initialDiscountCode,
      discountAmount: initialDiscountAmount,
      total: grandTotal,
      paymentMethod,
      trxId: trxId.trim() || undefined,
      status: paymentMethod === 'cod' ? 'Processing' : 'Paid',
      createdAt: new Date().toISOString(),
      shippingAddress: formData
    };

    setTimeout(() => {
      onPlaceOrder(newOrder);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-stone-900 pb-24">
      {/* Header */}
      <div className="bg-[#FAF7F2] border-b border-stone-200/80 py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          <button
            onClick={onBackToCart}
            className="inline-flex items-center gap-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Bag</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
            <Lock className="w-3.5 h-3.5 text-emerald-700" />
            <span>256-Bit Encrypted Atelier Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Form Fields: Contact, Delivery, Payment */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Section 1: Customer Info */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-base font-semibold text-stone-900 font-sans-luxury">
                    Customer Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Tariq Rahman"
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 ${
                        formErrors.fullName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-stone-200 focus:ring-stone-900'
                      }`}
                    />
                    {formErrors.fullName && <p className="text-[11px] text-rose-600 mt-1">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Mobile Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="017XXXXXXXX"
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 ${
                        formErrors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-stone-200 focus:ring-stone-900'
                      }`}
                    />
                    {formErrors.phone && <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahman@example.com"
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 ${
                        formErrors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-stone-200 focus:ring-stone-900'
                      }`}
                    />
                    {formErrors.email && <p className="text-[11px] text-rose-600 mt-1">{formErrors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Address in Bangladesh */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="text-base font-semibold text-stone-900 font-sans-luxury">
                    Bangladesh Delivery Address
                  </h2>
                </div>

                {/* Delivery Option Selector */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Select Delivery Zone *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setDeliveryZone('inside_dhaka')}
                      className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        deliveryZone === 'inside_dhaka'
                          ? 'border-stone-900 bg-stone-50'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-stone-900">Inside Dhaka (Express)</p>
                        <p className="text-[11px] text-stone-500">24–48 Hours Delivery</p>
                      </div>
                      <span className="text-xs font-bold font-mono text-stone-900">৳ 80</span>
                    </div>

                    <div
                      onClick={() => setDeliveryZone('outside_dhaka')}
                      className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        deliveryZone === 'outside_dhaka'
                          ? 'border-stone-900 bg-stone-50'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-stone-900">Outside Dhaka (All BD)</p>
                        <p className="text-[11px] text-stone-500">48–72 Hours Express Courier</p>
                      </div>
                      <span className="text-xs font-bold font-mono text-stone-900">৳ 130</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      District *
                    </label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
                    >
                      {BANGLADESH_DISTRICTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Area / Thana / Sub-district *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="e.g. Gulshan-2, Banani, Dhanmondi"
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 ${
                        formErrors.area ? 'border-rose-500 ring-1 ring-rose-500' : 'border-stone-200 focus:ring-stone-900'
                      }`}
                    />
                    {formErrors.area && <p className="text-[11px] text-rose-600 mt-1">{formErrors.area}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Full Street Address *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.fullAddress}
                      onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                      placeholder="Road / House / Flat No, Landmark..."
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 ${
                        formErrors.fullAddress ? 'border-rose-500 ring-1 ring-rose-500' : 'border-stone-200 focus:ring-stone-900'
                      }`}
                    />
                    {formErrors.fullAddress && <p className="text-[11px] text-rose-600 mt-1">{formErrors.fullAddress}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Courier Delivery Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.orderNotes}
                      onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                      placeholder="e.g. Call before arrival, gift packaging requested"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Method (Cash on Delivery, bKash, Nagad, Card) */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="text-base font-semibold text-stone-900 font-sans-luxury">
                    Payment Method
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {/* Cash on Delivery */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-stone-900 bg-stone-50 text-stone-900 font-semibold'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-emerald-700" />
                    <span className="text-xs">Cash on Delivery</span>
                  </button>

                  {/* bKash */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'bkash'
                        ? 'border-pink-600 bg-pink-50/50 text-pink-950 font-semibold'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-pink-600" />
                    <span className="text-xs">bKash</span>
                  </button>

                  {/* Nagad */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'nagad'
                        ? 'border-orange-600 bg-orange-50/50 text-orange-950 font-semibold'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-orange-600" />
                    <span className="text-xs">Nagad</span>
                  </button>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-blue-900 bg-blue-50/50 text-blue-950 font-semibold'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-blue-900" />
                    <span className="text-xs">Credit/Debit Card</span>
                  </button>
                </div>

                {/* Detailed Payment Instructions Box */}
                <div className="pt-2">
                  {paymentMethod === 'cod' && (
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700 space-y-1.5">
                      <p className="font-semibold text-stone-900">Cash on Delivery (Pay upon arrival)</p>
                      <p className="font-light">
                        Pay ৳ {grandTotal.toLocaleString()} in cash to the armored courier agent when your package arrives. Open parcel inspection is welcomed.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'bkash' && (
                    <div className="p-4 bg-pink-50/80 border border-pink-200 rounded-xl text-xs text-stone-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-pink-900">bKash Merchant Payment</span>
                        <span className="font-mono font-bold bg-pink-200 text-pink-900 px-2 py-0.5 rounded text-[11px]">
                          01711-892341
                        </span>
                      </div>
                      <p className="font-light text-stone-600">
                        1. Go to your bKash App &gt; Select "Make Payment".<br />
                        2. Enter Merchant Number: <strong className="font-mono">01711-892341</strong><br />
                        3. Amount: <strong className="font-mono font-semibold">৳ {grandTotal.toLocaleString()}</strong><br />
                        4. Reference: <strong className="font-mono">CHRONOVA</strong>
                      </p>
                      <div className="pt-1">
                        <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
                          bKash Transaction ID (TrxID) *
                        </label>
                        <input
                          type="text"
                          required
                          value={trxId}
                          onChange={(e) => setTrxId(e.target.value)}
                          placeholder="e.g. BK9A872615X"
                          className="w-full px-3 py-2 bg-white border border-pink-300 rounded-lg text-xs font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-pink-500"
                        />
                        {formErrors.trxId && <p className="text-[11px] text-rose-600 mt-1">{formErrors.trxId}</p>}
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'nagad' && (
                    <div className="p-4 bg-orange-50/80 border border-orange-200 rounded-xl text-xs text-stone-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-orange-900">Nagad Merchant Payment</span>
                        <span className="font-mono font-bold bg-orange-200 text-orange-900 px-2 py-0.5 rounded text-[11px]">
                          01711-892341
                        </span>
                      </div>
                      <p className="font-light text-stone-600">
                        Send payment of <strong>৳ {grandTotal.toLocaleString()}</strong> to Nagad Merchant account <strong>01711-892341</strong> and enter the Transaction ID below.
                      </p>
                      <div className="pt-1">
                        <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
                          Nagad Transaction ID (TrxID) *
                        </label>
                        <input
                          type="text"
                          required
                          value={trxId}
                          onChange={(e) => setTrxId(e.target.value)}
                          placeholder="e.g. NG7721890B"
                          className="w-full px-3 py-2 bg-white border border-orange-300 rounded-lg text-xs font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                        {formErrors.trxId && <p className="text-[11px] text-rose-600 mt-1">{formErrors.trxId}</p>}
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-xl text-xs text-stone-800 space-y-2">
                      <p className="font-semibold text-blue-900">Credit / Debit Card (Visa, MasterCard, Amex)</p>
                      <p className="font-light text-stone-600">
                        Processed via Bangladesh Bank 3D-Secure certified gateway (SSLCommerz / City Bank).
                      </p>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                          className="col-span-2 px-3 py-2 bg-white border border-blue-200 rounded text-xs"
                          defaultValue="4111 •••• •••• 9214"
                        />
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="px-3 py-2 bg-white border border-blue-200 rounded text-xs"
                          defaultValue="08/29"
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          className="px-3 py-2 bg-white border border-blue-200 rounded text-xs"
                          defaultValue="381"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar: Order Summary */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm space-y-5">
                <h2 className={`${fontClass} text-xl font-normal text-stone-900 border-b border-stone-100 pb-3`}>
                  Items in Allocation ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                </h2>

                {/* Items List */}
                <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="py-3 flex items-center gap-3">
                      <div className="w-14 h-14 bg-stone-50 rounded-lg p-1 border border-stone-100 shrink-0 flex items-center justify-center">
                        <img src={item.product.image} alt={item.product.title} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-grow text-xs">
                        <p className="font-medium text-stone-900">{item.product.title}</p>
                        <p className="text-stone-500 text-[11px]">Qty: {item.quantity} {item.selectedVariant ? `• ${item.selectedVariant}` : ''}</p>
                      </div>
                      <div className="text-right text-xs font-semibold font-mono text-stone-900">
                        ৳ {(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Breakdown */}
                <div className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono font-medium text-stone-900">৳ {subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery ({deliveryZone === 'inside_dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                    <span className="font-mono font-medium text-stone-900">৳ {deliveryFee}</span>
                  </div>

                  {initialDiscountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Privilege Code ({initialDiscountCode})</span>
                      <span className="font-mono font-semibold">-৳ {initialDiscountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-3 border-t border-stone-200 text-base font-bold text-stone-900">
                    <span>Total Payable</span>
                    <span className="font-serif-luxury text-lg">৳ {grandTotal.toLocaleString()} BDT</span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${buttonRadiusClass} w-full py-4 text-xs font-semibold uppercase tracking-wider text-white shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50`}
                  style={{ backgroundColor: primaryColor || '#0A192F' }}
                >
                  {isSubmitting ? (
                    <span>Registering Order...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-amber-300" />
                      <span>Confirm &amp; Place Order (৳ {grandTotal.toLocaleString()})</span>
                    </>
                  )}
                </button>

                <div className="space-y-1 text-center text-[11px] text-stone-500">
                  <p>Includes official 5-Year Chronova atelier warranty</p>
                  <p>SMS order confirmation sent to your mobile</p>
                </div>
              </div>

              {/* Security guarantee */}
              <div className="bg-white p-4 rounded-xl border border-stone-200/80 flex items-center gap-3 text-xs text-stone-600">
                <ShieldCheck className="w-5 h-5 text-stone-900 shrink-0" />
                <span>Zero-risk ordering with complete parcel pre-payment inspection guarantee.</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
