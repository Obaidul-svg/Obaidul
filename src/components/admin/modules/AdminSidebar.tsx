import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Home, 
  ShoppingBag, 
  Package, 
  Clock, 
  Truck, 
  CheckCircle2, 
  CreditCard, 
  AlertCircle, 
  Watch, 
  FileText, 
  FolderTree, 
  Boxes, 
  Ticket, 
  Wallet, 
  Users, 
  Star, 
  Settings, 
  ShieldAlert, 
  History, 
  ChevronDown, 
  ChevronRight, 
  Sparkles, 
  ExternalLink,
  Globe,
  LogOut,
  Sliders
} from 'lucide-react';
import { ManovaLogo } from '../../ManovaLogo';

export type AdminTab = 
  | 'dashboard'
  | 'homepage'
  | 'orders'
  | 'orders-all'
  | 'orders-pending'
  | 'orders-shipped'
  | 'orders-delivered'
  | 'orders-payment-status'
  | 'orders-incomplete'
  | 'products'
  | 'alt-text'
  | 'categories'
  | 'inventory'
  | 'coupons'
  | 'finance'
  | 'customers'
  | 'reviews'
  | 'settings'
  | 'order-control'
  | 'audit-log';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  lang: 'bn' | 'en';
  onToggleLang: () => void;
  onExit: () => void;
  onLogOut?: () => void;
  onOpenThemeEditor?: () => void;
  incompleteOrdersCount?: number;
  inventoryCount?: number;
  onCloseMobileDrawer?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  lang,
  onToggleLang,
  onExit,
  onLogOut,
  onOpenThemeEditor,
  incompleteOrdersCount = 18,
  inventoryCount = 20,
  onCloseMobileDrawer,
}) => {
  // Orders menu expansion
  const isOrderActive = activeTab.startsWith('orders');
  const [ordersExpanded, setOrdersExpanded] = useState<boolean>(true);

  const handleTabClick = (tab: AdminTab) => {
    onSelectTab(tab);
    if (onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  const isBn = lang === 'bn';

  return (
    <aside className="w-72 bg-[#F9FAFB] border-r border-stone-200/90 flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-stone-200/80 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ManovaLogo variant="compact" />
          </div>

          {/* Language Switcher Badge */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors border border-stone-200 cursor-pointer shadow-2xs"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-stone-500" />
            <span>{isBn ? 'বাংলা' : 'EN'}</span>
          </button>
        </div>

        <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-500">
          <span className="font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-600">
            Gulshan-2 Atelier Hub
          </span>
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Store
          </span>
        </div>
      </div>

      {/* Main Navigation - Follows Screenshot 2 Rounded Rectangles & Green Active Style */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 text-sm">
        {/* 1. ড্যাশবোর্ড / Dashboard */}
        <button
          onClick={() => handleTabClick('dashboard')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left font-medium cursor-pointer ${
            activeTab === 'dashboard'
              ? 'bg-[#E8F8F0] border-[#86EFAC] text-[#15803D] font-bold shadow-xs'
              : 'bg-white border-stone-200/90 text-stone-700 hover:border-emerald-200 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-1 h-5 rounded-full transition-colors ${activeTab === 'dashboard' ? 'bg-[#22C55E]' : 'bg-transparent'}`} />
            <LayoutDashboard className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-[#16A34A]' : 'text-stone-500'}`} />
            <span>{isBn ? 'ড্যাশবোর্ড' : 'Dashboard'}</span>
          </div>
        </button>

        {/* 2. হোমপেজ / Homepage */}
        <button
          onClick={() => handleTabClick('homepage')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left font-medium cursor-pointer ${
            activeTab === 'homepage'
              ? 'bg-[#E8F8F0] border-[#86EFAC] text-[#15803D] font-bold shadow-xs'
              : 'bg-white border-stone-200/90 text-stone-700 hover:border-emerald-200 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-1 h-5 rounded-full transition-colors ${activeTab === 'homepage' ? 'bg-[#22C55E]' : 'bg-transparent'}`} />
            <Home className={`w-4 h-4 ${activeTab === 'homepage' ? 'text-[#16A34A]' : 'text-stone-500'}`} />
            <span>{isBn ? 'হোমপেজ' : 'Homepage'}</span>
          </div>
        </button>

        {/* 3. অর্ডার / Orders (Expandable Menu with Subitems) */}
        <div className="space-y-1">
          <div
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left font-medium cursor-pointer ${
              isOrderActive
                ? 'bg-[#E8F8F0] border-[#86EFAC] text-[#15803D] font-bold shadow-xs'
                : 'bg-white border-stone-200/90 text-stone-700 hover:border-emerald-200 hover:bg-emerald-50/30'
            }`}
            onClick={() => {
              setOrdersExpanded(!ordersExpanded);
              if (!isOrderActive) {
                handleTabClick('orders-all');
              }
            }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-1 h-5 rounded-full transition-colors ${isOrderActive ? 'bg-[#22C55E]' : 'bg-transparent'}`} />
              <ShoppingBag className={`w-4 h-4 ${isOrderActive ? 'text-[#16A34A]' : 'text-stone-500'}`} />
              <span>{isBn ? 'অর্ডার' : 'Orders'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center">
                6
              </span>
              {ordersExpanded ? (
                <ChevronDown className="w-4 h-4 text-stone-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-stone-400" />
              )}
            </div>
          </div>

          {/* Submenu for Orders */}
          {ordersExpanded && (
            <div className="pl-6 pr-1 py-1 space-y-1">
              {/* সব অর্ডার / All Orders */}
              <button
                onClick={() => handleTabClick('orders-all')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all font-medium cursor-pointer ${
                  activeTab === 'orders' || activeTab === 'orders-all'
                    ? 'bg-emerald-100/70 text-[#15803D] font-bold'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-3.5 h-3.5" />
                  <span>{isBn ? 'সব অর্ডার' : 'All Orders'}</span>
                </div>
              </button>

              {/* পেন্ডিং / Pending */}
              <button
                onClick={() => handleTabClick('orders-pending')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all font-medium cursor-pointer ${
                  activeTab === 'orders-pending'
                    ? 'bg-emerald-100/70 text-[#15803D] font-bold'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isBn ? 'পেন্ডিং' : 'Pending'}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 bg-amber-50 text-amber-700 font-semibold rounded">
                  1
                </span>
              </button>

              {/* শিপড / Shipped */}
              <button
                onClick={() => handleTabClick('orders-shipped')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all font-medium cursor-pointer ${
                  activeTab === 'orders-shipped'
                    ? 'bg-emerald-100/70 text-[#15803D] font-bold'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isBn ? 'শিপড' : 'Shipped'}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-700 font-semibold rounded">
                  1
                </span>
              </button>

              {/* ডেলিভারড / Delivered */}
              <button
                onClick={() => handleTabClick('orders-delivered')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all font-medium cursor-pointer ${
                  activeTab === 'orders-delivered'
                    ? 'bg-emerald-100/70 text-[#15803D] font-bold'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isBn ? 'ডেলিভারড' : 'Delivered'}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded">
                  1
                </span>
              </button>

              {/* ডেলিভারি পেমেন্ট স্ট্যাটাস / Delivery Payment Status */}
              <button
                onClick={() => handleTabClick('orders-payment-status')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all font-medium cursor-pointer ${
                  activeTab === 'orders-payment-status'
                    ? 'bg-emerald-100/70 text-[#15803D] font-bold'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-3.5 h-3.5 text-purple-600" />
                  <span>{isBn ? 'ডেলিভারি পেমেন্ট স্ট্যাটাস' : 'Delivery Payment Status'}</span>
                </div>
              </button>

              {/* ইনকমপ্লিট অর্ডার / Incomplete Orders [18] (Red badge matching screenshot!) */}
              <button
                onClick={() => handleTabClick('orders-incomplete')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all font-medium cursor-pointer ${
                  activeTab === 'orders-incomplete'
                    ? 'bg-emerald-100/70 text-[#15803D] font-bold'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                  <span>{isBn ? 'ইনকমপ্লিট অর্ডার' : 'Incomplete Orders'}</span>
                </div>
                <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full min-w-[20px] text-center shadow-xs">
                  {incompleteOrdersCount}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* 4. প্রোডাক্ট / Products */}
        <button
          onClick={() => handleTabClick('products')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left font-medium cursor-pointer ${
            activeTab === 'products'
              ? 'bg-[#E8F8F0] border-[#86EFAC] text-[#15803D] font-bold shadow-xs'
              : 'bg-white border-stone-200/90 text-stone-700 hover:border-emerald-200 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-1 h-5 rounded-full transition-colors ${activeTab === 'products' ? 'bg-[#22C55E]' : 'bg-transparent'}`} />
            <Watch className={`w-4 h-4 ${activeTab === 'products' ? 'text-[#16A34A]' : 'text-stone-500'}`} />
            <span>{isBn ? 'প্রোডাক্ট' : 'Products'}</span>
          </div>
        </button>

        {/* 5. Alt Text Manager */}
        <button
          onClick={() => handleTabClick('alt-text')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left font-medium cursor-pointer ${
            activeTab === 'alt-text'
              ? 'bg-[#E8F8F0] border-[#86EFAC] text-[#15803D] font-bold shadow-xs'
              : 'bg-white border-stone-200/90 text-stone-700 hover:border-emerald-200 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-1 h-5 rounded-full transition-colors ${activeTab === 'alt-text' ? 'bg-[#22C55E]' : 'bg-transparent'}`} />
            <FileText className={`w-4 h-4 ${activeTab === 'alt-text' ? 'text-[#16A34A]' : 'text-stone-500'}`} />
            <span>Alt Text Manager</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 bg-sky-50 text-sky-700 rounded font-mono">
            SEO
          </span>
        </button>

        {/* 6. ক্যাটাগরি / Category */}
        <button
          onClick={() => handleTabClick('categories')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left font-medium cursor-pointer ${
            activeTab === 'categories'
              ? 'bg-[#E8F8F0] border-[#86EFAC] text-[#15803D] font-bold shadow-xs'
              : 'bg-white border-stone-200/90 text-stone-700 hover:border-emerald-200 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-1 h-5 rounded-full transition-colors ${activeTab === 'categories' ? 'bg-[#22C55E]' : 'bg-transparent'}`} />
            <FolderTree className={`w-4 h-4 ${activeTab === 'categories' ? 'text-[#16A34A]' : 'text-stone-500'}`} />
            <span>{isBn ? 'ক্যাটাগরি' : 'Category'}</span>
          </div>
        </button>

        {/* 7. ইনভেন্টরি / Inventory [20] */}
        <button
          onClick={() => handleTabClick('inventory')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left font-medium cursor-pointer ${
            activeTab === 'inventory'
              ? 'bg-[#E8F8F0] border-[#86EFAC] text-[#15803D] font-bold shadow-xs'
              : 'bg-white border-stone-200/90 text-stone-700 hover:border-emerald-200 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-1 h-5 rounded-full transition-colors ${activeTab === 'inventory' ? 'bg-[#22C55E]' : 'bg-transparent'}`} />
            <Boxes className={`w-4 h-4 ${activeTab === 'inventory' ? 'text-[#16A34A]' : 'text-stone-500'}`} />
            <span>{isBn ? 'ইনভেন্টরি' : 'Inventory'}</span>
          </div>
          <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full min-w-[22px] text-center shadow-2xs">
            {inventoryCount}
          </span>
        </button>

        {/* 8. কুপন / Coupon */}
        <button
          onClick={() => handleTabClick('coupons')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left font-medium cursor-pointer ${
            activeTab === 'coupons'
              ? 'bg-[#E8F8F0] border-[#86EFAC] text-[#15803D] font-bold shadow-xs'
              : 'bg-white border-stone-200/90 text-stone-700 hover:border-emerald-200 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-1 h-5 rounded-full transition-colors ${activeTab === 'coupons' ? 'bg-[#22C55E]' : 'bg-transparent'}`} />
            <Ticket className={`w-4 h-4 ${activeTab === 'coupons' ? 'text-[#16A34A]' : 'text-stone-500'}`} />
            <span>{isBn ? 'কুপন' : 'Coupon'}</span>
          </div>
        </button>

        {/* 9. ফাইন্যান্স / Finance */}
        <button
          onClick={() => handleTabClick('finance')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left font-medium cursor-pointer ${
            activeTab === 'finance'
              ? 'bg-[#E8F8F0] border-[#86EFAC] text-[#15803D] font-bold shadow-xs'
              : 'bg-white border-stone-200/90 text-stone-700 hover:border-emerald-200 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-1 h-5 rounded-full transition-colors ${activeTab === 'finance' ? 'bg-[#22C55E]' : 'bg-transparent'}`} />
            <Wallet className={`w-4 h-4 ${activeTab === 'finance' ? 'text-[#16A34A]' : 'text-stone-500'}`} />
            <span>{isBn ? 'ফাইন্যান্স' : 'Finance'}</span>
          </div>
        </button>

        {/* 10. কাস্টমার / Customer */}
        <button
          onClick={() => handleTabClick('customers')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left font-medium cursor-pointer ${
            activeTab === 'customers'
              ? 'bg-[#E8F8F0] border-[#86EFAC] text-[#15803D] font-bold shadow-xs'
              : 'bg-white border-stone-200/90 text-stone-700 hover:border-emerald-200 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-1 h-5 rounded-full transition-colors ${activeTab === 'customers' ? 'bg-[#22C55E]' : 'bg-transparent'}`} />
            <Users className={`w-4 h-4 ${activeTab === 'customers' ? 'text-[#16A34A]' : 'text-stone-500'}`} />
            <span>{isBn ? 'কাস্টমার' : 'Customer'}</span>
          </div>
        </button>

        {/* 11. রিভিউ ও প্রশংসা / Reviews */}
        <button
          onClick={() => handleTabClick('reviews')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left font-medium cursor-pointer ${
            activeTab === 'reviews'
              ? 'bg-[#E8F8F0] border-[#86EFAC] text-[#15803D] font-bold shadow-xs'
              : 'bg-white border-stone-200/90 text-stone-700 hover:border-emerald-200 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-1 h-5 rounded-full transition-colors ${activeTab === 'reviews' ? 'bg-[#22C55E]' : 'bg-transparent'}`} />
            <Star className={`w-4 h-4 ${activeTab === 'reviews' ? 'text-[#16A34A]' : 'text-stone-500'}`} />
            <span>{isBn ? 'রিভিউ ও প্রশংসা' : 'Reviews & Ratings'}</span>
          </div>
        </button>

        {/* 12. সেটিংস / Settings */}
        <button
          onClick={() => handleTabClick('settings')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left font-medium cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-[#E8F8F0] border-[#86EFAC] text-[#15803D] font-bold shadow-xs'
              : 'bg-white border-stone-200/90 text-stone-700 hover:border-emerald-200 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-1 h-5 rounded-full transition-colors ${activeTab === 'settings' ? 'bg-[#22C55E]' : 'bg-transparent'}`} />
            <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-[#16A34A]' : 'text-stone-500'}`} />
            <span>{isBn ? 'সেটিংস' : 'Settings'}</span>
          </div>
        </button>

        {/* 13. অর্ডার কন্ট্রোল / Order Control */}
        <button
          onClick={() => handleTabClick('order-control')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left font-medium cursor-pointer ${
            activeTab === 'order-control'
              ? 'bg-[#E8F8F0] border-[#86EFAC] text-[#15803D] font-bold shadow-xs'
              : 'bg-white border-stone-200/90 text-stone-700 hover:border-emerald-200 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-1 h-5 rounded-full transition-colors ${activeTab === 'order-control' ? 'bg-[#22C55E]' : 'bg-transparent'}`} />
            <ShieldAlert className={`w-4 h-4 ${activeTab === 'order-control' ? 'text-[#16A34A]' : 'text-stone-500'}`} />
            <span>{isBn ? 'অর্ডার কন্ট্রোল' : 'Order Control'}</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 bg-rose-50 text-rose-700 rounded font-semibold">
            Risk
          </span>
        </button>

        {/* 14. কন্ট্রাস্ট অডিট / Consult Audit */}
        <button
          onClick={() => handleTabClick('audit-log')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left font-medium cursor-pointer ${
            activeTab === 'audit-log'
              ? 'bg-[#E8F8F0] border-[#86EFAC] text-[#15803D] font-bold shadow-xs'
              : 'bg-white border-stone-200/90 text-stone-700 hover:border-emerald-200 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-1 h-5 rounded-full transition-colors ${activeTab === 'audit-log' ? 'bg-[#22C55E]' : 'bg-transparent'}`} />
            <History className={`w-4 h-4 ${activeTab === 'audit-log' ? 'text-[#16A34A]' : 'text-stone-500'}`} />
            <span>{isBn ? 'কন্ট্রাস্ট অডিট' : 'Consult Audit'}</span>
          </div>
        </button>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-stone-200/80 bg-white space-y-2">
        {onOpenThemeEditor && (
          <button
            onClick={onOpenThemeEditor}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isBn ? 'থিম কাস্টমাইজার ওপেন করুন' : 'Open Theme Editor'}</span>
          </button>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={onExit}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 border border-stone-200 hover:bg-stone-50 rounded-xl text-xs text-stone-700 font-medium transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
            <span>{isBn ? 'স্টোরফ্রন্ট দেখুন' : 'Live Store'}</span>
          </button>

          <button
            onClick={onLogOut || onExit}
            className="p-2 border border-stone-200 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 rounded-xl text-stone-500 transition-colors cursor-pointer"
            title={isBn ? "লগআউট করুন" : "Log Out"}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
