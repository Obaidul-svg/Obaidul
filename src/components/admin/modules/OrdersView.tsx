import React, { useState } from 'react';
import { Order, IncompleteOrder, OrderStatus, PaymentStatus } from '../../../types';
import { 
  Search, 
  Filter, 
  Phone, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  CreditCard, 
  X, 
  Printer, 
  ExternalLink,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  MapPin,
  RefreshCw,
  Eye
} from 'lucide-react';
import { BANGLADESH_DISTRICTS } from '../../../data/mockData';

interface OrdersViewProps {
  orders: Order[];
  incompleteOrders: IncompleteOrder[];
  activeSubtab?: 'all' | 'pending' | 'shipped' | 'delivered' | 'payment-status' | 'incomplete';
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onConvertIncompleteOrder?: (incompleteOrder: IncompleteOrder) => void;
  lang: 'bn' | 'en';
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  incompleteOrders,
  activeSubtab = 'all',
  onUpdateOrderStatus,
  onConvertIncompleteOrder,
  lang,
}) => {
  const isBn = lang === 'bn';

  const [currentTab, setCurrentTab] = useState<'all' | 'pending' | 'shipped' | 'delivered' | 'payment-status' | 'incomplete'>(activeSubtab);
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedIncomplete, setSelectedIncomplete] = useState<IncompleteOrder | null>(null);
  const [showPrintSlipModal, setShowPrintSlipModal] = useState<Order | null>(null);

  // Filter orders
  const filteredOrders = orders.filter(ord => {
    // subtab filter
    if (currentTab === 'pending' && ord.status !== 'Pending') return false;
    if (currentTab === 'shipped' && ord.status !== 'Shipped') return false;
    if (currentTab === 'delivered' && ord.status !== 'Delivered') return false;
    if (currentTab === 'payment-status' && ord.paymentStatus !== 'COD Pending' && ord.paymentMethod !== 'cod') return false;

    // district filter
    if (districtFilter !== 'all' && !ord.shippingAddress.district.toLowerCase().includes(districtFilter.toLowerCase())) return false;

    // search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNum = ord.orderNumber.toLowerCase().includes(q);
      const matchName = ord.customerName.toLowerCase().includes(q);
      const matchPhone = ord.phone.includes(q);
      return matchNum || matchName || matchPhone;
    }
    return true;
  });

  const filteredIncompletes = incompleteOrders.filter(inc => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return inc.customerName.toLowerCase().includes(q) || inc.phone.includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Subtab Navigation Pills */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
        <button
          onClick={() => setCurrentTab('all')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            currentTab === 'all'
              ? 'bg-[#15803D] text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          {isBn ? 'সব অর্ডার' : 'All Orders'} ({orders.length})
        </button>

        <button
          onClick={() => setCurrentTab('pending')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            currentTab === 'pending'
              ? 'bg-[#15803D] text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>{isBn ? 'পেন্ডিং' : 'Pending'}</span>
          <span className="ml-1 px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded-full text-[10px]">
            {orders.filter(o => o.status === 'Pending').length}
          </span>
        </button>

        <button
          onClick={() => setCurrentTab('shipped')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            currentTab === 'shipped'
              ? 'bg-[#15803D] text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>{isBn ? 'শিপড' : 'Shipped'}</span>
          <span className="ml-1 px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded-full text-[10px]">
            {orders.filter(o => o.status === 'Shipped').length}
          </span>
        </button>

        <button
          onClick={() => setCurrentTab('delivered')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            currentTab === 'delivered'
              ? 'bg-[#15803D] text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{isBn ? 'ডেলিভারড' : 'Delivered'}</span>
        </button>

        <button
          onClick={() => setCurrentTab('payment-status')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            currentTab === 'payment-status'
              ? 'bg-[#15803D] text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>{isBn ? 'ডেলিভারি পেমেন্ট স্ট্যাটাস' : 'Payment Status'}</span>
        </button>

        <button
          onClick={() => setCurrentTab('incomplete')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            currentTab === 'incomplete'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{isBn ? 'ইনকমপ্লিট অর্ডার' : 'Incomplete Orders'}</span>
          <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full">
            {incompleteOrders.length}
          </span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isBn ? 'অর্ডার #, গ্রাহকের নাম বা ফোন নম্বর খুঁজুন...' : 'Search by order#, name or phone...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-white"
          />
        </div>

        {currentTab !== 'incomplete' && (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs text-stone-500 shrink-0">{isBn ? 'জেলা:' : 'District:'}</span>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-700 focus:outline-none"
            >
              <option value="all">{isBn ? 'সকল জেলা (All BD)' : 'All Districts'}</option>
              {BANGLADESH_DISTRICTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Content: Orders Table OR Incomplete Checkouts Table */}
      {currentTab !== 'incomplete' ? (
        <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
                <tr>
                  <th className="p-3.5">{isBn ? 'অর্ডার নং' : 'Order ID'}</th>
                  <th className="p-3.5">{isBn ? 'গ্রাহক ও ফোন' : 'Customer & Contact'}</th>
                  <th className="p-3.5">{isBn ? 'ঘড়ি / আইটেম' : 'Watch Details'}</th>
                  <th className="p-3.5">{isBn ? 'মূল্য ও পেমেন্ট' : 'Total & Payment'}</th>
                  <th className="p-3.5">{isBn ? 'ডেলিভারি ঠিকানা' : 'Address & Zone'}</th>
                  <th className="p-3.5">{isBn ? 'স্ট্যাটাস' : 'Status'}</th>
                  <th className="p-3.5 text-right">{isBn ? 'অ্যাকশন' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-stone-400">
                      {isBn ? 'কোনো অর্ডার পাওয়া যায়নি।' : 'No orders matched your search criteria.'}
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-stone-900">
                        {ord.orderNumber}
                        <div className="text-[10px] text-stone-400 font-normal mt-0.5">
                          {new Date(ord.createdAt).toLocaleDateString('en-GB')}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <p className="font-semibold text-stone-900">{ord.customerName}</p>
                        <a 
                          href={`tel:${ord.phone}`} 
                          className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 mt-0.5 font-mono"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{ord.phone}</span>
                        </a>
                      </td>

                      <td className="p-3.5">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex items-center gap-2 mb-1 last:mb-0">
                            <img src={it.image} alt={it.title} className="w-7 h-7 object-cover rounded border border-stone-200" />
                            <div>
                              <p className="font-medium text-stone-800 truncate max-w-[130px]">{it.title}</p>
                              <p className="text-[10px] text-stone-500">Qty: {it.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </td>

                      <td className="p-3.5 font-mono">
                        <p className="font-bold text-stone-900 text-sm">৳ {ord.total.toLocaleString()}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="uppercase text-[10px] px-1.5 py-0.5 bg-stone-100 text-stone-700 rounded font-semibold">
                            {ord.paymentMethod}
                          </span>
                          {ord.trxId && (
                            <span className="text-[10px] text-stone-500 font-mono">
                              Trx: {ord.trxId.slice(0, 8)}...
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-3.5 max-w-[170px]">
                        <p className="font-semibold text-stone-800 text-[11px] truncate">
                          {ord.shippingAddress.district}, {ord.shippingAddress.area}
                        </p>
                        <p className="text-[10px] text-stone-500 truncate">
                          {ord.shippingAddress.fullAddress}
                        </p>
                        <span className="inline-block mt-1 text-[9px] px-1.5 py-0.2 bg-blue-50 text-blue-700 rounded font-medium">
                          {ord.deliveryZone === 'inside_dhaka' ? 'Inside Dhaka (৳80)' : 'Outside Dhaka (৳130)'}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <select
                          value={ord.status}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className={`text-[11px] font-semibold rounded-lg px-2.5 py-1 border cursor-pointer ${
                            ord.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : ord.status === 'Shipped'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : ord.status === 'Confirmed'
                              ? 'bg-purple-50 text-purple-800 border-purple-300'
                              : ord.status === 'Pending'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : ord.status === 'Processing'
                              ? 'bg-indigo-50 text-indigo-800 border-indigo-300'
                              : 'bg-rose-50 text-rose-800 border-rose-300'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-medium cursor-pointer transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5 inline mr-1" />
                          <span>{isBn ? 'ডিটেইলস' : 'View'}</span>
                        </button>

                        <button
                          onClick={() => setShowPrintSlipModal(ord)}
                          className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs cursor-pointer transition-colors inline-block"
                          title="Print Courier Invoice"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Incomplete Orders (18 Items) Table */
        <div className="bg-white rounded-xl border border-rose-200 shadow-2xs overflow-hidden">
          <div className="p-4 bg-rose-50/60 border-b border-rose-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-rose-900 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>{isBn ? 'ইনকমপ্লিট অর্ডার ও পরিত্যক্ত চেকআউট রিকভারি' : 'Incomplete Orders & Abandoned Checkout Recovery'}</span>
              </h3>
              <p className="text-xs text-rose-700 mt-0.5">
                {isBn 
                  ? 'গ্রাহকরা কার্টে ঘড়ি রেখে গেছেন। সরাসরি কল বা হোয়াটসঅ্যাপ করে অর্ডার কনফার্ম করুন।'
                  : 'Customers who started checkout but left. Reach out via phone or WhatsApp to recover.'}
              </p>
            </div>
            <span className="px-3 py-1 bg-rose-600 text-white rounded-full text-xs font-bold font-mono">
              18 {isBn ? 'টি অর্ডার বাকি' : 'leads'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
                <tr>
                  <th className="p-3.5">{isBn ? 'গ্রাহক' : 'Customer'}</th>
                  <th className="p-3.5">{isBn ? 'ফোন নম্বর' : 'Phone'}</th>
                  <th className="p-3.5">{isBn ? 'জেলা' : 'District'}</th>
                  <th className="p-3.5">{isBn ? 'কার্টের ঘড়ি' : 'Cart Items'}</th>
                  <th className="p-3.5">{isBn ? 'সম্ভাব্য মূল্য' : 'Cart Value'}</th>
                  <th className="p-3.5">{isBn ? 'কার্যকলাপ' : 'Activity'}</th>
                  <th className="p-3.5 text-right">{isBn ? 'রিকভারি অ্যাকশন' : 'Recovery Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredIncompletes.map((inc) => (
                  <tr key={inc.id} className="hover:bg-rose-50/20 transition-colors">
                    <td className="p-3.5 font-semibold text-stone-900">
                      {inc.customerName}
                      <p className="text-[10px] text-stone-500 font-normal">{inc.email}</p>
                    </td>

                    <td className="p-3.5 font-mono text-stone-800">
                      <a 
                        href={`tel:${inc.phone}`} 
                        className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{inc.phone}</span>
                      </a>
                    </td>

                    <td className="p-3.5 text-stone-700">
                      {inc.district || 'Dhaka'}
                    </td>

                    <td className="p-3.5">
                      {inc.cartItems.map((it, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-1 last:mb-0">
                          <img src={it.image} alt={it.title} className="w-6 h-6 object-cover rounded" />
                          <span className="truncate max-w-[130px] font-medium text-stone-800">{it.title}</span>
                        </div>
                      ))}
                    </td>

                    <td className="p-3.5 font-mono font-bold text-rose-700">
                      ৳ {inc.cartValue.toLocaleString()}
                    </td>

                    <td className="p-3.5 text-stone-500 text-[11px]">
                      {inc.lastActivity}
                    </td>

                    <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                      {/* WhatsApp message trigger */}
                      <a
                        href={`https://wa.me/${inc.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inc.customerName)},%20this%20is%20MANOVA%20Watches%20Atelier.%20We%20saw%20you%20were%20interested%20in%20our%20handcrafted%20timepiece.%20Can%20we%20assist%20you%20with%20complimentary%20courier%20delivery?`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors shadow-2xs"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>

                      {/* Convert to Confirmed Order */}
                      <button
                        onClick={() => {
                          if (onConvertIncompleteOrder) {
                            onConvertIncompleteOrder(inc);
                          }
                          alert(`Order created successfully for ${inc.customerName}! Added to pending queue.`);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{isBn ? 'অর্ডার করুন' : 'Convert'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs text-stone-500 font-mono">Invoice Reference</span>
                <h3 className="text-lg font-bold text-stone-900 font-mono">{selectedOrder.orderNumber}</h3>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="p-1 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <div>
                  <span className="text-stone-400 uppercase text-[10px] block font-semibold">Customer</span>
                  <p className="font-bold text-stone-900 text-sm mt-0.5">{selectedOrder.customerName}</p>
                  <p className="text-stone-600">{selectedOrder.phone}</p>
                  <p className="text-stone-500">{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <span className="text-stone-400 uppercase text-[10px] block font-semibold">Shipping Address</span>
                  <p className="font-medium text-stone-900 mt-0.5">{selectedOrder.shippingAddress.fullAddress}</p>
                  <p className="text-stone-600">{selectedOrder.shippingAddress.area}, {selectedOrder.shippingAddress.district}</p>
                  <p className="text-stone-400 italic mt-1">Note: {selectedOrder.shippingAddress.orderNotes || 'None'}</p>
                </div>
              </div>

              {/* Items */}
              <div>
                <span className="font-semibold text-stone-700 block mb-2">Order Items</span>
                <div className="border border-stone-200 rounded-xl divide-y divide-stone-100 overflow-hidden">
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={it.image} alt={it.title} className="w-10 h-10 object-cover rounded-lg border border-stone-200" />
                        <div>
                          <p className="font-semibold text-stone-900">{it.title}</p>
                          <p className="text-[11px] text-stone-500 font-mono">Qty: {it.quantity} • Variant: {it.variant || 'Standard'}</p>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-stone-900">৳ {(it.price * it.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Summary */}
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1.5 font-mono">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal:</span>
                  <span>৳ {selectedOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Fee ({selectedOrder.deliveryZone}):</span>
                  <span>৳ {selectedOrder.deliveryFee}</span>
                </div>
                {selectedOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({selectedOrder.discountCode}):</span>
                    <span>-৳ {selectedOrder.discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-stone-200">
                  <span>Total Amount:</span>
                  <span>৳ {selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <a
                href={`tel:${selectedOrder.phone}`}
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-semibold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Customer</span>
              </a>

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-stone-900 text-white hover:bg-stone-800 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Courier Invoice Print Modal */}
      {showPrintSlipModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-stone-900 text-sm">Courier Shipping Invoice (Steadfast / RedX)</h3>
              <button onClick={() => setShowPrintSlipModal(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 border-b border-dashed border-stone-300 font-mono text-xs space-y-2">
              <div className="text-center pb-3">
                <h2 className="font-bold text-base tracking-widest text-stone-900">MANOVA WATCHES BANGLADESH</h2>
                <p className="text-[10px] text-stone-500">Gulshan-2 Atelier, Dhaka-1212 • +880 1711-892341</p>
                <p className="text-xs font-bold text-stone-800 mt-1">CONSIGNMENT SLIP: {showPrintSlipModal.orderNumber}</p>
              </div>

              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <p><strong>RECIPIENT:</strong> {showPrintSlipModal.customerName}</p>
                <p><strong>PHONE:</strong> {showPrintSlipModal.phone}</p>
                <p><strong>ADDRESS:</strong> {showPrintSlipModal.shippingAddress.fullAddress}, {showPrintSlipModal.shippingAddress.district}</p>
                <p><strong>COD AMOUNT:</strong> {showPrintSlipModal.paymentMethod === 'cod' ? `৳ ${showPrintSlipModal.total.toLocaleString()}` : 'PAID ONLINE (৳ 0)'}</p>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  window.print();
                  setShowPrintSlipModal(null);
                }}
                className="px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Consignment Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
